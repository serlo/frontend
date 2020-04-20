import StyledH1 from '../src/components/tags/StyledH1'
import StyledH2 from '../src/components/tags/StyledH2'
import StyledH3 from '../src/components/tags/StyledH3'
import StyledP from '../src/components/tags/StyledP'
import styled from 'styled-components'
import StyledTable from '../src/components/tags/StyledTable'
import StyledTR from '../src/components/tags/StyledTR'
import StyledTD from '../src/components/tags/StyledTD'
import HSpace from '../src/components/content/HSpace'
import { RelatveContainer, MaxWidthDiv } from './[...slug]'
import ImgCentered from '../src/components/content/ImgCentered'
import StyledImg from '../src/components/tags/StyledImg'
import { ImageLink } from '../src/schema/articleRenderer'
import LayoutRow from '../src/components/content/LayoutRow'
import Col from '../src/components/content/Col'

const ContentWrapper = RelatveContainer

const ContentContainer = MaxWidthDiv

export default function Containers() {
  return (
    <>
      <StyledH1>Container Testpage</StyledH1>
      <StyledH2>Content Container</StyledH2>
      <StyledP>
        Content should be displayed full width on screen below 800px. On bigger
        screens, the content should be centered and limited to 800px.
      </StyledP>
      <StyledH3>Test 1: Normal Content</StyledH3>
      <ContentWrapper>
        <ContentContainer>
          <StyledP>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
            no sea takimata sanctus est Lorem ipsum dolor sit amet.
          </StyledP>
        </ContentContainer>
      </ContentWrapper>
      <StyledH3>Test 2: Small Content</StyledH3>
      <ContentWrapper>
        <ContentContainer>
          <StyledP>Hello World!</StyledP>
        </ContentContainer>
      </ContentWrapper>
      <StyledH3>Test 3: With Table</StyledH3>
      <ContentWrapper>
        <ContentContainer>
          <StyledP>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua.
          </StyledP>
          <StyledTable>
            <tbody>
              <StyledTR>
                <StyledTD>Lorem ipsum dolor sit amet</StyledTD>
                <StyledTD>consetetur sadipscing elitr</StyledTD>
                <StyledTD>sed diam nonumy eirmod tempor invidunt</StyledTD>
              </StyledTR>
              <StyledTR>
                <StyledTD>Lorem ipsum dolor sit amet</StyledTD>
                <StyledTD>consetetur sadipscing elitr</StyledTD>
                <StyledTD>sed diam nonumy eirmod tempor invidunt</StyledTD>
              </StyledTR>
            </tbody>
          </StyledTable>
        </ContentContainer>
      </ContentWrapper>
      <StyledH2>Image Container</StyledH2>
      <StyledP>
        Images should be centered, they should be shown as large as possible,
        but never scaled up or overflow the screen. Optionally, the width could
        be limited to a max width. Optionally, the image should be linkable.
      </StyledP>
      <StyledH3>Test 1: Simple Image</StyledH3>
      <ImgCentered>
        <StyledImg src="https://loremflickr.com/500/200"></StyledImg>
      </ImgCentered>
      <StyledH3>Test 2: Large Image</StyledH3>
      <ImgCentered>
        <StyledImg src="https://loremflickr.com/1500/200"></StyledImg>
      </ImgCentered>
      <StyledH3>Test 3: Large Image with max-width</StyledH3>
      <ImgCentered>
        <StyledImg
          src="https://loremflickr.com/1500/400"
          maxWidth={500}
        ></StyledImg>
      </ImgCentered>
      <StyledH3>Test 4: Small Image with max-width that is too big</StyledH3>
      <ImgCentered>
        <StyledImg
          src="https://loremflickr.com/300/300"
          maxWidth={500}
        ></StyledImg>
      </ImgCentered>
      <StyledH3>Test 5: Simple Image with Link without max-width</StyledH3>
      <ImgCentered>
        <ImageLink href="#">
          <StyledImg
            src="https://loremflickr.com/300/300"
            maxWidth={500}
          ></StyledImg>
        </ImageLink>
      </ImgCentered>
      <StyledH3>Test 6: Bigger Image with Link and max-width</StyledH3>
      <ImgCentered>
        <ImageLink href="#">
          <StyledImg
            src="https://loremflickr.com/800/300"
            maxWidth={500}
          ></StyledImg>
        </ImageLink>
      </ImgCentered>
      <StyledH2>Responsive Columns</StyledH2>
      <StyledP>
        Columns should be displayed side-by-side on bigger screens and below
        each other on smaller screen. It should handle all types of content
        well.
      </StyledP>
      <StyledH3>Test 1: Two equalsized columns</StyledH3>
      <LayoutRow>
        <Col cSize={1}>
          <StyledP>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua.
          </StyledP>
        </Col>
        <Col cSize={1}>
          <StyledP>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua.
          </StyledP>
        </Col>
      </LayoutRow>
      <StyledH3>Test 2: Two columns with ration 1:3</StyledH3>
      <LayoutRow>
        <Col cSize={1}>
          <StyledP>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua.
          </StyledP>
        </Col>
        <Col cSize={3}>
          <StyledP>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua.
          </StyledP>
        </Col>
      </LayoutRow>
      <StyledH3>Test 3: Columns with image</StyledH3>
      <LayoutRow>
        <Col cSize={1}>
          <StyledP>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua.
          </StyledP>
        </Col>
        <Col cSize={1}>
          <ImgCentered>
            <StyledImg src="https://loremflickr.com/1500/200"></StyledImg>
          </ImgCentered>
        </Col>
      </LayoutRow>
      <StyledH3>Test 4: Columns with table</StyledH3>
      <LayoutRow>
        <Col cSize={1}>
          <StyledP>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua.
          </StyledP>
        </Col>
        <Col cSize={1}>
          <StyledTable>
            <tbody>
              <StyledTR>
                <StyledTD>Lorem ipsum dolor sit amet</StyledTD>
                <StyledTD>consetetur sadipscing elitr</StyledTD>
                <StyledTD>sed diam nonumy eirmod tempor invidunt</StyledTD>
              </StyledTR>
              <StyledTR>
                <StyledTD>Lorem ipsum dolor sit amet</StyledTD>
                <StyledTD>consetetur sadipscing elitr</StyledTD>
                <StyledTD>sed diam nonumy eirmod tempor invidunt</StyledTD>
              </StyledTR>
            </tbody>
          </StyledTable>
        </Col>
      </LayoutRow>
      <HSpace amount={500} />
    </>
  )
}
