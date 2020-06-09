import {
  faCubes,
  faNewspaper,
  faPlayCircle,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GetServerSideProps } from 'next'
import absoluteUrl from 'next-absolute-url'
import dynamic from 'next/dynamic'
import React from 'react'
import styled, { css } from 'styled-components'

import { ArticlePage } from '@/components/content/article-page'
import { CookieBar } from '@/components/content/cookie-bar'
import { HSpace } from '@/components/content/h-space'
import { Horizon } from '@/components/content/horizon'
import { LicenseNotice } from '@/components/content/license-notice'
import type { TopicProps } from '@/components/content/topic'
import type { BreadcrumbsProps } from '@/components/navigation/breadcrumbs'
import { Footer } from '@/components/navigation/footer'
import { Header } from '@/components/navigation/header'
import type { MetaMenuProps } from '@/components/navigation/meta-menu'
import { PrettyLinksProvider } from '@/components/pretty-links-context'
import { SlugHead } from '@/components/slug-head'
import { StyledA } from '@/components/tags/styled-a'
import { StyledH1 } from '@/components/tags/styled-h1'
import { StyledP } from '@/components/tags/styled-p'
import { horizonData } from '@/data/horizon'
import { renderArticle } from '@/schema/article-renderer'
import KaTeX from 'katex'
import KaTeXSpan from '../../external/katexstyles'
import { MathWrapperProps } from '@/components/content/math-wrapper'
import { MathProps } from '@/components/content/math'
import { makePadding } from '@/helper/css'
const MetaMenu = dynamic<MetaMenuProps>(() =>
  import('@/components/navigation/meta-menu').then((mod) => mod.MetaMenu)
)
const Breadcrumbs = dynamic<BreadcrumbsProps>(() =>
  import('@/components/navigation/breadcrumbs').then((mod) => mod.Breadcrumbs)
)
const Topic = dynamic<TopicProps>(() =>
  import('@/components/content/topic').then((mod) => mod.Topic)
)

const NewsletterPopup = dynamic<{}>(
  () =>
    import('@/components/scripts/newsletter-popup').then(
      (mod) => mod.NewsletterPopup
    ),
  {
    ssr: false,
  }
)

const T = dynamic(() => import('reactour'), {
  ssr: false,
})

// TODO: needs type declaration
type PageViewProps = any

const MathWrapper = styled.div<MathWrapperProps>`
  ${makePadding}
  width: 100%;
  box-sizing: border-box;
  text-align: ${(props) => (props.centered ? 'center' : 'left')};
  margin-bottom: ${(props) => props.theme.spacing.mb.block};
  font-size: 1.3125rem;
  padding-top: 10px;
  padding-bottom: 10px;
  overflow: auto;
  ${(props) => (props.bigger ? 'line-height:2.5;' : '')};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`

const MathWrapper2 = styled.div<MathWrapperProps>`
  ${makePadding}
  width: 100%;
  box-sizing: border-box;
  text-align: ${(props) => (props.centered ? 'center' : 'left')};
  {/*margin-bottom: ${(props) => props.theme.spacing.mb.block};*/}
  font-size: 1.3125rem;
  {/* //padding-top: 10px; */}
  {/*//padding-bottom: 10px; */}
  overflow: auto;
  ${(props) => (props.bigger ? 'line-height:2.5;' : '')};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`

function Math(props: MathProps) {
  const { inline = false } = props
  let formula = props.formula

  // make empty formulas clickable
  if (!formula) {
    formula = '\\,'
  }
  // use displaystyle for block formulas
  if (!inline) {
    formula = '\\displaystyle ' + formula
  }

  const html = KaTeX.renderToString(formula, {
    displayMode: true,
    throwOnError: false,
    strict: false,
    trust: true,
    fleqn: true,
  })

  return <KaTeXSpan dangerouslySetInnerHTML={{ __html: html }} />
}

type EquationsPluginState = {
  left: string
  sign: string
  right: string
  transform: string
}[]

const example14871a: EquationsPluginState = [
  {
    left: 'y',
    sign: '=',
    right: '3x^2-18x+27',
    transform: '\\text{\\href{\\1677}{Klammere aus}}',
  },
  {
    left: 'y',
    sign: '=',
    right: '3\\left[x^2-6x+9\\right]',
    transform: '\\text{Ergänze quadratisch}',
  },
  {
    left: 'y',
    sign: '=',
    right: '3\\left(x-3\\right)^2',
    transform: '\\text{Scheitelform ablesen}',
  },
]

const example14871b: EquationsPluginState = [
  {
    left: 'y',
    sign: '=',
    right: '\\frac13x^2-2x+3',
    transform: '\\text{\\href{\\1677}{Klammere aus}}',
  },
  {
    left: 'y',
    sign: '=',
    right: '\\frac13\\left[x^2-6x+9\\right]',
    transform: '\\text{Ergänze quadratisch}',
  },
  {
    left: 'y',
    sign: '=',
    right: '\\frac13\\left(x-3\\right)^2',
    transform: '\\text{Scheitelform ablesen}',
  },
]

const example7021: EquationsPluginState = [
  {
    left: 'x',
    sign: '=',
    right: '\\frac23\\cdot x+\\frac14\\cdot x+100',
    transform: '\\text{Gesamtzahl der Lose. Nach $x$ auflösen.}',
  },
  {
    left: 'x-\\frac23\\cdot x-\\frac14\\cdot x',
    sign: '=',
    right: '100',
    transform: '\\text{$x$ ausklammern.}',
  },
  {
    left: 'x\\cdot(1-\\frac23-\\frac14)',
    sign: '=',
    right: '100',
    transform: '\\text{Klammer auf gemeinsamen Hauptnenner bringen.}',
  },
  {
    left: 'x\\cdot(\\frac{12}{12}-\\frac8{12}-\\frac3{12})',
    sign: '=',
    right: '100',
    transform: '\\text{Klammer ausrechnen}',
  },
  {
    left: 'x\\cdot(\\frac1{12})',
    sign: '=',
    right: '100',
    transform: '\\text{Nach $x$ auflösen}',
  },
  {
    left: 'x',
    sign: '=',
    right: '12 \\cdot 100',
    transform: '',
  },
  {
    left: 'x',
    sign: '=',
    right: '1200',
    transform: '\\text{1200 Lose gab es insgesamt.}',
  },
]

const example2327: EquationsPluginState = [
  {
    left: 'A(x)',
    sign: '=',
    right: '\\int_{-12}^{12}\\left(6-\\frac{1}{24}x^2\\right)dx',
    transform: '\\text{Integriere.}',
  },
  {
    left: '',
    sign: '=',
    right: '\\left[6x-\\frac{1}{24\\cdot 3}x^3\\right]_{-12}^{12}',
    transform:
      '\\text{In die Klammer wird für x die rechte Grenze (12) eingesetzt und minus die Klammer mit der linken Grenze (-12) gerechnet.}',
  },
  {
    left: '',
    sign: '=',
    right:
      '\\left(6\\cdot 12-\\frac{1}{24\\cdot 3}\\cdot 12^3\\right)-\\left(6\\cdot \\left(-12\\right)-\\frac{1}{24\\cdot 3}\\cdot \\left(-12\\right)^3\\right)',
    transform: '\\text{Ausmultiplizieren.}',
  },
  {
    left: '',
    sign: '=',
    right: '72-\\frac{1728}{72}+72-\\frac{1728}{72}',
    transform: '\\text{Der Bruch lässt sich mit 72 kürzen.}',
  },
  {
    left: '',
    sign: '=',
    right: '72-24+72-24',
    transform: '',
  },
  {
    left: '',
    sign: '=',
    right: '96',
    transform: '',
  },
]

const example2581: EquationsPluginState = [
  {
    left: '',
    sign: '\\phantom{=}',
    right: '\\int_1^e\\frac{x^2+2x+3}{2x}\\ \\mathrm{d}x',
    transform: '\\text{Bruch in drei Brüche zerlegen.}',
  },
  {
    left: '',
    sign: '=',
    right:
      '\\int_1^e\\left(\\frac{x^2}{2x}+\\frac{2x}{2x}+\\frac3{2x}\\right)\\ \\mathrm{d}x',
    transform: '',
  },
  {
    left: '',
    sign: '=',
    right:
      '\\int_1^e\\left(\\frac12x+1+\\frac32\\cdot\\frac1x\\right)\\ \\mathrm{d}x',
    transform:
      '\\text{Integrieren. Die Stammfunktion von $\\frac1x$ ist $\\ln x$.}',
  },
  {
    left: '',
    sign: '=',
    right: '\\left[\\frac1{2\\cdot2}x^2+x+\\frac32\\ln x\\right]_1^e',
    transform:
      '\\text{In die Klammer wird für $x$ der obere Wert ($e$) eingesetzt und minus die Klammer mit dem unteren Wert $1$ gerechnet.}',
  },
  {
    left: '',
    sign: '=',
    right:
      '\\left(\\frac14e^2+e+\\frac32\\ln e\\right)-\\left(\\frac141^2+1+\\frac32\\ln1\\right)',
    transform: '\\text{Klammern auflösen, $\\ln e=1$, $\\ln1=0$.}',
  },
  {
    left: '',
    sign: '=',
    right: '\\frac{e^2}4+e+\\frac32-\\frac14-1',
    transform: '\\text{Gleiche Elemente zusammenfassen.}',
  },
  {
    left: '',
    sign: '=',
    right: '\\frac{e^2}4+e+\\frac14',
    transform: '',
  },
  {
    left: '',
    sign: '\\approx',
    right: '4,8155',
    transform: '',
  },
]

function Renderer1({ state }: { state: EquationsPluginState }) {
  return (
    <MathWrapper>
      <Math formula={toLatex(state)} />
    </MathWrapper>
  )

  function toLatex(state: EquationsPluginState) {
    const lines = state.map(({ left, sign, right, transform }) => {
      return `
      ${left} &${sign} ${right}& &${transform}
    `
    })

    return `
  \\begin{aligned}
    ${lines.join('\\\\')}
  \\end{aligned}
  `
  }
}

function Renderer3({ state }: { state: EquationsPluginState }) {
  return (
    <MathWrapper2>
      <Math formula={toLatex(state)} />
    </MathWrapper2>
  )

  function toLatex(state: EquationsPluginState) {
    const lines = state.map(({ left, sign, right, transform }) => {
      return `
      ${left} &${sign} ${right}
      `
    })

    return `
  \\begin{aligned}
    ${lines.join('')}
  \\end{aligned}
  `
  }
}

function Renderer2({ state }: { state: EquationsPluginState }) {
  return (
    <MathWrapper>
      <Math formula={toLatex(state)} />
    </MathWrapper>
  )

  function toLatex(state: EquationsPluginState) {
    const lines = state.map(({ left, sign, right, transform }) => {
      return `
      ${left} &${sign} ${right}\\\\
      \\noindent ${transform}
    `
    })

    return `
  \\begin{aligned}
    ${lines.join('\\\\')}
  \\end{aligned}
  `
  }
}

function Content() {
  const examples = [
    example14871a,
    example14871b,
    example7021,
    example2327,
    example2581,
  ]

  return (
    <>
      {examples.map((state, index) => {
        return <Renderer1 key={index} state={state} />
      })}
    </>
  )
}

const steps = [
  {
    selector: '#foo .vlist > span > .mord',
    content: 'Step 1',
  },
  {
    selector: '#foo .vlist-t .mord + .mord',
    content: 'Step 1',
  },
]

function Tour() {
  const state: EquationsPluginState = [
    {
      left: 'A(x)',
      sign: '=',
      right: '\\int_{-12}^{12}\\left(6-\\frac{1}{24}x^2\\right)dx',
      transform: '\\text{Integriere.}',
    },
    {
      left: '\\phantom{A(x)}',
      sign: '=',
      right: '\\left[6x-\\frac{1}{24\\cdot 3}x^3\\right]_{-12}^{12}',
      transform:
        '\\text{In die Klammer wird für x die rechte Grenze (12) eingesetzt und minus die Klammer mit der linken Grenze (-12) gerechnet.}',
    },
    {
      left: '\\phantom{A(x)}',
      sign: '=',
      right:
        '\\left(6\\cdot 12-\\frac{1}{24\\cdot 3}\\cdot 12^3\\right)-\\left(6\\cdot \\left(-12\\right)-\\frac{1}{24\\cdot 3}\\cdot \\left(-12\\right)^3\\right)',
      transform: '\\text{Ausmultiplizieren.}',
    },
    {
      left: '\\phantom{A(x)}',
      sign: '=',
      right: '72-\\frac{1728}{72}+72-\\frac{1728}{72}',
      transform: '\\text{Der Bruch lässt sich mit 72 kürzen.}',
    },
    {
      left: '\\phantom{A(x)}',
      sign: '=',
      right: '72-24+72-24',
      transform: '',
    },
    {
      left: '\\phantom{A(x)}',
      sign: '=',
      right: '96',
      transform: '',
    },
  ]
  const [isOpen, setIsOpen] = React.useState(false)
  const steps = state
    .map((step, index) => {
      return {
        selector: `#step${index}`,
        content: step.transform,
      }
    })
    .filter((foo) => foo !== null)
  return (
    <>
      {typeof window === 'undefined' ? null : (
        <T
          steps={steps}
          isOpen={isOpen}
          onRequestClose={() => {
            setIsOpen(false)
          }}
        />
      )}
      <button
        onClick={() => {
          setIsOpen(true)
        }}
      >
        Help me pls
      </button>
      <div id="foo">
        {state.map((step, index) => {
          return (
            <div id={`step${index}`}>
              <Renderer3 key={index} state={[step]} />
            </div>
          )
        })}
      </div>
    </>
  )
}

function PageView(props: PageViewProps) {
  const { data } = props
  const {
    contentId,
    alias,
    horizonIndices,
    breadcrumbs,
    contentType,
    title,
    navigation,
    license,
    prettyLinks,
  } = data

  const showNav =
    navigation &&
    !(contentType === 'TaxonomyTerm' && data.data?.type === 'topicFolder')
  return (
    <>
      <SlugHead
        title={title}
        data={data}
        contentType={contentType}
        origin={props.origin}
      />
      <Header />
      {showNav && (
        <MetaMenu pagealias={`/${data.data.id}`} navigation={navigation} />
      )}
      <RelatveContainer>
        <MaxWidthDiv showNav={showNav}>
          <PrettyLinksProvider value={prettyLinks}>
            {breadcrumbs && !(contentType === 'Page' && navigation) && (
              <Breadcrumbs entries={breadcrumbs} />
            )}
            <main>
              <StyledH1 extraMarginTop>{data.title}</StyledH1>
              <Content />
              <Tour />
            </main>
            <HSpace amount={40} />
            {horizonIndices && (
              <Horizon
                // TODO: needs type declaration
                entries={horizonIndices.map((index: any) => horizonData[index])}
              />
            )}
          </PrettyLinksProvider>
        </MaxWidthDiv>
      </RelatveContainer>
      <Footer />
      {contentType === 'Page' && data.data && <NewsletterPopup />}
      <CookieBar />
    </>
  )
}

const RelatveContainer = styled.div`
  position: relative;
`

const MaxWidthDiv = styled.div<{ showNav?: boolean }>`
  max-width: 800px;
  margin: 0 auto;

  @media (min-width: ${(props) =>
      props.theme.breakpoints.sm}) AND (max-width: ${(props) =>
      props.theme.breakpoints.md}) {
    margin: 0 0 0 51px;
  }

  ${(props) =>
    props.showNav &&
    css`
      @media (min-width: ${(props) =>
          props.theme.breakpoints.md}) AND (max-width: ${(props) =>
          props.theme.breakpoints.lg}) {
        margin: 0 0 0 200px;
      }
    `}
`

const StyledIcon = styled(FontAwesomeIcon)`
  color: ${(props) => props.theme.colors.lighterblue};
  font-size: 1.73rem;
`

// PageView.getInitialProps = async ({ req, res }) => {
//   const { origin } = absoluteUrl(req)
//   //const resp = await fetch(`${origin}/api/users`)
//   //const users = await resp.json()
//   console.log(origin)
// }

// -> You can not use getInitialProps with getServerSideProps. Please remove getInitialProps. /[...slug]

// TODO: needs type declaration
export const getServerSideProps: GetServerSideProps<any, any> = async (
  props
) => {
  const { origin } = absoluteUrl(props.req)
  const res = await fetch(`${origin}/api/frontend/mathe?redirect`)
  const data = await res.json()
  // compat course to first page
  if (data.redirect) {
    props.res.writeHead(301, {
      Location: encodeURI(data.redirect),
      // Add the content-type for SEO considerations
      'Content-Type': 'text/html; charset=utf-8',
    })
    props.res.end()
    // compat: return empty props
    return { props: {} }
  }

  if (data.error) {
    props.res.statusCode = 404
  }

  return { props: { data, origin } }
}

export default PageView
