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

    const expensesByCategory = await prisma.transaction.groupBy({
      by: ['categoryId'],
      where: {
        userId,
        type: 'EXPENSE',
        isActive: true
      },
      _sum: {
        amount: true
      }
    })

    const categories = await prisma.category.findMany({
      where: {
        userId,
        type: 'EXPENSE',
        isActive: true
      }
    })

    const data = expensesByCategory.map(expense => {
      const category = categories.find(cat => cat.id === expense.categoryId)
      return {
        name: category?.name || 'Sem categoria',
        value: expense._sum.amount || 0,
        color: category?.color || '#6B7280'
      }
    }).filter(item => item.value > 0)

    return NextResponse.json(data)
  } catch (error) {
    console.error('Erro ao buscar despesas por categoria:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
