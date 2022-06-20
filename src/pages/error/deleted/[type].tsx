import { GetStaticPaths, GetStaticProps } from 'next'

import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks(() => <></>)

export const getStaticProps: GetStaticProps = () => {
  return { notFound: true }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
