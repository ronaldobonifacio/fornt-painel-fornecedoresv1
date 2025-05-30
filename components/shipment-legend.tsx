"use client"

import { motion } from "framer-motion"

const legendItems = [
  { status: "enviado", color: "bg-green-500", label: "Enviou" },
  { status: "feriado", color: "bg-orange-500", label: "Feriado" },
  { status: "sem-faturamento", color: "bg-purple-500", label: "Sem faturamento nesta data" },
  { status: "pendente", color: "bg-red-500", label: "Não enviou e não justificou" },
  { status: "futuro", color: "bg-gray-500", label: "Não fatura nesse dia" },
]

export function ShipmentLegend() {
  return (
    <motion.div
      className="flex flex-wrap gap-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors duration-300"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {legendItems.map((item, index) => (
        <motion.div
          key={item.status}
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
        >
          <motion.div
            className={`w-4 h-4 rounded-full ${item.color} shadow-sm`}
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          />
          <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{item.label}</span>
        </motion.div>
      ))}
    </motion.div>
  )
}
