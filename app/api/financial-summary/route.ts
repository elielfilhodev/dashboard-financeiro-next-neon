import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const userId = session.user.id

    // Calcular totais
    const [totalIncome, totalExpenses, monthlyIncome, monthlyExpenses] = await Promise.all([
      prisma.transaction.aggregate({
        where: {
          userId,
          type: 'INCOME'
        },
        _sum: {
          amount: true
        }
      }),
      prisma.transaction.aggregate({
        where: {
          userId,
          type: 'EXPENSE'
        },
        _sum: {
          amount: true
        }
      }),
      prisma.transaction.aggregate({
        where: {
          userId,
          type: 'INCOME',
          date: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
          }
        },
        _sum: {
          amount: true
        }
      }),
      prisma.transaction.aggregate({
        where: {
          userId,
          type: 'EXPENSE',
          date: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
          }
        },
        _sum: {
          amount: true
        }
      })
    ])

    const totalIncomeAmount = totalIncome._sum.amount || 0
    const totalExpensesAmount = totalExpenses._sum.amount || 0
    const monthlyIncomeAmount = monthlyIncome._sum.amount || 0
    const monthlyExpensesAmount = monthlyExpenses._sum.amount || 0

    return NextResponse.json({
      totalIncome: totalIncomeAmount,
      totalExpenses: totalExpensesAmount,
      balance: totalIncomeAmount - totalExpensesAmount,
      monthlyIncome: monthlyIncomeAmount,
      monthlyExpenses: monthlyExpensesAmount,
    })
  } catch (error) {
    console.error('Erro ao buscar resumo financeiro:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
