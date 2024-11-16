import { TextInput, Select, ColorInput, Group, Button } from '@mantine/core'
import { useState } from 'react'
import { Category } from './Categories'

interface CategoryFormProps {
  initialValues: Partial<Category>
  onSubmit: (data: Partial<Category>) => void
}

const CategoryForm = ({ initialValues, onSubmit }: CategoryFormProps) => {
  const [formValues, setFormValues] = useState(initialValues)

  const handleChange = (field: string, value: any) => {
    setFormValues((prev: any) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    onSubmit(formValues)
  }

  return (
    <>
      <TextInput
        label="Name"
        value={formValues.name || ''}
        onChange={(e) => handleChange('name', e.target.value)}
        mb="sm"
      />
      <Select
        label="Type"
        data={[
          { value: 'Income', label: 'Income' },
          { value: 'Expense', label: 'Expense' },
        ]}
        value={formValues.type || ''}
        onChange={(value) => handleChange('type', value)}
        mb="sm"
      />
      <ColorInput
        label="Color"
        value={formValues.color || ''}
        onChange={(value) => handleChange('color', value)}
        mb="sm"
      />
      {/* <Select
          label="Icon"
          data={[
            { value: "briefcase", label: "Briefcase" },
            { value: "shoppingCart", label: "Shopping Cart" },
            { value: "car", label: "Car" },
            { value: "laptop", label: "Laptop" },
          ]}
          value={formValues.icon || ""}
          onChange={(value) => handleChange("icon", value)}
        /> */}

      <Group justify="right" mt="md">
        <Button variant="default" onClick={() => setFormValues(initialValues)}>
          Cancel
        </Button>
        <Button onClick={handleSave}>Save</Button>
      </Group>
    </>
  )
}

export default CategoryForm
