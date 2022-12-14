import clsx from 'clsx'

import { Lazy } from '../lazy'

const banner = {
  id: 'banner-testimonial-Maria_F',
  isLong: false,
  text: (
    <div className="text-center sm:text-left">
      <p className="my-5 font-handwritten mx-side text-[1em] text-truegray-700 leading-[2.2rem]">
        „ Ich nutze Serlo gern in meinem Unterricht, weil es mir bei der
        Differenzierung hilft. Ich weiß, dass ich mich auf die Qualität der
        Inhalte verlassen kann.
        <br />
        <span className="block mt-3">
          Deswegen unterstütze ich Serlo gern mit einer Spende.“
        </span>
      </p>
    </div>
  ),
  roles: ['Lehrerin', 'Spenderin'],
  username: 'Maria_F',
  imageSrc: 'https://community.serlo.org/avatar/Maria_F',
}

export function TestimonialDonationsPage() {
  return (
    <Lazy>
      <aside
        className={clsx(
          'relative mt-20 z-10',
          'pb-12 pt-6 text-center text-2xl overflow-x-hidden',
          'bg-[url("/_assets/img/landing/about-container.svg")] bg-no-repeat bg-bottom bg-[length:100vw_100%]',
          'sm:flex sm:justify-between sm:text-left sm:px-0',
          'pb-14 my-16 mt-24',
          'bg-[url("/_assets/img/landing/about-container.svg")]'
        )}
      >
        <figure className="mx-auto mt-6 max-w-[22rem] sm:mr-0 sm:max-w-[15rem] text-center">
          <img
            src={banner.imageSrc}
            className={clsx(
              'mx-auto rounded-full max-w-[12rem] sm:mt-2 sm:p-3'
            )}
          />
          <p className="text-base mt-1 font-bold text-gray-700">
            @{banner.username}
          </p>
          {renderRoles(banner.roles)}
        </figure>
        <div className="max-w-2xl mx-auto px-side sm:mt-8 lg:mt-12 sm:ml-0">
          {banner.text}
        </div>
      </aside>
    </Lazy>
  )

  function renderRoles(roles: string[] | undefined) {
    if (!roles) return null

    return (
      <b className="block text-[16px] text-brand -mt-1">{roles.join(', ')}</b>
    )
  }
}
