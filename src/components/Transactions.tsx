import React, { useState } from 'react'
import {
  Box,
  Group,
  Select,
  ActionIcon,
  Text,
  Stack,
  Button,
  Card,
  Modal,
  Menu,
} from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import {
  IconFilter,
  IconArrowUpRight,
  IconArrowDownRight,
  IconDotsVertical,
  IconEdit,
  IconTrash,
} from '@tabler/icons-react'
import dayjs from 'dayjs'
import TransactionForm from './TransactionForm'
import { nanoid } from 'nanoid'

export interface Transaction {
  id: string
  title: string
  category: string
  date: string
  amount: number
  type: 'income' | 'expense' | 'transfer'
}

const initialTransactions: Transaction[] = [
  {
    id: nanoid(),
    title: 'Monthly salary',
    category: 'Salary',
    date: '11/16/2024',
    amount: 5000,
    type: 'income',
  },
  {
    id: nanoid(),
    title: 'Groceries',
    category: 'Food',
    date: '11/16/2024',
    amount: -50,
    type: 'expense',
  },
]

const categories = [
  'All Categories',
  'Salary',
  'Food',
  'Transportation',
  'Entertainment',
  'Bills',
  'Shopping',
]

export const TransactionList = () => {
  const startOfMonth = dayjs().startOf('month').toDate()
  const endOfMonth = dayjs().endOf('month').toDate()

  const [dateRange, setDateRange] = React.useState<[Date | null, Date | null]>([
    startOfMonth,
    endOfMonth,
  ])
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
    'All Categories'
  )

  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null)

  const handleAddTransaction = () => {
    setEditingTransaction(null)
    setDialogOpen(true)
  }

  const handleEditTransaction = (transaction: Transaction) => {
    console.log('edit', transaction)
    setEditingTransaction(transaction)
    setDialogOpen(true)
  }

  const handleSaveTransaction = (transaction: Partial<Transaction>) => {
    if (editingTransaction) {
      setTransactions((prev) =>
        prev.map((tran) =>
          tran.id === editingTransaction.id ? { ...tran, ...transaction } : tran
        )
      )
    } else {
      setTransactions((prev) => [
        ...prev,
        { id: nanoid(), ...transaction } as Transaction,
      ])
    }
    setDialogOpen(false)
  }

  const handleDeleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((tran) => tran.id !== id))
  }

  return (
    <>
      <Stack gap="md">
        <Group justify="space-between">
          <Text fw={600} size="lg">
            Transactions
          </Text>
          <Button
            size="xs"
            variant="light"
            onClick={() => handleAddTransaction()}
          >
            + Add Transaction
          </Button>
        </Group>

        <Group gap="md">
          <DatePickerInput
            type="range"
            allowSingleDateInRange
            label="Filter by date"
            placeholder="Select date range"
            value={dateRange}
            onChange={setDateRange}
            clearable
            style={(theme) => ({
              root: {
                flex: 1,
              },
              input: {
                backgroundColor: theme.colors.dark[6],
                border: `1px solid ${theme.colors.dark[4]}`,
                '&:focus': {
                  borderColor: theme.colors.blue[5],
                },
              },
            })}
          />

          <Select
            label="Filter by category"
            placeholder="Select category"
            value={selectedCategory}
            onChange={setSelectedCategory}
            data={categories}
            leftSection={<IconFilter size={16} />}
            styles={() => ({
              root: {
                flex: 1,
              },
            })}
          />
        </Group>

        <Stack gap="sm">
          {transactions.map((transaction, index) => (
            <Card key={index} padding="md" radius="md" withBorder>
              <Group justify="space-between">
                <Group>
                  <ActionIcon
                    size="lg"
                    variant="light"
                    color={transaction.type === 'income' ? 'green' : 'red'}
                  >
                    {transaction.type === 'income' ? (
                      <IconArrowUpRight size={24} color="green" />
                    ) : (
                      <IconArrowDownRight size={24} color="red" />
                    )}
                  </ActionIcon>
                  <div>
                    <Text fw={500}>{transaction.title}</Text>
                    <Text size="sm" c="dimmed">
                      {transaction.category} · {transaction.date}
                    </Text>
                  </div>
                </Group>
                <Group>
                  <Text
                    fw={600}
                    c={transaction.type === 'income' ? 'green' : 'red'}
                  >
                    {transaction.type === 'income' ? '+' : '-'}$
                    {Math.abs(transaction.amount).toFixed(2)}
                  </Text>
                  <Menu trigger="hover" openDelay={100} closeDelay={400}>
                    <Menu.Target>
                      <ActionIcon variant="transparent">
                        <IconDotsVertical size={20} />
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item
                        leftSection={<IconEdit />}
                        onClick={() => handleEditTransaction(transaction)}
                      >
                        Edit
                      </Menu.Item>
                      <Menu.Item
                        leftSection={<IconTrash />}
                        onClick={() => handleDeleteTransaction(transaction.id)}
                      >
                        Delete
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Group>
              </Group>
            </Card>
          ))}
        </Stack>
      </Stack>
      {/* Dialog for Adding/Editing Transaction */}
      <Modal
        opened={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title={editingTransaction ? 'Edit Transaction' : 'Add Transaction'}
        centered
      >
        <TransactionForm
          initialValues={
            editingTransaction || {
              id: nanoid(),
              title: '',
              type: 'expense',
              category: '',
              amount: 0,
              date: '',
            }
          }
          onSubmit={handleSaveTransaction}
        />
      </Modal>
    </>
  )
}

export default function TransactionsPage() {
  return (
    <Box p="md">
      <TransactionList />
    </Box>
  )
}
