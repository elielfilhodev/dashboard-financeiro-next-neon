'use client'

import { signIn, getSession } from 'next-auth/react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      await signIn('credentials', {
        email,
        password,
        redirect: true,
        callbackUrl: '/'
      })
    } catch (error) {
      console.error('Erro ao fazer login:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Dashboard Financeiro
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Gerencie suas finanças pessoais
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Entrar</CardTitle>
            <CardDescription>
              Faça login para acessar seu dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>
            <div className="mt-6 text-center text-sm text-gray-600">
              Não tem conta?{' '}
              <a className="text-blue-600 hover:underline" href="/auth/register">Cadastre-se</a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
