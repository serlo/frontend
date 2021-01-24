export enum ExternalProvider {
  YouTube = 'YouTube',
  WikimediaCommons = 'WikimediaCommons',
  Vimeo = 'Vimeo',
  GeoGebra = 'GeoGebra',
  Twingle = 'Twingle',
  GoogleSearch = 'GoogleSearch',
}

export function useConsent() {
  const getKey = (provider: ExternalProvider) => `consent::${provider}`

  const checkConsent = (provider: ExternalProvider) => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem(getKey(provider)) == '1'
  }

  const giveConsent = (provider: ExternalProvider) => {
    if (typeof window === 'undefined') return
    localStorage.setItem(getKey(provider), '1')
  }

  const revokeConsent = (provider: ExternalProvider) => {
    if (typeof window === 'undefined') return
    localStorage.removeItem(getKey(provider))
  }

  return {
    checkConsent,
    giveConsent,
    revokeConsent,
  }
}
