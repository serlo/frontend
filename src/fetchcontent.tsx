import fetch from 'isomorphic-unfetch'

export async function fetchContent(id, url) {
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
