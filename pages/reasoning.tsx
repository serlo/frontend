import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import ReasoningExercise, {
  calcGuessSuccessRate
} from '../src/components/content/ReasoningExercise'

const exerciseDef = {
  statement: [
    {
      type: 'p',
      children: [{ text: 'Welches Muster gehört nicht dazu?' }]
    },
    {
      type: 'img',
      src:
        'https://access.openupresources.org/curricula/our6-8math/embeds/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdlFnIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--fa0d52766bb3ee29475cb1c9ca40a3a4d251ce6a/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBZzZGRzF6WDIxaGRHaGZaR2xuYVhSaGJBPT0iLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--62a1211df0b9edd27e75fe813b1b6e447cac9e4e/6.1.A1.Image.2-4.png',
      maxWidth: 400,
      children: [{ text: '' }]
    }
  ],
  answers: [
    {
      text: [
        'Muster A. Es enthält nur blau.',
        'Muster A. Es enthält kein gelb.',
        'Muster A. Gruppen aus vier Fünfecken bilden Sechsecke, die ohne Lücken zusammenpassen.',
        'Muster A. Gruppen aus vier Fünfecken bilden Sechsecke, die lückenlos zusammenpassen.',
        'Muster A. Gruppen aus vier Fünfecken bilden Sechsecke, die wie ein Parkett zusammenpassen.'
      ],
      type: 'success'
    },
    {
      text: [
        'Muster A. Es enthält nur gelb.',
        'Muster A. Es enthält kein blau.'
      ],
      type: 'fail',
      message: 'Muster A enthält auch blau.'
    },
    {
      text: ['Muster A. Es enthält nur eine Farbe.'],
      type: 'fail',
      message: 'Auch Muster B enthält nur eine Farbe.'
    },
    {
      text: [
        'Muster A. Es enthält nur Fünfecke.',
        'Muster A. Es enthält keine Vierecke.'
      ],
      type: 'fail',
      message: 'Das gilt auch für Muster B.'
    },
    {
      text: [
        'Muster A. Gruppen aus vier Sechsecken bilden Fünfecke, die ohne Lücke zusammenpassen.',
        'Muster A. Gruppen aus vier Fünfecken bilden Siebenecke, die ohne Lücke zusammenpassen.',
        'Muster A. Gruppen aus sechs Fünfecken bilden Sechsecke, die ohne Lücke zusammenpassen.'
      ],
      type: 'fail',
      message: 'Zähle nochmal die Ecken nach.'
    },
    {
      text: [
        'Muster A. Gruppen aus vier Fünfecken bilden Sechsecke, die nicht zusammenpassen.',
        'Muster A. Gruppen aus vier Fünfecken bilden Sechsecke, die nur mit Lücken zusammenpassen.'
      ],
      type: 'fail',
      message: 'Muster A enthält keine Lücken.'
    },
    {
      text: 'Muster B. Es enthält kein gelb.',
      type: 'fail',
      message: 'Muster B enthält gelb.'
    },
    {
      text: 'Muster B. Es enthält kein blau.',
      type: 'success'
    },
    {
      text: ['Muster A.', 'Muster B.', 'Muster C.', 'Muster D.'],
      type: 'hint',
      message: 'Erkläre, wie du auf deine Antwort gekommen bist.'
    }
  ]
}

console.log(
  'Guess success rate: ',
  Math.round(calcGuessSuccessRate(exerciseDef, []) * 1000) / 10 + '%'
)

export default function Reasoning() {
  const [active, setActive] = React.useState(false)
  if (active) {
    return (
      <ReasoningExercise
        data={exerciseDef}
        onExit={() => {
          setActive(false)
        }}
      />
    )
  }

  return (
    <Container>
      <Button
        onClick={() => {
          setActive(true)
        }}
      >
        <FontAwesomeIcon size="1x" icon={faPlayCircle} /> Start
      </Button>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
`

const Button = styled.div`
  border-radius: 0.75rem;
  font-size: 1.5rem;
  border: 1px solid ${props => props.theme.colors.brand};
  cursor: pointer;
  padding: 6px 11px;
  user-select: none;
  color: ${props => props.theme.colors.brand};
  &:active,
  &:hover {
    background-color: ${props => props.theme.colors.brand};
    color: white;
  }
  transition: all 0.6s;
`
