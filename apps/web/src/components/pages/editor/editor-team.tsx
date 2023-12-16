import { PageTeamRenderer } from '@editor/plugins/page-team/renderer'

export interface TeamDataEntry {
  firstName: string
  lastName: string
  user?: string
  position: string
  extraLinkUrl: string
  extraLinkText: string
  photo: string
}

export const teamDataSimon: TeamDataEntry = {
  firstName: 'Simon',
  lastName: 'Köhl',
  position: 'Partnerships',
  extraLinkUrl: 'mailto:simon@serlo.org',
  extraLinkText: 'simon@serlo.org',
  photo:
    'https://assets.serlo.org/5fc60eaacdf04_c185cbdb5b62400d973d553587caa6cf00ed294f.jpg',
}

export const teamDataKulla: TeamDataEntry = {
  firstName: 'Stephan',
  lastName: 'Kulla',
  position: 'Software',
  extraLinkUrl: 'mailto:kulla@serlo.org',
  extraLinkText: 'kulla@serlo.org',
  photo:
    'https://assets.serlo.org/5fc610675ef12_e33cf10d89b893ff3cc99cebf5e1a1686ade44ec.jpg',
}

export const teamData: TeamDataEntry[] = [
  {
    firstName: 'Wolfgang',
    lastName: 'Schmid',
    position: 'Project Lead',
    extraLinkUrl: 'mailto:wolfgang@serlo.org',
    extraLinkText: 'wolfgang@serlo.org',
    photo:
      'https://assets.serlo.org/5fc60fd578266_ef388187d8288b790cf5378e160278301df24c16.jpg',
  },
  {
    firstName: 'Sebastian',
    lastName: 'Sapiatz',
    position: 'Product Management',
    extraLinkUrl: 'mailto:sebastian@serlo.org',
    extraLinkText: 'sebastian@serlo.org',
    photo:
      'https://assets.serlo.org/a0d3abe0-7491-11ed-a78a-a5b96e09d60e/image.jpg',
  },
  teamDataSimon,
  {
    firstName: 'Vitomir',
    lastName: 'Budimir',
    position: 'Software',
    extraLinkUrl: '',
    extraLinkText: '',
    photo:
      'https://assets.serlo.org/36f5c060-ac80-11ed-9413-878d94834f2e/image.jpg',
  },
  // For developers we do not want to show extra links on the editor page
  { ...teamDataKulla, extraLinkText: '', extraLinkUrl: '' },
  {
    firstName: 'David',
    lastName: 'Li',
    position: 'Software',
    extraLinkUrl: '',
    extraLinkText: '',
    photo:
      'https://assets.serlo.org/5d15e1c58bcc9_92a7a86497eed65a3372ce11c948a9c7538ebadf.jpg',
  },
  {
    firstName: 'Lars',
    lastName: 'Rasmussen ',
    position: 'Software',
    extraLinkUrl: '',
    extraLinkText: '',
    photo:
      'https://assets.serlo.org/16618150-a09a-11ed-95de-a79d3d5d7bc4/image.jpg',
  },
  {
    firstName: 'Anna',
    lastName: 'Steinberg',
    position: 'Software',
    extraLinkUrl: '',
    extraLinkText: '',
    photo:
      'https://assets.serlo.org/e8aa0a40-3d96-11ed-b861-af1c5dc40fe0/image.jpg',
  },
  //Mikey (Softwareentwicklung, ab März)
  {
    firstName: 'Botho',
    lastName: 'Willer',
    position: 'Design | Software',
    extraLinkUrl: '',
    extraLinkText: '',
    photo:
      'https://assets.serlo.org/legacy/555b0ce89c0fd_a88af44ea94ef2e7139d475f2ec3d4a5df06128c.jpg',
  },
  {
    firstName: 'Gregor ',
    lastName: 'Zupan ',
    position: 'Design',
    extraLinkUrl: '',
    extraLinkText: '',
    photo:
      'https://assets.serlo.org/98f93f80-a09b-11ed-95de-a79d3d5d7bc4/image.png',
  },
]

export function EditorTeam() {
  return <PageTeamRenderer data={teamData} extraCols compact />
}
