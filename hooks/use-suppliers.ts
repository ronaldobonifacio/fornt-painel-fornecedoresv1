"use client"

import { useState, useEffect } from "react"
import type { Supplier } from "@/types/supplier"

// Mock data for demonstration
const mockSuppliers: Supplier[] = [
  {
    id: "1",
    name: "Tech Solutions Ltda",
    email: "contato@techsolutions.com",
    cnpj: "12.345.678/0001-90",
    phone: "(11) 99999-9999",
    address: "Rua das Flores, 123",
    city: "São Paulo",
    state: "SP",
    zipCode: "01234-567",
    status: "active",
    description: "Fornecedor de soluções tecnológicas",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    name: "Materiais Industriais SA",
    email: "vendas@materiais.com",
    cnpj: "98.765.432/0001-10",
    phone: "(11) 88888-8888",
    address: "Av. Industrial, 456",
    city: "São Paulo",
    state: "SP",
    zipCode: "04567-890",
    status: "active",
    description: "Fornecedor de materiais industriais",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10"),
  },
  {
    id: "3",
    name: "Logística Express",
    email: "info@logistica.com",
    cnpj: "11.222.333/0001-44",
    phone: "(11) 77777-7777",
    address: "Rua do Transporte, 789",
    city: "São Paulo",
    state: "SP",
    zipCode: "07890-123",
    status: "inactive",
    description: "Serviços de logística e transporte",
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-05"),
  },
  {
    id: "4",
    name: "Equipamentos Pro",
    email: "comercial@equipamentos.com",
    cnpj: "55.666.777/0001-88",
    phone: "(11) 66666-6666",
    address: "Av. dos Equipamentos, 321",
    city: "São Paulo",
    state: "SP",
    zipCode: "03210-456",
    status: "active",
    description: "Fornecedor de equipamentos profissionais",
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "5",
    name: "Serviços Gerais Ltda",
    email: "atendimento@servicos.com",
    cnpj: "99.888.777/0001-66",
    phone: "(11) 55555-5555",
    address: "Rua dos Serviços, 654",
    city: "São Paulo",
    state: "SP",
    zipCode: "06540-987",
    status: "active",
    description: "Prestação de serviços gerais",
    createdAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-01-25"),
  },
  {
    id: "6",
    name: "Consultoria Empresarial",
    email: "contato@consultoria.com",
    cnpj: "44.333.222/0001-11",
    phone: "(11) 44444-4444",
    address: "Av. Empresarial, 987",
    city: "São Paulo",
    state: "SP",
    zipCode: "09876-543",
    status: "active",
    description: "Serviços de consultoria empresarial",
    createdAt: new Date("2024-01-30"),
    updatedAt: new Date("2024-01-30"),
  },
]

export function useSuppliers() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchSuppliers = async () => {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSuppliers(mockSuppliers)
      setLoading(false)
    }

    fetchSuppliers()
  }, [])

  return {
    suppliers,
    loading,
    setSuppliers,
  }
}
