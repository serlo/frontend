import styled from 'styled-components'
import Footer from '../src/components/navigation/Footer'
import FooterNav from '../src/components/navigation/FooterNav'
import Logo from '../src/components/navigation/Logo'
import { footerNavEntries } from '../src/footerdata'
import React from 'react'
import ContentTypes from '../src/components/content/ContentTypes'
import ExternalLink from '../src/components/content/ExternalLink'
import Geogebra from '../src/components/content/Geogebra'
import GeogebraWrapper from '../src/components/content/GeogebraWrapper'
import Horizon from '../src/components/content/Horizon'
import { horizonData } from '../src/horizondata'
import ImgCentered from '../src/components/content/ImgCentered'
import StyledImg from '../src/components/tags/StyledImg'
import Important from '../src/components/content/Important'
import LayoutRow from '../src/components/content/LayoutRow'
import Col from '../src/components/content/Col'
import HSpace from '../src/components/content/HSpace'
import Math from '../src/components/content/Math'
import MathWrapper from '../src/components/content/MathWrapper'
import Notifications from '../src/components/content/Notifications'
import SpecialCSS from '../src/components/content/SpecialCSS'
import StyledUl from '../src/components/tags/StyledUl'
import StyledLi from '../src/components/tags/StyledLi'
import StyledP from '../src/components/tags/StyledP'
import SpoilerTitle from '../src/components/content/SpoilerTitle'
import SpoilerBody from '../src/components/content/SpoilerBody'
import SpoilerContainer from '../src/components/content/SpoilerContainer'
import SpoilerToggle from '../src/components/content/SpoilerToggle'
import StyledTR from '../src/components/tags/StyledTR'
import TableWrapper from '../src/components/content/TableWrapper'
import StyledTable from '../src/components/tags/StyledTable'
import StyledTH from '../src/components/tags/StyledTH'
import StyledTD from '../src/components/tags/StyledTD'
import LandingAbout from '../src/components/landing/LandingAbout'
import LandingSubjects from '../src/components/landing/LandingSubjects'
import Breadcrumbs from '../src/components/navigation/Breadcrumbs'
import Header from '../src/components/navigation/Header'
import Menu from '../src/components/navigation/Menu'
import menudata from '../src/menudata'
import MetaMenu from '../src/components/navigation/MetaMenu'
import { metamenudata } from '../src/metamenudata'
import MobileMenu from '../src/components/navigation/MobileMenu'
import MobileMenuButton from '../src/components/navigation/MobileMenuButton'
import MobileMetaMenu from '../src/components/navigation/MobileMetaMenu'
import SearchInput from '../src/components/navigation/SearchInput'
import ShareModal from '../src/components/navigation/ShareModal'
import Toolbox from '../src/components/navigation/Toolbox'
import ToolLine from '../src/components/navigation/ToolLine'
import ToolLineButton from '../src/components/navigation/ToolLineButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareAlt } from '@fortawesome/free-solid-svg-icons'
import StyledA from '../src/components/tags/StyledA'
import StyledH1 from '../src/components/tags/StyledH1'
import StyledH2 from '../src/components/tags/StyledH2'
import StyledH3 from '../src/components/tags/StyledH3'
import StyledH4 from '../src/components/tags/StyledH4'
import StyledH5 from '../src/components/tags/StyledH5'
import StyledOl from '../src/components/tags/StyledOl'
import Hints from '../src/components/Hints'
import Modal from '../src/components/Modal'
import Ups from '../src/components/Ups'
import WipHint from '../src/components/WipHint'
import Topic from '../src/components/content/Topic'
import { topic, smallTopic } from '../src/topicdummydata'

const gallery = [
  {
    title: 'ContentTypes',
    description: '(dev only) Render the main content of a page',
    component: (
      <ContentTypes
        data={{
          contentType: 'Page',
          data: {
            edtrio: {
              plugin: 'rows',
              state: [
                {
                  plugin: 'text',
                  state: [
                    {
                      type: 'p',
                      children: [
                        {
                          text:
                            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          }
        }}
      />
    )
  },
  {
    title: 'ExternalLink',
    description: 'Indicate that a link is pointing to an external website',
    component: <ExternalLink />
  },
  {
    title: 'GeogebraWrapper + Geogebra',
    description: 'Load and show a geogebra applet',
    component: (
      <GeogebraWrapper>
        <Geogebra id={'2470285'} />
      </GeogebraWrapper>
    )
  },
  {
    title: 'HSpace',
    description: 'Add horizontal space',
    component: (
      <>
        <p>Content 1</p>
        <HSpace amount={400} />
        <p>Content 2</p>
      </>
    )
  },
  {
    title: 'Horizon',
    description: 'Show information that might interest you',
    component: <Horizon entries={horizonData} />
  },
  {
    title: 'ImgCentered + StyledImg',
    description: 'Show an image, center it and optionally set a max width',
    component: (
      <ImgCentered>
        <StyledImg
          src={
            'https://cdn.pixabay.com/photo/2017/05/13/18/36/cat-2310384_960_720.jpg'
          }
          alt={'Cute Cat'}
          maxWidth={400}
        />
      </ImgCentered>
    )
  },
  {
    title: 'Important',
    description: 'Highlight a important statement',
    component: <Important>Das ist wichtig!</Important>
  },
  {
    title: 'LayoutRow + Col',
    description: 'Make responsive columns with adjustable widths',
    component: (
      <LayoutRow>
        <Col cSize={3} style={{ backgroundColor: 'blue', height: '100px' }} />
        <Col cSize={1} style={{ backgroundColor: 'green', height: '100px' }} />
      </LayoutRow>
    )
  },
  {
    title: 'MathWrapper + Math',
    description: 'Display math formulas with KaTeX',
    component: (
      <MathWrapper>
        <Math formula={'e^{i\\pi}+1=0'} />
      </MathWrapper>
    )
  },
  {
    title: 'Notifications',
    description: 'Show a list of notifications for a user',
    component: (
      <Notifications
        entries={[
          {
            author: { username: 'Max', id: '999' },
            body: 'hat eine Bearbeitung von <a href="#">Julia</a> akzeptiert',
            timestamp: 'vor 6 Stunden',
            readed: false
          },
          {
            author: { username: 'Max', id: '999' },
            body: 'hat eine Bearbeitung von <a href="#">Thomas</a> akzeptiert',
            timestamp: 'vor 7 Stunden',
            readed: true
          }
        ]}
      />
    )
  },
  {
    title: 'SpecialCSS',
    description:
      'Fine-tune content styling with css rules, like reducing margin between paragraph and list or avoiding margin bottom within spoiler or other containers',
    component: (
      <SpecialCSS>
        <StyledP>Ein bisschen Text ...</StyledP>
        <StyledP>Eine Aufzählung:</StyledP>
        <StyledUl>
          <StyledLi>Eintrag 1</StyledLi>
          <StyledLi>Eintrag 2</StyledLi>
        </StyledUl>
        <Important>
          <StyledP>Das ist wichtig!</StyledP>
          <StyledP>Und das hier auch!</StyledP>
        </Important>
      </SpecialCSS>
    )
  },
  {
    title: 'SpoilerContainer + SpoilerTitle + SpoilerToggle + SpoilerBody',
    description: 'Show a collapsible spoiler',
    component: <MySpoiler />
  },
  {
    title: 'TableWrapper + StyledTable + StyledTR + StyledTH + StyledTD',
    description: 'Show a table with headers',
    component: (
      <TableWrapper>
        <StyledTable>
          <tbody>
            <StyledTR>
              <StyledTH>Spalte 1</StyledTH>
              <StyledTH>Spalte 2</StyledTH>
            </StyledTR>
            <StyledTR>
              <StyledTD>4m</StyledTD>
              <StyledTD>100€</StyledTD>
            </StyledTR>
            <StyledTR>
              <StyledTD>6m</StyledTD>
              <StyledTD>150€</StyledTD>
            </StyledTR>
          </tbody>
        </StyledTable>
      </TableWrapper>
    )
  },

  {
    title: 'Topic + TopicLinkList (expanded)',
    description: 'Show a single topic page',
    component: <Topic data={topic}></Topic>
  },
  {
    title: 'Topic + TopicLinkList (small)',
    description: 'Show a nested topic in a compressed view',
    component: <Topic data={smallTopic}></Topic>
  },
  {
    title: 'LandingAbout',
    description: 'Display about section of the landing page',
    component: <LandingAbout />
  },
  {
    title: 'LandingSubjects',
    description: 'Display subjects',
    component: <LandingSubjects />
  },
  {
    title: 'Breadcrumbs',
    description: 'Show parent topics',
    component: (
      <Breadcrumbs
        entries={[
          { url: '#', label: 'Mathematik' },
          { url: '#', label: 'Geometrie' },
          { url: '#', label: 'Strahlensätze und Ähnlichkeiten' },
          { url: '#', label: 'Abbildungen mithilfe des Stahlensatzes' },
          { url: '#', label: '5' }
        ]}
      />
    )
  },
  {
    title: 'Footer',
    description: 'Render the footer of the page',
    component: <Footer />
  },
  {
    title: 'FooterNav',
    description: 'Render only the navigational part of the footer',
    component: <FooterNav navEntries={footerNavEntries} />
  },
  {
    title: 'Header',
    description: 'Show complete header of the page',
    component: <Header />
  },
  {
    title: 'Logo',
    description: 'Render the Serlo logo',
    component: <Logo subline={'Die freie Lernplattform'} />
  },
  {
    title: 'Menu',
    description: 'Render desktop navigation bar',
    component: <Menu links={menudata} />
  },
  {
    title: 'MetaMenu',
    description: 'Render side menu for meta pages.',
    component: <MetaMenu pagealias={'/transparenz'} />
  },
  {
    title: 'MobileMenu',
    description: 'Show mobile version of main navigation',
    component: <MobileMenu links={menudata} />
  },
  {
    title: 'MobileMenuButton',
    description: 'Show button to toggle mobile menu (only on small screens)',
    component: <MyMobileMenuButton />
  },
  {
    title: 'MobileMetaMenu',
    description:
      'Show horizontal scrolling secondary navigation (only on small and medium screens)',
    component: (
      <div style={{ width: '100%' }}>
        <MobileMetaMenu links={metamenudata} pagealias={'/transparenz'} />
      </div>
    )
  },
  {
    title: 'SearchInput',
    description: 'Show search input',
    component: <SearchInput />
  },
  {
    title: 'ShareModal',
    description: 'Show modal dialog for sharing the page',
    component: <MyShareModal />
  },
  {
    title: 'Toolbox',
    description: 'Show buttons to interact with page',
    component: <Toolbox onEdit={() => {}} />
  },
  {
    title: 'ToolLine + ToolLineButton',
    description: 'Show button for sharing, mobile only',
    component: (
      <ToolLine style={{ marginTop: 0 }}>
        <ToolLineButton>
          <FontAwesomeIcon icon={faShareAlt} size="1x" /> Teilen
        </ToolLineButton>
      </ToolLine>
    )
  },
  {
    title: 'ToolLineButton',
    description: 'Show button for sharing',
    component: (
      <ToolLineButton>
        <FontAwesomeIcon icon={faShareAlt} size="1x" /> Teilen
      </ToolLineButton>
    )
  },
  {
    title: 'StyledA',
    description: 'Show a link',
    component: <StyledA href="#">Go to this page</StyledA>
  },
  {
    title: 'StyledH1',
    description: 'Show a heading level 1',
    component: <StyledH1>Heading 1</StyledH1>
  },
  {
    title: 'StyledH2',
    description: 'Show a heading level 2',
    component: <StyledH2>Heading 2</StyledH2>
  },
  {
    title: 'StyledH3',
    description: 'Show a heading level 3',
    component: <StyledH3>Heading 3</StyledH3>
  },
  {
    title: 'StyledH4',
    description: 'Show a heading level 4',
    component: <StyledH4>Heading 4</StyledH4>
  },
  {
    title: 'StyledH5',
    description: 'Show a heading level 5',
    component: <StyledH5>Heading 5</StyledH5>
  },
  {
    title: 'StyledOl + StyledLi',
    description: 'Show an ordered list',
    component: (
      <SpecialCSS>
        <StyledOl>
          <StyledLi>
            <StyledP>Item A</StyledP>
          </StyledLi>
          <StyledLi>
            <StyledP>Item B</StyledP>
          </StyledLi>
          <StyledLi>
            <StyledP>Item C</StyledP>
          </StyledLi>
        </StyledOl>
      </SpecialCSS>
    )
  },
  {
    title: 'StyledP',
    description: 'Show a paragraph',
    component: (
      <StyledP>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
        clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
        amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
        nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
        sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
        rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
        ipsum dolor sit amet.
      </StyledP>
    )
  },
  {
    title: 'StyledUl + StyledLi',
    description: 'Show an unordered list including nesting',
    component: (
      <SpecialCSS>
        <StyledUl>
          <StyledLi>
            <StyledP>Item A</StyledP>
          </StyledLi>
          <StyledLi>
            <StyledP>Item B</StyledP>
          </StyledLi>
          <StyledLi>
            <StyledP>Item C</StyledP>
            <StyledUl>
              <StyledLi>
                <StyledP>Subitem 1</StyledP>
              </StyledLi>
              <StyledLi>
                <StyledP>Subitem 2</StyledP>
              </StyledLi>
            </StyledUl>
          </StyledLi>
        </StyledUl>
      </SpecialCSS>
    )
  },
  {
    title: 'Hints',
    description: 'Show a list of hints (draft)',
    component: <Hints hints={['Warning: Problem 1', 'Warnung: Problem 2']} />
  },
  {
    title: 'Modal',
    description: 'Display a generic modal dialog',
    component: <MyModal />
  },
  {
    title: 'Ups',
    description: 'Dev mode: Notify that a content type is not available yet.',
    component: <Ups type={'article'} />
  },
  {
    title: 'WipHint',
    description: 'Dev mode: Notify that a page is not ready for review yet.',
    component: <WipHint part={'Startseite'} />
  }
]

gallery.sort((a, b) => a.title.localeCompare(b.title))

export default function Gallery() {
  const [current, setCurrent] = React.useState('')
  React.useEffect(() => {
    console.log(window.location.hash)
    const hash = window.location.hash.substring(1)
    if (gallery.find(item => item.title === hash)) {
      setCurrent(hash)
    }
  }, [])
  const currentItem = gallery.filter(item => item.title === current)[0]
  return (
    <Container>
      <ComponentChooser>
        <h2>Select a component:</h2>
        <ul>
          {gallery.map(entry => (
            <CompStyledLi
              active={entry.title === current}
              onClick={() => {
                setCurrent(entry.title)
                window.location.hash = entry.title
              }}
              key={entry.title}
            >
              <span>{entry.title}</span>
            </CompStyledLi>
          ))}
          <HSpace amount={20} />
        </ul>
      </ComponentChooser>
      <ComponentView>
        <ComponentInfo>
          {currentItem && (
            <>
              <h1>
                <span>{currentItem.title}</span>
              </h1>
              <p>{currentItem.description}</p>
            </>
          )}
        </ComponentInfo>
        <ComponentContainer>
          {currentItem && currentItem.component}
        </ComponentContainer>
      </ComponentView>
    </Container>
  )
}

const CompStyledLi = styled.li<{ active?: boolean }>`
  text-decoration: underline;
  cursor: pointer;
  ${props => (props.active ? '& > span { background-color: #ffee7d; }' : '')}
  margin-bottom: 10px;
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  @media (max-width: 820px) {
    height: 100%;
    flex-direction: column;
  }
  box-sizing: border-box;
  width: 100%;
`

const ComponentChooser = styled.div`
  padding: 10px;
  width: 300px;
  border-right: 2px solid black;
  box-sizing: border-box;
  height: 100%;
  flex-grow: 0;
  flex-shrink: 0;
  background-color: #fafafa;
  overflow: scroll;
  @media (max-width: 820px) {
    border-right: 0;
    border-bottom: 2px solid black;
    width: 100%;
    height: 40vh;
    overflow: auto;
  }
  & > ul {
    margin-left: -16px;
  }
`

const ComponentView = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
`

const ComponentInfo = styled.div`
  flex-basis: auto;
  flex-grow: 0;
  border-bottom: 2px solid black;
  background-color: #fafafa;
  padding: 10px;
  & h1 > span {
    background-color: #ffee7d;
  }
`

const ComponentContainer = styled.div`
  flex-grow: 1;
  overflow: auto;
  position: relative;
`

function MySpoiler() {
  const [open, setOpen] = React.useState(true)
  return (
    <SpecialCSS>
      <SpoilerContainer>
        <SpoilerTitle onClick={() => setOpen(!open)}>
          <SpoilerToggle open={open} />
          Click me.
        </SpoilerTitle>
        {open && (
          <SpoilerBody>
            <StyledP>This is the content of the spoiler.</StyledP>
          </SpoilerBody>
        )}
      </SpoilerContainer>
    </SpecialCSS>
  )
}

function MyMobileMenuButton() {
  const [open, setOpen] = React.useState(true)
  return <MobileMenuButton open={open} onClick={() => setOpen(!open)} />
}

function MyShareModal() {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <button onClick={() => setOpen(true)}>Open</button>
      <ShareModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}

function MyModal() {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <button onClick={() => setOpen(true)}>Open</button>
      <Modal isOpen={open} onRequestClose={() => setOpen(false)}>
        Hello!
      </Modal>
    </>
  )
}
