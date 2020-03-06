import { fetchContent } from '../../src/fetchcontent'
import Main from '../../src/main'

export default function Content(props) {
  const { error, data } = props
  if (error) {
    return <p>Error while fetching data: {error}</p>
  } else {
    return <Main data={data} />
  }
}

Content.getInitialProps = async ({ query }) => {
  return await fetchContent(query.id)
}
