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

  let prepared = html
    .replace(
      '<link rel="stylesheet" href="https://lumi.s3.fr-par.scw.cloud/h5p/core/styles/h5p.css?version=1.24-master"/>',
      '<link rel="stylesheet" href="/_assets/h5p/h5p.css"/>'
    )
    .replace(
      '<link rel="stylesheet" href="https://lumi.s3.fr-par.scw.cloud/h5p/libraries/FontAwesome-4.5/h5p-font-awesome.min.css?version=4.5.4"/>',
      '<link rel="stylesheet" href="/_assets/h5p/h5p-font-awesome.min.css"/>'
    )
    .replace(
      '<link rel="stylesheet" href="https://lumi.s3.fr-par.scw.cloud/h5p/libraries/H5P.FontIcons-1.0/styles/h5p-font-icons.css?version=1.0.11"/>',
      '<link rel="stylesheet" href="/_assets/h5p/h5p-font-icons.css"/>'
    )
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

  if (prepared.includes('"library": "H5P.DragQuestion 1.14"')) {
    // use cached bundle
    const regex =
      /<link [^>]*href="[^"]*"[^>]*>|<script [^>]*src="[^"]*"[^>]*><\/script>/g

    // Remove the matched tags from the 'prepared' variable
    prepared = prepared.replace(regex, '')

    prepared = prepared.replace(
      '<meta charset="utf-8">',
      `
      <meta charset="utf-8">
      <link rel="stylesheet" href="/_assets/h5p/h5p_drag_question_1_14_min.css"/>
      <script src="/_assets/h5p/h5p_drag_question_1_14.js"></script>
      <script src="/_assets/h5p/image.js"></script>
      <script src="/_assets/h5p/mathdisplay.js"></script>
    `
    )
  }

  //console.log(prepared)
  res.setHeader('Content-Type', lumiRes.headers.get('Content-Type') ?? '')

  res.send(prepared)
}
