"use client"

import useSWR from "swr"
import type { ShipmentData, ApiResponse } from "@/types/shipment"

const fetcher = async (url: string): Promise<ShipmentData> => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error("Failed to fetch data")
  }

  const apiData: ApiResponse = await response.json()

  // Transform API data to our format
  const suppliersMap = new Map()

  apiData.data.forEach((item) => {
    const key = `${item.FORNECEDOR}-${item.EMPRESA}-${item.FILIAL}`

    if (!suppliersMap.has(key)) {
      suppliersMap.set(key, {
        id: key,
        fornecedor: item.FORNECEDOR,
        empresa: item.EMPRESA,
        filial: item.FILIAL,
        dias: {},
      })
    }

    const supplier = suppliersMap.get(key)
    const day = new Date(item.DATA_ARQUIVO).getDate()

    supplier.dias[day] = {
      status: "enviado" as const,
      timestamp: item.HORA_ARQUIVO,
      arquivo: item.ROTINA,
    }
  })

  // Fill missing days as 'pendente'
  const daysInMonth = new Date(apiData.metadata.year, apiData.metadata.month, 0).getDate()
  const today = new Date().getDate()
  const currentMonth = new Date().getMonth() + 1
  const currentYear = new Date().getFullYear()

  suppliersMap.forEach((supplier) => {
    for (let day = 1; day <= daysInMonth; day++) {
      if (!supplier.dias[day]) {
        // Determine status based on date
        if (apiData.metadata.year === currentYear && apiData.metadata.month === currentMonth && day > today) {
          supplier.dias[day] = { status: "futuro" }
        } else {
          supplier.dias[day] = { status: "pendente" }
        }
      }
    }
  })

  const suppliers = Array.from(suppliersMap.values())

  // Calculate summary
  const totalDays = daysInMonth * suppliers.length
  const sentDays = suppliers.reduce((acc, supplier) => {
    return acc + Object.values(supplier.dias).filter((day: any) => day.status === "enviado").length
  }, 0)

  const pendingSales = suppliers.reduce((acc, supplier) => {
    return acc + Object.values(supplier.dias).filter((day: any) => day.status === "pendente").length
  }, 0)

  // Get unique values from suppliers
  const uniqueCompanies = Array.from(new Set(suppliers.map(s => s.empresa))).sort();
  const uniqueBranches = Array.from(new Set(suppliers.map(s => s.filial))).sort();
  const uniqueManufacturers = Array.from(new Set(suppliers.map(s => s.fornecedor))).sort();

  return {
    suppliers,
    summary: {
      pendingSales: Math.floor(pendingSales / suppliers.length),
      pendingStock: 0,
      totalShipments: sentDays,
      successRate: Math.round((sentDays / totalDays) * 100), 
    },
    metadata: {
      ...apiData.metadata,
      uniqueCompanies,
      uniqueBranches,
      uniqueManufacturers,
    }
  }
}

export function useShipmentData(year: number, month: number) {
  const { data, error, isLoading, mutate } = useSWR(`http://192.168.1.0:8080/api/relatorio/${year}/${month}`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    refreshInterval: 5 * 60 * 1000, // 5 minutes
  })

  return {
    data,
    error,
    isLoading,
    mutate,
  }
}
