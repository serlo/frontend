export const deSubjectLandingData = {
  informatik: {
    title: 'Informatik',
    subline1: 'Keine Angst vor Computern.',
    subline2: 'Lerne ihre Sprache und zähme sie 🤖',
    contributeLink: '/49982/neu-hier',
    allTopicsTaxonomyId: 47899,
    extraTerms: [],
  },
  mathe: {
    title: 'Mathe',
    subline1: 'Keine Angst vor Zahlen,',
    subline2: 'die meisten sind kleiner als du 😎',
    allTopicsTaxonomyId: 5,
    contributeLink: '/19880/neu-hier',
    extraTerms: [
      {
        title: '↪ Themen nach Lehrplan',
        description: undefined,
        href: '/mathe/16030/deutschland',
      },
      {
        title: '↪ Prüfungsbereich',
        description: undefined,
        href: 'https://de.serlo.org/83249/mathematik-pr%C3%BCfungen',
      },
    ],
  },
  biologie: {
    title: 'Biologie',
    subline1: 'Gib deinem Hirn einen Evolutionssprung',
    subline2: 'mit frischem Biologiewissen. 🐒',
    allTopicsTaxonomyId: 23362,
    contributeLink: '/25017/neu-hier',
    extraTerms: [],
  },
  nachhaltigkeit: {
    title: 'Angewandte Nachhaltigkeit',
    subline1: 'Unsere Welt gibt es nur einmal. 🌎',
    subline2: '',
    allTopicsTaxonomyId: 17744,
    contributeLink: '/25294/neu-hier',
    extraTerms: [],
  },
  chemie: {
    title: 'Chemie',
    subline1: 'In der Chemie ist nicht alles ätzend 🧪',
    subline2: ' ',
    allTopicsTaxonomyId: 18230,
    contributeLink: '/26633/neu-hier',
    extraTerms: [],
  },
  lerntipps: {
    title: 'Lerntipps',
    subline1: 'Ein Tipp, ein Trick ',
    subline2: 'und es macht Klick 💡',
    allTopicsTaxonomyId: 181883,
    contributeLink: '/242472',
    extraTerms: [],
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
      url: '/informatik/158556/beispiele-wie-ver%C3%A4ndert-big-data-die-welt',
      img: 'https://assets.serlo.org/5e6c9855be62a_dfd49adb178a0be0ea182b02b8b58e4a60435563.jpg',
    },
    {
      title: 'Einführung in die Pixel- und Vektorgrafik',
      type: 'course',
      url: '/informatik/93484/pixelgrafik',
      img: 'https://assets.serlo.org/5a4f9574a8bba_0e16bbe25658c9d1ceb68425e781f7985817f0ca.png',
    },
    {
      title: 'Aufgaben Vektor- vs. Pixelgrafik',
      type: 'topicFolder',
      url: '/informatik/94110/aufgaben-vektor-vs.-pixelgrafik',
      img: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg',
    },
    {
      title: 'Definitionen von „Big Data“',
      type: 'article',
      url: '/informatik/158541/definitionen-von-%E2%80%9Ebig-data%E2%80%9C',
      img: 'https://assets.serlo.org/5e82013c6f667_f6cf07bc9c457537ac6b8218323aff539a48a9c1.jpg',
    },
    {
      title: 'Aufgaben zur Darstellung von Informationen',
      type: 'topicFolder',
      url: '/informatik/58039/aufgaben-zur-darstellung-von-informationen',
      img: 'https://assets.serlo.org/legacy/57f662a3d4b92_7176f6b7249476b91df9c5e7ecbb5dae7fc20015.jpg',
    },
    {
      title: 'Caesar-Verschlüsselung',
      type: 'article',
      url: '/informatik/48121/caesar-verschl%C3%BCsselung',
      img: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Caesar3.svg',
    },
    {
      title: 'Grundlagen von Datenspeicherung',
      type: 'article',
      url: '/informatik/92969/grundlagen-von-datenspeicherung',
      img: 'https://assets.serlo.org/legacy/57f4d1fd4a494_f32fee0f587a40f8f5091f4742ae55fb320617f5.jpg',
    },
    {
      title: 'Welche Probleme entstehen durch Big Data?',
      type: 'article',
      url: '/informatik/158565/welche-probleme-entstehen-durch-big-data',
      img: 'https://assets.serlo.org/5e820b77172a8_57299a41c225cec8161139906a807e1d57dd2467.jpg',
    },
    {
      title: 'Vigenère-Verschlüsselung',
      type: 'article',
      url: '/informatik/48392/vigen%C3%A8re-verschl%C3%BCsselung',
      img: 'https://assets.serlo.org/legacy/563621b0c4c92_eb0815dfb9a1ca7bdeba873d64a155fb7a864937.svg',
    },
    {
      title: 'Die Endlosschleife',
      type: 'article',
      url: '/informatik/141355/die-endlosschleife',
      img: 'https://assets.serlo.org/5d03d74293a32_f883afda3f0c31df0f129857ceb5fc60bb190937.png',
    },
    {
      title: 'Strukturprogramme',
      type: 'article',
      url: '/informatik/70180/struktogramme',
      img: 'https://assets.serlo.org/legacy/58b7f2c92fb24_e4e64458614ba10e4561915e33323e399493801e.PNG',
    },
    {
      title: 'Binärsysteme',
      type: 'article',
      url: '/informatik/181058/bin%C3%A4rsystem',
      img: 'https://assets.serlo.org/5f9d77d9acff9_f59d8f47cd0eef27051dffa75abd123f3805d080.png',
    },
    {
      title: 'Einführung in Robot Karol',
      type: 'course',
      url: '/informatik/72987/%C3%BCbersicht',
      img: 'https://assets.serlo.org/legacy/58dcc2061f778_88bc000e1fd062dc60d159db1625b08eaeefe3e9.png',
    },
    {
      title: 'Beziehungen zwischen Tabellen',
      type: 'article',
      url: '/informatik/69732/beziehungen-zwischen-tabellen',
      img: 'https://assets.serlo.org/5a356e280bf5d_f2d3b0c4681e7635287aa63b3b6f1d9fc6d72be1.png',
    },
    {
      title: 'Objektkarte',
      type: 'article',
      url: '/informatik/174877/objektkarte',
      img: 'https://assets.serlo.org/5f4135a371247_07af9cd3278005b66a52dd74343dfb6d9bc63993.png',
    },
    {
      title: 'Objekte',
      type: 'course',
      url: '/informatik/65009/bauernhof',
      img: 'https://assets.serlo.org/legacy/58b81febf334a_aab028f7c60aed6f8d489045726e2fd37fada38c.svg',
    },
    {
      title: 'Binärsysteme',
      type: 'article',
      url: '/informatik/181058/bin%C3%A4rsystem',
      img: 'https://assets.serlo.org/5f9d77d9acff9_f59d8f47cd0eef27051dffa75abd123f3805d080.png',
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
      url: '/mathe/31912/aufgaben-zu-linearen-funktionen-und-geradengleichungen',
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
      img: 'https://assets.serlo.org/legacy/58bfb39bdc0a9_bbc5e156f56bc3c1e371617d1bff297fc6924b14.png',
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
      img: 'https://assets.serlo.org/59afbcba75c30_c06ca39ca6d672de8aa6a597b1d3420e099962ec.png',
    },
    {
      title: 'Stofftransport durch Biomembranen',
      type: 'article',
      url: '/biologie/77078/stofftransport-durch-biomembranen',
      img: 'https://assets.serlo.org/legacy/592d305943348_fc96e1644917d003f497b2be4d61cf668d8433bc.png',
    },
    {
      title: 'Meiose (= Reifeteilung)',
      type: 'article',
      url: '/biologie/65164/meiose-reifeteilung',
      img: 'https://assets.serlo.org/legacy/58482f01c8a3b_9e4ae6a63c75eee108377488825aa6fcf2f2dd8c.jpg',
    },
    {
      title: 'Zelltypen',
      type: 'topicFolder',
      url: '/biologie/70946/zelltypen',
      img: 'https://assets.serlo.org/legacy/58c90d9bca918_17445d63d74dd0a475ffa9fac5c70daa1671c568.jpg',
    },
    {
      title: 'Proteinbiosynthese: Proteine herstellen',
      type: 'article',
      url: '/biologie/70800/proteinbiosynthese-proteine-herstellen',
      img: 'https://assets.serlo.org/59caa1484bcc3_df05735f5b1c9279a64686d7ad0ce86cfbd33c06.png',
    },
    {
      title: 'Translation - 2. Schritt der Proteinbiosynthese',
      type: 'article.',
      url: '/biologie/83792/translation-2.-schritt-der-proteinbiosynthese',
      img: 'https://assets.serlo.org/59afbf2f3727c_20fc7f85df7265af9d081d3d1b715efb3079f3c1.png',
    },
    {
      title: 'Das menschliche Skelett',
      type: 'article',
      url: '/biologie/48682/das-menschliche-skelett',
      img: 'https://assets.serlo.org/legacy/56470b122f1bd_e270f00b4f850a18c2e38fb03ddff9955f73eaac.jpg',
    },
    {
      title: 'Was ist DNA?',
      type: 'article',
      url: '/biologie/70762/dna-was-ist-das',
      img: 'https://assets.serlo.org/5cf53dcfc9dd7_d8cd8186542150e2d05bfa50716fca4fbf47a0e9.jpg',
    },
    {
      title: 'Das Auge',
      type: 'article',
      url: '/biologie/70830/das-auge',
      img: 'https://assets.serlo.org/legacy/58edd84b38d59_7374c3b5a6911d6b3fdbbcfad0fa1d9f0a862a5e.jpg',
    },
    {
      title: 'Verdauung des Menschen',
      type: 'article',
      url: '/biologie/64745/verdauung-des-menschen',
      img: 'https://assets.serlo.org/legacy/580f3ab3a9ffa_d91850964649b000f8250c316108710b949c5ab8.png',
    },
    {
      title: 'Das Endoplasmatische Retikulum',
      type: 'article',
      url: '/biologie/133613/das-endoplasmatische-retikulum',
      img: 'https://assets.serlo.org/5c97a58091829_5595cf6758a636ee5e8cb24bd457bf2eef8ad7d2.jpg',
    },
    {
      title: 'Der Golgi-Apparat',
      type: 'article',
      url: '/biologie/133567/der-golgi-apparat',
      img: 'https://assets.serlo.org/5c97665b24dbb_530eab1e397f05fb9a5da9e85a3c42696728f50f.jpg',
    },
    {
      title: 'Das menschliche Herz',
      type: 'article',
      url: '/biologie/76985/das-menschliche-herz',
      img: 'https://assets.serlo.org/legacy/592c0eb5bfc15_51951121cd8d6f6389f10e6672c763d750714a4b.jpg',
    },
    {
      title: 'Kohlenhydrate',
      type: 'article',
      url: '/biologie/137236/kohlenhydrate',
      img: 'https://assets.serlo.org/5cd98d5784cca_3c67097d3ce0b0803d0d87022df5f94cb5506bb7.png',
    },
    {
      title: 'Was sind Lebewesen?',
      type: 'article',
      url: '/biologie/86779/was-sind-lebewesen',
      img: 'https://assets.serlo.org/59d0f3029a956_288e8a235e11ad68daf31f8c7857f30b72f6a8ae.jpg',
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
      type: 'topicFolder',
      url: '/nachhaltigkeit/182868/sch%C3%A4tze-den-wasserverbrauch',
      img: 'https://assets.serlo.org/61409553967b5_3ab8bb7f3fd150e7b0c427de743ffada1b73747a.jpg',
    },
    {
      title: 'Pflanzenfamilien',
      type: 'article',
      url: '/nachhaltigkeit/56872/pflanzenfamilien',
      img: 'https://assets.serlo.org/legacy/5717847078eb4_645a12695fc0b8f686cf500c1e37f4d10a991044.jpg',
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
      title: 'Wurmfarm',
      type: 'article',
      url: '/nachhaltigkeit/38903/wurmfarm',
      img: 'https://assets.serlo.org/legacy/5501c3a79ab05_cb0bb379352fdfbd9cd57211e88748ce9eb43e4f.png',
    },
    {
      title: 'Salatturm',
      type: 'course',
      url: '/nachhaltigkeit/36733/%C3%BCbersicht',
      img: 'https://assets.serlo.org/legacy/553fabdaee91b_9e290e4a04ffe886273dd5ee0ba7456ed673b0f1.jpg',
    },
    {
      title: 'Verbindung mit der Erde',
      type: 'course',
      url: '/nachhaltigkeit/238261/wann-f%C3%BChlst-du-dich...',
      img: 'https://assets.serlo.org/60a3d5b663ab6_2ad45a6c1cf3c90395c8d4062f818f0258ddb7dd.jpg',
    },
    {
      title: 'Nachhaltige Alternativen für Kosmetik und Hygieneartikel',
      type: 'article',
      url: '/nachhaltigkeit/127004/nachhaltige-alternativen-f%C3%BC',
      img: 'https://assets.serlo.org/5d34cba0d40ee_a767b33df3db5064509f31d86d6f439739da288a.jpg',
    },
    {
      title: 'Greenwashing',
      type: 'article',
      url: '/nachhaltigkeit/202973/greenwashing',
      img: 'https://assets.serlo.org/606f3d285e592_c61b924ad9cbc18fcfa9857d9c66eaeeabe34bec.jpg',
    },
    {
      title: 'Selbsttest: Wie viel Plastikmüll verursache ich?',
      type: 'course',
      url: '/nachhaltigkeit/141361/%C3%BCbersicht',
      img: 'https://assets.serlo.org/5cab62b9bc10b_0145c552fccc72c8abff8758b47fbc1ecb2dbeae.JPG',
    },
    {
      title:
        'Plastik - Von Herstellung bis Entsorgung ein Problem für Mensch und Natur',
      type: 'article',
      url: '/nachhaltigkeit/108667/',
      img: 'https://assets.serlo.org/5c588f0a185b9_f059fa2e360c964e209181fe7a813f319167a40a.jpg',
    },
    {
      title: 'Anbauplanung - Schritt für Schritt',
      type: 'course',
      url: '/nachhaltigkeit/65417/einf%C3%BChrung',
      img: 'https://assets.serlo.org/legacy/56d6bb394c111_f72caab7165fea99d6bfb00828203c6ee746bb8e.JPG',
    },
    {
      title: 'Palettenholz nutzen',
      type: 'article',
      url: '/nachhaltigkeit/74575/palettenholz-nutzen',
      img: 'https://assets.serlo.org/legacy/58ef6bf548a9d_d552d4ee630a1039775b48bc46d37c445e726232.JPG',
    },
    {
      title: 'Klimawandel',
      type: 'article',
      url: '/nachhaltigkeit/74639/klimawandel',
      img: 'https://assets.serlo.org/legacy/58f5fd572eded_35b3addb889f7634a70daa4141fa0e1914d696d6.png',
    },
    {
      title: 'Fruchtwechsel',
      type: 'article',
      url: '/nachhaltigkeit/56567/fruchtwechsel',
      img: 'https://assets.serlo.org/5a843909a8985_a78786e100496ac79382da88c493fa10cf366c82.png',
    },
    {
      title: 'Treibhausgase',
      type: 'article',
      url: '/nachhaltigkeit/74888/treibhausgase',
      img: 'https://assets.serlo.org/legacy/58f882d1e3318_ee462a307d6c444ea49416c3b0c9a25c5893b894.png',
    },
    {
      title: 'Schnecken! Was tun?',
      type: 'course',
      url: '/nachhaltigkeit/75945/einf%C3%BChrung',
      img: 'https://assets.serlo.org/legacy/5891d85b3af04_db01e11c6f20465916ac724f114be413b8b6fc41.jpg',
    },
  ] as FeaturedContentData[],
  chemie: [
    {
      title: 'Chemische Gefahrensymbole und Piktogramme',
      type: 'article',
      url: '/chemie/25253/chemische-gefahrensymbole-und-piktogramme',
      img: 'https://assets.serlo.org/legacy/53a49a5ecd05c_3b7d3bfbbd87c7c3c722b144d2369f7b5c29008f.png',
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
      img: 'https://assets.serlo.org/5e8dccef3308a_5fb9e7c625e2db4247c14d039ad6527d50cafb2a.jpg',
    },
    {
      title: 'Lösungsvorgang von Salzen in Wasser',
      type: 'article',
      url: '/chemie/77187/l%C3%B6sungsvorgang-von-salzen-in-wasser',
      img: 'https://assets.serlo.org/5e74b2fe31f3b_2bb92fb21bad18f2381deaed2ef63b16457d248b.png',
    },
    {
      title: 'Schalenmodelle',
      type: 'article',
      url: '/chemie/154653/atome',
      img: 'https://assets.serlo.org/5e83056c47c47_7a04e8292851d7fa9fb0fe480150f57cb72fe97d.png',
    },
    {
      title: 'Alkalimetalle',
      type: 'article',
      url: '/chemie/161845/alkalimetalle',
      img: 'https://assets.serlo.org/5e997645706a3_ac605734afb0a87c2ddbf56464b64f7df38b92b9.jpg',
    },
    {
      title: 'Vertiefungskurs - RedOx',
      type: 'course',
      url: '/chemie/127661/%C3%BCbersicht',
      img: 'https://assets.serlo.org/5e552785562ce_21f32943b922fe46349d196ef9dedb90cf481300.jpg',
    },
    {
      title: 'Atome',
      type: 'article',
      url: '/chemie/154653/atome',
      img: 'https://assets.serlo.org/5e8d8c0d4ec66_a106028abb4d8910e34d501702603b5cc3daef27.png',
    },
    {
      title: 'Liste von Stoffeigenschaften',
      type: 'article',
      url: '/chemie/31700/liste-von-stoffeigenschaften',
      img: 'https://assets.serlo.org/5e57c3c1ee082_90d56c0b657f019cf6bc6ef868b9999c82473365.png',
    },
    {
      title: 'Edelgase',
      type: 'article',
      url: '/chemie/158092/edelgase',
      img: 'https://assets.serlo.org/5e81e52c3066b_98c14e92d233f396b3b0d0ea0b52b260279457f9.jpg',
    },
    {
      title: 'Ionen',
      type: 'article',
      url: '/chemie/32005/ionen',
      img: 'https://assets.serlo.org/5e82ee8c34184_d5f0c41e37d9a8e95a37bbc76566df1538720a84.png',
    },
    {
      title: 'IUPAC- Nomenklatur',
      type: 'article',
      url: '/chemie/158568/iupac-nomeklatur',
      img: 'https://assets.serlo.org/5e8b27246bd4e_df6a41a59eff4fc2f150f10c0565b8ca7188265e.jpg',
    },
    {
      title: 'Strukturformeln',
      type: 'article',
      url: '/chemie/160405/strukturformeln',
      img: 'https://assets.serlo.org/5e8c5d77824b7_13c4e6cce39f7f808f924754894c7aba83ac7e93.jpg',
    },
    {
      title: 'Katalysator',
      type: 'article',
      url: '/chemie/77224/katalysator',
      img: 'https://assets.serlo.org/5e747a3593eb0_4f4035c3f6f64dfc497a2d46a4af14295d77c6ce.png',
    },
    {
      title: 'Orbitale und ihre Quantenzahlen',
      type: 'article',
      url: '/chemie/160206/orbitale-und-ihre-quantenzahlen',
      img: 'https://assets.serlo.org/5e8b0708d7110_a17f28c52fb253466c85b466c84b9179122c81aa.png',
    },
    {
      title: 'Silberspiegelprobe',
      type: 'article',
      url: '/chemie/77322/silberspiegelprobe-tollensprobe',
      img: 'https://de.serlo.org/attachment/file/77323/9229',
    },
  ] as FeaturedContentData[],
  lerntipps: [
    {
      title: 'Wie erstelle ich eine Mind-Map?',
      type: 'course',
      url: '/lerntipps/131063/%C3%BCbersicht',
      img: 'https://assets.serlo.org/5badd741ceb26_cb17d98e0869f816100bd1db533c5ebba7877e2c.png',
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
      img: 'https://assets.serlo.org/5bac900a8b26c_02184861ea47478570725a07627f4b04d2f137dd.jpg',
    },
    {
      title: 'Die WOOP-Methode',
      type: 'course',
      url: '/lerntipps/134372/%C3%BCbersicht',
      img: 'https://assets.serlo.org/5ca1dcc619367_0c605aef299a36d8eb99488f153630f77d883710.png',
    },
    {
      title: 'Wie schreibe ich eine gute Zusammenfassung',
      type: 'article',
      url: '/lerntipps/134410/wie-schreibe-ich-eine-gute-zusammenfassung',
      img: 'https://assets.serlo.org/5c9ce70211af4_4205a73961592339bfb39c474810937922375917.png',
    },
    {
      title: 'Einführung in den Umgang mit Stress',
      type: 'course',
      url: '/lerntipps/135480/umgang-mit-stress',
      img: 'https://assets.serlo.org/5d0a32b88e94c_305945792e02e20b47079e9e07d6e8cd3bac63eb.jpeg',
    },
    {
      title: 'Lernen mit Serlo',
      type: 'video',
      url: '/community/74224/lernen-mit-serlo.org',
      img: 'https://de.serlo.org/_assets/img/serlo-logo.svg',
    },
    {
      title: 'Tipps und Tricks für die Bearbeitung von Textaufgaben',
      type: 'course',
      url: '/lerntipps/118042/%C3%BCbersicht',
      img: 'https://assets.serlo.org/5bab7d1d6539e_832f8562a1d4f4718edbd05fc544199cfd51ea4c.png',
    },
    {
      title: 'Stressbewältigung durch Sport',
      type: 'article',
      url: '/lerntipps/134867/stressbew%C3%A4ltigung-durch-sport',
      img: 'https://assets.serlo.org/5ca6008555223_a0fdc036654bf05ef5ad225d2ec2a02351201287.png',
    },
    {
      title: 'Die WOOP-Methode',
      type: 'article',
      url: '/lerntipps/134496/die-woop-methode',
      img: 'https://images.pexels.com/photos/3760613/pexels-photo-3760613.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    },
    {
      title: 'Haptisches Lernen',
      type: 'article',
      url: '/lerntipps/126371/haptisches-lernen',
      img: 'https://images.pexels.com/photos/6231720/pexels-photo-6231720.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    },
    {
      title: 'Übungen zum richtigen Lesen von Aufgabenstellungen',
      type: 'topicFolder',
      url: '/lerntipps/119344/%C3%BCbungen-zum-richtigen-lesen-von-aufgabenstellungen',
      img: 'https://assets.serlo.org/5bbdcd8fdd6fc_a9048ddcdb5dc5abdc61598b5a6eb9c560964e27.jpg',
    },
    {
      title: 'Lernen mit Texten',
      type: 'course',
      url: '/lerntipps/118315/%C3%BCberblick',
      img: 'https://assets.serlo.org/5badf0b55e848_c7abe3aac054319b50bc4bbe35c13a3fb17155fb.png',
    },
    {
      title: 'Tipps und Tricks zur Herangehensweise an Aufgaben',
      type: 'article',
      url: '/lerntipps/165214/tipps-und-tricks-zur-herangehensweise-an-aufgaben',
      img: 'https://images.pexels.com/photos/6237990/pexels-photo-6237990.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    },
    {
      title: 'Virtuelles Lernen',
      type: 'course',
      url: '/lerntipps/120637/%C3%BCbersicht',
      img: 'https://assets.serlo.org/5bbdcd8fdd6fc_a9048ddcdb5dc5abdc61598b5a6eb9c560964e27.jpg',
    },
  ] as FeaturedContentData[],
}
