import {
  Card,
  Group,
  Text,
  Progress,
  ActionIcon,
  Button,
  Box,
} from '@mantine/core'
import { IconShoppingCart, IconCar } from '@tabler/icons-react'

interface Budget {
  title: string
  category: string
  used: number
  total: number
  icon: React.ReactNode
}

const budgets: Budget[] = [
  {
    title: 'Food',
    category: 'Monthly Budget',
    used: 250,
    total: 500,
    icon: <IconShoppingCart size={24} />,
  },
  {
    title: 'Transport',
    category: 'Monthly Budget',
    used: 200,
    total: 300,
    icon: <IconCar size={24} />,
  },
]

export const Budgets = () => {
  return (
    <Box p="md">
      <Group justify="space-between">
        <Text fw={600} size="lg">
          Budgets
        </Text>
        <Button size="xs" variant="light">
          + Add Budget
        </Button>
      </Group>
      {budgets.map((budget, index) => (
        <Card key={index} mt="md" padding="md" radius="md" withBorder>
          <Group justify="space-between">
            <Group>
              <ActionIcon size={'lg'} variant="light">
                {budget.icon}
              </ActionIcon>
              <div>
                <Text fw={500}>{budget.title}</Text>
                <Text size="sm" c="dimmed">
                  {budget.category}
                </Text>
              </div>
            </Group>
            <Text fw={600}>
              ${budget.used.toFixed(2)} / ${budget.total.toFixed(2)}
            </Text>
          </Group>
          <Progress
            mt="sm"
            value={(budget.used / budget.total) * 100}
            color={budget.used / budget.total > 0.7 ? 'red' : 'blue'}
          />
          <Text size="sm" mt="xs" c="dimmed">
            {((budget.used / budget.total) * 100).toFixed(0)}% used
          </Text>
        </Card>
      ))}
    </Box>
  )
}

export default Budgets
