import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "./prisma"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user || user.isActive === false || !user.passwordHash) {
          return null
        }

        const isValid = await bcrypt.compare(credentials.password, user.passwordHash)
        if (!isValid) return null

        return { id: user.id, email: user.email, name: user.name }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        ;(token as any).id = (user as any).id
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        ;(session.user as any).id = (token as any).id as string
      }
      return session
    },
  },
}
