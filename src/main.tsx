import Header from './header'
import Toolbox from './toolbox'
import Footer from './footer'
import styled from 'styled-components'

import ContentTypes from './content-api/contenttypes'
import { DummyContainer } from './visuals'

export default function Main(props) {
  const { data } = props
  return (
    <div lang="de">
      <Header />
      <Toolbox />
      <DummyContainer>
        <ContentTypes data={data} />
      </DummyContainer>
      <Footer />
    </div>
  )
}
