import fetch from 'isomorphic-unfetch'

const url = id => `https://de.serlo.org/entities/${id}?format=json`

export async function fetchContent(id) {
  // this prototype only handles numeric ids
  if (/^\d+$/.test(id)) {
    const res = await fetch(url(id))
    if (res.status === 200) {
      const json = await res.json()
      return { data: json }
    } else {
      return { error: 'bad response' }
    }
  }
  return { error: 'bad id' }
}
