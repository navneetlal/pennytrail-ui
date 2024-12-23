import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route } from 'react-router'

import { localStorageColorSchemeManager, MantineProvider } from '@mantine/core'
import theme from './theme.ts'

import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/notifications/styles.css'
import '@mantine/charts/styles.css'

import './index.css'
import App from './App.tsx'
import { LoginPage } from './components/LoginPage.tsx'
import { RegisterPage } from './components/RegisterPage.tsx'
import { Routes } from 'react-router'
import { UserProvider } from './UserContext.tsx'

const colorSchemeManager = localStorageColorSchemeManager({
  key: 'pennytrail-color-scheme',
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider colorSchemeManager={colorSchemeManager} theme={theme}>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<App />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </MantineProvider>
  </StrictMode>
)
