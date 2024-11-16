import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { localStorageColorSchemeManager, MantineProvider } from '@mantine/core'
import theme from './theme.ts'

import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/notifications/styles.css'
import '@mantine/charts/styles.css'

import './index.css'
import App from './App.tsx'

const colorSchemeManager = localStorageColorSchemeManager({
  key: 'pennytrail-color-scheme',
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider colorSchemeManager={colorSchemeManager} theme={theme}>
      <App />
    </MantineProvider>
  </StrictMode>
)
