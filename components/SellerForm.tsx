import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Seller {
  name: string;
  id: number;
}

interface SellerFormProps {
  addSeller: (seller: Seller) => void;
}

export default function SellerForm({ addSeller }: SellerFormProps) {
  const [name, setName] = useState<string>('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (name.trim()) {
      addSeller({ name, id: Date.now() })
      setName('')
    }
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <h2 className="text-1xl font-semibold mb-4 text-gray-800">Adicionar Vendedor</h2>
      <div className="flex gap-4">
        <Input
          type="text"
          value={name}
          onChange={handleNameChange}
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

