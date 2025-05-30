"use client"

import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MonthPicker } from "@/components/month-picker"
import { ThemeToggle } from "@/components/theme-toggle"
import { useShipmentData } from "@/hooks/use-shipment-data"
import { useFilters } from "@/store/filters-store"
import { motion } from "framer-motion"
import { exportToCSV } from "@/utils/export"

export function DashboardHeader() {
  const { filters } = useFilters()
  const { data } = useShipmentData(filters.year, filters.month)

  const handleExport = () => {
    if (data) {
      exportToCSV(data, filters.year, filters.month)
    }
  }

  return (
    <div className="flex flex-col items-center gap-2 sm:gap-4 md:flex-row md:items-center md:justify-between w-full">
      <div className="flex flex-col items-center md:items-start space-y-1 w-full md:w-auto">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">ASA</h1>
          <h1 className="text-2xl sm:text-3xl font-bold text-yellow-400 dark:text-yellow-400">BRANCA</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm font-medium text-center md:text-left"> 
          Painel de Acompanhamento de Envios - Fornecedores
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full md:w-auto justify-center md:justify-end items-center md:items-center mt-2 md:mt-0">
        {/* Linha: MonthPicker */}
        <div className="flex flex-row items-center gap-2">
          <MonthPicker />
        </div>
        {/* Botão de exportação + ThemeToggle */}
        <div className="flex flex-row items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            disabled={!data}
            className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200 w-full xs:w-auto"
          >
            <Download className="h-4 w-4 mr-2" />
            Exportar CSV
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}
