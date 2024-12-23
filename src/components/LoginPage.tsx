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
import { IconAt, IconLock } from '@tabler/icons-react'

import AxiosInstance from '../utils/axios'
import axios from 'axios'
import { Link, useNavigate } from 'react-router'
import { useUser, useUserDispatch } from '../UserContext'
import { useEffect } from 'react'
import { AxiosResponse } from 'axios'

interface LoginFormValues {
  email: string
  password: string
}

export function LoginPage() {
  const user = useUser()
  const dispatch = useUserDispatch()
  const navigate = useNavigate()
  const form = useForm<LoginFormValues>({
    initialValues: {
      email: '',
      password: '',
    },
  })

  useEffect(() => {
    if (user?.is_logged_in) navigate('/')
    else {
      AxiosInstance.get('/user/me').then((_res) => {
        handleLogin()
      })
    }
  }, [user?.is_logged_in])

  const handleSubmit = (values: LoginFormValues) => {
    axios
      .post('/auth/login', {
        username: values.email,
        password: values.password,
      })
      .then((res) => {
        localStorage.setItem('accessToken', res.data.accessToken)
        localStorage.setItem('refreshToken', res.data.refreshToken)
        handleLogin(res.data.sessionKey)
      })
  }

  const handleLogin = (sessionKey?: string) => {
    Promise.all([
      AxiosInstance.get('/user/me'),
      sessionKey ?? AxiosInstance.get('/user/session-key'),
      AxiosInstance.get('/user/generate-salt'),
    ]).then(([userRes, sessionKeyRes, encryptionSaltRes]) => {
      dispatch({
        type: 'SET_USER',
        payload: {
          ...userRes.data.user,
          session_key:
            sessionKey ?? (sessionKeyRes as AxiosResponse).data.session_key,
          encryption_salt: encryptionSaltRes.data.encryption_salt,
          is_logged_in: true,
        },
      })
      navigate('/')
    })
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
          Welcome back!
        </Title>
        <Text size="sm" c="dimmed" mt="xs" style={{ textAlign: 'center' }}>
          Do not have an account yet?{' '}
          <Link to={'/register'}>Create account</Link>
        </Text>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              label="Email"
              placeholder="you@example.com"
              leftSection={<IconAt size={16} />}
              required
              {...form.getInputProps('email')}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              leftSection={<IconLock size={16} />}
              required
              mt="md"
              {...form.getInputProps('password')}
            />
            <Group justify="space-between" mt="lg">
              <Button
                fullWidth
                type="submit"
                style={(theme) => ({
                  backgroundColor: theme.colors.blue[6],
                  '&:hover': {
                    backgroundColor: theme.colors.blue[7],
                  },
                })}
              >
                Sign in
              </Button>
            </Group>
          </form>
        </Paper>
      </Container>
    </Box>
  )
}
