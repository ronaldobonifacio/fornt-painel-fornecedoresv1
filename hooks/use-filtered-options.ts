import { useMemo } from 'react'
import type { ShipmentData } from '@/types/shipment'

interface UseFilteredOptionsProps {
  data?: ShipmentData
  selectedCompany: string
  selectedBranch: string
  selectedManufacturer: string
}

export function useFilteredOptions({
  data,
  selectedCompany,
  selectedBranch,
  selectedManufacturer
}: UseFilteredOptionsProps) {
  return useMemo(() => {
    if (!data) return { companies: [], branches: [], manufacturers: [] }

    const suppliers = data.suppliers

    // Para cada filtro, filtra apenas pelos outros filtros
    // EMPRESAS: filtra por branch e manufacturer, mas não por company
    const companies = Array.from(
      new Set(
        suppliers
          .filter(s =>
            (selectedBranch === 'all' || s.filial === selectedBranch) &&
            (selectedManufacturer === 'all' || s.fornecedor === selectedManufacturer)
          )
          .map(s => s.empresa)
      )
    ).sort()

    // FILIAIS: filtra por company e manufacturer, mas não por branch
    const branches = Array.from(
      new Set(
        suppliers
          .filter(s =>
            (selectedCompany === 'all' || s.empresa === selectedCompany) &&
            (selectedManufacturer === 'all' || s.fornecedor === selectedManufacturer)
          )
          .map(s => s.filial)
      )
    ).sort()

    // FORNECEDORES: filtra por company e branch, mas não por manufacturer
    const manufacturers = Array.from(
      new Set(
        suppliers
          .filter(s =>
            (selectedCompany === 'all' || s.empresa === selectedCompany) &&
            (selectedBranch === 'all' || s.filial === selectedBranch)
          )
          .map(s => s.fornecedor)
      )
    ).sort()

    return { companies, branches, manufacturers }
  }, [data, selectedCompany, selectedBranch, selectedManufacturer])
}