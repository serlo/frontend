export const deSubjectLandingData = {
  informatik: {
    title: 'Informatik',
    subline1: 'Keine Angst vor Computern.',
    subline2: 'Lerne ihre Sprache und zähme sie 🤖',
    allTopicsTaxonomyId: 47899,
  },
  mathe: {
    title: 'Mathe',
    subline1: 'Keine Angst vor Zahlen,',
    subline2: 'die meisten sind kleiner als du 😎',
    allTopicsTaxonomyId: 5,
  },
  biologie: {
    title: 'Biologie',
    subline1: 'Gib deinem Hirn einen Evolutionssprung',
    subline2: 'mit frischem Biologiewissen. 🐒',
    allTopicsTaxonomyId: 23362,
  },
  nachhaltigkeit: {
    title: 'Angewandte Nachhaltigkeit',
    subline1: 'Unsere Welt gibt es nur einmal. 🌎',
    subline2: '',
    allTopicsTaxonomyId: 17744,
  },
  chemie: {
    title: 'Chemie',
    subline1: 'In der Chemie ist nicht alles ätzend 🧪',
    subline2: ' ',
    allTopicsTaxonomyId: 18230,
  },
  lerntipps: {
    title: 'Lerntipps',
    subline1: 'Ein Tipp, ein Trick ',
    subline2: 'und es macht Klick 💡',
    allTopicsTaxonomyId: 181883,
  },
}

export interface FeaturedContentData {
  title: string
  type: string
  url: string
  img: string
}

// Will probably be fetched dynamically in the future:

export const featuredContent = {
  informatik: [
    {
      title: 'Vektor- und Pixelgrafik',
      type: 'article',
      url: '/informatik/57636/vektor-und-pixelgrafik',
      img: 'https://assets.serlo.org/legacy/573afde7f3fc1_0b64541b7d14bafc97c9ab582b7d480d1b970b39.png',
    },
    {
      title: 'Beispiele: Wie verändert Big Data die Welt?',
      type: 'article',
      url: '/informatik/158556/beispiele-wie-verändert-big-data-die-welt',
      img: 'https://assets.serlo.org/5e6bba021ecc6_8a830acbe9cdd3341b5cc829bd14d6d0fde2ee02.jpg',
    },
    {
      title: 'Einführung in die Pixel- und Vektorgrafik',
      type: 'course',
      url: '/informatik/93484/pixelgrafik',
      img: 'https://assets.serlo.org/5a4f9574a8bba_0e16bbe25658c9d1ceb68425e781f7985817f0ca.png',
    },
    {
      title: 'Caesar-Verschlüsselung',
      type: 'article',
      url: '/informatik/48121/caesar-verschlüsselung',
      img: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Caesar3.svg',
    },
    {
      title: 'Welche Probleme entstehen durch Big Data?',
      type: 'article',
      url: '/informatik/158565/welche-probleme-entstehen-durch-big-data',
      img: 'https://assets.serlo.org/5e820b77172a8_57299a41c225cec8161139906a807e1d57dd2467.jpg',
    },
    {
      title: 'Hack The Web',
      type: 'folder',
      url: '/informatik/200247/hack-the-web',
      img: 'https://assets.serlo.org/60f583949b1a6_bf557cf5479ff23e170c34e8a2eef03d0d645bdc.gif',
    },
  ] as FeaturedContentData[],
  mathe: [
    {
      title: 'Nullstellen berechnen',
      type: 'article',
      url: '/mathe/1531/nullstellen-berechnen',
      img: 'https://assets.serlo.org/61377aba9f512_2314df750800a18c49d3e0d778662e64a84b72c0.svg',
    },

    {
      title: 'Gemischte Aufgaben zum Ableiten von Funktionen',
      type: 'topicFolder',
      url: '/mathe/26408/gemischte-aufgaben-zum-ableiten-von-funktionen',
      img: 'https://assets.serlo.org/legacy/573d7aa6699a3_6ffaa0ec0cb792e145610ebbb850e6d669154e23.png',
    },

    {
      title: 'Ableitung',
      type: 'article',
      url: '/mathe/1795/ableitung',
      img: 'https://assets.serlo.org/legacy/9418_oFfNJ7Gbuk.png',
    },

    {
      title: 'Was ist ein Bruch?',
      type: 'article',
      url: '/mathe/1657/was-ist-ein-bruch',
      img: 'https://assets.serlo.org/legacy/565f5f04936be_c638de8136077bc47af4f12a6802ddd4d4aa76a8.png',
    },

    {
      title: 'Prozentrechnung mittels Formeln',
      type: 'article',
      url: '/mathe/2193/prozentrechnung-mittels-formeln',
      img: 'https://assets.serlo.org/legacy/5853e2979411b_fd5b544b8cef41476371af7981b623d16a0d5c62.png',
    },

    {
      title: 'Aufgaben zu den binomischen Formeln',
      type: 'topicFolder',
      url: '/mathe/26312/aufgaben-zu-den-binomischen-formeln',
      img: 'https://assets.serlo.org/legacy/5321cc011eea7_a6939af75e1532d9027d2bc2e7a8d6721f73beeb.jpg',
    },

    {
      title: 'Aufgaben zu quadratischen Gleichungen',
      type: 'topicFolder',
      url: '/mathe/26259/aufgaben-zu-quadratischen-gleichungen',
      img: '',
    },

    {
      title: 'Allgemeine Form und Scheitelform einer quadratischen Funktion',
      type: 'article',
      url: '/mathe/2073/allgemeine-form-und-scheitelform-einer-quadratischen-funktion',
      img: 'https://assets.serlo.org/legacy/9076_X8B9yjxux5.png',
    },

    {
      title: 'Gemischte Aufgaben zu Gleichungen',
      type: 'topicFolder',
      url: '/mathe/25103/gemischte-aufgaben-zu-gleichungen',
      img: '',
    },

    {
      title:
        'Aufgaben zum Sinus, Kosinus und Tangens im rechtwinkligen Dreieck',
      type: 'topicFolder',
      url: '/mathe/30680/aufgaben-zum-sinus-kosinus-und-tangens-im-rechtwinkligen-dreieck',
      img: '',
    },

    {
      title: 'Gleichung',
      type: 'article',
      url: '/mathe/1717/gleichung',
      img: 'https://assets.serlo.org/legacy/9076_X8B9yjxux5.png',
    },

    {
      title: 'Lineares Gleichungssystem',
      type: 'article',
      url: '/mathe/1749/lineares-gleichungssystem',
      img: 'https://assets.serlo.org/6055fd489a8e4_c84ca1eb92eebea7312822d20289704bb8ecaf03.png',
    },

    {
      title: 'Quadratische Ergänzung',
      type: 'article',
      url: '/mathe/1631/quadratische-erg%C3%A4nzung',
      img: '',
    },

    {
      title: 'Aufgaben zu den Potenzgesetzen',
      type: 'topicFolder',
      url: '/mathe/23665/aufgaben-zu-den-potenzgesetzen',
      img: 'https://assets.serlo.org/5e99543857efc_8be53479c9177f691809e1bbf8a08a92e1ae8bb0.PNG',
    },

    {
      title: 'Sinus, Kosinus und Tangens',
      type: 'article',
      url: '/mathe/1565/sinus-kosinus-und-tangens',
      img: 'https://assets.serlo.org/5ab7c782ad7f7_f4111037d697776c337e7bffd142cedd01324bc9.png',
    },

    {
      title: 'Aufgaben zu linearen Funktionen und Geradengleichungen',
      type: 'topicFolder',
      url: '/mathe/31912/aufgaben-zu-linearen-funktionen-und-geradengleichungen',
      img: 'https://assets.serlo.org/5f3666e0406a5_893f44e18c81875c8bdb3115c41805506e437b4a.svg',
    },

    {
      title: 'Gemischte Aufgaben zur Mengenlehre',
      type: 'topicFolder',
      url: '/mathe/30023/gemischte-aufgaben-zur-mengenlehre',
      img: '',
    },

    {
      title: 'Binomische Formeln',
      type: 'article',
      url: '/mathe/1499/binomische-formeln',
      img: 'https://assets.serlo.org/5ac377b38360e_10d5ffd6d2455801d36977f351888a6b91b8cea3.PNG',
    },
  ] as FeaturedContentData[],
  biologie: [
    {
      title: 'Mitose (= Zellteilung)',
      type: 'article',
      url: '/biologie/65162/mitose-zellteilung',
      img: 'https://assets.serlo.org/legacy/582c535d04419_af022f41cd3ef34aad8094539dc0506da3c8ef23.png',
    },
    {
      title: 'Proteine - Aufbau und Funktion',
      type: 'article',
      url: '/biologie/70696/proteine-aufbau-und-funktion',
      img: 'https://assets.serlo.org/legacy/58bfb48aa5c1d_31b3d14e51cae65c0b207a52a43eaf587e03172e.jpg',
    },
    {
      title: 'Tierische Zelle',
      type: 'article',
      url: '/biologie/71631/tierische-zelle',
      img: 'https://assets.serlo.org/legacy/58c94a2db4012_0c37a5d30d3be8e013e3be01a09676207dfe0850.jpg',
    },
    {
      title: 'Transkription - 1. Schritt der Proteinbiosynthese',
      type: 'article',
      url: '/biologie/83786/transkription-1.-schritt-der-proteinbiosynthese',
      img: 'https://assets.serlo.org/legacy/58c127c1608f4_58830495d27345415bf909a23e242b73311b3b6a.jpg',
    },
    {
      title: 'Stofftransport durch Biomembranen',
      type: 'article',
      url: '/biologie/77078/stofftransport-durch-biomembranen',
      img: 'https://assets.serlo.org/legacy/592d305943348_fc96e1644917d003f497b2be4d61cf668d8433bc.png',
    },
    {
      title: 'Meiose (= Reifeteilung',
      type: 'article',
      url: '/biologie/65164/meiose-reifeteilung',
      img: 'https://assets.serlo.org/legacy/58248b2f86f8e_253a52a7acb23b4063d6bc7c65012f425b834ecc.png',
    },
    {
      title: 'Zelltypen',
      type: 'topicFolder',
      url: '/biologie/70946/zelltypen',
      img: '',
    },
    {
      title: 'Proteinbiosynthese: Proteine herstellen',
      type: 'article',
      url: '/biologie/70800/proteinbiosynthese-proteine-herstellen',
      img: '',
    },
    {
      title: 'Translation - 2. Schritt der Proteinbiosynthese ',
      type: 'article',
      url: '/biologie/83792/translation-2.-schritt-der-proteinbiosynthese',
      img: 'https://assets.serlo.org/59afbf2f3727c_20fc7f85df7265af9d081d3d1b715efb3079f3c1.png',
    },
    {
      title: 'Das menschliche Skelett',
      type: 'article',
      url: '/biologie/48682/das-menschliche-skelett',
      img: 'https://assets.serlo.org/legacy/56470b122f1bd_e270f00b4f850a18c2e38fb03ddff9955f73eaac.jpg',
    },
  ] as FeaturedContentData[],
  nachhaltigkeit: [
    {
      title: 'Challenge Klimafreundlich leben',
      type: 'course',
      url: '/nachhaltigkeit/222226/%C3%BCberblick',
      img: 'https://assets.serlo.org/61412b52289b5_843a1296e719fd60514f5fc6058d38791a0e2ca2.jpg',
    },
    {
      title: 'Schätze den Wasserverbrauch',
      type: 'exercise',
      url: '/nachhaltigkeit/182868/sch%C3%A4tze-den-wasserverbrauch',
      img: 'https://assets.serlo.org/614087866d8c0_f77e4b50fcbffa1528449b2d7d7893ed020a227e.jpg',
    },
    {
      title: 'Pflanzenfamilien',
      type: 'article',
      url: '/nachhaltigkeit/56872/pflanzenfamilien',
      img: 'https://assets.serlo.org/legacy/57177fff14ed6_4120a2d2af5ef21a9618a7fd438935a5bfbc6bd5.JPG',
    },
    {
      title: 'Anbauflächen',
      type: 'folder',
      url: '/nachhaltigkeit/78664/anbaufl%C3%A4chen',
      img: 'https://assets.serlo.org/5968cb2f858f7_6356e3129e0797cde5935aba5d79d79a079620b4.jpg',
    },
    {
      title: 'Plastik und seine Entstehung',
      type: 'article',
      url: '/nachhaltigkeit/108660/plastik-und-seine-entstehung',
      img: 'https://assets.serlo.org/5c179fcdac6fa_951e4770a5207f1c60f51c409e5729afc1a9ab2a.jpg',
    },
    {
      title: 'Die Minimalismus Challenge: Worauf kann ich verzichten?',
      type: 'course',
      url: '/nachhaltigkeit/141280/%C3%BCberblick',
      img: 'https://assets.serlo.org/5d36024306c47_25e4b476742a15f30e653321772b33f3b006009b.jpg',
    },
    {
      title: 'Greenwashing',
      type: 'article',
      url: '/nachhaltigkeit/202973/greenwashing',
      img: 'https://assets.serlo.org/606f3d285e592_c61b924ad9cbc18fcfa9857d9c66eaeeabe34bec.jpg',
    },
    {
      title: 'Salatturm',
      type: 'course',
      url: '/nachhaltigkeit/36733/%C3%BCbersicht',
      img: 'https://assets.serlo.org/legacy/54d0fcb8b24df_0ea38c3d27d7b7c2b19d2a787d186dc62f39cb92.png',
    },
    {
      title: 'Verbindung mit der Erde',
      type: 'course',
      url: '/nachhaltigkeit/238261/wann-f%C3%BChlst-du-dich...',
      img: 'https://embed.serlo.org/thumbnail?url=https%3A%2F%2Fplayer.vimeo.com%2Fvideo%2F559057992%3Fautoplay%3D1',
    },
    {
      title: 'Nachhaltige Alternativen für Kosmetik und Hygieneartikel',
      type: 'article',
      url: '/nachhaltigkeit/127004/nachhaltige-alternativen-f%C3%BCr-kosmetik-und-hygieneartikel',
      img: 'https://assets.serlo.org/5cab812c6d307_810ab2b0787c73ee364f8e85389bdcb88e6f8c26.JPG',
    },
  ] as FeaturedContentData[],
  chemie: [
    {
      title: 'Chemische Gefahrensymbole und Piktogramme',
      type: 'article',
      url: '/chemie/25253/chemische-gefahrensymbole-und-piktogramme',
      img: 'https://assets.serlo.org/legacy/53a499f114e5c_8d90c18ae1db285e093391cae55f21cc0b42868c.png',
    },
    {
      title: 'Das Periodensystem der Elemente',
      type: 'article',
      url: '/chemie/152324/das-periodensystem-der-elemente',
      img: 'https://assets.serlo.org/5e96d795cbc3f_de178b5c2f79577bb099490f0253c95b377d2fce.png',
    },
    {
      title: 'Das molare Volumen',
      type: 'article',
      url: '/chemie/127479/das-molare-volumen',
      img: 'https://assets.serlo.org/5e7b54a21e11c_d5f4857413862b12f13560ea57fec387de2fa7b1.png',
    },
    {
      title: 'Aufgaben zu Alkanen, Alkenen und Alkinen',
      type: 'topicFolder',
      url: '/chemie/155791/aufgaben-zu-alkanen-alkenen-und-alkinen',
      img: 'https://assets.serlo.org/5e858fa0b97f8_50710e94bdb2f5c3be15e842de1c29269806290d.jpg',
    },
    {
      title: 'Optische Aktivität',
      type: 'article',
      url: '/chemie/25361/optische-aktivit%C3%A4t',
      img: 'https://assets.serlo.org/5e732f4637100_e37386ab27abe1e3473367220c29662826f3703c.png',
    },
    {
      title: 'Lösungsvorgang von Salzen in Wasser',
      type: 'article',
      url: '/chemie/77187/l%C3%B6sungsvorgang-von-salzen-in-wasser',
      img: 'https://assets.serlo.org/5e74af116eaa1_16c489e9cb17474d06dfbfd782a381827f225310.jpg',
    },
  ] as FeaturedContentData[],
  lerntipps: [
    {
      title: 'Wie erstelle ich eine Mind-Map?',
      type: 'course',
      url: '/lerntipps/131063/%C3%BCbersicht',
      img: 'https://assets.serlo.org/5ccbf1b2748a0_451b5db7e2d81b1584f03e197ddb73cc07100faa.png',
    },
    {
      title: 'Die Feynman-Methode',
      type: 'article',
      url: '/lerntipps/134818/die-feynman-methode',
      img: 'https://cdn.pixabay.com/photo/2018/03/02/03/44/unordered-3192273_1280.png',
    },
    {
      title: 'Zeitmanagement mit der Pomodoro-Methode',
      type: 'article',
      url: '/lerntipps/120628/zeitmanagement-mit-der-pomodoro-methode',
      img: 'https://assets.serlo.org/5bbc604fa0580_014dbb2b17fb61fe6edbd315fc7792aa9976ce58.jpg',
    },
    {
      title: 'Selbstmanagement',
      type: 'course',
      url: '/lerntipps/117447/%C3%BCberblick',
      img: 'https://assets.serlo.org/5bab8933e1a00_2e5e09fca1a2846dc7659010c10bcf865f3cfe6e.png',
    },
    {
      title: 'Die WOOP-Methode',
      type: 'course',
      url: '/lerntipps/134372/%C3%BCbersicht',
      img: 'https://assets.serlo.org/5c9e33436ceac_0f24d3e6f1097e64383a6184586852ac86c2f154.png',
    },
    {
      title: 'Wie schreibe ich eine gute Zusammenfassung',
      type: 'article',
      url: '/lerntipps/134410/wie-schreibe-ich-eine-gute-zusammenfassung',
      img: 'https://assets.serlo.org/5c9ce70211af4_4205a73961592339bfb39c474810937922375917.png',
    },
  ] as FeaturedContentData[],
}
