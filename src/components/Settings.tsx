import React, { useState } from 'react'
import {
  Container,
  Title,
  Paper,
  TextInput,
  PasswordInput,
  Select,
  Switch,
  Text,
  Button,
  Grid,
  Stack,
  Group,
  NumberInput,
  Card,
  ActionIcon,
  Modal,
} from '@mantine/core'
import {
  IconUser,
  IconLock,
  IconSettings,
  IconBuildingBank,
  IconTrash,
  IconEdit,
  IconPlus,
} from '@tabler/icons-react'
import { notifications } from '@mantine/notifications'
import { useForm } from '@mantine/form'

// Types
interface Account {
  id: string
  name: string
  type: 'savings' | 'credit'
  balance: number
  currency: string
}

interface SettingsFormValues {
  firstName: string
  lastName: string
  email: string
  currentPassword: string
  newPassword: string
  confirmPassword: string
  preferredCurrency: string
  numberFormat: string
  language: string
  darkMode: boolean
  notifications: boolean
}

const CURRENCIES = [
  { value: 'USD', label: 'US Dollar ($)' },
  { value: 'EUR', label: 'Euro (€)' },
  { value: 'GBP', label: 'British Pound (£)' },
  { value: 'JPY', label: 'Japanese Yen (¥)' },
  { value: 'INR', label: 'Indian Rupee (₹)' },
]

const NUMBER_FORMATS = [
  { value: 'millions', label: 'Millions (1M, 2M)' },
  { value: 'crores', label: 'Crores (1Cr, 2Cr)' },
  { value: 'standard', label: 'Standard (1,000,000)' },
]

const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'hi', label: 'Hindi' },
]

export const SettingsPage: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([
    {
      id: '1',
      name: 'Main Savings',
      type: 'savings',
      balance: 5000,
      currency: 'USD',
    },
    {
      id: '2',
      name: 'Credit Card',
      type: 'credit',
      balance: -1200,
      currency: 'USD',
    },
  ])
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false)
  const [editingAccount, setEditingAccount] = useState<Account | null>(null)

  const form = useForm<SettingsFormValues>({
    initialValues: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      preferredCurrency: 'USD',
      numberFormat: 'millions',
      language: 'en',
      darkMode: false,
      notifications: true,
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      newPassword: (value, values) =>
        value && value.length < 8
          ? 'Password must be at least 8 characters'
          : value && value !== values.confirmPassword
            ? 'Passwords do not match'
            : null,
    },
  })

  const handleSaveSettings = (_values: SettingsFormValues) => {
    // Here you would typically make an API call to save the settings
    notifications.show({
      title: 'Settings saved',
      message: 'Your preferences have been updated successfully',
      color: 'green',
    })
  }

  const handleDeleteAccount = (accountId: string) => {
    setAccounts(accounts.filter((account) => account.id !== accountId))
    notifications.show({
      title: 'Account removed',
      message: 'The account has been removed successfully',
      color: 'red',
    })
  }

  const accountForm = useForm({
    initialValues: {
      name: '',
      type: 'savings' as 'savings' | 'credit',
      balance: 0,
      currency: 'USD',
    },
  })

  const handleSaveAccount = (values: typeof accountForm.values) => {
    if (editingAccount) {
      setAccounts(
        accounts.map((acc) =>
          acc.id === editingAccount.id
            ? { ...values, id: editingAccount.id }
            : acc
        )
      )
    } else {
      setAccounts([...accounts, { ...values, id: Math.random().toString() }])
    }
    setIsAccountModalOpen(false)
    setEditingAccount(null)
    accountForm.reset()
  }

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        {/* Profile Settings */}
        <Paper shadow="sm" p="md" radius="md">
          <Title order={2} mb="md">
            <Group gap="sm">
              <IconUser size={24} />
              <Text>Profile Settings</Text>
            </Group>
          </Title>
          <form onSubmit={form.onSubmit(handleSaveSettings)}>
            <Grid>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <TextInput
                  label="First Name"
                  placeholder="Your first name"
                  {...form.getInputProps('firstName')}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <TextInput
                  label="Last Name"
                  placeholder="Your last name"
                  {...form.getInputProps('lastName')}
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <TextInput
                  label="Email"
                  placeholder="your@email.com"
                  {...form.getInputProps('email')}
                />
              </Grid.Col>
            </Grid>
          </form>
        </Paper>

        {/* Security Settings */}
        <Paper shadow="sm" p="md" radius="md">
          <Title order={2} mb="md">
            <Group gap="sm">
              <IconLock size={24} />
              <Text>Security</Text>
            </Group>
          </Title>
          <Stack gap="md">
            <PasswordInput
              label="Current Password"
              placeholder="Enter current password"
              {...form.getInputProps('currentPassword')}
            />
            <PasswordInput
              label="New Password"
              placeholder="Enter new password"
              {...form.getInputProps('newPassword')}
            />
            <PasswordInput
              label="Confirm Password"
              placeholder="Confirm new password"
              {...form.getInputProps('confirmPassword')}
            />
          </Stack>
        </Paper>

        {/* Accounts */}
        <Paper shadow="sm" p="md" radius="md">
          <Group justify="space-between" mb="md">
            <Title order={2}>
              <Group gap="sm">
                <IconBuildingBank size={24} />
                <Text>Accounts</Text>
              </Group>
            </Title>
            <Button
              leftSection={<IconPlus size={16} />}
              onClick={() => {
                setEditingAccount(null)
                accountForm.reset()
                setIsAccountModalOpen(true)
              }}
            >
              Add Account
            </Button>
          </Group>
          <Grid>
            {accounts.map((account) => (
              <Grid.Col key={account.id} span={{ base: 12, sm: 6, md: 4 }}>
                <Card shadow="sm" p="md">
                  <Group justify="space-between" mb="xs">
                    <Text w={500}>{account.name}</Text>
                    <Group gap={8}>
                      <ActionIcon
                        color="blue"
                        onClick={() => {
                          setEditingAccount(account)
                          accountForm.setValues(account)
                          setIsAccountModalOpen(true)
                        }}
                      >
                        <IconEdit size={16} />
                      </ActionIcon>
                      <ActionIcon
                        color="red"
                        onClick={() => handleDeleteAccount(account.id)}
                      >
                        <IconTrash size={16} />
                      </ActionIcon>
                    </Group>
                  </Group>
                  <Text size="sm" c="dimmed">
                    {account.type.charAt(0).toUpperCase() +
                      account.type.slice(1)}
                  </Text>
                  <Text w={500} mt="md">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: account.currency,
                    }).format(account.balance)}
                  </Text>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </Paper>

        {/* Preferences */}
        <Paper shadow="sm" p="md" radius="md">
          <Title order={2} mb="md">
            <Group gap="sm">
              <IconSettings size={24} />
              <Text>Preferences</Text>
            </Group>
          </Title>
          <Stack gap="md">
            <Select
              label="Preferred Currency"
              placeholder="Select currency"
              data={CURRENCIES}
              {...form.getInputProps('preferredCurrency')}
            />
            <Select
              label="Number Format"
              placeholder="Select number format"
              data={NUMBER_FORMATS}
              {...form.getInputProps('numberFormat')}
            />
            <Select
              label="Language"
              placeholder="Select language"
              data={LANGUAGES}
              {...form.getInputProps('language')}
            />
            <Switch
              label="Dark Mode"
              {...form.getInputProps('darkMode', { type: 'checkbox' })}
            />
            <Switch
              label="Enable Notifications"
              {...form.getInputProps('notifications', { type: 'checkbox' })}
            />
          </Stack>
        </Paper>

        <Group justify="right">
          <Button onClick={() => form.reset()}>Reset</Button>
          <Button color="blue" onClick={() => handleSaveSettings(form.values)}>
            Save Changes
          </Button>
        </Group>
      </Stack>

      {/* Account Modal */}
      <Modal
        opened={isAccountModalOpen}
        onClose={() => {
          setIsAccountModalOpen(false)
          setEditingAccount(null)
          accountForm.reset()
        }}
        title={editingAccount ? 'Edit Account' : 'Add New Account'}
      >
        <form onSubmit={accountForm.onSubmit(handleSaveAccount)}>
          <Stack gap="md">
            <TextInput
              label="Account Name"
              placeholder="Enter account name"
              required
              {...accountForm.getInputProps('name')}
            />
            <Select
              label="Account Type"
              placeholder="Select account type"
              required
              data={[
                { value: 'savings', label: 'Savings Account' },
                { value: 'credit', label: 'Credit Card' },
              ]}
              {...accountForm.getInputProps('type')}
            />
            <NumberInput
              label="Current Balance"
              placeholder="Enter current balance"
              required
              decimalScale={2}
              {...accountForm.getInputProps('balance')}
            />
            <Select
              label="Currency"
              placeholder="Select currency"
              required
              data={CURRENCIES}
              {...accountForm.getInputProps('currency')}
            />
            <Group justify="right">
              <Button
                variant="default"
                onClick={() => setIsAccountModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {editingAccount ? 'Save' : 'Add'} Account
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </Container>
  )
}

export default SettingsPage
