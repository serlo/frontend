import { useRef, useState } from 'react'

import { renderedPageNoHooks } from '@/helper/rendered-page'

export interface LegalData {
  contentHtml: string
  isGerman: boolean
}

export default renderedPageNoHooks(() => {
  return <Content />
})

export function Content() {
  const [status, setStatus] = useState<'no-uploads' | '' | 'uploaded'>(
    'no-uploads'
  )
  const inputRef = useRef<HTMLInputElement>(null)

  function upload() {
    const files = inputRef.current?.files
    if (!files) return

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      retrieveNewURL(file, (file: File, url: string) => {
        uploadFile(file, url)
      })
    }
  }

  // `retrieveNewURL` accepts the name of the current file and invokes the `/presignedUrl` endpoint to
  // generate a pre-signed URL for use in uploading that file:
  function retrieveNewURL(file: File, cb: (file: File, url: string) => void) {
    fetch(`/api/presigned?name=${file.name}`)
      .then((response) => {
        void response.text().then((url) => {
          cb(file, url)
        })
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e)
      })
  }

  // `uploadFile` accepts the current filename and the pre-signed URL. It then uses `Fetch API`
  // to upload this file to S3 at `play.min.io:9000` using the URL:
  function uploadFile(file: File, url: string) {
    if (status === 'no-uploads') setStatus('')
    fetch(JSON.parse(url) as string, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then(() => {
        console.log(file.name)
        setStatus('uploaded')
        // eslint-disable-next-line no-console
        // document.querySelector('#status').innerHTML +=
        //   `<br>Uploaded ${file.name}.`
      })
      .catch((e) => {
        console.log('catched')
        // eslint-disable-next-line no-console
        console.error(e)
      })
  }

  return (
    <>
      <input type="file" ref={inputRef} multiple />
      <button onClick={upload}>Upload</button>

      <div>
        {status === 'no-uploads'
          ? 'No uploads'
          : status === 'uploaded'
            ? 'Uploaded!'
            : ''}
      </div>
    </>
  )
}
