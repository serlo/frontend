// a very specific monkey patch for the next.js router usage of history api
// only apply patch if we are on non default language subdomain

export function stripLocaleFromHistoryStateUrlMonkeyPatch() {
  function newHistoryFunction(method: any, lang: string) {
    return (state: any, title: any, url: any) => {
      if (!state || !state.__N) {
        return method(state, title, url)
      } else {
        const url_raw = state.as ?? '/'
        method(state, title, url_raw.replace(new RegExp(`^/${lang}`), ''))
      }
    }
  }

  if (
    typeof window !== 'undefined' &&
    /^(ta|hi|fr|es|en)\./.test(window.location.host)
  ) {
    const lang = window.location.host.substring(0, 2)
    const pushState = window.history.pushState.bind(window.history)
    const replaceState = window.history.replaceState.bind(window.history)
    window.history.pushState = newHistoryFunction(pushState, lang)
    window.history.replaceState = newHistoryFunction(replaceState, lang)
  }
}
