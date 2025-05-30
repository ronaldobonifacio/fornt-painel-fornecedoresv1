"use client"
import { motion } from "framer-motion"
import { DashboardHeader } from "@/components/dashboard-header"
import { ShipmentGrid } from "@/components/shipment-grid"
import { SummaryCards } from "@/components/summary-cards"
import { FilterBar } from "@/components/filter-bar"
import { useShipmentData } from "@/hooks/use-shipment-data"
import { useFilters } from "@/store/filters-store"

export default function DashboardPage() {
  const { filters } = useFilters()
  const { data, isLoading, error } = useShipmentData(filters.year, filters.month)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-8 py-8 space-y-8">
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
        >
          <ShipmentGrid data={data} isLoading={isLoading} error={error} />
        </motion.div>
      </div>
    </div>
  )
}
