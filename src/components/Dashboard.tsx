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
  Menu,
  Progress,
  Center,
  rem,
} from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { ResponsiveContainer } from 'recharts'
import { DonutChart, LineChart } from '@mantine/charts'
import {
  IconWallet,
  IconReportMoney,
  IconPlus,
  IconArrowUp,
  IconArrowDown,
  IconPigMoney,
  IconReceipt,
  IconArrowDownRight,
  IconArrowUpRight,
  IconDotsVertical,
  IconEdit,
  IconTrash,
  IconCheck,
} from '@tabler/icons-react'
import { Transaction } from './Transactions'
import { nanoid } from 'nanoid'

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

const transactions: Transaction[] = [
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
        <Text size="sm" c="dimmed">
          {title}
        </Text>
        <Title order={3} mt="xs">
          {value}
        </Title>
        {trend && (
          <Text size="sm" c={trend > 0 ? 'teal' : 'red'} mt={4}>
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
                  <LineChart
                    data={monthlyData}
                    withLegend
                    dataKey="month"
                    series={[
                      { name: 'income', color: 'green' },
                      { name: 'expenses', color: 'red' },
                      { name: 'savings', color: 'blue' },
                    ]}
                  />
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
                  <DonutChart
                    data={categoryData}
                    withLabels
                    pieProps={{
                      dataKey: 'value',
                      nameKey: 'name',
                      label: ({ value }) => `$${value}`,
                    }}
                  />
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
              size="xs"
              variant="light"
              leftSection={<IconPlus size={16} />}
              onClick={() => setAddTransactionOpened(true)}
            >
              Add Transaction
            </Button>
          </Group>
          {transactions.map((transaction, _index) => (
            // <Card key={index} padding="md" radius="md">
            <Group key={transaction.id} justify="space-between" my="sm">
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
                      // onClick={() => handleEditTransaction(transaction)}
                    >
                      Edit
                    </Menu.Item>
                    <Menu.Item
                      leftSection={<IconTrash />}
                      // onClick={() => handleDeleteTransaction(transaction.id)}
                    >
                      Delete
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>
            </Group>
            // </Card>
          ))}
        </Card>

        {/* Desktop-only Analytics */}
        <Grid>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Card>
              <Title order={4} mb="md">
                Budget Status
              </Title>
              {categoryData.map((category, index) => (
                <Box key={index} mb="sm">
                  <Group justify="space-between" mb={5}>
                    <Text size="sm">{category.name}</Text>
                    <Text size="sm" fw={500}>
                      ${category.value} / ${category.value * 1.5}
                    </Text>
                  </Group>
                  <Progress
                    value={(category.value / (category.value * 1.5)) * 100}
                    color={category.color}
                    // size={60}
                    // thickness={8}
                    // sections={[
                    //   {
                    //     value: (category.value / (category.value * 1.5)) * 100,
                    //     color: category.color,
                    //   },
                    // ]}
                  />
                </Box>
              ))}
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Card>
              <Title order={4} mb="md">
                Savings Goals
              </Title>
              <Grid>
                {[
                  {
                    name: 'Emergency Fund',
                    current: 5000,
                    target: 10000,
                    color: 'blue',
                  },
                  {
                    name: 'Vacation',
                    current: 3000,
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
                  <Grid.Col span={{ base: 12, md: 4 }} key={index}>
                    <Group justify="space-between" mb={5}>
                      <Text size="sm">{goal.name}</Text>
                      <Text size="sm" fw={500}>
                        ${goal.current} / ${goal.target}
                      </Text>
                    </Group>
                    <RingProgress
                      size={100}
                      thickness={10}
                      sections={[
                        {
                          value: (goal.current / goal.target) * 100,
                          color:
                            (goal.current / goal.target) * 100 === 100
                              ? 'green'
                              : goal.color,
                        },
                      ]}
                      label={
                        <Text c="blue" fw={400} ta="center" size="md">
                          {(goal.current / goal.target) * 100 === 100 ? (
                            <Center>
                              <ActionIcon
                                color="teal"
                                variant="light"
                                radius="xl"
                                size="xl"
                              >
                                <IconCheck
                                  style={{ width: rem(22), height: rem(22) }}
                                />
                              </ActionIcon>
                            </Center>
                          ) : (
                            `${Number((goal.current / goal.target).toFixed(3)) * 100}%`
                          )}
                        </Text>
                      }
                    />
                  </Grid.Col>
                ))}
              </Grid>
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
