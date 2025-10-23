import { cn } from '@/lib/utils'

interface CurrencyDisplayProps {
  amount: number
  className?: string
  size?: 'sm' | 'md' | 'lg'
  showSign?: boolean
  type?: 'INCOME' | 'EXPENSE'
}

export function CurrencyDisplay({ 
  amount, 
  className, 
  size = 'md', 
  showSign = false,
  type 
}: CurrencyDisplayProps) {
  const formatCurrency = (value: number): string => {
    // Para valores muito altos, usar notação compacta
    if (Math.abs(value) >= 1000000) {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        notation: 'compact',
        maximumFractionDigits: 1,
      }).format(value)
    }
    
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(value)
  }

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-lg sm:text-xl lg:text-2xl',
    lg: 'text-xl sm:text-2xl lg:text-3xl'
  }

  const colorClasses = {
    INCOME: 'text-green-600',
    EXPENSE: 'text-red-600',
    default: ''
  }

  const sign = showSign ? (amount >= 0 ? '+' : '-') : ''
  const displayAmount = Math.abs(amount)
  const colorClass = type ? colorClasses[type] : (amount >= 0 ? colorClasses.INCOME : colorClasses.EXPENSE)

  return (
    <span 
      className={cn(
        'font-bold break-words',
        sizeClasses[size],
        colorClass,
        className
      )}
    >
      {sign}{formatCurrency(displayAmount)}
    </span>
  )
}
