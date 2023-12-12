import { cn } from '@serlo/tailwind/helper/cn'

import { Lazy } from '../lazy'

const banner = {
  id: 'banner-testimonial-Maria_F',
  isLong: false,
  text: (
    <div className="text-center sm:text-left">
      <p className="mx-side my-5 font-handwritten text-[1em] leading-[2.2rem] text-almost-black">
        „ Ich nutze Serlo gern in meinem Unterricht, weil es mir bei der
        Differenzierung hilft. Ich weiß, dass ich mich auf die Qualität der
        Inhalte verlassen kann.
        <br />
        <span className="mt-3 block">
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
        className={cn(`
          relative z-10 my-16 mt-20 mt-24 
          overflow-x-hidden bg-[url("/_assets/img/landing/about-container.svg")] 
          bg-[url("/_assets/img/landing/about-container.svg")] bg-[length:100vw_100%] bg-bottom bg-no-repeat 
          pb-12 pb-14 pt-6 text-center text-2xl
          sm:flex sm:justify-between sm:px-0 sm:text-left
        `)}
      >
        <figure className="mx-auto mt-6 max-w-[22rem] text-center sm:mr-0 sm:max-w-[15rem]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={banner.imageSrc}
            className="mx-auto max-w-[12rem] rounded-full sm:mt-2 sm:p-3"
          />
          <p className="mt-1 text-base font-bold text-gray-700">
            @{banner.username}
          </p>
          {renderRoles(banner.roles)}
        </figure>
        <div className="mx-auto max-w-2xl px-side sm:ml-0 sm:mt-8 lg:mt-12">
          {banner.text}
        </div>
      </aside>
    </Lazy>
  )

  function renderRoles(roles: string[] | undefined) {
    if (!roles) return null

    return (
      <b className="-mt-1 block text-[16px] text-brand">{roles.join(', ')}</b>
    )
  }
}
