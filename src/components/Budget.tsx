// BudgetsPage.tsx
// Types
interface Category {
  id: string
  name: string
  type: 'income' | 'expense'
  color: string
  icon: string
}

interface Budget {
  id: string
  categoryId: string
  amount: number
  spent: number
  period: 'monthly' | 'yearly'
}

// Sample Data
const sampleCategories: Category[] = [
  { id: '1', name: 'Salary', type: 'income', color: '#4CAF50', icon: 'wallet' },
  {
    id: '2',
    name: 'Food',
    type: 'expense',
    color: '#F44336',
    icon: 'shopping-cart',
  },
  {
    id: '3',
    name: 'Transport',
    type: 'expense',
    color: '#2196F3',
    icon: 'car',
  },
  {
    id: '4',
    name: 'Freelance',
    type: 'income',
    color: '#9C27B0',
    icon: 'briefcase',
  },
]

const sampleBudgets: Budget[] = [
  { id: '1', categoryId: '2', amount: 500, spent: 250, period: 'monthly' },
  { id: '2', categoryId: '3', amount: 300, spent: 200, period: 'monthly' },
]

// CategoriesPage.tsx
import React, { useState } from 'react'
import {
  Container,
  Title,
  Paper,
  Group,
  Button,
  Text,
  Modal,
  Select,
  ActionIcon,
  Menu,
  Stack,
  NumberInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconPlus, IconEdit, IconTrash, IconDots } from '@tabler/icons-react'
import { Progress } from '@mantine/core'

const BudgetsPage: React.FC = () => {
  const [budgets, setBudgets] = useState<Budget[]>(sampleBudgets)
  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const budgetForm = useForm({
    initialValues: {
      categoryId: '',
      amount: 0,
      period: 'monthly' as 'monthly' | 'yearly',
    },
  })

  const handleSubmit = (values: typeof budgetForm.values) => {
    if (selectedBudget) {
      setBudgets(
        budgets.map((budget) =>
          budget.id === selectedBudget.id ? { ...budget, ...values } : budget
        )
      )
    } else {
      setBudgets([
        ...budgets,
        {
          ...values,
          id: Math.random().toString(),
          spent: 0,
        },
      ])
    }
    handleCloseModal()
  }

  const handleOpenModal = (budget?: Budget) => {
    if (budget) {
      setSelectedBudget(budget)
      budgetForm.setValues(budget)
    } else {
      setSelectedBudget(null)
      budgetForm.reset()
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedBudget(null)
    budgetForm.reset()
  }

  const handleDelete = (id: string) => {
    setBudgets(budgets.filter((budget) => budget.id !== id))
  }

  const handleClearBudget = (id: string) => {
    setBudgets(
      budgets.map((budget) =>
        budget.id === id ? { ...budget, spent: 0 } : budget
      )
    )
  }

  return (
    <Container size="lg" py="xl">
      <Paper shadow="xs" p="md" withBorder>
        <Group justify="space-between" mb="md">
          <Title order={2}>Budgets</Title>
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={() => handleOpenModal()}
          >
            Add Budget
          </Button>
        </Group>

        <div
          style={{
            display: 'grid',
            gap: '1rem',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          }}
        >
          {budgets.map((budget) => {
            const category = sampleCategories.find(
              (c) => c.id === budget.categoryId
            )
            const percentage = Math.round((budget.spent / budget.amount) * 100)

            return (
              <Paper key={budget.id} p="md" withBorder>
                <Group justify="space-between" mb="xs">
                  <Group>
                    {/* {category && iconOptions.find(i => i.value === category.icon)?.icon && 
                      React.createElement(
                        iconOptions.find(i => i.value === category.icon)!.icon,
                        { size: 20, style: { color: category.color } }
                      )} */}
                    <Text w={500}>{category?.name}</Text>
                  </Group>
                  <Menu position="bottom-end" shadow="md">
                    <Menu.Target>
                      <ActionIcon>
                        <IconDots size={16} />
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item
                        leftSection={<IconEdit size={16} />}
                        onClick={() => handleOpenModal(budget)}
                      >
                        Edit
                      </Menu.Item>
                      <Menu.Item
                        leftSection={<IconTrash size={16} />}
                        onClick={() => handleClearBudget(budget.id)}
                      >
                        Clear Progress
                      </Menu.Item>
                      <Menu.Item
                        color="red"
                        leftSection={<IconTrash size={16} />}
                        onClick={() => handleDelete(budget.id)}
                      >
                        Delete
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Group>

                <Group justify="space-between" mb="xs">
                  <Text size="sm" c="dimmed">
                    {budget.period.charAt(0).toUpperCase() +
                      budget.period.slice(1)}{' '}
                    Budget
                  </Text>
                  <Text size="sm" w={500}>
                    ${budget.spent.toFixed(2)} / ${budget.amount.toFixed(2)}
                  </Text>
                </Group>

                <Progress
                  value={percentage}
                  color={
                    percentage > 90
                      ? 'red'
                      : percentage > 75
                        ? 'yellow'
                        : 'teal'
                  }
                  size="xl"
                  radius="xl"
                  mb="sm"
                />

                <Text ta="center" size="sm" c="dimmed">
                  {percentage}% used
                </Text>
              </Paper>
            )
          })}
        </div>

        <Modal
          opened={isModalOpen}
          onClose={handleCloseModal}
          title={selectedBudget ? 'Edit Budget' : 'New Budget'}
        >
          <form onSubmit={budgetForm.onSubmit(handleSubmit)}>
            <Stack gap="md">
              <Select
                required
                label="Category"
                data={sampleCategories
                  .filter((cat) => cat.type === 'expense')
                  .map((cat) => ({
                    value: cat.id,
                    label: cat.name,
                  }))}
                {...budgetForm.getInputProps('categoryId')}
              />
              <NumberInput
                required
                label="Amount"
                min={0}
                decimalScale={2}
                {...budgetForm.getInputProps('amount')}
              />
              <Select
                required
                label="Period"
                data={[
                  { value: 'monthly', label: 'Monthly' },
                  { value: 'yearly', label: 'Yearly' },
                ]}
                {...budgetForm.getInputProps('period')}
              />
              <Button type="submit">
                {selectedBudget ? 'Update' : 'Create'} Budget
              </Button>
            </Stack>
          </form>
        </Modal>
      </Paper>
    </Container>
  )
}

export default BudgetsPage
