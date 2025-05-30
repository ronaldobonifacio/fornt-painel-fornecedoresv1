import { type NextRequest, NextResponse } from "next/server"

// Mock data for demonstration
const generateMockData = (year: number, month: number) => {
  const suppliers = ["AJINOMOTO", "MONDELEZ", "CATUPIRY", "OURO FINO"]
  const routines = ["S_ACCERA", "S_ARQSALES", "S_ARQACCERA"]
  const companies = ["01"]
  const branches = ["00", "02"]

  const data = []
  const daysInMonth = new Date(year, month, 0).getDate()

  suppliers.forEach((supplier) => {
    companies.forEach((company) => {
      branches.forEach((branch) => {
        // Generate random days with shipments (70% chance per day)
        for (let day = 1; day <= daysInMonth; day++) {
          if (Math.random() > 0.3) {
            // 70% chance of shipment
            const date = new Date(year, month - 1, day)
            const hour = Math.floor(Math.random() * 24)
            const minute = Math.floor(Math.random() * 60)
            const second = Math.floor(Math.random() * 60)

            data.push({
              FORNECEDOR: supplier,
              ROTINA: routines[Math.floor(Math.random() * routines.length)],
              EMPRESA: company,
              FILIAL: branch,
              DATA_ARQUIVO: date.toISOString(),
              HORA_ARQUIVO: `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")}`,
            })
          }
        }
      })
    })
  })

  return {
    metadata: {
      count: data.length,
      year,
      month,
    },
    data,
  }
}

export async function GET(request: NextRequest, { params }: { params: { year: string; month: string } }) {
  try {
    const year = Number.parseInt(params.year)
    const month = Number.parseInt(params.month)

    if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
      return NextResponse.json({ error: "Invalid year or month" }, { status: 400 })
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const data = generateMockData(year, month)

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
