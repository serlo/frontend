import styled, { css } from 'styled-components'

interface SpoilerTitleProps {
  open: boolean
  children: {}
  onClick?: any
  disabled?: boolean
}

export default function SpoilerTitle({
  open,
  children,
  onClick,
  disabled,
}: SpoilerTitleProps) {
  return (
    <StyledSpoilerTitle
      onClick={!disabled ? onClick : null}
      open={open}
      role="button"
      interactive={!disabled}
    >
      {children}
    </StyledSpoilerTitle>
  )
}

const StyledSpoilerTitle = styled.a<{ open: boolean; interactive: boolean }>`
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
