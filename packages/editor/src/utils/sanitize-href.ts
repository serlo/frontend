import DOMPurify from 'dompurify'

export function sanitizeHref(href: string) {
  // Users can add links to content in the editor. So, href can be manipulated by the user and could potentially be abused to inject malicious javascript. We use DOMPurify to validate the href.
  // Examples:
  // - 'javascript:doSomethingBad()' -> invalid
  // - 'https://example.com/' -> valid
  const isHrefValid = DOMPurify.isValidAttribute('a', 'href', href)

  return isHrefValid ? href : ''
}
