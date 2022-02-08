import clsx from 'clsx'
import { useState } from 'react'

import { MaxWidthDiv } from '../../navigation/max-width-div'
import { SubTopic } from '../../taxonomy/sub-topic'
import { TaxonomySubTerm } from '@/data-types'

interface LandingInformatikTopicOverviewProps {
  subterms: TaxonomySubTerm[]
}

export function LandingInformatikTopicOverview({
  subterms,
}: LandingInformatikTopicOverviewProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1)

  function onMenuClick(index: number) {
    setSelectedIndex(index === selectedIndex ? -1 : index)
  }

  return (
    <div>
      {renderMenu()}

      <div className="pt-3 md:pt-6 image-hack">
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
      <nav className="mx-side text-left">
        <ul className="max-w-full items-end text-center">
          {subterms.map((entry, index) => {
            const active = selectedIndex === index
            const className = clsx(
              'serlo-button rounded-xl tracking-slightly-tighter py-[3px] block mobile:inline-block',
              'mobile:mx-2 text-lg sm:text-xl mb-3.5',
              'hover:bg-brand-light',
              active
                ? 'serlo-make-interactive-transparent-blue bg-white hover:bg-white hover:text-brand'
                : 'text-white bg-brand'
            )

            return (
              <li key={entry.url} className="inline">
                <button
                  onClick={() => onMenuClick(index)}
                  className={className}
                >
                  {entry.title}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    )
  }
}
