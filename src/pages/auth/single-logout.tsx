import { useEffect } from 'react'

import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks(() => {
  useEffect(() => {
    console.log(document.cookie)
  })

  return <>test</>
})
