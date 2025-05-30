"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200"
      >
        <div className="h-4 w-4" />
      </Button>
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.96 }}>
      <button
        className="relative flex items-center justify-center p-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#232b36] hover:bg-gray-100 dark:hover:bg-[#1b222c] transition-colors"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        aria-label="Alternar tema"
        type="button"
      >
        <Sun className="h-4 w-4 transition-all duration-300 dark:opacity-0" />
        <Moon className="h-4 w-4 absolute transition-all duration-300 opacity-0 dark:opacity-100" />
      </button>
    </motion.div>
  )
}
