"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface FiltersState {
  filters: {
    year: number
    month: number
    company: string
    branch: string
    manufacturer: string
  }
  setFilters: (filters: Partial<FiltersState["filters"]>) => void
}

export const useFilters = create<FiltersState>()(
  persist(
    (set) => ({
      filters: {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        company: "all",
        branch: "all",
        manufacturer: "all",
      },
      setFilters: (newFilters) =>
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        })),
    }),
    {
      name: "shipment-filters",
    },
  ),
)
