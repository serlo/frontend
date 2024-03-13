import Head from 'next/head'

export function LandingJsonLd() {
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getData()) }}
      ></script>
    </Head>
  )

  function getData() {
    return {
      '@context': [
        'https://w3id.org/kim/lrmi-profile/draft/context.jsonld',
        {
          '@language': 'de',
          '@vocab': 'http://schema.org/',
          type: '@type',
          id: '@id',
        },
      ],
      id: 'https://serlo.org/',
      type: ['EducationalOrganization', 'NGO'],
      name: 'Serlo Education e.V.',
      url: 'https://de.serlo.org/',
      description:
        'Serlo.org bietet einfache Erklärungen, Kurse, Lernvideos, Übungen und Musterlösungen mit denen Schüler*innen und Studierende nach ihrem eigenen Bedarf und in ihrem eigenen Tempo lernen können. Die Lernplattform ist komplett kostenlos und werbefrei.',
      image:
        'https://assets.serlo.org/5ce4082185f5d_5df93b32a2e2cb8a0363e2e2ab3ce4f79d444d11.jpg',
      logo: 'https://de.serlo.org/_assets/img/serlo-logo.svg',
      address: {
        type: 'PostalAddress',
        streetAddress: 'Daiserstraße 15 (RGB)',
        postalCode: '81371',
        addressLocality: 'München',
        addressRegion: 'Bayern',
        addressCountry: 'Germany',
      },
      email: 'de@serlo.org',
    }
  }
}
