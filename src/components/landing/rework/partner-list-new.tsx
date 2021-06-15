import clsx from 'clsx'

export function PartnerListNew() {
  return (
    <div className="mt-auto mb-7">
      <div
        className={clsx(
          'flex flex-wrap justify-evenly mx-side',
          'sm:justify-center max-w-5xl sm:mx-auto',
          'text-gray-800 -mb-16'
        )}
      >
        {renderLogo(
          'Beisheim Stiftung',
          'https://packages.serlo.org/serlo-org-static-assets@1/de/home/logo-beisheim.png'
        )}
        {renderLogo(
          'Ludwig-Maximilians-Universität München',
          'https://packages.serlo.org/serlo-org-static-assets@1/de/home/logo-lmu.svg'
        )}
        {renderLogo(
          'Technische Universität München',
          'https://packages.serlo.org/serlo-org-static-assets@1/de/home/logo-tum.svg'
        )}
        {renderLogo(
          'Wikimedia Deutschland',
          'https://packages.serlo.org/serlo-org-static-assets@1/de/home/logo-wikimedia.svg'
        )}
        {renderLogo(
          'Europäische Kommission',
          'https://packages.serlo.org/serlo-org-static-assets@1/de/home/logo-eu.svg'
        )}
        {renderLogo(
          'Ashoka Deutschland',
          'https://packages.serlo.org/serlo-org-static-assets@1/de/home/logo-ashoka.png'
        )}
        {renderLogo(
          'Hasso-Plattner-Institut',
          'https://packages.serlo.org/serlo-org-static-assets@1/de/home/logo-hpi.png'
        )}
      </div>
    </div>
  )

  function renderLogo(title: string, url: string) {
    return (
      <img
        className={clsx('max-h-12 px-8 mb-16 sm:px-16')}
        style={{ filter: 'invert(1)', opacity: '0.45' }}
        src={url}
        alt={title}
        title={title}
      />
    )
  }
}
