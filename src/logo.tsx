import styled from 'styled-components'

export default function Logo(props) {
  return (
    <>
      <Header>
        <Link href="#">
          <Image alt="Serlo" src={'/img/serlo-logo.svg'} />
        </Link>
      </Header>
      {!props.subline ? null : (
        <SublineH2>
          <SublineLink className="subline icon" href="#">
            {props.subline}
          </SublineLink>
        </SublineH2>
      )}
    </>
  )
}

const Header = styled.h1`
  padding-bottom: 0;
  margin-bottom: -0.85rem;
`

const Link = styled.a`
  border: 0 !important;
  padding-bottom: 0;
`
const SublineLink = styled(Link)`
  color: rgb(90, 101, 112);
  font-weight: 500;
  font-size: 1.66rem;
  /* padding-left: 0.5rem; */
  /* display: block; */
  line-height: 1.4;
  letter-spacing: 0.04rem;
  text-decoration: none;

  &:hover {
    color: rgb(0, 126, 193);
  }
`
const SublineH2 = styled.h2`
  padding-left: 1.5rem;

  @media screen and (min-width: 18rem) {
    padding-left: 3.5rem;
  }

  @media screen and (max-width: 15rem) {
    padding-left: 0.5rem;
  }
`

const Image = styled.img`
  width: 9rem;
  padding: 0.8rem 0 0 0.67rem;
`
