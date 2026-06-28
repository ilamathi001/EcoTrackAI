import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ecotrack.ai',
  appName: 'EcoTrackAI',

  // Angular build output folder
  webDir: 'dist/ecotrack-ui',

  bundledWebRuntime: false,

  server: {
    androidScheme: 'https',
    cleartext: false
  }
};

export default config;