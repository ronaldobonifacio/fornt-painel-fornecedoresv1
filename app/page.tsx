"use client"
import React from "react"
import { motion } from "framer-motion"
import { DashboardHeader } from "@/components/dashboard-header"
import { SummaryCards } from "@/components/summary-cards"
import { FilterBar } from "@/components/filter-bar"
import { useShipmentData } from "@/hooks/use-shipment-data"
import { useFilters } from "@/store/filters-store"
import { ShipmentTable } from "@/components/shipment-table"
import { useIsMobile } from "@/hooks/use-mobile"
import { ShipmentTableMobile } from "@/components/shipment-table-mobile"

export default function DashboardPage() {
  const { filters } = useFilters()
  const { data, isLoading, error } = useShipmentData(filters.year, filters.month)

  const filteredSuppliers = React.useMemo(() => {
    if (!data) return []
    return data.suppliers.filter(s =>
      (filters.company === 'all' || s.empresa === filters.company) &&
      (filters.branch === 'all' || s.filial === filters.branch) &&
      (filters.manufacturer === 'all' || s.fornecedor === filters.manufacturer)
    )
  }, [data, filters])

  const isMobile = useIsMobile()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-8 py-4 md:py-8 space-y-4 md:space-y-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <DashboardHeader />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <FilterBar />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SummaryCards data={data} isLoading={isLoading} />
        </motion.div>

        <div className="mt-4 md:mt-6">
          {isMobile ? (
            <ShipmentTableMobile suppliers={filteredSuppliers} />
          ) : (
            <ShipmentTable suppliers={filteredSuppliers} />
          )}
        </div>
      </div>
    </div>
  )
}
