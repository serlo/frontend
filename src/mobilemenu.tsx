import styled from 'styled-components'

export const MobileMenu = props => {
  const { links } = props
  return (
    <List>
      {links.map((entry, index) => (
        <Entry data={entry} key={index} />
      ))}
    </List>
  )
}

const Placeholder = styled.div`
  height: 500px;
  width: 100%;
  background-color: green;
  @media screen and (min-width: ${props => props.theme.breakpoints.sm}) {
    display: none;
  }
`
const List = styled.ul`
  list-style-type: none;
`

const EntryRaw = props => {
  const { data, className } = props
  return <p className="className">{data.title}</p>
}

const Entry = styled(EntryRaw)``
