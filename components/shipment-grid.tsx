"use client"

import type React from "react"

import { motion } from "framer-motion"
import { StatusDot } from "@/components/status-dot"
import { ShipmentLegend } from "@/components/shipment-legend"
import { useFilters } from "@/store/filters-store"
import type { ShipmentData } from "@/types/shipment"
import { useMemo, useRef, useState } from "react"

interface ShipmentGridProps {
  data?: ShipmentData
  isLoading: boolean
  error?: Error | null
}

export function ShipmentGrid({ data, isLoading, error }: ShipmentGridProps) {
  const { filters } = useFilters()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const daysInMonth = new Date(filters.year, filters.month, 0).getDate()
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"]

  const getWeekDay = (day: number) => {
    const date = new Date(filters.year, filters.month - 1, day)
    return weekDays[date.getDay()]
  }

  // Filter suppliers based on selected filters
  const filteredSuppliers = useMemo(() => {
    if (!data?.suppliers) return []

    return data.suppliers.filter((supplier) => {
      const companyMatch = filters.company === "all" || supplier.empresa === filters.company
      const branchMatch = filters.branch === "all" || supplier.filial === filters.branch
      const manufacturerMatch = filters.manufacturer === "all" || supplier.fornecedor === filters.manufacturer

      return companyMatch && branchMatch && manufacturerMatch
    })
  }, [data?.suppliers, filters])

  // Calculate optimal cell size
  const supplierColumnWidth = 200
  const cellSize = 32 // Fixed size for consistency
  const circleSize = 18

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft)
    setScrollLeft(scrollContainerRef.current.scrollLeft)
    e.preventDefault()
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollContainerRef.current.offsetLeft
    const walk = (x - startX) * 2 // Scroll speed multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollContainerRef.current) return
    setIsDragging(true)
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft)
    setScrollLeft(scrollContainerRef.current.scrollLeft)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollContainerRef.current) return
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft
    const walk = (x - startX) * 1.5
    scrollContainerRef.current.scrollLeft = scrollLeft - walk
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="mb-8">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6 animate-pulse"></div>
          <ShipmentLegend />
        </div>

        <div className="relative">
          {/* Fixed supplier column */}
          <div className="absolute left-0 top-0 z-10 bg-gray-50 dark:bg-gray-700/50 border-r border-gray-200 dark:border-gray-600">
            <div
              className="p-3 border-b border-gray-200 dark:border-gray-600"
              style={{ width: `${supplierColumnWidth}px`, height: "56px" }}
            >
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
            </div>
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="p-3 border-b border-gray-200 dark:border-gray-600"
                style={{ width: `${supplierColumnWidth}px`, height: "56px" }}
              >
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse mb-1"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3 animate-pulse"></div>
              </div>
            ))}
          </div>

          {/* Scrollable content */}
          <div className="overflow-x-auto" style={{ marginLeft: `${supplierColumnWidth}px` }}>
            <div style={{ width: `${daysInMonth * (cellSize + 4)}px` }}>
              <div className="h-14 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-1"></div>
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-14 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-1"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600 dark:text-red-400">Erro ao carregar dados: {error.message}</p>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Regularidade de Envio</h2>
        <ShipmentLegend />
      </div>

      <div className="relative border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden bg-white dark:bg-gray-800">
        {/* Fixed supplier column */}
        <div className="absolute left-0 top-0 z-20 bg-gray-50 dark:bg-gray-700/50 border-r border-gray-200 dark:border-gray-600">
          {/* Header */}
          <div
            className="p-3 border-b border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-600/50"
            style={{ width: `${supplierColumnWidth}px`, height: "56px" }}
          >
            <div className="font-semibold text-gray-700 dark:text-gray-300 text-sm flex items-center h-full">
              Fornecedor
            </div>
          </div>

          {/* Supplier rows */}
          {filteredSuppliers.length === 0 ? (
            <div className="p-8 text-center" style={{ width: `${supplierColumnWidth}px` }}>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Nenhum fornecedor encontrado</p>
            </div>
          ) : (
            filteredSuppliers.map((supplier, index) => (
              <motion.div
                key={supplier.id}
                className="p-3 border-b border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600/30 transition-colors duration-200"
                style={{ width: `${supplierColumnWidth}px`, height: "56px" }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div className="flex flex-col justify-center h-full">
                  <div className="font-medium text-gray-900 dark:text-white text-sm leading-tight truncate">
                    {supplier.fornecedor}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 font-mono leading-tight">
                    Emp: {supplier.empresa} | Fil: {supplier.filial}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Scrollable content */}
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto cursor-grab active:cursor-grabbing"
          style={{ marginLeft: `${supplierColumnWidth}px` }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div style={{ width: `${daysInMonth * (cellSize + 4)}px` }}>
            {/* Days header */}
            <div
              className="flex bg-gray-100 dark:bg-gray-600/50 border-b border-gray-200 dark:border-gray-600"
              style={{ height: "56px" }}
            >
              {daysArray.map((day) => (
                <div
                  key={day}
                  className="flex flex-col items-center justify-center border-r border-gray-200 dark:border-gray-600 last:border-r-0"
                  style={{ width: `${cellSize + 4}px`, minWidth: `${cellSize + 4}px` }}
                >
                  <div className="font-semibold text-gray-700 dark:text-gray-300 text-xs leading-tight">{day}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-500 leading-tight">{getWeekDay(day)}</div>
                </div>
              ))}
            </div>

            {/* Data rows */}
            {filteredSuppliers.length === 0 ? (
              <div className="flex items-center justify-center h-32">
                <p className="text-gray-500 dark:text-gray-400">
                  Nenhum fornecedor encontrado com os filtros selecionados.
                </p>
              </div>
            ) : (
              filteredSuppliers.map((supplier, index) => (
                <motion.div
                  key={supplier.id}
                  className="flex border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors duration-200"
                  style={{ height: "56px" }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  {daysArray.map((day) => (
                    <div
                      key={day}
                      className="flex justify-center items-center border-r border-gray-200 dark:border-gray-600 last:border-r-0"
                      style={{ width: `${cellSize + 4}px`, minWidth: `${cellSize + 4}px` }}
                    >
                      <StatusDot
                        status={supplier.dias[day]?.status || "futuro"}
                        data={supplier.dias[day]}
                        day={day}
                        supplier={supplier.fornecedor}
                        size={circleSize}
                      />
                    </div>
                  ))}
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
