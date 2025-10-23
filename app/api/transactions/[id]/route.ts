import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const userId = session.user.id
    const transactionId = params.id

    // Verificar se a transação pertence ao usuário
    const transaction = await prisma.transaction.findFirst({
      where: {
        id: transactionId,
        userId
      }
    })

    if (!transaction) {
      return NextResponse.json(
        { error: 'Transação não encontrada' },
        { status: 404 }
      )
    }

    await prisma.transaction.delete({
      where: {
        id: transactionId
      }
    })

    return NextResponse.json({ message: 'Transação excluída com sucesso' })
  } catch (error) {
    console.error('Erro ao excluir transação:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const userId = session.user.id
    const transactionId = params.id
    const body = await request.json()
    const { amount, description, type, date, categoryId } = body

    // Verificar se a transação pertence ao usuário
    const existingTransaction = await prisma.transaction.findFirst({
      where: {
        id: transactionId,
        userId
      }
    })

    if (!existingTransaction) {
      return NextResponse.json(
        { error: 'Transação não encontrada' },
        { status: 404 }
      )
    }

    const transaction = await prisma.transaction.update({
      where: {
        id: transactionId
      },
      data: {
        amount,
        description,
        type,
        date: new Date(date),
        categoryId: categoryId || null
      },
      include: {
        category: true
      }
    })

    return NextResponse.json(transaction)
  } catch (error) {
    console.error('Erro ao atualizar transação:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
