import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'de.serlo.org.app',
  appName: 'Serlo Gleichungs-App',
  webDir: 'out',
  server: {
    androidScheme: 'https',
  },
}

// eslint-disable-next-line import/no-default-export
export default config
