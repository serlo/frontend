import type { NProgress } from 'nprogress'
import { createContext, useContext } from 'react';

export const ProgressContext = createContext<NProgress | null>(null)

export const ProgressProvider = ProgressContext.Provider

export function useProgress() {
  return useContext(ProgressContext);
}
