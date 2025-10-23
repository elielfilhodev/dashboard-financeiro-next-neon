import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function createUser() {
  try {
    // Criar usuário de teste
    const user = await prisma.user.create({
      data: {
        name: 'Usuário Teste',
        email: 'teste@exemplo.com',
        emailVerified: new Date(),
      }
    })

    console.log('✅ Usuário criado com sucesso!')
    console.log('📧 Email:', user.email)
    console.log('👤 Nome:', user.name)
    console.log('🆔 ID:', user.id)
    
    // Criar algumas categorias padrão
    const categories = await Promise.all([
      prisma.category.create({
        data: {
          name: 'Salário',
          type: 'INCOME',
          color: '#10B981',
          userId: user.id
        }
      }),
      prisma.category.create({
        data: {
          name: 'Alimentação',
          type: 'EXPENSE',
          color: '#EF4444',
          userId: user.id
        }
      }),
      prisma.category.create({
        data: {
          name: 'Transporte',
          type: 'EXPENSE',
          color: '#F59E0B',
          userId: user.id
        }
      })
    ])

    console.log('✅ Categorias criadas:', categories.length)
    
  } catch (error) {
    console.error('❌ Erro ao criar usuário:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createUser()
