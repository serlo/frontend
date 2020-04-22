import StyledP from '../tags/StyledP'
import StyledA from '../tags/StyledA'

export default function LicenseNotice({ data }) {
  return (
    <StyledP>
      <StyledA href={data.url}>{data.title}</StyledA> (
      <StyledA href={`https://de.serlo.org/license/detail/${data.id}`}>
        Information
      </StyledA>
      )
    </StyledP>
  )
}
