'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CurrencyDisplay } from '@/components/ui/currency-display'
import { TrendingUp, TrendingDown, DollarSign, CreditCard } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

interface FinancialData {
  totalIncome: number
  totalExpenses: number
  balance: number
  monthlyIncome: number
  monthlyExpenses: number
}

export function FinancialSummary() {
  const [data, setData] = useState<FinancialData>({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
    monthlyIncome: 0,
    monthlyExpenses: 0,
  })
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    fetchFinancialSummary()
  }, [])

  const fetchFinancialSummary = async () => {
    try {
      const response = await fetch('/api/financial-summary')
      const data = await response.json()
      setData(data)
    } catch (error) {
      console.error('Erro ao carregar resumo financeiro:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!mounted || loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Carregando...
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">-</div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Saldo Total
          </CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <CurrencyDisplay 
            amount={data.balance}
            size="md"
            type={data.balance >= 0 ? 'INCOME' : 'EXPENSE'}
          />
          <p className="text-xs text-muted-foreground">
            Saldo atual
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Receitas
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <CurrencyDisplay 
            amount={data.totalIncome}
            size="md"
            type="INCOME"
          />
          <p className="text-xs text-muted-foreground">
            Total de receitas
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Despesas
          </CardTitle>
          <TrendingDown className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <CurrencyDisplay 
            amount={data.totalExpenses}
            size="md"
            type="EXPENSE"
          />
          <p className="text-xs text-muted-foreground">
            Total de despesas
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Este Mês
          </CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <CurrencyDisplay 
            amount={data.monthlyIncome - data.monthlyExpenses}
            size="md"
            type={data.monthlyIncome - data.monthlyExpenses >= 0 ? 'INCOME' : 'EXPENSE'}
          />
          <p className="text-xs text-muted-foreground break-words">
            <span className="block sm:inline">Receitas: {formatCurrency(data.monthlyIncome)}</span>
            <span className="hidden sm:inline"> | </span>
            <span className="block sm:inline">Despesas: {formatCurrency(data.monthlyExpenses)}</span>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
