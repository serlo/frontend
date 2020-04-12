import styled from 'styled-components'

import Header from '../src/components/navigation/Header'
import LandingSubjects from '../src/components/landing/LandingSubjects'
import LandingAbout from '../src/components/landing/LandingAbout'
import Footer from '../src/components/navigation/Footer'
import Topic from '../src/components/content/Topic'
import { TopicPurposes } from '../src/components/content/Topic'
import CookieBar from '../src/components/content/CookieBar'

const topic = {
  title: 'Satzgruppe des Pythagoras',
  url: 'https://de.serlo.org/mathe/geometrie/satzgruppe-pythagoras',
  description: {
    img:
      'https://assets.serlo.org/legacy/56efc1b684b67_0b712ac6f94fcb971ecdc341af21717403d92fb2.png',
    text:
      'Hier findest du alle Artikel, Aufgaben, Videos und Kurse zu der Satzgruppe des Pythagoras. Zur Satzgruppe des Pythagoras gehören der Satz des Pythagoras, der Höhen- und der Kathetensatz.'
  },
  purpose: TopicPurposes.detail,
  links: {
    courses: [
      {
        title: 'Überblick zum Satz des Pythagoras',
        url: 'https://de.serlo.org/18521/formel'
      }
    ],
    articles: [
      {
        title: 'Hypotenuse ',
        url: 'https://de.serlo.org/18521/formel'
      },
      {
        title: 'Kathete ',
        url: 'https://de.serlo.org/18521/formel'
      },
      {
        title: 'Höhen- und Kathetensatz ',
        url: 'https://de.serlo.org/18521/formel'
      },
      {
        title: 'Satz des Pythagoras ',
        url: 'https://de.serlo.org/18521/formel'
      }
    ],
    videos: [
      {
        title: 'Hypotenuse ',
        url: 'https://de.serlo.org/18521/formel'
      },
      {
        title: 'Kathete ',
        url: 'https://de.serlo.org/18521/formel'
      }
    ],
    applets: [
      {
        title: 'Hypotenuse ',
        url: 'https://de.serlo.org/18521/formel'
      },
      {
        title: 'Kathete ',
        url: 'https://de.serlo.org/18521/formel'
      }
    ],
    excercises: [
      {
        title: 'Hypotenuse ',
        url: 'https://de.serlo.org/18521/formel'
      },
      {
        title: 'Kathete ',
        url: 'https://de.serlo.org/18521/formel'
      }
    ]
  }
}

const smallTopic = {
  title: 'Lange ueberschrift fuer den Satzgruppe des Pythagoras',
  url: 'https://de.serlo.org/mathe/geometrie/satzgruppe-pythagoras',
  description: {
    img:
      'https://assets.serlo.org/legacy/56efc1b684b67_0b712ac6f94fcb971ecdc341af21717403d92fb2.png',
    text:
      'Hier findest du alle Artikel, Aufgaben, Videos und Kurse zu der Satzgruppe des Pythagoras. Zur Satzgruppe des Pythagoras gehören der Satz des Pythagoras, der Höhen- und der Kathetensatz.'
  },
  purpose: TopicPurposes.overview,
  links: {
    subfolders: [
      {
        title: 'Hypotenuse ',
        url: 'https://de.serlo.org/18521/formel'
      },
      {
        title: 'Kathete ',
        url: 'https://de.serlo.org/18521/formel'
      },
      {
        title: 'Höhen- und Kathetensatz ',
        url: 'https://de.serlo.org/18521/formel'
      },
      {
        title: 'Satz des Pythagoras ',
        url: 'https://de.serlo.org/18521/formel'
      }
    ],
    articles: [
      {
        title: 'Hypotenuse ',
        url: 'https://de.serlo.org/18521/formel'
      },
      {
        title: 'Satz des Pythagoras ',
        url: 'https://de.serlo.org/18521/formel'
      }
    ]
  }
}

export default function Landing() {
  return (
    <>
      <Header />
      <Container>
        <h2>Topic fuer Uebersichten</h2>
        <Topic props={smallTopic}></Topic>

        <h2>Topic Detailansicht</h2>
        <Topic props={topic}></Topic>
      </Container>
      <Footer />
      <CookieBar></CookieBar>
    </>
  )
}

const Container = styled.div`
  max-width: 800px;
  margin: auto;
`
