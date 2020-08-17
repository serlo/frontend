import { NextPage } from 'next'
import styled from 'styled-components'

import { Math } from '@/components/content/math'
import { MathWrapper } from '@/components/content/math-wrapper'
import { MaxWidthDiv } from '@/components/navigation/max-width-div'
import { RelativeContainer } from '@/components/navigation/relative-container'

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
    transform: 'Klammere aus',
  },
  {
    left: 'y',
    sign: '=',
    right: '3\\left[x^2-6x+9\\right]',
    transform: 'Ergänze quadratisch',
  },
  {
    left: 'y',
    sign: '=',
    right: '3\\left(x-3\\right)^2',
    transform: 'Scheitelform ablesen',
  },
]

const example14871b: EquationsPluginState = [
  {
    left: 'y',
    sign: '=',
    right: '\\frac13x^2-2x+3',
    transform: 'Klammere aus',
  },
  {
    left: 'y',
    sign: '=',
    right: '\\frac13\\left[x^2-6x+9\\right]',
    transform: 'Ergänze quadratisch',
  },
  {
    left: 'y',
    sign: '=',
    right: '\\frac13\\left(x-3\\right)^2',
    transform: 'Scheitelform ablesen',
  },
]

const example7021: EquationsPluginState = [
  {
    left: 'x',
    sign: '=',
    right: '\\frac23\\cdot x+\\frac14\\cdot x+100',
    transform: 'Gesamtzahl der Lose. Nach $x$ auflösen.',
  },
  {
    left: 'x-\\frac23\\cdot x-\\frac14\\cdot x',
    sign: '=',
    right: '100',
    transform: '$x$ ausklammern.',
  },
  {
    left: 'x\\cdot(1-\\frac23-\\frac14)',
    sign: '=',
    right: '100',
    transform: 'Klammer auf gemeinsamen Hauptnenner bringen.',
  },
  {
    left: 'x\\cdot(\\frac{12}{12}-\\frac8{12}-\\frac3{12})',
    sign: '=',
    right: '100',
    transform: 'Klammer ausrechnen',
  },
  {
    left: 'x\\cdot(\\frac1{12})',
    sign: '=',
    right: '100',
    transform: 'Nach $x$ auflösen',
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
    transform: '1200 Lose gab es insgesamt.',
  },
]

const example2327: EquationsPluginState = [
  {
    left: 'A(x)',
    sign: '=',
    right: '\\int_{-12}^{12}\\left(6-\\frac{1}{24}x^2\\right)dx',
    transform: 'Integriere.',
  },
  {
    left: '',
    sign: '=',
    right: '\\left[6x-\\frac{1}{24\\cdot 3}x^3\\right]_{-12}^{12}',
    transform:
      'In die Klammer wird für x die rechte Grenze (12) eingesetzt und minus die Klammer mit der linken Grenze (-12) gerechnet.',
  },
  {
    left: '',
    sign: '=',
    right:
      '\\left(6\\cdot 12-\\frac{1}{24\\cdot 3}\\cdot 12^3\\right)-\\left(6\\cdot \\left(-12\\right)-\\frac{1}{24\\cdot 3}\\cdot \\left(-12\\right)^3\\right)',
    transform: 'Ausmultiplizieren.',
  },
  {
    left: '',
    sign: '=',
    right: '72-\\frac{1728}{72}+72-\\frac{1728}{72}',
    transform: 'Der Bruch lässt sich mit 72 kürzen.',
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
    transform: 'Bruch in drei Brüche zerlegen.',
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
    transform: 'Integrieren. Die Stammfunktion von $\\frac1x$ ist $\\ln x$.',
  },
  {
    left: '',
    sign: '=',
    right: '\\left[\\frac1{2\\cdot2}x^2+x+\\frac32\\ln x\\right]_1^e',
    transform:
      'In die Klammer wird für $x$ der obere Wert ($e$) eingesetzt und minus die Klammer mit dem unteren Wert $1$ gerechnet.',
  },
  {
    left: '',
    sign: '=',
    right:
      '\\left(\\frac14e^2+e+\\frac32\\ln e\\right)-\\left(\\frac141^2+1+\\frac32\\ln1\\right)',
    transform: 'Klammern auflösen, $\\ln e=1$, $\\ln1=0$.',
  },
  {
    left: '',
    sign: '=',
    right: '\\frac{e^2}4+e+\\frac32-\\frac14-1',
    transform: 'Gleiche Elemente zusammenfassen.',
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

const examples = [
  example14871a,
  example14871b,
  example7021,
  example2327,
  example2581,
]

export const Equations: NextPage = () => {
  return (
    <RelativeContainer>
      <MaxWidthDiv>
        {examples.map((state, index) => {
          return <Equation key={index} state={state} />
        })}
      </MaxWidthDiv>
    </RelativeContainer>
  )
}

function Equation({ state }: { state: EquationsPluginState }) {
  return (
    <MathWrapper>
      {state.map(({ left, sign, right, transform }, index) => {
        return (
          <>
            <Math formula={toLatex(left, sign, right)} />
            {transform && (
              <Transform>
                {index === state.length - 1 ? '→' : '↓'} {transform}
              </Transform>
            )}
          </>
        )
      })}
    </MathWrapper>
  )

  function toLatex(left: string, sign: string, right: string) {
    return `
  \\begin{aligned}
    ${`${left} &${sign} ${right}&`}
  \\end{aligned}
  `
  }
}

const Transform = styled.p`
  margin-top: 10px;
  margin-bottom: 18px;
  font-size: 1rem;
  color: ${(props) => props.theme.colors.brand};
`
