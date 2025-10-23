import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Criar categorias padrão
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Salário',
        type: 'INCOME',
        color: '#10B981',
        userId: 'default-user-id' // Substitua por um ID de usuário real
      }
    }),
    prisma.category.create({
      data: {
        name: 'Freelance',
        type: 'INCOME',
        color: '#3B82F6',
        userId: 'default-user-id'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Alimentação',
        type: 'EXPENSE',
        color: '#EF4444',
        userId: 'default-user-id'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Transporte',
        type: 'EXPENSE',
        color: '#F59E0B',
        userId: 'default-user-id'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Lazer',
        type: 'EXPENSE',
        color: '#8B5CF6',
        userId: 'default-user-id'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Saúde',
        type: 'EXPENSE',
        color: '#EC4899',
        userId: 'default-user-id'
      }
    })
  ])

  console.log('Categorias criadas:', categories.length)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
