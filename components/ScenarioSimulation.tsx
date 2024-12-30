import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function ScenarioSimulation() {
  const [targetSales, setTargetSales] = useState('')
  const [commissionRate, setCommissionRate] = useState('')
  const [projectedCommission, setProjectedCommission] = useState(null)

  const simulateScenario = () => {
    const sales = parseFloat(targetSales)
    const rate = parseFloat(commissionRate)
    if (!isNaN(sales) && !isNaN(rate)) {
      setProjectedCommission((sales * rate) / 100)
    }
  }

  return (
    <div className="mb-8">
      <h2 className="text-1xl font-semibold mb-4 text-gray-800">Simulação de Cenário</h2>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <Input
          type="number"
          value={targetSales}
          onChange={(e) => setTargetSales(e.target.value)}
          placeholder="Meta de Vendas (R$)"
        />
        <Input
          type="number"
          value={commissionRate}
          onChange={(e) => setCommissionRate(e.target.value)}
          placeholder="Taxa de Comissão (%)"
        />
        <Button onClick={simulateScenario} className="bg-emerald-500 hover:bg-emerald-600 text-white">
          Simular
        </Button>
      </div>
      {projectedCommission !== null && (
        <p>Comissão Projetada: R$ {projectedCommission.toFixed(2)}</p>
      )}
    </div>
  )
}

