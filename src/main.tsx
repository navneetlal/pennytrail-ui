import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { localStorageColorSchemeManager, MantineProvider } from '@mantine/core'

import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/notifications/styles.css'
import '@mantine/charts/styles.css'

import './index.css'
import App from './App.tsx'

// Theme configuration
// const theme = {
//   colors: {
//     brand: [
//       '#E7F5FF',
//       '#D0EBFF',
//       '#A5D8FF',
//       '#74C0FC',
//       '#4DABF7',
//       '#339AF0',
//       '#228BE6',
//       '#1C7ED6',
//       '#1971C2',
//       '#1864AB',
//     ],
//   },
//   primaryColor: 'brand',
//   primaryShade: 6,
//   fontFamily: 'Inter, sans-serif',
//   components: {
//     Card: {
//       defaultProps: {
//         shadow: 'sm',
//         radius: 'md',
//         p: 'lg',
//       },
//     },
//   },
// };

const colorSchemeManager = localStorageColorSchemeManager({
  key: 'pennytrail-color-scheme',
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider colorSchemeManager={colorSchemeManager}>
      <App />
    </MantineProvider>
  </StrictMode>
)
