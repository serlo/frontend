import { notFound } from 'next/navigation'

import { SubjectLanding } from '@/components/pages/subject-landing'
import { InstanceData } from '@/data-types'
import { Instance } from '@/fetcher/graphql-types/operations'
import { subjectLandingGetStaticProps } from '@/fetcher/subject-landing/subject-landing-get-static-props'
import { getInstanceDataByLang } from '@/helper/feature-i18n'

const subject = 'mathe'

export default async function Page({
  params: { lang },
}: {
  params: { lang: Instance }
}) {
  if (lang !== 'de') notFound()
  const pageData = await subjectLandingGetStaticProps(lang, subject)
  return (
    <SubjectLanding
      subject={subject}
      pageData={pageData.props.pageData}
      locale={lang}
      instanceData={getInstanceDataByLang(lang) as InstanceData}
    />
  )
}
