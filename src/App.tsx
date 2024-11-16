import { useState } from 'react'
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
import Dashboard from './components/Dashboard'
import Transactions from './components/Transactions'
import CategoriesPage from './components/Categories'
import BudgetsPage from './components/Budget'
import SettingsPage from './components/Settings'
import SavingsPage from './components/GoalTracker'

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
  const theme = useMantineTheme()
  const [opened, { toggle }] = useDisclosure(false)
  const [activeNav, setActiveNav] = useState('Dashboard')

  const { setColorScheme, colorScheme } = useMantineColorScheme()

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
          label={'Navneet Lal Gupta'}
          description={'navneetlalg@gmail.com'}
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
        <MainPage label={activeNav} />
      </AppShell.Main>
    </AppShell>
  )
}

export default App
