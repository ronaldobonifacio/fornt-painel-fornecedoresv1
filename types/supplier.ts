export interface Supplier {
  id: string
  name: string
  email: string
  cnpj: string
  phone: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
  status: "active" | "inactive"
  description?: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateSupplierData {
  name: string
  email: string
  cnpj: string
  phone: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
  status: "active" | "inactive"
  description?: string
}

export interface UpdateSupplierData extends Partial<CreateSupplierData> {
  id: string
}
