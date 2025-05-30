export interface DayStatus {
  status: "enviado" | "pendente" | "futuro" | "feriado" | "sem-faturamento"
  timestamp?: string
  arquivo?: string
}

export interface SupplierStatus {
  id: string
  fornecedor: string
  empresa: string
  filial: string
  dias: {
    [day: number]: DayStatus
  }
}

interface ShipmentMetadata {
  count: number
  year: number
  month: number
  uniqueCompanies: string[]
  uniqueBranches: string[]
  uniqueManufacturers: string[]
}

export interface ShipmentData {
  suppliers: SupplierStatus[]
  summary: {
    pendingSales: number
    pendingStock: number
    totalShipments: number
    successRate: number
  }
  metadata: ShipmentMetadata
}

export interface ApiResponse {
  metadata: {
    count: number
    year: number
    month: number
  }
  data: Array<{
    FORNECEDOR: string
    ROTINA: string
    EMPRESA: string
    FILIAL: string
    DATA_ARQUIVO: string
    HORA_ARQUIVO: string
  }>
}
