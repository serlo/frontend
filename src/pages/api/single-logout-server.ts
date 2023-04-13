import type { NextRequest } from 'next/server'

export const config = {
  runtime: 'edge',
}

export default async function handler(req: NextRequest) {
  const cookies = req.cookies.getAll()
  return new Response(JSON.stringify(cookies))
}
