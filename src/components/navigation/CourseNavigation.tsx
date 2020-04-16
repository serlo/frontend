import StyledOl from '../tags/StyledOl'
import StyledLi from '../tags/StyledLi'
import StyledA from '../tags/StyledA'

export default function CourseNavigation(props) {
  return (
    <StyledOl>
      {props.pages.map(page => (
        <StyledLi key={page.alias}>
          <StyledA href={page.alias}>{page.currentRevision.title}</StyledA>
        </StyledLi>
      ))}
    </StyledOl>
  )
}
