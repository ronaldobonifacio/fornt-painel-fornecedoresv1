import type { ShipmentData } from "@/types/shipment"

export function exportToCSV(data: ShipmentData, year: number, month: number) {
  if (!data.suppliers || data.suppliers.length === 0) {
    alert("Não há dados para exportar")
    return
  }

  const daysInMonth = new Date(year, month, 0).getDate()
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  // Create CSV headers
  const headers = ["Fornecedor", "Empresa", "Filial", ...daysArray.map((day) => `Dia ${day}`)]

  // Create CSV rows
  const rows = data.suppliers.map((supplier) => {
    const row = [
      supplier.fornecedor,
      supplier.empresa,
      supplier.filial,
      ...daysArray.map((day) => {
        const dayData = supplier.dias[day]
        if (!dayData) return "Não fatura"

        switch (dayData.status) {
          case "enviado":
            return "Enviado"
          case "pendente":
            return "Pendente"
          case "feriado":
            return "Feriado"
          case "sem-faturamento":
            return "Sem faturamento"
          default:
            return "Não fatura"
        }
      }),
    ]
    return row
  })

  // Convert to CSV format
  const csvContent = [headers.join(","), ...rows.map((row) => row.map((cell) => `"${cell}"`).join(","))].join("\n")

  // Create and download file
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `regularidade-envio-${year}-${month.toString().padStart(2, "0")}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}
