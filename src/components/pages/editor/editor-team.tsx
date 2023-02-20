import {
  PageTeamRenderer,
  TeamDataEntry,
} from '@/edtr-io/plugins/page-team/renderer'

const teamData: TeamDataEntry[] = [
  {
    firstName: 'Sebastian',
    lastName: 'Sapiatz',
    position: 'Product Management',
    extraLinkUrl: 'mailto:sebastian@serlo.org',
    extraLinkText: 'sebastian@serlo.org',
    photo:
      'https://assets.serlo.org/a0d3abe0-7491-11ed-a78a-a5b96e09d60e/image.jpg',
  },
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
    firstName: 'Josefine',
    lastName: 'Theden-Schow',
    position: 'Partnerships',
    extraLinkUrl: 'mailto:josefine@serlo.org',
    extraLinkText: 'josefine@serlo.org',
    photo:
      'https://assets.serlo.org/cea79750-6985-11ed-b282-836733dd2d87/image.jpg',
  },
  {
    firstName: 'Vitomir',
    lastName: 'Budimir',
    position: 'Software',
    extraLinkUrl: '',
    extraLinkText: '',
    photo:
      'https://assets.serlo.org/36f5c060-ac80-11ed-9413-878d94834f2e/image.jpg',
  },
  {
    firstName: 'Simon',
    lastName: 'Köhl',
    position: 'Partnerships',
    extraLinkUrl: '',
    extraLinkText: '',
    photo:
      'https://assets.serlo.org/5fc60eaacdf04_c185cbdb5b62400d973d553587caa6cf00ed294f.jpg',
  },
  {
    firstName: 'Stephan',
    lastName: 'Kulla',
    position: 'Software',
    extraLinkUrl: '',
    extraLinkText: '',
    photo:
      'https://assets.serlo.org/5fc610675ef12_e33cf10d89b893ff3cc99cebf5e1a1686ade44ec.jpg',
  },
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
