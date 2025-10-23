'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { TrendingUp, TrendingDown, CreditCard, Menu, X } from 'lucide-react'

interface MobileNavigationProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function MobileNavigation({ activeTab, setActiveTab }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false)

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: TrendingUp },
    { id: 'transactions', label: 'Transações', icon: CreditCard },
    { id: 'categories', label: 'Categorias', icon: TrendingDown },
  ]

  return (
    <div className="lg:hidden">
      {/* Mobile Header */}
      <div className="flex items-center justify-between p-4 bg-white border-b">
        <h1 className="text-lg font-semibold">Dashboard</h1>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="bg-white border-b">
          <div className="px-4 py-2 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id)
                  setIsOpen(false)
                }}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="h-4 w-4 mr-3" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
