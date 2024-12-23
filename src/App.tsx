import { lazy, Suspense, useEffect, useState } from 'react'
import {
  AppShell,
  Burger,
  useMantineTheme,
  Group,
  Stack,
  Title,
  Switch,
  NavLink,
  Divider,
  rem,
  useMantineColorScheme,
  Center,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import {
  IconWallet,
  IconReportMoney,
  IconPigMoney,
  IconCategory,
  IconUserCircle,
  IconChevronRight,
  IconSun,
  IconMoonStars,
  IconTarget,
} from '@tabler/icons-react'
import { useUser } from './UserContext'
import { useNavigate } from 'react-router'

const Dashboard = lazy(() => import('./components/Dashboard'))
const Transactions = lazy(() => import('./components/Transactions'))
const CategoriesPage = lazy(() => import('./components/Categories'))
const BudgetsPage = lazy(() => import('./components/Budget'))
const SettingsPage = lazy(() => import('./components/Settings'))
const SavingsPage = lazy(() => import('./components/GoalTracker'))

const MainPage = ({ label }: { label: string }) => {
  switch (label) {
    case 'Dashboard':
      return <Dashboard />
    case 'Transactions':
      return <Transactions />
    case 'Analytics':
      return <div>Analytics</div>
    case 'Categories':
      return <CategoriesPage />
    case 'Budgets':
      return <BudgetsPage />
    case 'Settings':
      return <SettingsPage />
    case 'Goal Tracker':
      return <SavingsPage />
    default:
      break
  }
}

const App = () => {
  const user = useUser()
  const navigate = useNavigate()
  const theme = useMantineTheme()
  const [opened, { toggle }] = useDisclosure(false)
  const [activeNav, setActiveNav] = useState('Dashboard')

  const { setColorScheme, colorScheme } = useMantineColorScheme()

  useEffect(() => {
    if (!user?.is_logged_in) navigate('/login')
    console.log(user)
  }, [user?.is_logged_in])

  const menuItems = [
    {
      leftSection: IconWallet,
      label: 'Dashboard',
      description: 'View your financial summary',
      color: 'blue',
    },
    {
      leftSection: IconReportMoney,
      label: 'Transactions',
      description: 'View and manage your transactions',
      color: 'green',
    },
    // { leftSection: IconChartBar, label: 'Analytics', description: 'Visualize your spending', color: 'grape' },
    {
      leftSection: IconCategory,
      label: 'Categories',
      description: 'Manage your expense categories',
      color: 'violet',
    },
    {
      leftSection: IconPigMoney,
      label: 'Budgets',
      description: 'Set and track your budgets',
      color: 'indigo',
    },
    {
      leftSection: IconTarget,
      label: 'Goal Tracker',
      description: 'Track and manage your savings goals',
      color: 'indigo',
    },
  ]

  const NavbarContent = () => (
    <Stack gap="xs" h={'100%'} pb={10} justify="space-between">
      <Stack gap="xs">
        {menuItems.map((item) => (
          <NavLink
            href="#required-for-focus"
            key={item.label}
            active={activeNav === item.label}
            label={item.label}
            description={item.description}
            leftSection={<item.leftSection size="1rem" stroke={1.5} />}
            onClick={() => setActiveNav(item.label)}
          />
        ))}
      </Stack>
      <Stack gap="xs">
        <Divider />
        <NavLink
          href="#required-for-focus"
          label={user?.first_name! + ' ' + user?.last_name}
          description={user?.username}
          leftSection={<IconUserCircle size="2rem" stroke={1.5} />}
          rightSection={<IconChevronRight size="1rem" stroke={1.5} />}
          onClick={() => setActiveNav('Settings')}
        />
      </Stack>
    </Stack>
  )

  return (
    <AppShell
      padding="md"
      navbar={{
        width: 250,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      header={{ height: 60 }}
    >
      <AppShell.Navbar>
        <AppShell.Section grow>
          <NavbarContent />
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Header p="md">
        <Group justify="space-between">
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              size="sm"
              hiddenFrom="sm"
              color={theme.colors.gray[6]}
            />
            <Title order={3}>PennyTrail</Title>
          </Group>
          <Group>
            <Switch
              size="md"
              color="dark.4"
              defaultChecked={colorScheme === 'dark' ? true : false}
              onLabel={
                <IconSun
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={2.5}
                  color={theme.colors.yellow[4]}
                />
              }
              offLabel={
                <IconMoonStars
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={2.5}
                  color={theme.colors.blue[6]}
                />
              }
              onClick={() => {
                if (colorScheme === 'dark') {
                  setColorScheme('light')
                } else {
                  setColorScheme('dark')
                }
              }}
            />
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Main>
        <Suspense
          fallback={
            <Center style={{ height: '100%' }}>
              {/* <Loader type="dots" /> */}
            </Center>
          }
        >
          <MainPage label={activeNav} />
        </Suspense>
      </AppShell.Main>
    </AppShell>
  )
}

export default App
