import { ReactNode, useState } from 'react'
import styled, { css } from 'styled-components'

import { isPrintMode } from '../print-mode'
import { isClient } from '@/helper/client-detection'
import { inputFontReset } from '@/helper/css'
import { submitEventWithPath } from '@/helper/submit-event'
import { NodePath } from '@/schema/article-renderer'

export interface SpoilerProps {
  body: ReactNode
  title: ReactNode
  path: NodePath
}

export function Spoiler({ body, title, path }: SpoilerProps) {
  const [open, setOpen] = useState(isPrintMode ? true : false)
  return (
    <div className="flex flex-col mb-block mobile:mx-side">
      <SpoilerTitle
        onClick={() => {
          setOpen(!open)
          if (!open) {
            submitEventWithPath('openspoiler', path)
          }
        }}
        open={open}
      >
        <SpoilerToggle open={open} />
        {title}
      </SpoilerTitle>
      {open && body}
    </div>
  )
}

function SpoilerTitle({
  open,
  children,
  onClick,
  disabled,
}: {
  open: boolean
  children: {}
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  disabled?: boolean
}) {
  return (
    <StyledSpoilerTitle
      onClick={!disabled ? onClick : undefined}
      onPointerUp={(e) => e.currentTarget.blur()} //hack, use https://caniuse.com/#feat=css-focus-visible when supported
      open={!isClient ? true : open}
      interactive={!disabled}
    >
      {children}
    </StyledSpoilerTitle>
  )
}

function SpoilerToggle({ open }: { open: boolean }) {
  return <span className="inline w-4">{open ? '▾ ' : '▸ '} </span>
}

const StyledSpoilerTitle = styled.button<{
  open: boolean
  interactive: boolean
}>`
  ${inputFontReset}
  border: none;
  margin: 0;
  padding: 0;
  font-size: 1.125rem;
  line-height: 1.3;
  padding: 10px 15px;
  cursor: ${(props) => (props.interactive ? 'pointer' : 'auto')};
  text-align: left;
  color: ${(props) => (props.open ? '#fff' : props.theme.colors.dark1)};
  background-color: ${(props) =>
    props.open ? props.theme.colors.brand : props.theme.colors.bluewhite};

  &:hover {
    background-color: ${(props) =>
      props.open
        ? props.theme.colors.brand
        : props.theme.colors.lightBlueBackground};
  }

  ${(props) =>
    !props.interactive &&
    css`
      color: ${(props) => props.theme.colors.dark1};
      background-color: ${(props) =>
        props.theme.colors.lightBlueBackground} !important;
    `}
`
