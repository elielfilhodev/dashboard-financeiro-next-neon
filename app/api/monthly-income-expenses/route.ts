import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getMonthName } from '@/lib/utils'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const userId = session.user.id

    // Buscar dados dos últimos 6 meses
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        date: {
          gte: sixMonthsAgo
        },
        isActive: true
      },
      select: {
        amount: true,
        type: true,
        date: true
      }
    })

    // Agrupar por mês
    const monthlyData: { [key: string]: { income: number; expenses: number } } = {}

    transactions.forEach(transaction => {
      const month = new Date(transaction.date).getMonth() + 1
      const year = new Date(transaction.date).getFullYear()
      const key = `${year}-${month.toString().padStart(2, '0')}`
      
      if (!monthlyData[key]) {
        monthlyData[key] = { income: 0, expenses: 0 }
      }
      
      if (transaction.type === 'INCOME') {
        monthlyData[key].income += transaction.amount
      } else {
        monthlyData[key].expenses += transaction.amount
      }
    })

    // Converter para array e ordenar
    const data = Object.entries(monthlyData)
      .map(([key, values]) => {
        const [year, month] = key.split('-')
        return {
          month: `${getMonthName(parseInt(month))} ${year}`,
          income: values.income,
          expenses: values.expenses
        }
      })
      .sort((a, b) => {
        const [aYear, aMonth] = a.month.split(' ')
        const [bYear, bMonth] = b.month.split(' ')
        const aDate = new Date(parseInt(aYear), getMonthName(parseInt(aMonth)) === 'Janeiro' ? 0 : 
          getMonthName(parseInt(aMonth)) === 'Fevereiro' ? 1 : 
          getMonthName(parseInt(aMonth)) === 'Março' ? 2 : 
          getMonthName(parseInt(aMonth)) === 'Abril' ? 3 : 
          getMonthName(parseInt(aMonth)) === 'Maio' ? 4 : 
          getMonthName(parseInt(aMonth)) === 'Junho' ? 5 : 
          getMonthName(parseInt(aMonth)) === 'Julho' ? 6 : 
          getMonthName(parseInt(aMonth)) === 'Agosto' ? 7 : 
          getMonthName(parseInt(aMonth)) === 'Setembro' ? 8 : 
          getMonthName(parseInt(aMonth)) === 'Outubro' ? 9 : 
          getMonthName(parseInt(aMonth)) === 'Novembro' ? 10 : 11)
        const bDate = new Date(parseInt(bYear), getMonthName(parseInt(bMonth)) === 'Janeiro' ? 0 : 
          getMonthName(parseInt(bMonth)) === 'Fevereiro' ? 1 : 
          getMonthName(parseInt(bMonth)) === 'Março' ? 2 : 
          getMonthName(parseInt(bMonth)) === 'Abril' ? 3 : 
          getMonthName(parseInt(bMonth)) === 'Maio' ? 4 : 
          getMonthName(parseInt(bMonth)) === 'Junho' ? 5 : 
          getMonthName(parseInt(bMonth)) === 'Julho' ? 6 : 
          getMonthName(parseInt(bMonth)) === 'Agosto' ? 7 : 
          getMonthName(parseInt(bMonth)) === 'Setembro' ? 8 : 
          getMonthName(parseInt(bMonth)) === 'Outubro' ? 9 : 
          getMonthName(parseInt(bMonth)) === 'Novembro' ? 10 : 11)
        return aDate.getTime() - bDate.getTime()
      })

    return NextResponse.json(data)
  } catch (error) {
    console.error('Erro ao buscar dados mensais:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
