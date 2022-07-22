import { gql } from 'graphql-request'
import { useEffect } from 'react'

import { useGraphqlSwrWithAuth } from '@/api/use-graphql-swr'
import { PageTitle } from '@/components/content/page-title'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { MediaType, MediaUploadQuery } from '@/fetcher/graphql-types/operations'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks(() => (
  <FrontendClientBase>
    <Content />
  </FrontendClientBase>
))

function Content() {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { data } = useUploadUrlFetch(MediaType.ImageJpeg)
  console.log(data)

  const uploadUrl = data?.media.upload.uploadUrl

  useEffect(() => {
    // const formData = new FormData()
    // formData.append('image', fileInput.files[0], 'Your_iamge_URL')

    const fetchData = async () => {
      if (!uploadUrl) return null
      const uploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'image/jpeg' },
        body: JSON.stringify(data),
      })
      console.log(uploadResponse)
    }

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error)
  }, [])

  return (
    <>
      <PageTitle title="test" headTitle />
      <p className="serlo-p">123</p>
    </>
  )
}

function useUploadUrlFetch(mediaType: MediaType) {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  return useGraphqlSwrWithAuth<MediaUploadQuery>({
    query: uploadUrlQuery,
    variables: { mediaType },
    config: {
      refreshInterval: 1 * 1000, // seconds
    },
  })
}

const uploadUrlQuery = gql`
  query mediaUpload($mediaType: MediaType!) {
    media {
      upload(mediaType: $mediaType) {
        uploadUrl
        urlAfterUpload
      }
    }
  }
`
