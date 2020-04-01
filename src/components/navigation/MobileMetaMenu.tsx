import React from 'react'
import styled from 'styled-components'
import ScrollMenu from 'react-horizontal-scrolling-menu'

export default function MobileMetaMenu(props) {
  const selected = props.links.filter(entry => entry.url === props.pagealias)[0]
  return (
    <StyledScrollMenu>
      <ScrollMenu
        alignCenter={false}
        data={props.links.map((entry, i) => {
          return (
            <div
              key={entry.title}
              className={entry.url === props.pagealias ? 'active' : ''}
            >
              <h3>{entry.title}</h3>
            </div>
          )
        })}
        selected={selected.title}
        scrollToSelected={true}
        onSelect={x => {
          window.location.href = props.links.filter(
            entry => entry.title === x
          )[0].url
        }}
        arrowRight={<StyledArrowRight />}
        arrowLeft={<StyledArrowLeft />}
        hideSingleArrow={true}
        transition={0.6}
        inertiaScrolling={true}
        inertiaScrollingSlowdown={0.25}
        useButtonRole={false}
      />
    </StyledScrollMenu>
  )
}

const StyledScrollMenu = styled.div`
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    display: none;
  }
  & h3 {
    user-select: none;
    padding: 0 0.5rem;
    margin: 0.7rem 0;
    cursor: pointer;
    color: ${props => props.theme.colors.brand};
  }
  & .active > h3 {
    color: black;
  }
  & .menu-wrapper--inner > div:not(:last-child) {
    border-right: 1px solid ${props => props.theme.colors.lighterblue};
  }
  & .menu-item-wrapper {
    outline: none;
  }
  & a {
    text-decoration: none;
  }
  & .scroll-menu-arrow--disabled {
    opacity: 0.1;
  }
`

const StyledArrowLeft = styled.div`
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 10px solid ${props => props.theme.colors.lightblue};
  margin-right: 0.2rem;
  margin-left: 0.05rem;
  transform: scale(0.7, 2);
`

const StyledArrowRight = styled.div`
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 10px solid ${props => props.theme.colors.lightblue};
  margin-left: 0.2rem;
  margin-right: 0.05rem;
  transform: scale(0.7, 2);
`
