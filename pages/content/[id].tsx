import { fetchContent } from '../../src/fetchcontent'
import Main from '../../src/main'

function Content(props) {
  const { error, data } = props
  if (error) {
    return <p>Error while fetching data: {error}</p>
  } else {
    return <Main data={data} />
  }
}

Content.getInitialProps = async ({ query, req }) => {
  let url = id => `https://de.serlo.org/entities/${id}?format=json`
  if (typeof window !== 'undefined') {
    url = id => `${window.location.origin}/api/serloproxy/${id}`
  }
  return await fetchContent(query.id, url)
}

export default Content
