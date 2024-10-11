import { TopicCategories } from './topic-categories'
import { Link } from '@/components/content/link'
import { TaxonomySubTerm } from '@/data-types'
import { EditorRenderer } from '@/serlo-editor-integration/editor-renderer'

export interface SubTopicProps {
  data: TaxonomySubTerm
  subid: number
  id: number
  hideTitle?: boolean
}

export function SubTopic({ data, subid, hideTitle }: SubTopicProps) {
  return (
    <>
      {hideTitle ? null : (
        <h2 className="serlo-h2 my-3 hyphens-auto border-0">
          <Link href={data.url}>{data.title}</Link>
        </h2>
      )}

      <div className="mb-5 flex flex-col border-b border-gray-300 pb-6 text-left last:border-b-0 sm:flex-row">
        <div className="flex-[1_1_40%]">
          {' '}
          <div className="mt-6 sm:mb-5">
            <EditorRenderer document={data.description} />
          </div>
        </div>

        <TopicCategories data={data} subid={subid} />
      </div>
    </>
  )
}
