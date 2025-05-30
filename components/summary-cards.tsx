"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Package, DollarSign, AlertTriangle, Users } from "lucide-react"
import type { ShipmentData } from "@/types/shipment"
import { useFilters } from "@/store/filters-store"

interface SummaryCardsProps {
  data?: ShipmentData
  isLoading: boolean
}

export function SummaryCards({ data, isLoading }: SummaryCardsProps) {
  const { filters } = useFilters()

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card
            key={i}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 h-32 transition-colors duration-300"
          >
            <CardContent className="p-6 h-full">
              <div className="animate-pulse h-full flex flex-col justify-between">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  // Se não houver dados, retorna nulo
  if (!data) return null

  // Dias do mês e dia atual
  const year = data.metadata.year
  const month = data.metadata.month
  const today = new Date()
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() + 1 === month
  const currentDay = isCurrentMonth ? today.getDate() : new Date(year, month, 0).getDate()
  const daysInMonth = new Date(year, month, 0).getDate()

  // Fornecedores filtrados conforme filtros globais
  const suppliers = data.suppliers.filter(s =>
    (filters.company === 'all' || s.empresa === filters.company) &&
    (filters.branch === 'all' || s.filial === filters.branch) &&
    (filters.manufacturer === 'all' || s.fornecedor === filters.manufacturer)
  )

  // 1. Dias Pendentes (soma dos dias pendentes dos fornecedores filtrados)
  let pendingDays = 0
  let sentDays = 0
  let totalPossibleDays = 0

  suppliers.forEach(supplier => {
    for (let day = 1; day <= currentDay; day++) {
      const status = supplier.dias[day]?.status
      if (status === "enviado") {
        sentDays++
      } else if (status === "pendente") {
        pendingDays++
      }
      totalPossibleDays++
    }
  })

  // 2. Total Envios (envios até o dia atual, respeitando os filtros)
  const totalSentFiles = sentDays

  // 3. Fornecedores (contagem dos fornecedores filtrados)
  const supplierCount = suppliers.length

  // 4. Taxa de Sucesso (dias enviados / dias possíveis até hoje)
  const successRate = totalPossibleDays > 0 ? Math.round((sentDays / totalPossibleDays) * 100) : 0

  const cards = [
    {
      title: "Dias Pendentes",
      value: pendingDays,
      icon: Package,
      iconBg: "bg-blue-100 dark:bg-blue-500/20",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Total Envios",
      value: totalSentFiles,
      icon: DollarSign,
      iconBg: "bg-green-100 dark:bg-green-500/20",
      iconColor: "text-green-600 dark:text-green-400",
    },
    {
      title: "Fornecedores",
      value: supplierCount,
      icon: AlertTriangle,
      iconBg: "bg-purple-100 dark:bg-purple-500/20",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
    {
      title: "Taxa Sucesso",
      value: `${successRate}%`,
      icon: Users,
      iconBg: "bg-orange-100 dark:bg-orange-500/20",
      iconColor: "text-orange-600 dark:text-orange-400",
    },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-6">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -4, scale: 1.02 }}
          className="transition-transform duration-200"
        >
          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md dark:hover:shadow-xl transition-all duration-200 h-32">
            <CardContent className="p-6 h-full">
              <div className="flex items-center justify-between h-full">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white font-mono">{card.value}</p>
                </div>
                <div className={`p-3 rounded-xl ${card.iconBg} transition-transform duration-200 hover:scale-110`}>
                  <card.icon className={`h-6 w-6 ${card.iconColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
