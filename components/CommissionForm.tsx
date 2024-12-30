import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function CommissionForm({ sellers, calculateCommission }) {
  const [seller, setSeller] = useState('')
  const [saleValue, setSaleValue] = useState('')
  const [commissionType, setCommissionType] = useState('percentage')
  const [commissionValue, setCommissionValue] = useState('')
  const [cost, setCost] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Implement commission calculation logic here
    const amount = calculateCommissionAmount()
    calculateCommission({ seller, amount })
  }

  const calculateCommissionAmount = () => {
    // Implement different calculation methods based on commissionType
    // This is a simplified example
    const sale = parseFloat(saleValue)
    if (commissionType === 'percentage') {
      return (sale * parseFloat(commissionValue)) / 100
    } else if (commissionType === 'fixed') {
      return parseFloat(commissionValue)
    } else if (commissionType === 'profit') {
      const profit = sale - parseFloat(cost)
      return (profit * parseFloat(commissionValue)) / 100
    }
    return 0
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <h2 className="text-1xl font-semibold mb-4 text-gray-800">Calcular comissão</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <Select onValueChange={setSeller}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o Vendedor" />
          </SelectTrigger>
          <SelectContent>
            {sellers.map((s) => (
              <SelectItem key={s.id} value={s.name}>
                {s.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          type="number"
          value={saleValue}
          onChange={(e) => setSaleValue(e.target.value)}
          placeholder="Valor da Venda (R$)"
        />
        <Select onValueChange={setCommissionType}>
          <SelectTrigger>
            <SelectValue placeholder="Tipo de Comissão" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="percentage">Porcentagem</SelectItem>
            <SelectItem value="fixed">Valor Fixo</SelectItem>
            <SelectItem value="profit">Baseado no Lucro</SelectItem>
          </SelectContent>
        </Select>
        <Input
          type="number"
          value={commissionValue}
          onChange={(e) => setCommissionValue(e.target.value)}
          placeholder={commissionType === 'fixed' ? 'Valor Fixo (R$)' : 'Porcentagem (%)'}
        />
        {commissionType === 'profit' && (
          <Input
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            placeholder="Custo (R$)"
          />
        )}
      </div>
      <Button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white">
        Calcular Comissão
      </Button>
    </form>
  )
}

