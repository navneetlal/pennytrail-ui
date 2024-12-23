import {
  TextInput,
  PasswordInput,
  Button,
  Group,
  Box,
  Container,
  Paper,
  Text,
  Title,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconAt, IconLock, IconUser } from '@tabler/icons-react'
import { Link } from 'react-router'

interface RegisterFormValues {
  email: string
  password: string
  firstName: string
  lastName: string
}

export function RegisterPage() {
  const form = useForm<RegisterFormValues>({
    initialValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) =>
        value.length < 6 ? 'Password must be at least 6 characters' : null,
      firstName: (value) =>
        value.length < 2 ? 'First name is too short' : null,
      lastName: (value) => (value.length < 2 ? 'Last name is too short' : null),
    },
  })

  const handleSubmit = (values: RegisterFormValues) => {
    // Handle registration logic here
    console.log(values)
  }

  return (
    <Box
      style={() => ({
        minHeight: '100vh',
        paddingTop: 80,
      })}
    >
      <Container size={440}>
        <Title
          style={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
            textAlign: 'center',
          })}
        >
          Create your account
        </Title>
        <Text size="sm" c="dimmed" mt="xs" style={{ textAlign: 'center' }}>
          Already have an account? <Link to={'/login'}>Sign In</Link>
        </Text>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Group grow>
              <TextInput
                label="First Name"
                placeholder="Your first name"
                leftSection={<IconUser size={16} />}
                required
                {...form.getInputProps('firstName')}
              />
              <TextInput
                label="Last Name"
                placeholder="Your last name"
                leftSection={<IconUser size={16} />}
                required
                {...form.getInputProps('lastName')}
              />
            </Group>
            <TextInput
              label="Email"
              placeholder="you@example.com"
              leftSection={<IconAt size={16} />}
              required
              mt="md"
              {...form.getInputProps('email')}
            />
            <PasswordInput
              label="Password"
              placeholder="Create a strong password"
              leftSection={<IconLock size={16} />}
              required
              mt="md"
              {...form.getInputProps('password')}
            />
            <Button
              fullWidth
              type="submit"
              mt="xl"
              style={(theme) => ({
                backgroundColor: theme.colors.blue[6],
                '&:hover': {
                  backgroundColor: theme.colors.blue[7],
                },
              })}
            >
              Create account
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  )
}
