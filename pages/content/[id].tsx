import { fetchContent } from '../../src/fetchcontent'
import Main from '../../src/main'

export default function Content(props) {
  return <Main props={props} />
}

Content.getInitialProps = async ({ query }) => {
  return await fetchContent(query.id)
}
