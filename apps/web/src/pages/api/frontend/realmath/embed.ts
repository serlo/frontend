import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = req.query.url as string

  const parts = url
    .split('/')
    .reverse()
    .filter((x) => x)

  const realMathResp = await fetch('https://realmath.de' + url)
  const html = await realMathResp.text()

  return res.send(
    html
      .replace(
        /<script\s+type="text\/javascript">\s*<!--\s*HTML\s+encoded\s*-->\s*<!--\s*document\.write\(unescape\('([^']+)'\)\);\s*\/\/-->\s*<\/script>/g,
        (a, b) => `${decodeURIComponent(b as string)}`
      )
      .replace(
        /\.\.\/\.\.\/\.\.\//g,
        'https://realmath.de/' + parts.slice(4).reverse().join('/') + '/'
      )
      .replace(
        /src="(?!https?:\/\/)(.*?)"/gi,
        'src="' +
          'https://realmath.de/' +
          parts.slice(1).reverse().join('/') +
          '/$1"'
      )
      .replace(
        'https://www.realmath.de/geogeb50js/web.nocache.js"></script>',
        `https://cdn.geogebra.org/apps/deployggb.js"></script>
       
      <script>
        var params = {
          "appName": "graphing", 
          "width": 1, 
          "height": 1, 
          "showToolBar": true, 
          "showAlgebraInput": true, 
          "showMenuBar": true,
          };
        var ggbApplet = new GGBApplet(params, true);
        window.addEventListener("load", function() { 
          ggbApplet.inject('ggbApplet');
        });
      </script>   
       
       `
      )
      .replace('geogebraweb"', 'geogebraweb" id="ggbApplet"')
      .replace(
        '</body>',
        `
      
        <style>
          header {
            display: none;
          }
          .scoreButton {
            display: none;
          }
          .spendenspalte {
            display: none;
          }
            footer {
            margin-top: 100px;
          }
        </style>
        <script>
          function handler() {
            const wertung = document.getElementById('wertung')
            let score = -1
            if (wertung) {
              const text = wertung.innerText.trim()
              if (text && text.includes('Punkte')) {
                const startIndex = text.indexOf('Aktueller Stand: ')
                score = parseInt(text.slice(startIndex).replace('Aktueller Stand: ', ''))
              }
            }
            if (score > 0) {
              console.log('sending score', score)
              window.top.postMessage('score' + score.toString(), '*')
            }
            setTimeout(handler, 1000)
          }

          setTimeout(handler, 1000)

          try {
            document.querySelector('input[name="Auswahl007"]').click()
          } catch (e) {}
        </script>
      </body>
      `
      )
  )
}
