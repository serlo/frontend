import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const embedUrl = `https://app.Lumi.education/api/v1/run/${
    req.query.id as string
  }/embed`

  const lumiRes = await fetch(embedUrl)
  const html = await lumiRes.text()

  const prepared = html
    .replace(/(<script\s+src=")\/api\/v1\/h5p/g, '$1/api/frontend/lumi/proxy')
    .replace(
      /("stylesheet"\s+href=")\/api\/v1\/h5p/g,
      '$1/api/frontend/lumi/proxy'
    )
    .replace('"url": "/api/v1/h5p"', '"url": "/api/frontend/lumi/proxy"')
    .replace(
      '"contentUserData": "/api/v1/h5p/contentUserData/:contentId/:dataType/:subContentId"',
      '"contentUserData": "/api/frontend/lumi/proxy/contentUserData/:contentId/:dataType/:subContentId"'
    )
    .replace(
      '"setFinished": "/api/v1/h5p/finishedData"',
      '"setFinished": "/api/frontend/lumi/proxy/finishedData"'
    )
    .replace(
      '   </script>',
      `
    H5P.externalDispatcher.on('xAPI', function(event){
      if (event.getVerb() == 'answered') {
        if (event.getScore() === event.getMaxScore() && event.getMaxScore() > 0) {
          window.parent.document.body.dispatchEvent(new CustomEvent('h5pExerciseCorrect', {detail: '${
            req.query.id as string
          }'}))
        } else {
          window.parent.document.body.dispatchEvent(new CustomEvent('h5pExerciseWrong', {detail: '${
            req.query.id as string
          }'}))
        }
      }
    })
    </script>`
    )

  //console.log(prepared)
  res.setHeader('Content-Type', lumiRes.headers.get('Content-Type') ?? '')

  res.send(prepared)
}
