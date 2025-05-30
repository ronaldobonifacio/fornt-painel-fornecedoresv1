"use client"

import { motion } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { DayStatus } from "@/types/shipment"

interface StatusDotProps {
  status: "enviado" | "pendente" | "futuro" | "feriado" | "sem-faturamento"
  data?: DayStatus
  day: number
  supplier: string
  size: number
}

export function StatusDot({ status, data, day, supplier, size }: StatusDotProps) {
  const getStatusColor = () => {
    switch (status) {
      case "enviado":
        return "bg-green-500 shadow-green-500/50"
      case "pendente":
        return "bg-red-500 shadow-red-500/50"
      case "feriado":
        return "bg-orange-500 shadow-orange-500/50"
      case "sem-faturamento":
        return "bg-purple-500 shadow-purple-500/50"
      default:
        return "bg-gray-500 shadow-gray-500/50"
    }
  }

  const getStatusText = () => {
    switch (status) {
      case "enviado":
        return "Enviado"
      case "pendente":
        return "Não enviou e não justificou"
      case "feriado":
        return "Feriado"
      case "sem-faturamento":
        return "Sem faturamento nesta data"
      default:
        return "Não fatura nesse dia"
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            className={`rounded-full cursor-pointer shadow-lg ${getStatusColor()}`}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              minWidth: `${size}px`,
              minHeight: `${size}px`,
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.2,
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
          />
        </TooltipTrigger>
        <TooltipContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white shadow-lg">
          <div className="space-y-1 p-2">
            <p className="font-semibold text-gray-900 dark:text-white">{supplier}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Dia {day}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Status: {getStatusText()}</p>
            {data?.timestamp && (
              <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">Horário: {data.timestamp}</p>
            )}
            {data?.arquivo && (
              <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">Arquivo: {data.arquivo}</p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
