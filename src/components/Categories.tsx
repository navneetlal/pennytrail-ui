import {
  Card,
  Table,
  Button,
  ActionIcon,
  Group,
  Text,
  ColorSwatch,
  Box,
  Modal,
} from '@mantine/core'
import {
  IconShoppingCart,
  IconCar,
  IconBriefcase,
  IconEdit,
  IconTrash,
} from '@tabler/icons-react'
import CategoryForm from './CategoryForm'
import { useState } from 'react'

export interface Category {
  icon: React.ReactNode
  name: string
  type: 'Income' | 'Expense'
  color: string
}

const initialCategories: Category[] = [
  {
    icon: <IconBriefcase size={24} />,
    name: 'Salary',
    type: 'Income',
    color: 'green',
  },
  {
    icon: <IconShoppingCart size={24} />,
    name: 'Food',
    type: 'Expense',
    color: 'red',
  },
  {
    icon: <IconCar size={24} />,
    name: 'Transport',
    type: 'Expense',
    color: 'blue',
  },
]

export const Categories = () => {
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)

  const handleAddCategory = () => {
    setEditingCategory(null)
    setDialogOpen(true)
  }

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category)
    setDialogOpen(true)
  }

  const handleSaveCategory = (category: Partial<Category>) => {
    if (editingCategory) {
      setCategories((prev) =>
        prev.map((cat) =>
          cat.name === editingCategory.name ? { ...cat, ...category } : cat
        )
      )
    } else {
      setCategories((prev) => [
        ...prev,
        { id: Date.now(), ...category } as Category,
      ])
    }
    setDialogOpen(false)
  }

  const handleDeleteCategory = (name: string) => {
    setCategories((prev) => prev.filter((cat) => cat.name !== name))
  }

  return (
    <>
      <Box p="md">
        <Group justify="space-between">
          <Text fw={600} size="lg">
            Categories
          </Text>
          <Button size="xs" variant="light" onClick={() => handleAddCategory()}>
            + Add Category
          </Button>
        </Group>
        <Card shadow="sm" mt="md" padding="lg" radius="md" withBorder>
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
            <tbody>
              {categories.map((category, index) => (
                <Table.Tr key={index}>
                  <Table.Td>
                    <ActionIcon
                      size="lg"
                      variant="light"
                      color={category.color}
                    >
                      {category.icon}
                    </ActionIcon>
                  </Table.Td>
                  <Table.Td>{category.name}</Table.Td>
                  <Table.Td
                    style={{
                      color: category.type === 'Income' ? 'green' : 'red',
                    }}
                  >
                    {category.type}
                  </Table.Td>
                  <Table.Td>
                    <ColorSwatch size={16} color={category.color} />
                  </Table.Td>
                  <Table.Td>
                    <ActionIcon
                      onClick={() => handleEditCategory(category)}
                      variant="transparent"
                    >
                      <IconEdit size={16} />
                    </ActionIcon>
                    <ActionIcon
                      onClick={() => handleDeleteCategory(category.name)}
                      variant="transparent"
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Table.Td>
                </Table.Tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </Box>
      {/* Dialog for Adding/Editing Categories */}
      <Modal
        opened={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title={editingCategory ? 'Edit Category' : 'Add Category'}
        centered
      >
        <CategoryForm
          initialValues={
            editingCategory || { name: '', type: 'Income', color: '', icon: '' }
          }
          onSubmit={handleSaveCategory}
        />
      </Modal>
    </>
  )
}

export default Categories
