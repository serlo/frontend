import Cors from 'micro-cors'
import { fetchContent } from '../../../src/fetchcontent'

const cors = Cors({
  allowMethods: ['GET', 'HEAD']
})

function handler(req, res) {
  const {
    query: { id }
  } = req

  return fetchContent(
    id,
    id => `https://de.serlo.org/entities/${id}?format=json`
  ).then(data => res.json(data.data))
}

export default cors(handler)
