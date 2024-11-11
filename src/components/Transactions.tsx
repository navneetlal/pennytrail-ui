// Types
interface Transaction {
  id: string
  date: Date
  type: 'income' | 'expense' | 'transfer'
  amount: number
  category: string
  description: string
  fromAccount?: string
  toAccount?: string
}

// TransactionsPage.tsx
import { useState } from 'react'
import {
  Box,
  Button,
  Card,
  Group,
  Modal,
  Select,
  TextInput,
  NumberInput,
  Text,
  ActionIcon,
  Menu,
  Container,
  Grid,
  Stack,
  useMantineTheme,
  rgba,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import {
  IconPlus,
  IconDotsVertical,
  IconPencil,
  IconTrash,
  IconArrowUp,
  IconArrowDown,
  IconArrowsLeftRight,
} from '@tabler/icons-react'
import { DateInput } from '@mantine/dates'

const sampleTransactions: Transaction[] = [
  {
    id: '1',
    date: new Date(),
    type: 'income',
    amount: 5000,
    category: 'Salary',
    description: 'Monthly salary',
  },
  {
    id: '2',
    date: new Date(),
    type: 'expense',
    amount: 50,
    category: 'Food',
    description: 'Groceries',
  },
  // Add more sample transactions
]

const Transactions = () => {
  const theme = useMantineTheme()
  const [transactions, setTransactions] = useState(sampleTransactions)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null)

  const form = useForm({
    initialValues: {
      date: new Date(),
      type: 'expense' as 'expense' | 'income' | 'transfer',
      amount: 0,
      category: '',
      description: '',
      fromAccount: '',
      toAccount: '',
    },
  })

  const handleSubmit = (values: typeof form.values) => {
    if (editingTransaction) {
      setTransactions((prev) =>
        prev.map((t) =>
          t.id === editingTransaction.id ? { ...values, id: t.id } : t
        )
      )
    } else {
      setTransactions((prev) => [
        ...prev,
        { ...values, id: Math.random().toString() },
      ])
    }
    setModalOpen(false)
    form.reset()
    setEditingTransaction(null)
  }

  const handleDelete = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id))
  }

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction)
    form.setValues(transaction)
    setModalOpen(true)
  }

  const getTransactionColor = (type: Transaction['type']) => {
    switch (type) {
      case 'income':
        return theme.colors.green[6]
      case 'expense':
        return theme.colors.red[6]
      case 'transfer':
        return theme.colors.blue[6]
    }
  }

  const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'income':
        return <IconArrowUp size={16} />
      case 'expense':
        return <IconArrowDown size={16} />
      case 'transfer':
        return <IconArrowsLeftRight size={16} />
    }
  }

  return (
    <Container size="xl" p="md">
      <Group justify="space-between" mb="xl">
        <Text size="xl" w={700}>
          Transactions
        </Text>
        <Button
          leftSection={<IconPlus size={16} />}
          onClick={() => setModalOpen(true)}
        >
          Add Transaction
        </Button>
      </Group>

      <Stack gap="md">
        {transactions.map((transaction) => (
          <Card key={transaction.id} shadow="sm" p="md" radius="md" withBorder>
            <Grid align="center">
              <Grid.Col span={{ base: 12, sm: 3 }}>
                <Group>
                  <Box
                    style={{
                      color: getTransactionColor(transaction.type),
                      backgroundColor: rgba(
                        getTransactionColor(transaction.type),
                        0.1
                      ),
                      width: 32,
                      height: 32,
                      borderRadius: theme.radius.sm,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {getTransactionIcon(transaction.type)}
                  </Box>
                  <div>
                    <Text size="sm" w={500}>
                      {transaction.category}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {new Date(transaction.date).toLocaleDateString()}
                    </Text>
                  </div>
                </Group>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Text size="sm">{transaction.description}</Text>
              </Grid.Col>
              <Grid.Col span={{ base: 10, sm: 2 }}>
                <Text
                  w={500}
                  style={{ color: getTransactionColor(transaction.type) }}
                >
                  {transaction.type === 'expense' ? '-' : '+'}$
                  {transaction.amount.toLocaleString()}
                </Text>
              </Grid.Col>
              <Grid.Col span={{ base: 2, sm: 1 }}>
                <Menu position="bottom-end">
                  <Menu.Target>
                    <ActionIcon>
                      <IconDotsVertical size={16} />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item
                      leftSection={<IconPencil size={16} />}
                      onClick={() => handleEdit(transaction)}
                    >
                      Edit
                    </Menu.Item>
                    <Menu.Item
                      leftSection={<IconTrash size={16} />}
                      color="red"
                      onClick={() => handleDelete(transaction.id)}
                    >
                      Delete
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Grid.Col>
            </Grid>
          </Card>
        ))}
      </Stack>

      <Modal
        opened={modalOpen}
        onClose={() => {
          setModalOpen(false)
          setEditingTransaction(null)
          form.reset()
        }}
        title={editingTransaction ? 'Edit Transaction' : 'New Transaction'}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="md">
            <DateInput
              label="Date"
              placeholder="Select date"
              required
              {...form.getInputProps('date')}
            />
            <Select
              label="Type"
              required
              data={[
                { value: 'income', label: 'Income' },
                { value: 'expense', label: 'Expense' },
                { value: 'transfer', label: 'Transfer' },
              ]}
              {...form.getInputProps('type')}
            />
            <NumberInput
              label="Amount"
              required
              min={0}
              decimalScale={2}
              {...form.getInputProps('amount')}
            />
            <Select
              label="Category"
              required
              data={['Salary', 'Food', 'Transport', 'Entertainment'].map(
                (c) => ({
                  value: c,
                  label: c,
                })
              )}
              {...form.getInputProps('category')}
            />
            <TextInput
              label="Description"
              required
              {...form.getInputProps('description')}
            />
            {form.values.type === 'transfer' && (
              <>
                <Select
                  label="From Account"
                  required
                  data={['Cash', 'Bank', 'Credit Card'].map((a) => ({
                    value: a,
                    label: a,
                  }))}
                  {...form.getInputProps('fromAccount')}
                />
                <Select
                  label="To Account"
                  required
                  data={['Cash', 'Bank', 'Credit Card'].map((a) => ({
                    value: a,
                    label: a,
                  }))}
                  {...form.getInputProps('toAccount')}
                />
              </>
            )}
            <Button type="submit">
              {editingTransaction ? 'Update' : 'Add'} Transaction
            </Button>
          </Stack>
        </form>
      </Modal>
    </Container>
  )
}

export default Transactions
