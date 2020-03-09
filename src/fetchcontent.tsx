import fetch from 'isomorphic-unfetch'

export async function fetchContent(id) {
  // this prototype only handles numeric ids
  if (/^\d+$/.test(id)) {
    const url = `https://de.serlo.org/entities/${id}`
    const res = await fetch(url)
    if (res.status === 200) {
      const json = await res.json()
      return { data: json }
    } else {
      return { error: 'bad response' }
    }
  }
  return { error: 'bad id' }
}
