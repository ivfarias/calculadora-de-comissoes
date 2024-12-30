'use client'

import { useState, useEffect } from 'react'
import SellerForm from '../components/SellerForm'
import CommissionForm from '../components/CommissionForm'
import ResultsTable from '../components/ResultsTable'
import ScenarioSimulation from '../components/ScenarioSimulation'
import CommissionHistory from '../components/CommissionHistory'
import Image from 'next/image'

// Define types for our data structures
type Seller = {
  id: number;
  name: string;
};

type Commission = {
  seller: string;
  amount: number;
  date: string;
};

export default function Calculator() {
  const [sellers, setSellers] = useState<Seller[]>([])
  const [commissions, setCommissions] = useState<Commission[]>([])
  const [history, setHistory] = useState<Commission[]>([])

  useEffect(() => {
    const savedHistory = localStorage.getItem('commissionHistory')
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory))
    }
  }, [])

  const addSeller = (seller: Seller) => {
    setSellers([...sellers, seller])
  }

  const calculateCommission = (data: { seller: string; amount: number }) => {
    const newCommission: Commission = {
      seller: data.seller,
      amount: data.amount,
      date: new Date().toISOString(),
    }
    setCommissions([...commissions, newCommission])

    const updatedHistory = [...history, newCommission]
    setHistory(updatedHistory)
    localStorage.setItem('commissionHistory', JSON.stringify(updatedHistory))
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 sm:p-8">
          <Image
            src="./logo_green.svg"
            alt="Logo"
            width={40}
            height={40}
            className="dark:invert mb-2"
          />
          <h1 className="text-3xl font-bold mb-8 text-gray-800">Calculadora de Comissão de Vendas</h1>
          <div className="space-y-8">
            <SellerForm addSeller={addSeller} />
            <CommissionForm sellers={sellers} calculateCommission={calculateCommission} />
            <ResultsTable commissions={commissions} />
            <ScenarioSimulation />
            <CommissionHistory history={history} />
          </div>
        </div>
      </div>
    </div>
  )
}

