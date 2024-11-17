import { useState } from 'react'
import {
  Container,
  Title,
  Text,
  Button,
  Paper,
  Progress,
  Group,
  ActionIcon,
  Box,
  Grid,
  ThemeIcon,
  Card,
} from '@mantine/core'
import {
  IconTarget,
  IconPlus,
  IconPigMoney,
  IconWallet,
  IconCalendar,
  IconDotsVertical,
} from '@tabler/icons-react'
import classes from './GoalTracker.module.css'

interface SavingsTarget {
  id: string
  name: string
  targetAmount: number
  currentAmount: number
  deadline: string
}

export function SavingsPage() {
  const [savingsTargets] = useState<SavingsTarget[]>([
    {
      id: '1',
      name: 'New Car',
      targetAmount: 25000,
      currentAmount: 15000,
      deadline: '2024-12-31',
    },
    {
      id: '2',
      name: 'Emergency Fund',
      targetAmount: 10000,
      currentAmount: 7500,
      deadline: '2024-08-01',
    },
  ])

  return (
    <Box className={classes.root}>
      <Container size="xl" py="xl">
        {/* Header Section */}
        <Group justify="space-between" className={classes.header}>
          <div>
            <Title order={1} fw={600} size="lg">
              Goal Tracker
            </Title>
            <Text size="sm" c="dimmed" mt="xs">
              Track and manage your savings goals
            </Text>
          </div>
          <Button
            leftSection={<IconPlus size={16} />}
            variant="light"
            size="xs"
          >
            Add Target
          </Button>
        </Group>

        {/* Savings Targets List */}
        <Box>
          {savingsTargets.map((target) => {
            const progress = (target.currentAmount / target.targetAmount) * 100

            return (
              <Paper
                key={target.id}
                className={classes.card}
                p="xl"
                mb="md"
                radius="md"
              >
                <Group justify="space-between" mb="md">
                  <Group>
                    <ThemeIcon
                      size="xl"
                      radius="md"
                      variant="light"
                      color="blue"
                    >
                      <IconTarget size={24} />
                    </ThemeIcon>
                    <div>
                      <Text size="lg" fw={500}>
                        {target.name}
                      </Text>
                      <Text size="sm" c="dimmed">
                        Target: ${target.targetAmount.toLocaleString()}
                      </Text>
                    </div>
                  </Group>
                  <ActionIcon variant="subtle">
                    <IconDotsVertical size={18} />
                  </ActionIcon>
                </Group>

                <Progress value={progress} size="md" radius="xl" mb="xl" />

                <Grid>
                  <Grid.Col span={4}>
                    <Card className={classes.statCard} p="md">
                      <Group gap="xs" mb={5}>
                        <IconPigMoney size={16} />
                        <Text size="sm" c="dimmed">
                          Saved
                        </Text>
                      </Group>
                      <Text size="lg" fw={500}>
                        ${target.currentAmount.toLocaleString()}
                      </Text>
                    </Card>
                  </Grid.Col>

                  <Grid.Col span={4}>
                    <Card className={classes.statCard} p="md">
                      <Group gap="xs" mb={5}>
                        <IconWallet size={16} />
                        <Text size="sm" c="dimmed">
                          Remaining
                        </Text>
                      </Group>
                      <Text size="lg" fw={500}>
                        $
                        {(
                          target.targetAmount - target.currentAmount
                        ).toLocaleString()}
                      </Text>
                    </Card>
                  </Grid.Col>

                  <Grid.Col span={4}>
                    <Card className={classes.statCard} p="md">
                      <Group gap="xs" mb={5}>
                        <IconCalendar size={16} />
                        <Text size="sm" c="dimmed">
                          Deadline
                        </Text>
                      </Group>
                      <Text size="lg" fw={500}>
                        {new Date(target.deadline).toLocaleDateString()}
                      </Text>
                    </Card>
                  </Grid.Col>
                </Grid>
              </Paper>
            )
          })}
        </Box>
      </Container>
    </Box>
  )
}

export default SavingsPage
