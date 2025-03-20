import assert from 'assert'
import { editExistingEntity } from './helpers/edit-existing-entity'
import { popupWarningFix } from './helpers/popup-warning-fix'

// Not strictly e2e test but useful for migrations and refactorings involving saving
// activate if needed

Feature('Serlo Editor - save content and check result via API')

Before(({ I, login }) => {
  popupWarningFix({ I })
  login('admin') // login as admin for now
})

const abstractEntityQuery = `
  query abstractEntityQuery($id: Int!) {
  uuid(id: $id) {
    ... on AbstractEntity {
      __typename
      licenseId
      currentRevision {
        title
        metaTitle
        metaDescription
        changes
        content
      }
    }
    ... on TaxonomyTerm {
      type
      title
      description
      weight
      parent {
        id
      }
      path {
        id
      }
      children {
        totalCount
      }
    }
    ...on User {
      title
      description
    }
  }
  }
`

const idsAndExpectedResult = {
  Article: {
    id: 318830,
    state: {
      data: {
        uuid: {
          __typename: 'Article',
          licenseId: 1,
          currentRevision: {
            title: '[Article]',
            metaTitle: '[meta-title]',
            metaDescription: '[meta-description]',
            changes: '[test-edit]',
            content:
              '{"id":"aac4d103-70d9-4599-b2b1-27a662bf2c23","type":"https://serlo.org/editor","variant":"serlo-org","domainOrigin":"serlo.org","version":2,"editorVersion":"0.22.2","dateModified":"2025-02-18T16:12:56.617Z","document":{"plugin":"article","state":{"introduction":{"plugin":"articleIntroduction","state":{"explanation":{"plugin":"text","state":[{"type":"p","children":[{"text":""}]}],"id":"01b37bfd-023a-4d6e-8274-6b4d19f2cd18"},"multimedia":{"plugin":"image","state":{"src":"","caption":{"plugin":"text","state":[{"type":"p","children":[{"text":""}]}],"id":"5c437b1a-2bee-4f13-8d3c-ccb3b69cebf5"}},"id":"978d352f-382e-4f12-b2d4-5995cbcff8a2"},"illustrating":true,"width":50},"id":"a31910d7-b392-465d-ad2f-a7bb9c5eab88"},"content":{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"hello fish"}]}],"id":"e9d094ab-23ea-4b05-87f3-12e0a0bb23aa"}],"id":"5f8afd08-8756-4b04-93e8-d0bf3a7cbab9"},"exercises":[],"exerciseFolder":{"id":"","title":""},"relatedContent":{"articles":[],"courses":[],"videos":[]},"sources":[]},"id":"b26b303e-3028-410f-8948-dad1c51a4063"}}',
          },
        },
      },
    },
  },
  Course: {
    id: 318832,
    state: {
      data: {
        uuid: {
          __typename: 'Course',
          licenseId: 1,
          currentRevision: {
            title: '[Course]',
            metaTitle: '',
            metaDescription: '[meta-description]',
            changes: 'init',
            content:
              '{"id":"4a7203ec-a932-4dc2-a5af-571d007d60e9","type":"https://serlo.org/editor","variant":"serlo-org","domainOrigin":"serlo.org","version":2,"editorVersion":"0.22.0","dateModified":"2025-02-18T15:33:09.989Z","document":{"plugin":"course","state":{"content":{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":""}]}],"id":"efd0d991-f678-41ef-aff0-4ad142aa7a9a"}],"id":"75918399-2532-427f-bb51-00110917fb99"},"pages":[{"id":"","title":"Page 1","content":{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"hello bird"}]}],"id":"da15f782-3073-4872-bd50-6dd140a371ac"}],"id":"ff10d59c-b692-4127-89cc-435c14584894"}}]},"id":"a901b330-fb5a-427f-93af-ebffd04c927c"}}',
          },
        },
      },
    },
  },
  Video: {
    id: 318834,
    state: {
      data: {
        uuid: {
          __typename: 'Video',
          licenseId: 1,
          currentRevision: {
            title: '[Video]',
            metaTitle: '',
            metaDescription: '',
            changes: 'init',
            content:
              '{"id":"4c61163c-697a-49a0-b6e2-967ad625018f","type":"https://serlo.org/editor","variant":"serlo-org","domainOrigin":"serlo.org","version":2,"editorVersion":"0.22.0","dateModified":"2025-02-18T15:33:09.991Z","document":{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"hello worm"}]}],"id":"e0e37648-b3e9-4561-8e4a-9489b6cb2855"}],"id":"31e0cb90-06af-4acb-9f33-49c0c7e131b7"}}',
          },
        },
      },
    },
  },
  Applet: {
    id: 318836,
    state: {
      data: {
        uuid: {
          __typename: 'Applet',
          licenseId: 1,
          currentRevision: {
            title: '[Applet]',
            metaTitle: '[meta-title]',
            metaDescription: '[meta-description]',
            changes: 'init',
            content:
              '{"id":"3674c3a6-8932-4a42-b4a5-17384fc55c02","type":"https://serlo.org/editor","variant":"serlo-org","domainOrigin":"serlo.org","version":2,"editorVersion":"0.22.0","dateModified":"2025-02-18T15:33:09.993Z","document":{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"hello dear"}]}],"id":"d0ed47cb-cc84-481b-bb3b-aaa5ce89a345"}],"id":"bef6f320-7de7-4e22-b063-4e18b1d2b161"}}',
          },
        },
      },
    },
  },
  Event: {
    id: 179657,
    state: {
      data: {
        uuid: {
          __typename: 'Event',
          licenseId: 1,
          currentRevision: {
            title: 'Kennenlernabend in Münster am 11.11.20',
            metaTitle: '',
            metaDescription: '',
            changes: 'Aus München Münster gemacht',
            content:
              '{"id":"6ce45203-3077-4281-b655-bbb5949575dc","type":"https://serlo.org/editor","variant":"serlo-org","domainOrigin":"serlo.org","version":2,"editorVersion":"0.22.0","dateModified":"2025-02-18T15:28:30.266Z","document":{"plugin":"rows","state":[{"plugin":"multimedia","state":{"explanation":{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"11.11.20, 18 Uhr","strong":true}]},{"type":"h","level":3,"children":[{"text":"Kennenlernabend in Münster "}]},{"type":"p","children":[{"text":"An diesem Abend kannst du als ehrenamtliche*r Autor*in bei Serlo hineinschnuppern und dich informieren. Anschließend wird es ein Spieleabend geben."}]}],"id":"6275f922-fd37-431c-8fd3-f54700da89ce"}],"id":"9d69bd6f-0d07-4147-91f5-91d8431ae870"},"multimedia":{"plugin":"image","state":{"src":"https://assets.serlo.org/5e38201931ff1_d1328b782f39a35c41161777c99b77edfb518b20.jpg","caption":{"plugin":"text","state":[{"type":"p","children":[{}]}],"id":"b3863b62-e25b-4553-9a96-73b1120a53c6"}},"id":"add758b1-90bf-43ab-9285-e1d8f4f4e365"},"illustrating":true,"width":50},"id":"1630e305-3fdf-4d37-aeaa-9c9f2dda16ab"},{"plugin":"spoiler","state":{"title":"Mehr Infos","content":{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"So mancher hat sich schon gefragt, wie es wohl wäre selbst Lerninhalte auf serlo.org zu gestalten. Wie funktioniert das? Was muss man dafür können? Wer macht das überhaupt? Ist das alles gleich online? ..?"}]}],"id":"7c3041a9-70da-48a3-b0c6-9e772fdfd480"},{"plugin":"text","state":[{"type":"p","children":[{"text":"Bei unserem Kennenlernabend kannst du hineinschnuppern in die Tätigkeiten als ehrenamtlicher Autor*in in unserer Münsteraner Community. Du hast die Möglichkeit dich ein wenig auf der Plattform begleitet auszuprobieren und deine Fragen zu stellen. Nebenbei lernst du viele nette Autor*innen aus Münster kennen."}]},{"type":"p","children":[{"text":"Komm gern vorbei!","strong":true}]}],"id":"082cdf1d-a0b2-4054-82dc-1762fa33a741"},{"plugin":"text","state":[{"type":"h","level":3,"children":[{"text":"Zeitplan"}]},{"type":"p","children":[{"text":"18.00","strong":true},{"text":" Ankommen und Kennenlernen"}]},{"type":"p","children":[{"text":"18.15","strong":true},{"text":" Vorstellen von Serlo"}]},{"type":"p","children":[{"text":"18.30","strong":true},{"text":" Informationen über unsere nächsten Termine"}]},{"type":"p","children":[{"text":"19.00 ","strong":true},{"text":"Spieleabend"}]}],"id":"ca0cfbf7-c06e-4832-bfd7-baa181b20cd5"},{"plugin":"text","state":[{"type":"h","level":3,"children":[{"text":"Ort"}]}],"id":"ba9856f4-7a0d-48f8-a4eb-97d266f205a4"},{"plugin":"image","state":{"src":"https://assets.serlo.org/5e1dcfe8508b4_0e1d2506b849e42a4da67ce1e96b75e833608a39.png","caption":{"plugin":"text","state":[{"type":"p","children":[{}]}],"id":"5888215e-7abf-4a00-8f22-205bd1abbdb5"}},"id":"d6eb2daf-ae2b-47fb-bf50-a33b024072a3"},{"plugin":"text","state":[{"type":"p","children":[{"text":"Quelle: ","em":true},{"type":"a","href":"https://www.openstreetmap.de/karte.html","children":[{"text":"© OpenStreetMap","em":true}]},{"text":" contributors, ","em":true},{"type":"a","href":"http://opendatacommons.org/licenses/odbl/","children":[{"text":"Database Contents License (ddCL) 1.0","em":true}]},{"text":"","em":true}]}],"id":"642f41f4-24bf-48b9-a20b-de447e29ea28"},{"plugin":"text","state":[{"type":"p","children":[{"text":"Die Veranstaltung findet nur online statt. Du kannst zu uns kommen über:"}]}],"id":"a3ebef97-e94d-4ad1-bbb2-cf36ee3c17c8"},{"plugin":"box","state":{"title":{"plugin":"text","state":[{"type":"p","children":[{}]}],"id":"f668841c-4aba-4137-881a-e578e504ad4c"},"content":{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"Zoom Meeting-ID: 939 1271 4748"}]},{"type":"p","children":[{"text":"(alternativ kannst du diesem Link folgen: "},{"type":"a","href":"https://wwu.zoom.us/j/93912714748","children":[{"text":"https://wwu.zoom.us/j/93912714748"}]},{"text":")"}]}],"id":"f53ed333-5653-428d-beb2-5816ca2930a3"}],"id":"f3c66264-97ca-4ef2-9b6a-8b85e7c01adf"},"type":"blank","anchorId":"box10287"},"id":"e12c2d75-b77c-4465-ad60-1ba9e6d00c4e"},{"plugin":"text","state":[{"type":"h","level":3,"children":[{"text":"Anmeldung"}]},{"type":"p","children":[{"text":"Eine Anmeldung ist "},{"text":"nicht erforderlich","strong":true},{"text":"."}]}],"id":"8bbba98f-6ec8-4878-94bf-1eb5f96f61f9"},{"plugin":"text","state":[{"type":"h","level":3,"children":[{"text":"Ansprechpartner"}]},{"type":"p","children":[{"text":"Menuja Jeyalavathas"}]},{"type":"p","children":[{"text":""},{"type":"a","href":"mailto:muenster@serlo.org","children":[{"text":"muenster@serlo.org"}]},{"text":""}]}],"id":"d87a9662-116e-4448-8809-76e1bb7b41b1"},{"plugin":"box","state":{"title":{"plugin":"text","state":[{"type":"p","children":[{}]}],"id":"92c9bc8f-67b7-4770-96dc-42a459cfd3c2"},"content":{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":""},{"type":"a","href":"https://calendar.google.com/event?action=TEMPLATE&tmeid=NHVkYjluOW82NWtydHZxOGJmNTk0aGMwdW0gc2VybG8ub3JnX2I0bmE3bnU2OW50cDRqZWpwN2o3ZGJpOGVvQGc&tmsrc=serlo.org_b4na7nu69ntp4jejp7j7dbi8eo%40group.calendar.google.com","children":[{"text":"Termin zum Kalender hinzufügen"}]},{"text":""}]}],"id":"ee03b949-ba7a-4dc1-8240-ccc99a3560f7"}],"id":"e0c24386-73c5-445c-b81a-ad41772d5627"},"type":"blank","anchorId":"box61286"},"id":"079442f5-0746-4f77-8264-3bfb96eddfaf"}],"id":"82a499d0-1862-45cc-9a66-72e1859ec7b4"}},"id":"f01f0802-0a19-419c-86ab-9098b8a637b6"}],"id":"09fbe82f-a7e4-434a-88fa-3b9333662b7f"}}',
          },
        },
      },
    },
  },
  Page: {
    id: 24887,
    state: {
      data: {
        uuid: {
          __typename: 'Page',
          licenseId: 1,
          currentRevision: {
            title: 'Presse',
            metaTitle: '',
            metaDescription: '',
            changes: 'Page',
            content:
              '{"id":"7b2cb2f1-57e3-4091-bb46-5073dc090624","type":"https://serlo.org/editor","variant":"serlo-org","domainOrigin":"serlo.org","version":2,"editorVersion":"0.22.2","dateModified":"2025-02-18T16:13:29.835Z","document":{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"Für Hintergrundinformationen zum Verein oder der Plattform, Gespräche oder Interviewanfragen nehmen Sie gerne jederzeit Kontakt mit uns auf über de@serlo.org auf. "}]}],"id":"3e7a83cc-ba26-4630-bf40-d0df0e4b8e43"},{"plugin":"text","state":[{"type":"h","level":2,"children":[{"text":"Bildmaterial"}]},{"type":"p","children":[{"text":"Hier finden Sie unser Logo, Bilder des Teams und der Mitgründer:innen, Bilder von Schüler:innen, die Serlo nutzen sowie Screenshots der Lernplattform zur Nutzung:"}]},{"type":"unordered-list","children":[{"type":"list-item","children":[{"type":"list-item-child","children":[{"type":"p","children":[{"text":""},{"type":"a","href":"https://docs.google.com/document/d/1qbchkH0T24aK2SHAgmns8o92T3MmSWPb1WSI2Ovz2z8/edit#","children":[{"text":"Übersicht mit Bildbeschreibungen"}]},{"text":""}]}]}]},{"type":"list-item","children":[{"type":"list-item-child","children":[{"type":"p","children":[{"text":""},{"type":"a","href":"https://drive.google.com/drive/folders/0B0vgO6Y0XakNVVJubzJBUFZmdU0","children":[{"text":"Ordner mit den Bilder in hoher Auflösung"}]},{"text":""}]}]}]}]}],"id":"d9b489ab-dc20-4b85-8265-b5c5c5010673"},{"plugin":"text","state":[{"type":"h","level":3,"children":[{"text":"Logo"}]}],"id":"73c500a5-47ec-48a3-9344-3ed0e5f92b39"},{"plugin":"pageLayout","state":{"widthPercent":50,"column1":{"plugin":"rows","state":[{"plugin":"image","state":{"src":"https://assets.serlo.org/fce27510-7d96-11ee-abd9-fb5c95e5b4f2/image.png","alt":"serlo.org Logo","caption":{"plugin":"text","state":[{"type":"p","children":[{"text":""}]}],"id":"2e202d50-be5f-4ad9-a343-9dd74490cbae"}},"id":"9df574dc-64d8-4071-bb20-0c20d35dd27c"},{"plugin":"text","state":[{"type":"p","children":[{"text":""}]}],"id":"ffced89f-d3ea-4da4-9569-ef75abb90568"}],"id":"ebfc99b3-b042-477f-a862-702cdeff33d0"},"column2":{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"Herunterladen mit Rechtsklick auf das Logo und \\"Speichern unter\\".","em":true}]},{"type":"p","children":[{"text":"Bitte nur auf weißem oder hellgrauem Grund einbinden und etwas  Weißraum um das Logo lassen – der Vogel braucht Platz zum Fliegen.","em":true}]}],"id":"7d0db9b6-5af1-4b11-bb9e-2e1af0d2f5d4"}],"id":"6ea8d876-7069-4924-8f8a-53c516a997cd"}},"id":"fd2a3680-49d3-421d-bbba-08d4557fe0c1"}],"id":"07f811b5-c499-4918-9a51-9ee9d8471a76"}}',
          },
        },
      },
    },
  },
  User: {
    id: 26217,
    state: {
      data: {
        uuid: {
          title: 'Kulla',
          description:
            '{"id":"2eb77924-3693-4386-a056-f51556b562b1","type":"https://serlo.org/editor","variant":"serlo-org","domainOrigin":"serlo.org","version":2,"editorVersion":"0.22.0","dateModified":"2025-02-18T15:33:17.351Z","document":{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"Hallo, mein Name ist Kulla und ich engagiere mich bereits seit 10 Jahren bei Serlo. Früher habe ich vor allem Inhalte zur Hochschulmathematik erstellt und habe mitgeholfen, diesen Bereich bei Serlo aufzubauen. Aktuell arbeite ich hauptamtlich als Programmierer bei Serlo und erstelle in meiner Freizeit vor allem Inhalte im Physik- und im Mathematikbereich."}]}],"id":"cad1f88f-19ce-4487-93b8-1c5f66e0b4b2"}],"id":"c0022339-4197-4ead-893d-c4775fc6b256"}}',
        },
      },
    },
  },
  Topic: {
    id: 318827,
    state: {
      data: {
        uuid: {
          type: 'topic',
          title: 'Serlo Entity Types',
          description:
            '{"id":"eefd34d3-f8bb-4a0a-b0fa-f05081219c73","type":"https://serlo.org/editor","variant":"serlo-org","domainOrigin":"serlo.org","version":2,"editorVersion":"0.22.0","dateModified":"2025-02-18T15:33:17.134Z","document":{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"without Page, Event, User …"}]}],"id":"8f68e62f-7018-4a16-9c82-2ba4f44fb109"}],"id":"569e3c8b-d83c-4a5b-a214-a6709b265523"}}',
          weight: 4,
          parent: {
            id: 234582,
          },
          path: [
            {
              id: 87993,
            },
            {
              id: 106082,
            },
            {
              id: 234582,
            },
          ],
          children: {
            totalCount: 6,
          },
        },
      },
    },
  },
  // waiting for content from production to arrive :)
  // Exercise
  // ExerciseGroup
  // ExerciseFolder
}

function stringifyAndRemoveDateTime(state: unknown) {
  return (
    JSON.stringify(state)
      // remove iso date time
      .replace(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+/g, '')
      // remove editor semver
      .replace(/v?\d+\.\d+\.\d+(?:-[\da-z.-]+)?(?:\+[\da-z.-]+)?/gi, '')
  )
}

Scenario('Save Entities and check results', ({ I }) => {
  //, 'Course', 'Video', 'Applet', 'Event'
  ;['Article'].forEach((type) => {
    I.say(`Type: ${type}`)
    const { id, state } = idsAndExpectedResult[type]
    editExistingEntity(I, id)

    I.clearField('$entity-title-input')
    I.fillField('$entity-title-input', `[${type}]`)
    I.click('Speichern')

    I.type('[test-edit]')
    I.click('.license-wrapper')

    I.click('button.serlo-button-learner.serlo-button-green')

    I.waitForText('Bearbeitungsverlauf')
    I.sendPostRequest('', {
      query: abstractEntityQuery,
      variables: { id },
    })
    I.seeResponseCodeIsSuccessful()
    I.seeResponseValidByCallback(({ data }) => {
      assert.deepEqual(
        stringifyAndRemoveDateTime(data),
        stringifyAndRemoveDateTime(state)
      )
    })
  })
})

Scenario('Save Entity "Page" and check result', ({ I }) => {
  const { id, state } = idsAndExpectedResult['Page']
  editExistingEntity(I, id)

  I.clearField('$entity-title-input')
  I.fillField('$entity-title-input', 'Presse')
  I.click('Speichern')
  I.click('button.serlo-button-learner.serlo-button-green')

  I.waitForText('Bearbeitungsverlauf')
  I.sendPostRequest('', {
    query: abstractEntityQuery,
    variables: { id },
  })
  I.seeResponseCodeIsSuccessful()
  I.seeResponseValidByCallback(({ data }) => {
    assert.deepEqual(
      stringifyAndRemoveDateTime(data),
      stringifyAndRemoveDateTime(state)
    )
  })
})

Scenario('Save "User" and check result', ({ I }) => {
  const { id, state } = idsAndExpectedResult['User']
  I.amOnPage(`/user/settings`)
  I.waitForElement('[data-document=true]', 10)

  I.click('Füge ein Element hinzu')
  I.pressKey('Enter')
  I.pressKey('Backspace')

  I.click('Speichern')
  I.click('button.serlo-button-learner.serlo-button-green')

  I.waitForText('Über mich')
  I.wait(5)
  I.sendPostRequest('', {
    query: abstractEntityQuery,
    variables: { id },
  })
  I.seeResponseCodeIsSuccessful()
  I.seeResponseValidByCallback(({ data }) => {
    assert.deepEqual(
      stringifyAndRemoveDateTime(data),
      stringifyAndRemoveDateTime(state)
    )
  })
})

// waiting for content from production to arrive :)
Scenario.todo('Save Taxonomies and check result', ({ I }) => {
  ;['Topic', 'ExerciseFolder'].forEach((type) => {
    I.say(`Type: ${type}`)
    const { id, state } = idsAndExpectedResult[type]
    editExistingEntity(I, id)

    I.clearField('$entity-title-input')
    I.fillField('$entity-title-input', `[${type}]`)
    I.click('Speichern')
    I.click('button.serlo-button-learner.serlo-button-green')

    I.waitForText('Bearbeitungsverlauf')
    I.sendPostRequest('', {
      query: abstractEntityQuery,
      variables: { id },
    })
    I.seeResponseCodeIsSuccessful()
    I.seeResponseContainsJson(state)
  })
})
