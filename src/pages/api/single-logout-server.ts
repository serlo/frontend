export default function handler() {
  const res = new Response('test')
  res.headers.append('Set-Cookie', 'ory_kratos_session=test; HttpOnly; Secure;')
  return res
}

export const config = {
  runtime: 'edge',
}
