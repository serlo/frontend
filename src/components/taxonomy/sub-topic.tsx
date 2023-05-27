import { TopicCategories } from './topic-categories'
import { Link } from '@/components/content/link'
import { TaxonomySubTerm } from '@/data-types'
import { renderArticle } from '@/schema/article-renderer'

export interface SubTopicProps {
  data: TaxonomySubTerm
  subid: number
  id: number
  hideTitle?: boolean
}

export function SubTopic({ data, subid, id, hideTitle }: SubTopicProps) {
  return (
    <>
      {hideTitle ? null : (
        <h2 className="my-3 serlo-h2 border-0 special-hyphens-auto">
          <Link href={data.url}>{data.title}</Link>
        </h2>
      )}

      <div className="mb-5 pb-6 flex flex-col sm:flex-row border-b border-gray-300 last:border-b-0 text-left">
        <div style={{ flex: '1 1 40%' }}>
          {' '}
          <div className="mt-6 sm:mb-5">
            {data.description &&
              renderArticle(data.description, `tax${id}`, `subtopic${subid}`)}
          </div>
        </div>

        <TopicCategories data={data} subid={subid} />
      </div>
    </>
  )
}
