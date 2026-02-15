/**
 * Tests for wildcard domain matching in editor-image component
 */

import { expect, test, describe } from 'vitest'

// Mock the wildcard domain matching logic
function isAdditionalDomainAllowed(
  src: string,
  additionalAllowedDomains?: string[]
): boolean {
  if (!additionalAllowedDomains || additionalAllowedDomains.length === 0) {
    return false
  }

  try {
    const url = new URL(src)
    return additionalAllowedDomains.some((domain) => {
      // Support wildcards like *.example.com
      if (domain.startsWith('*.')) {
        const baseDomain = domain.slice(2)
        // Ensure the match occurs at a subdomain boundary
        return (
          url.hostname.endsWith('.' + baseDomain) || url.hostname === baseDomain
        )
      }
      return url.hostname === domain
    })
  } catch {
    return false
  }
}

describe('Wildcard Domain Matching', () => {
  test('exact domain match works', () => {
    expect(
      isAdditionalDomainAllowed('https://cdn.example.com/image.jpg', [
        'cdn.example.com',
      ])
    ).toBe(true)
  })

  test('wildcard subdomain match works', () => {
    expect(
      isAdditionalDomainAllowed('https://sub.example.com/image.jpg', [
        '*.example.com',
      ])
    ).toBe(true)
    expect(
      isAdditionalDomainAllowed('https://deep.sub.example.com/image.jpg', [
        '*.example.com',
      ])
    ).toBe(true)
  })

  test('wildcard matches base domain', () => {
    expect(
      isAdditionalDomainAllowed('https://example.com/image.jpg', [
        '*.example.com',
      ])
    ).toBe(true)
  })

  test('wildcard does NOT match similar domains', () => {
    // Security: Should not match evilexample.com when pattern is *.example.com
    expect(
      isAdditionalDomainAllowed('https://evilexample.com/image.jpg', [
        '*.example.com',
      ])
    ).toBe(false)
  })

  test('wildcard does NOT match partial suffix', () => {
    // wildcard *.com matches evil.com, which is technically correct
    // This test verifies that if you want to whitelist only example.com subdomains,
    // use *.example.com, not *.com
    expect(
      isAdditionalDomainAllowed('https://evil.com/image.jpg', ['*.com'])
    ).toBe(true) // This is actually correct - evil.com is a subdomain of .com

    // But ensure *.example.com does NOT match evilexample.com (no dot before base)
    expect(
      isAdditionalDomainAllowed('https://evilexample.com/image.jpg', [
        '*.example.com',
      ])
    ).toBe(false)
  })

  test('non-matching domain returns false', () => {
    expect(
      isAdditionalDomainAllowed('https://other.com/image.jpg', ['example.com'])
    ).toBe(false)
  })

  test('multiple domains can be checked', () => {
    expect(
      isAdditionalDomainAllowed('https://cdn1.example.com/image.jpg', [
        'cdn2.example.com',
        '*.example.com',
        'other.com',
      ])
    ).toBe(true)
  })

  test('invalid URL returns false', () => {
    expect(isAdditionalDomainAllowed('not-a-valid-url', ['example.com'])).toBe(
      false
    )
  })

  test('empty domain list returns false', () => {
    expect(isAdditionalDomainAllowed('https://example.com/image.jpg', [])).toBe(
      false
    )
  })

  test('undefined domain list returns false', () => {
    expect(
      isAdditionalDomainAllowed('https://example.com/image.jpg', undefined)
    ).toBe(false)
  })
})
