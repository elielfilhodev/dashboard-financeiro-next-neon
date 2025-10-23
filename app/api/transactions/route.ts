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

    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        isActive: true
      },
      include: {
        category: true
      },
      orderBy: {
        date: 'desc'
      }
    })

    return NextResponse.json(transactions)
  } catch (error) {
    console.error('Erro ao buscar transações:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const userId = session.user.id
    const body = await request.json()
    const { amount, description, type, date, categoryId } = body

    const transaction = await prisma.transaction.create({
      data: {
        amount,
        description,
        type,
        date: new Date(date),
        categoryId: categoryId || null,
        userId,
        isActive: true
      },
      include: {
        category: true
      }
    })

    return NextResponse.json(transaction, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar transação:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
