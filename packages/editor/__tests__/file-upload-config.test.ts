/**
 * Tests for configurable file upload functionality
 */

import { expect, test, describe, vi } from 'vitest'
import type {
  FileUploadConfig,
  UploadHandler,
} from '@editor/core/contexts/editor-meta-context'

// Test the FileUploadConfig type and UploadHandler interface
describe('File Upload Configuration', () => {
  test('Custom upload handler signature is correct', async () => {
    const mockUploadHandler: UploadHandler = vi.fn(async (file: File) => {
      // Simulate file upload
      return `https://example.com/uploads/${file.name}`
    })

    const testFile = new File(['test content'], 'test.jpg', {
      type: 'image/jpeg',
    })

    const result = await mockUploadHandler(testFile)
    expect(result).toBe('https://example.com/uploads/test.jpg')
    expect(mockUploadHandler).toHaveBeenCalledWith(testFile)
  })

  test('Custom upload handler error is caught and wrapped', async () => {
    const mockUploadHandler: UploadHandler = vi.fn(async () => {
      throw new Error('Upload failed')
    })

    const testFile = new File(['test content'], 'test.jpg', {
      type: 'image/jpeg',
    })

    await expect(mockUploadHandler(testFile)).rejects.toThrow('Upload failed')
  })

  test('Custom upload handler with non-Error rejection', async () => {
    const mockUploadHandler: UploadHandler = vi.fn(async () => {
      // eslint-disable-next-line prefer-promise-reject-errors
      throw 'String error'
    })

    const testFile = new File(['test content'], 'test.jpg', {
      type: 'image/jpeg',
    })

    await expect(mockUploadHandler(testFile)).rejects.toBe('String error')
  })

  test('FileUploadConfig with custom upload handler', () => {
    const uploadHandler: UploadHandler = async (file: File) => {
      return `https://custom.com/${file.name}`
    }

    const config: FileUploadConfig = {
      uploadHandler,
      allowedImageDomains: ['custom.com'],
    }

    expect(config.uploadHandler).toBeDefined()
    expect(config.allowedImageDomains).toEqual(['custom.com'])
  })

  test('FileUploadConfig with presigned URL endpoint', () => {
    const config: FileUploadConfig = {
      presignedUrlEndpoint: 'https://api.custom.com/presigned-url',
      allowedImageDomains: ['cdn.custom.com'],
    }

    expect(config.presignedUrlEndpoint).toBe(
      'https://api.custom.com/presigned-url'
    )
    expect(config.allowedImageDomains).toEqual(['cdn.custom.com'])
  })

  test('FileUploadConfig with wildcard allowed domains', () => {
    const config: FileUploadConfig = {
      allowedImageDomains: ['*.gitea.example.com', 'cdn.example.com'],
    }

    expect(config.allowedImageDomains).toContain('*.gitea.example.com')
    expect(config.allowedImageDomains).toContain('cdn.example.com')
  })
})
