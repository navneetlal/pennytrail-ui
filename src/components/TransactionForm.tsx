import { TextInput, Select, Group, Button, NumberInput } from '@mantine/core'
import { useState } from 'react'
import { Transaction } from './Transactions'
import { DateInput } from '@mantine/dates'

interface TransactionFormProps {
  initialValues: Partial<Transaction>
  onSubmit: (data: Partial<Transaction>) => void
}

const TransactionForm = ({ initialValues, onSubmit }: TransactionFormProps) => {
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
        label="Title"
        value={formValues.title || ''}
        onChange={(e) => handleChange('title', e.target.value)}
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
      <Select
        label="Category"
        data={[
          { value: 'Food', label: 'Food' },
          { value: 'Transportation', label: 'Transportation' },
        ]}
        value={formValues.category || ''}
        onChange={(value) => handleChange('category', value)}
        mb="sm"
      />
      <NumberInput
        label="Amount"
        placeholder="Dollars"
        prefix="$"
        allowNegative={false}
        onChange={(value) => handleChange('amount', value)}
        value={formValues.amount || ''}
        mb="sm"
      />
      <DateInput
        value={new Date(formValues.date || new Date())}
        onChange={(value) => handleChange('date', value?.toISOString())}
        label="Date input"
        placeholder="Date input"
      />
      <Group justify="right" mt="md">
        <Button variant="default" onClick={() => setFormValues(initialValues)}>
          Cancel
        </Button>
        <Button onClick={handleSave}>Save</Button>
      </Group>
    </>
  )
}

export default TransactionForm
