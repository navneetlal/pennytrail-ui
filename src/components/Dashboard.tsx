import { useState } from 'react'
import {
  Text,
  Group,
  Stack,
  Card,
  Grid,
  Title,
  Button,
  ActionIcon,
  Select,
  TextInput,
  NumberInput,
  Box,
  Drawer,
  RingProgress,
  List,
} from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import {
  IconWallet,
  IconReportMoney,
  IconPlus,
  IconArrowUp,
  IconArrowDown,
  IconPigMoney,
  IconReceipt,
} from '@tabler/icons-react'

// Dummy data for charts and stats
const monthlyData = [
  { month: 'Jan', income: 5000, expenses: 3500, savings: 1500 },
  { month: 'Feb', income: 5200, expenses: 3200, savings: 2000 },
  { month: 'Mar', income: 4800, expenses: 3800, savings: 1000 },
  { month: 'Apr', income: 5500, expenses: 3300, savings: 2200 },
  { month: 'May', income: 5300, expenses: 3400, savings: 1900 },
  { month: 'Jun', income: 5600, expenses: 3600, savings: 2000 },
]

const categoryData = [
  { name: 'Food & Dining', value: 1200, color: '#339AF0' },
  { name: 'Transport', value: 800, color: '#51CF66' },
  { name: 'Shopping', value: 600, color: '#FF6B6B' },
  { name: 'Bills', value: 1500, color: '#845EF7' },
  { name: 'Entertainment', value: 400, color: '#FAB005' },
]

interface StatCardProps {
  title: string
  value: string
  icon: JSX.Element
  trend?: number
  color?: string
}

const StatCard = ({
  title,
  value,
  icon,
  trend,
  color = 'blue',
}: StatCardProps) => (
  <Card>
    <Group justify="space-between" align="flex-start">
      <div>
        <Text size="sm" color="dimmed">
          {title}
        </Text>
        <Title order={3} mt="xs">
          {value}
        </Title>
        {trend && (
          <Text size="sm" color={trend > 0 ? 'teal' : 'red'} mt={4}>
            {trend > 0 ? (
              <IconArrowUp size={14} />
            ) : (
              <IconArrowDown size={14} />
            )}
            {Math.abs(trend)}% vs last month
          </Text>
        )}
      </div>
      <ActionIcon size="lg" variant="light" color={color}>
        {icon}
      </ActionIcon>
    </Group>
  </Card>
)

const Dashboard = () => {
  const [addTransactionOpened, setAddTransactionOpened] = useState(false)

  return (
    <>
      <Stack gap="lg">
        {/* Quick Stats */}
        <Grid>
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <StatCard
              title="Total Balance"
              value="$12,750"
              icon={<IconWallet size={24} />}
              trend={5.2}
              color="blue"
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <StatCard
              title="Monthly Income"
              value="$5,500"
              icon={<IconReportMoney size={24} />}
              trend={2.1}
              color="green"
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <StatCard
              title="Monthly Expenses"
              value="$3,300"
              icon={<IconReceipt size={24} />}
              trend={-1.8}
              color="red"
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <StatCard
              title="Savings Rate"
              value="40%"
              icon={<IconPigMoney size={24} />}
              trend={3.5}
              color="grape"
            />
          </Grid.Col>
        </Grid>

        {/* Charts Section */}
        <Grid>
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Card>
              <Title order={4} mb="md">
                Income vs Expenses
              </Title>
              <Box h={300}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="income"
                      stroke="#2ecc71"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="expenses"
                      stroke="#e74c3c"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="savings"
                      stroke="#3498db"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card>
              <Title order={4} mb="md">
                Spending by Category
              </Title>
              <Box h={300}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={60}
                      outerRadius={80}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </Card>
          </Grid.Col>
        </Grid>

        {/* Recent Transactions */}
        <Card>
          <Group justify="space-between" mb="md">
            <Title order={4}>Recent Transactions</Title>
            <Button
              leftSection={<IconPlus size={16} />}
              onClick={() => setAddTransactionOpened(true)}
            >
              Add Transaction
            </Button>
          </Group>
          <List spacing="xs">
            {[
              {
                id: 1,
                desc: 'Grocery Shopping',
                amount: -120,
                category: 'Food',
                date: '2024-03-10',
              },
              {
                id: 2,
                desc: 'Salary Deposit',
                amount: 5500,
                category: 'Income',
                date: '2024-03-01',
              },
              {
                id: 3,
                desc: 'Electric Bill',
                amount: -85,
                category: 'Utilities',
                date: '2024-03-05',
              },
            ].map((tx) => (
              <List.Item key={tx.id}>
                <Card>
                  <Group justify="space-between">
                    <div>
                      <Text w={500}>{tx.desc}</Text>
                      <Text size="sm" c="dimmed">
                        {tx.category} • {tx.date}
                      </Text>
                    </div>
                    <Text w={500} c={tx.amount > 0 ? 'green' : 'red'}>
                      {tx.amount > 0 ? '+' : ''}
                      {tx.amount.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })}
                    </Text>
                  </Group>
                </Card>
              </List.Item>
            ))}
          </List>
        </Card>

        {/* Desktop-only Analytics */}
        <Grid>
          <Grid.Col span={6}>
            <Card>
              <Title order={4} mb="md">
                Budget Status
              </Title>
              {categoryData.map((category, index) => (
                <Box key={index} mb="sm">
                  <Group justify="space-between" mb={5}>
                    <Text size="sm">{category.name}</Text>
                    <Text size="sm" w={500}>
                      ${category.value} / ${category.value * 1.5}
                    </Text>
                  </Group>
                  <RingProgress
                    size={60}
                    thickness={8}
                    sections={[
                      {
                        value: (category.value / (category.value * 1.5)) * 100,
                        color: category.color,
                      },
                    ]}
                  />
                </Box>
              ))}
            </Card>
          </Grid.Col>
          <Grid.Col span={6}>
            <Card>
              <Title order={4} mb="md">
                Savings Goals
              </Title>
              <Stack gap="md">
                {[
                  {
                    name: 'Emergency Fund',
                    current: 5000,
                    target: 10000,
                    color: 'blue',
                  },
                  {
                    name: 'Vacation',
                    current: 2000,
                    target: 3000,
                    color: 'grape',
                  },
                  {
                    name: 'New Car',
                    current: 15000,
                    target: 30000,
                    color: 'orange',
                  },
                ].map((goal, index) => (
                  <Box key={index}>
                    <Group justify="space-between" mb={5}>
                      <Text size="sm">{goal.name}</Text>
                      <Text size="sm" w={500}>
                        ${goal.current} / ${goal.target}
                      </Text>
                    </Group>
                    <RingProgress
                      size={60}
                      thickness={8}
                      sections={[
                        {
                          value: (goal.current / goal.target) * 100,
                          color: goal.color,
                        },
                      ]}
                    />
                  </Box>
                ))}
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>
      </Stack>
      {/* Add Transaction Drawer */}
      <Drawer
        opened={addTransactionOpened}
        onClose={() => setAddTransactionOpened(false)}
        title="Add Transaction"
        padding="lg"
        position="right"
        size="md"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault()
            setAddTransactionOpened(false)
            // Add transaction logic here
          }}
        >
          <Stack gap="md">
            <Select
              label="Type"
              placeholder="Select transaction type"
              required
              data={[
                { value: 'income', label: 'Income' },
                { value: 'expense', label: 'Expense' },
                { value: 'transfer', label: 'Transfer' },
              ]}
            />

            <NumberInput
              label="Amount"
              placeholder="Enter amount"
              required
              min={0}
              decimalScale={2}
              leftSection={<IconReportMoney size={16} />}
            />

            <Select
              label="Category"
              placeholder="Select category"
              required
              data={[
                { value: 'salary', label: 'Salary' },
                { value: 'food', label: 'Food & Dining' },
                { value: 'transport', label: 'Transportation' },
                { value: 'shopping', label: 'Shopping' },
                { value: 'bills', label: 'Bills & Utilities' },
                { value: 'entertainment', label: 'Entertainment' },
                { value: 'health', label: 'Healthcare' },
                { value: 'education', label: 'Education' },
                { value: 'other', label: 'Other' },
              ]}
            />

            <TextInput
              label="Description"
              placeholder="Enter description"
              required
            />

            <DatePickerInput
              label="Date"
              placeholder="Pick date"
              required
              clearable={false}
              defaultValue={new Date()}
            />

            <Select
              label="Account"
              placeholder="Select account"
              required
              data={[
                { value: 'checking', label: 'Checking Account' },
                { value: 'savings', label: 'Savings Account' },
                { value: 'credit', label: 'Credit Card' },
                { value: 'cash', label: 'Cash' },
              ]}
            />

            {/* Only show for transfers */}
            <Select
              label="To Account"
              placeholder="Select destination account"
              data={[
                { value: 'checking', label: 'Checking Account' },
                { value: 'savings', label: 'Savings Account' },
                { value: 'credit', label: 'Credit Card' },
                { value: 'cash', label: 'Cash' },
              ]}
            />

            <TextInput
              label="Tags"
              placeholder="Enter tags (comma separated)"
            />

            <Group justify="right" mt="md">
              <Button
                variant="subtle"
                onClick={() => setAddTransactionOpened(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Add Transaction</Button>
            </Group>
          </Stack>
        </form>
      </Drawer>
      {/* Settings Modal */}
    </>
  )
}

export default Dashboard
