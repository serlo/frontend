import { faGithubSquare } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { lighten } from 'polished'
import styled from 'styled-components'

import { Link } from '@/components/content/link'
import { FooterNavigation } from '@/data-types'
import { makeResponsivePadding } from '@/helper/css'

const iconMapping = {
  newsletter: faEnvelope,
  github: faGithubSquare,
}

interface FooterNavProps {
  data: FooterNavigation
}

export function FooterNav({ data }: FooterNavProps) {
  return (
    <FooterNavGrid>
      <nav>
        <FooterNavContainer>
          {data.map((category, index) => (
            <ColWithPadding key={index}>
              <CategoryHeader>{category.title}</CategoryHeader>
              <NavList>
                {category.children.map((link, childindex) => (
                  <NavLi key={index + childindex}>
                    <NavLink
                      href={link.url}
                      noExternalIcon
                      path={['footer', index, childindex]}
                    >
                      {link.icon && (
                        <FontAwesomeIcon
                          icon={iconMapping[link.icon]}
                          size="1x"
                        />
                      )}{' '}
                      {link.title}
                    </NavLink>
                  </NavLi>
                ))}
              </NavList>
            </ColWithPadding>
          ))}
        </FooterNavContainer>
      </nav>
    </FooterNavGrid>
  )
}

const FooterNavGrid = styled.div`
  padding: 8px 0 40px;
  background-color: ${(props) => props.theme.colors.lightBackground};
`

const FooterNavContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
`

const ColWithPadding = styled.div`
  margin-top: 16px;
  padding: 0;
  ${makeResponsivePadding}
  box-sizing: border-box;
  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    flex-grow: 1;
    flex-basis: 0;
  }
  @media (max-width: ${(props) =>
      props.theme.breakpointsMax.md}) and (min-width: ${(props) =>
      props.theme.breakpoints.sm}) {
    flex-basis: 50%;
    max-width: 50%;
  }
  @media (max-width: ${(props) => props.theme.breakpointsMax.sm}) {
    flex-basis: 100%;
    max-width: 100%;
  }
`

const CategoryHeader = styled.h3`
  font-size: 1rem;
  margin-bottom: 8px;
  color: ${(props) => lighten(0.05, props.theme.colors.dark1)};
  display: block;
  margin-block-start: 1em;
  font-weight: bold;
`

const NavList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  line-height: 1.35;
`

const NavLi = styled.li`
  display: inline-block;

  &:after {
    content: ' • ';
    color: ${(props) => lighten(0.2, props.theme.colors.dark1)};
    margin-right: 6px;
  }
  &:last-child:after {
    content: '';
  }

  @media (min-width: ${(props) => props.theme.breakpoints.sm}) {
    display: block;
    margin-top: 2px;

    &:after {
      content: '';
      display: none;
    }
  }
`

const NavLink = styled(Link)`
  @media (max-width: ${(props) => props.theme.breakpointsMax.sm}) {
    display: inline-block;
    padding: 8px 0;
  }
  color: ${(props) => lighten(0.15, props.theme.colors.dark1)} !important;
  text-decoration: none !important;
  border-bottom: 2px solid transparent;

  &:focus {
    text-decoration: none;
    color: ${(props) => lighten(0.1, props.theme.colors.dark1)} !important;
  }

  &:hover,
  &:active {
    color: ${(props) => props.theme.colors.black} !important;
    text-decoration: underline;
    border-bottom: 2px solid transparent;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.sm}) {
    &:hover,
    &:active {
      border-bottom: 2px solid
        ${(props) => lighten(0.2, props.theme.colors.black)};
      text-decoration: none;
    }
  }
`
