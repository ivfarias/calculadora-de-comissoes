import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function SellerForm({ addSeller }) {
  const [name, setName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name.trim()) {
      addSeller({ name, id: Date.now() })
      setName('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <h2 className="text-1xl font-semibold mb-4 text-gray-800">Adicionar Vendedor</h2>
      <div className="flex gap-4">
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome do Vendedor"
          className="flex-grow"
        />
        <Button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white">
          Adicionar
        </Button>
      </div>
    </form>
  )
}

