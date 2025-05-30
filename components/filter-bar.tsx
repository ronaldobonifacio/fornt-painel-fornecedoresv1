"use client"

import React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useFilters } from "@/store/filters-store"
import { useShipmentData } from "@/hooks/use-shipment-data"
import { useFilteredOptions } from "@/hooks/use-filtered-options"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function FilterBar() {
  const { filters, setFilters } = useFilters()
  const { data } = useShipmentData(filters.year, filters.month)

  const { companies, branches, manufacturers } = useFilteredOptions({
    data,
    selectedCompany: filters.company,
    selectedBranch: filters.branch,
    selectedManufacturer: filters.manufacturer
  })

  const handleCompanyChange = React.useCallback((value: string) => {
    setFilters({ ...filters, company: value })
  }, [filters, setFilters])

  const handleBranchChange = React.useCallback((value: string) => {
    setFilters({ ...filters, branch: value })
  }, [filters, setFilters])

  const handleManufacturerChange = React.useCallback((value: string) => {
    setFilters({ ...filters, manufacturer: value })
  }, [filters, setFilters])

  const handleClearFilters = React.useCallback(() => {
    setFilters({ ...filters, company: 'all', branch: 'all', manufacturer: 'all' })
  }, [filters, setFilters])

  return (
    <motion.div
      className="flex flex-col gap-4 p-2 sm:flex-row sm:gap-6 sm:p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex-1">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">EMPRESA:</label>
        <Select value={filters.company} onValueChange={handleCompanyChange}>
          <SelectTrigger>
            <SelectValue placeholder="Todas as empresas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as empresas</SelectItem>
            {companies.map((company) => (
              <SelectItem key={company} value={company}>{company}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex-1">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">FILIAL:</label>
        <Select value={filters.branch} onValueChange={handleBranchChange}>
          <SelectTrigger>
            <SelectValue placeholder="Todas as filiais" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as filiais</SelectItem>
            {branches.map((branch) => (
              <SelectItem key={branch} value={branch}>{branch}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex-1">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">FORNECEDOR:</label>
        <Select value={filters.manufacturer} onValueChange={handleManufacturerChange}>
          <SelectTrigger>
            <SelectValue placeholder="Todos os fornecedores" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os fornecedores</SelectItem>
            {manufacturers.map((manufacturer) => (
              <SelectItem key={manufacturer} value={manufacturer}>{manufacturer}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-end">
        <Button variant="outline" onClick={handleClearFilters} className="h-10 w-full sm:w-auto">
          Limpar filtros
        </Button>
      </div>
    </motion.div>
  )
}
