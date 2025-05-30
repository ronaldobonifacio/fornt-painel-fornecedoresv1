import React from "react"

interface Supplier {
  id: string
  empresa: string
  filial: string
  fornecedor: string
  dias: Record<string, { status: string; HORA_ARQUIVO?: string; ROTINA?: string }>
}

interface ShipmentTableMobileProps {
  suppliers: Supplier[]
}

const statusColors: Record<string, string> = {
  enviado: "bg-green-500 shadow-[0_0_8px_2px_rgba(34,197,94,0.5)]",
  feriado: "bg-orange-500 shadow-[0_0_8px_2px_rgba(251,146,60,0.5)]",
  sem_faturamento: "bg-purple-500 shadow-[0_0_8px_2px_rgba(168,85,247,0.5)]",
  erro: "bg-red-500 shadow-[0_0_8px_2px_rgba(239,68,68,0.5)]",
  nao_fatura: "bg-gray-500 shadow-[0_0_8px_2px_rgba(107,114,128,0.5)]",
  pendente: "bg-gray-700 shadow-[0_0_8px_2px_rgba(55,65,81,0.5)]",
}

const statusTitles: Record<string, string> = {
  enviado: "Enviou",
  feriado: "Feriado",
  sem_faturamento: "Sem faturamento nesta data",
  erro: "Não enviou e não justificou",
  nao_fatura: "Não fatura nesse dia",
  pendente: "Pendente",
}

function getWeekDayLetter(date: Date) {
  return ["D", "S", "T", "Q", "Q", "S", "S"][date.getDay()]
}

export function ShipmentTableMobile({ suppliers }: ShipmentTableMobileProps) {
  const maxDays = React.useMemo(() => {
    let max = 0
    suppliers.forEach(s => {
      const dias = Object.keys(s.dias).map(Number)
      if (dias.length > 0) {
        const localMax = Math.max(...dias)
        if (localMax > max) max = localMax
      }
    })
    return max
  }, [suppliers])

  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()

  // Modal para detalhes do dia
  const [modal, setModal] = React.useState<{
    open: boolean
    supplier?: Supplier
    day?: number
    diaData?: { status: string; HORA_ARQUIVO?: string; ROTINA?: string }
  }>({ open: false })

  return (
    <div className="flex flex-col gap-4 p-2">
      {suppliers.map(supplier => (
        // Card do fornecedor
        <div key={supplier.id} className="rounded-xl bg-white dark:bg-[#232b36] border border-gray-200 dark:border-gray-700 p-4 shadow-sm w-full">
          <div className="font-bold text-base text-gray-900 dark:text-gray-100">{supplier.fornecedor}</div>
          <div className="text-xs text-gray-700 dark:text-gray-400 mb-2">
            Emp: <span className="text-gray-900 dark:text-white">{supplier.empresa}</span> | Fil: <span className="text-gray-900 dark:text-white">{supplier.filial}</span>
          </div>
          <div className="overflow-x-auto w-full">
            <div className="flex gap-2 min-w-fit pr-1">
              {Array.from({ length: maxDays }, (_, i) => {
                const date = new Date(year, month, i + 1)
                const dia = supplier.dias[i + 1]
                const status = dia?.status || "pendente"
                return (
                  <button
                    key={i + 1}
                    className="flex flex-col items-center focus:outline-none"
                    onClick={() => setModal({ open: true, supplier, day: i + 1, diaData: dia })}
                  >
                    <span className={`w-7 h-7 rounded-full border border-gray-700 mb-1 ${statusColors[status] || "bg-gray-700"}`} />
                    <span className="text-[11px] text-gray-300">{i + 1}</span>
                    <span className="text-[10px] text-gray-500">{getWeekDayLetter(date)}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      ))}

      {/* Modal de detalhes */}
      {modal.open && modal.supplier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white dark:bg-[#232b36] rounded-xl p-6 border border-gray-200 dark:border-gray-600 w-80 max-w-full text-gray-900 dark:text-gray-100 relative">
            <button
              className="absolute top-2 right-3 text-gray-400 hover:text-white text-xl"
              onClick={() => setModal({ open: false })}
              aria-label="Fechar"
            >×</button>
            <div className="font-bold text-lg mb-1">{modal.supplier.fornecedor}</div>
            <div className="mb-1 text-gray-400">
              Emp: <span className="text-white">{modal.supplier.empresa}</span> | Fil: <span className="text-white">{modal.supplier.filial}</span>
            </div>
            <div className="mb-1">Dia <span className="font-semibold">{modal.day}</span></div>
            <div className="mb-1">
              Status: <span className="font-semibold">{statusTitles[modal.diaData?.status || "pendente"]}</span>
            </div>
            {modal.diaData?.HORA_ARQUIVO && (
              <div className="mb-1">
                Horário: <span className="font-mono">{modal.diaData.HORA_ARQUIVO}</span>
              </div>
            )}
            {modal.diaData?.ROTINA && (
              <div className="mb-1">
                Arquivo: <span className="font-mono">{modal.diaData.ROTINA}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}