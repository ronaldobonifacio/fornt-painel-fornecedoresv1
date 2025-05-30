"use client"

import { useState } from "react"
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useFilters } from "@/store/filters-store"
import { motion } from "framer-motion"

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
]

export function MonthPicker() {
  const { filters, setFilters } = useFilters()
  const [isOpen, setIsOpen] = useState(false)

  const currentYear = filters.year
  const currentMonth = filters.month

  const handleMonthSelect = (month: number) => {
    setFilters({ month })
    setIsOpen(false)
  }

  const handleYearChange = (direction: "prev" | "next") => {
    const newYear = direction === "prev" ? currentYear - 1 : currentYear + 1
    setFilters({ year: newYear })
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="outline"
            className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 min-w-[200px] transition-all duration-200"
          >
            <Calendar className="h-4 w-4 mr-2" />
            <span className="font-mono">
              {months[currentMonth - 1]} {currentYear}
            </span>
          </Button>
        </motion.div>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-lg">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleYearChange("prev")}
                className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </motion.div>
            <span className="font-semibold text-lg font-mono text-gray-900 dark:text-white">{currentYear}</span>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleYearChange("next")}
                className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {months.map((month, index) => (
              <motion.button
                key={month}
                onClick={() => handleMonthSelect(index + 1)}
                className={`p-3 rounded-lg text-sm font-medium transition-all ${
                  currentMonth === index + 1
                    ? "bg-blue-600 text-white shadow-md"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {month.slice(0, 3)}
              </motion.button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
