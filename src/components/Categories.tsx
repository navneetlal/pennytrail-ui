// CategoriesPage.tsx
import React, { useState } from 'react'
import {
  Container,
  Title,
  Paper,
  Group,
  Button,
  Table,
  Text,
  Modal,
  TextInput,
  Select,
  ColorInput,
  ActionIcon,
  Menu,
  Stack,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconDots,
  IconWallet,
  IconShoppingCart,
  IconCar,
  IconBriefcase,
} from '@tabler/icons-react'

// Types
interface Category {
  id: string
  name: string
  type: 'income' | 'expense'
  color: string
  icon: string
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

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(sampleCategories)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  )
  const [isModalOpen, setIsModalOpen] = useState(false)

  const form = useForm({
    initialValues: {
      name: '',
      type: 'expense' as 'income' | 'expense',
      color: '#1c7ed6',
      icon: 'wallet',
    },
  })

  const handleSubmit = (values: typeof form.values) => {
    if (selectedCategory) {
      setCategories(
        categories.map((cat) =>
          cat.id === selectedCategory.id ? { ...values, id: cat.id } : cat
        )
      )
    } else {
      setCategories([
        ...categories,
        { ...values, id: Math.random().toString() },
      ])
    }
    handleCloseModal()
  }

  const handleOpenModal = (category?: Category) => {
    if (category) {
      setSelectedCategory(category)
      form.setValues(category)
    } else {
      setSelectedCategory(null)
      form.reset()
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedCategory(null)
    form.reset()
  }

  const handleDelete = (id: string) => {
    setCategories(categories.filter((cat) => cat.id !== id))
  }

  const iconOptions = [
    { value: 'wallet', label: 'Wallet', icon: IconWallet },
    { value: 'shopping-cart', label: 'Shopping Cart', icon: IconShoppingCart },
    { value: 'car', label: 'Car', icon: IconCar },
    { value: 'briefcase', label: 'Briefcase', icon: IconBriefcase },
  ]

  return (
    <Container size="lg" py="xl">
      <Paper shadow="xs" p="md" withBorder>
        <Group justify="space-between" mb="md">
          <Title order={2}>Categories</Title>
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={() => handleOpenModal()}
          >
            Add Category
          </Button>
        </Group>

        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Icon</Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>Type</Table.Th>
              <Table.Th>Color</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {categories.map((category) => (
              <Table.Tr key={category.id}>
                <Table.Td>
                  {iconOptions.find((i) => i.value === category.icon)?.icon &&
                    React.createElement(
                      iconOptions.find((i) => i.value === category.icon)!.icon,
                      { size: 20, style: { color: category.color } }
                    )}
                </Table.Td>
                <Table.Td>{category.name}</Table.Td>
                <Table.Td>
                  <Text c={category.type === 'income' ? 'teal' : 'red'}>
                    {category.type.charAt(0).toUpperCase() +
                      category.type.slice(1)}
                  </Text>
                </Table.Td>
                <Table.Td>
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      backgroundColor: category.color,
                    }}
                  />
                </Table.Td>
                <Table.Td>
                  <Group gap="sm" justify="left">
                    <ActionIcon onClick={() => handleOpenModal(category)}>
                      <IconEdit size={16} />
                    </ActionIcon>
                    <Menu position="bottom-end" shadow="md">
                      <Menu.Target>
                        <ActionIcon>
                          <IconDots size={16} />
                        </ActionIcon>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Item
                          color="red"
                          leftSection={<IconTrash size={16} />}
                          onClick={() => handleDelete(category.id)}
                        >
                          Delete
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>

        <Modal
          opened={isModalOpen}
          onClose={handleCloseModal}
          title={selectedCategory ? 'Edit Category' : 'New Category'}
        >
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="md">
              <TextInput
                required
                label="Name"
                placeholder="Enter category name"
                {...form.getInputProps('name')}
              />
              <Select
                required
                label="Type"
                data={[
                  { value: 'income', label: 'Income' },
                  { value: 'expense', label: 'Expense' },
                ]}
                {...form.getInputProps('type')}
              />
              <Select
                required
                label="Icon"
                data={iconOptions}
                {...form.getInputProps('icon')}
              />
              <ColorInput
                required
                label="Color"
                {...form.getInputProps('color')}
              />
              <Button type="submit">
                {selectedCategory ? 'Update' : 'Create'} Category
              </Button>
            </Stack>
          </form>
        </Modal>
      </Paper>
    </Container>
  )
}

export default CategoriesPage
