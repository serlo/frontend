import styled from 'styled-components'

export const ToolLineButton = styled.button`
  font-weight: bold;
  font-size: 0.825rem;
  font-family: inherit;
  border: none;
  padding: 4px 4px;
  margin: 2px;
  margin-left: 3px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.2s;
  color: ${props => props.theme.colors.brandGreen};
  background-color: transparent;
  border: thin solid;
  &:hover {
    color: white;
    background-color: ${props => props.theme.colors.brandGreen};
  }
`
