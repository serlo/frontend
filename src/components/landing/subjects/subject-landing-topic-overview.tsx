import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'

import { MaxWidthDiv } from '../../navigation/max-width-div'
import { SubTopic } from '../../taxonomy/sub-topic'
import { deSubjectLandingSubjects } from '@/components/pages/subject-landing'
import { TaxonomySubTerm } from '@/data-types'
import { deSubjectLandingData } from '@/data/de/de-subject-landing-data'
import { isPartiallyInView } from '@/helper/is-partially-in-view'
import { tw } from '@/helper/tw'

interface SubjectLandingTopicOverviewProps {
  subterms: TaxonomySubTerm[]
  subject: deSubjectLandingSubjects
}

export function SubjectLandingTopicOverview({
  subterms,
  subject,
}: SubjectLandingTopicOverviewProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const topicContainer = useRef<HTMLDivElement>(null)

  const router = useRouter()

  const { extraTerms, allTopicsTaxonomyId } = deSubjectLandingData[subject]

  const allTopicsEntry = {
    title: '↪ Alle Themen',
    description: undefined,
    href: `/${allTopicsTaxonomyId}`,
  }

  function onMenuClick(index: number) {
    const indexToBeSet = index === selectedIndex ? -1 : index
    setSelectedIndex(indexToBeSet)

    if (indexToBeSet > -1 && topicContainer.current) {
      if (!isPartiallyInView(topicContainer.current, 150)) {
        scroll({
          top: topicContainer.current.offsetTop,
          behavior: 'smooth',
        })
      }
    }
  }

  return (
    <div>
      {renderMenu()}
      <div
        className="pt-3 md:ml-16 md:pt-6 [&_img]:mix-blend-multiply"
        ref={topicContainer}
      >
        <MaxWidthDiv>
          {selectedIndex > -1 ? (
            <SubTopic
              data={subterms[selectedIndex]}
              subid={subterms[selectedIndex].id}
              id={0}
            />
          ) : null}
        </MaxWidthDiv>
      </div>
      <style jsx>{`
        .placeholder:after {
          content: ' ';
          display: block;
          background: url('/_assets/img/landing/about-big-arrow.svg') no-repeat;
          transform: scaleX(-1);
          margin-top: 2.5rem;
          height: 5rem;
          max-width: 40rem;
          margin-left: -12rem;
        }
      `}</style>
    </div>
  )

  function renderMenu() {
    return (
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(12rem,_20rem))] justify-center [&_img]:mix-blend-multiply">
        {[...subterms, ...extraTerms, allTopicsEntry].map((term, index) => {
          const isActive = index === selectedIndex
          const src =
            term.description &&
            term.description[0] &&
            term.description?.[0].type === 'img'
              ? term.description?.[0].src
              : undefined
          const isExtraTerm = Object.hasOwn(term, 'href')

          return (
            <button
              key={term.title}
              className={clsx(
                tw`
                  m-2 flex min-h-[4rem]
                  w-auto rounded-xl p-2 text-left text-left font-bold
                  text-brand shadow-menu transition-colors hover:bg-brand/5
                `,

                isActive ? 'bg-brand/10 text-black hover:bg-brand/10' : '',
                src ? '' : 'pl-16'
              )}
              onClick={() =>
                isExtraTerm ? router.push(term.href) : onMenuClick(index)
              }
            >
              {src ? (
                <img src={src} className="mr-2 h-12 w-12 object-cover" />
              ) : null}
              {term.title.replace(' und ', ' & ')}
            </button>
          )
        })}
      </div>
    )
  }
}
