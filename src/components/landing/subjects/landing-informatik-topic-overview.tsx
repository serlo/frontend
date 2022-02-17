import clsx from 'clsx'
import { useRef, useState } from 'react'

import { MaxWidthDiv } from '../../navigation/max-width-div'
import { SubTopic } from '../../taxonomy/sub-topic'
import { TaxonomySubTerm } from '@/data-types'
import { isPartiallyInView } from '@/helper/is-partially-in-view'

interface LandingInformatikTopicOverviewProps {
  subterms: TaxonomySubTerm[]
}

export function LandingInformatikTopicOverview({
  subterms,
}: LandingInformatikTopicOverviewProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const topicContainer = useRef<HTMLDivElement>(null)

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

      <div className="pt-3 md:pt-6 md:ml-16 image-hack" ref={topicContainer}>
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
      <style jsx global>
        {`
          .image-hack img {
            mix-blend-mode: multiply;
          }
        `}
      </style>
    </div>
  )

  function renderMenu() {
    return (
      <div
        className="image-hack grid justify-center"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(12rem, 20rem))',
        }}
      >
        {subterms.map((term, index) => {
          const isActive = index === selectedIndex
          const src =
            term.description?.[0].type === 'img'
              ? term.description?.[0].src
              : undefined

          return (
            <button
              key={term.title}
              className={clsx(
                'flex p-2 m-2 text-left font-bold text-brand',
                'rounded-xl hover:bg-brand/5 transition-colors shadow-menu',
                isActive ? 'text-black bg-brand/10 hover:bg-brand/10' : '',
                src ? '' : 'pl-16'
              )}
              onClick={() => onMenuClick(index)}
            >
              {src ? (
                <img src={src} className="w-12 h-12 object-cover mr-2" />
              ) : null}
              {term.title.replace(' und ', ' & ')}
            </button>
          )
        })}
      </div>
    )
  }
}
