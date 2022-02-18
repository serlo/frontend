export const deSubjectLandingData = {
  informatik: {
    title: 'Informatik',
    subline1: 'Keine Angst vor Computern.',
    subline2: 'Lerne ihre Sprache und zähme sie 🤖',
    allTopicsTaxonomyId: 47899,
  },
  mathe: {
    title: 'Mathe',
    subline1: 'Toller Spruch über Mathe.',
    subline2: 'Lass dich nicht verwirren. 🧮',
    allTopicsTaxonomyId: 5,
  },
  biologie: {
    title: 'Biologie',
    subline1: 'Toller Spruch über Biologie.',
    subline2: 'Flora und Fauna und so. 🦚',
    allTopicsTaxonomyId: 23362,
  },
  nachhaltigkeit: {
    title: 'Angewandte Nachhaltigkeit',
    subline1: 'Unsere Welt gibt es nur einmal.',
    subline2:
      'Deswegen müssen wir nachhaltig mit dem umgehen, was sie uns zur Verfügung stellt. 🌱',
    allTopicsTaxonomyId: 17744,
  },
  chemie: {
    title: 'Chemie',
    subline1: 'Toller Spruch über Chemie.',
    subline2: 'Blubber Boom Wow. 🧪',
    allTopicsTaxonomyId: 18230,
  },
  lerntipps: {
    title: 'Lerntipps',
    subline1: 'Effektiver lernen',
    subline2: 'Mehr Zeit zum Zocken 🎮',
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
  biologie: [
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
  nachhaltigkeit: [
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
  chemie: [
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
  lerntipps: [
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
}
