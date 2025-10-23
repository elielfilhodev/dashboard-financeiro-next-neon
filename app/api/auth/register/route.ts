import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password } = body as { name: string; email: string; password: string }

    if (!email || !password) {
      return NextResponse.json({ error: 'Email e senha são obrigatórios' }, { status: 400 })
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: 'Email já cadastrado' }, { status: 409 })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name: name || null,
        email,
        passwordHash,
        isActive: true,
      },
      select: { id: true, email: true, name: true }
    })

    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    console.error('Erro ao registrar usuário:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}

