import React from "react"
import ReactDOM from "react-dom"
import { FixedSizeList as List } from "react-window"

interface Supplier {
  id: string
  empresa: string
  filial: string
  fornecedor: string
  dias: Record<string, { status: string; HORA_ARQUIVO?: string; ROTINA?: string }>
}

interface ShipmentTableProps {
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

export const ShipmentTable = React.memo(function ShipmentTable({ suppliers }: ShipmentTableProps) {
  // Use o ano e mês dos dados dos fornecedores, se houver
  const year = suppliers[0]?.dias
    ? (() => {
        // Procura o ano e mês do primeiro dia enviado
        const anyDay = Object.keys(suppliers[0].dias)[0]
        const today = new Date()
        return today.getFullYear()
      })()
    : new Date().getFullYear()
  const month = suppliers[0]?.dias
    ? (() => {
        const anyDay = Object.keys(suppliers[0].dias)[0]
        const today = new Date()
        return today.getMonth()
      })()
    : new Date().getMonth()

  // Use o número de dias do mês corretamente
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  // Renderize o header com o número correto de dias
  const daysHeader = Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(year, month, i + 1)
    return (
      <div
        key={i + 1}
        className="flex flex-col items-center justify-center px-1 py-2 border-r border-b border-gray-200 dark:border-gray-700 text-xs text-gray-700 dark:text-gray-300 min-w-[40px] max-w-[40px] w-[40px] bg-gray-100 dark:bg-[#232b36]"
      >
        <span>{i + 1}</span>
        <span className="text-[10px]">{getWeekDayLetter(date)}</span>
      </div>
    )
  })

  // Tooltip via portal
  function StatusTooltip({
    supplier,
    day,
    diaData,
    children,
  }: {
    supplier: Supplier
    day: number
    diaData?: { status: string; HORA_ARQUIVO?: string; ROTINA?: string }
    children: React.ReactNode
  }) {
    const [show, setShow] = React.useState(false)
    const [coords, setCoords] = React.useState<{ left: number; top: number }>({ left: 0, top: 0 })

    const handleMouseEnter = (e: React.MouseEvent) => {
      setShow(true)
      const rect = (e.target as HTMLElement).getBoundingClientRect()
      setCoords({
        left: rect.left + rect.width / 2,
        top: rect.bottom + 8,
      })
    }
    const handleMouseLeave = () => setShow(false)

    return (
      <>
        <span
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="w-5 h-5 rounded-full border border-gray-700 flex items-center justify-center"
        >
          {children}
        </span>
        {show &&
          ReactDOM.createPortal(
            <div
              className="z-[9999] fixed"
              style={{
                left: coords.left,
                top: coords.top,
                transform: "translateX(-50%)",
                pointerEvents: "none",
              }}
            >
              <div className="w-64 bg-[#232b36] text-gray-100 rounded-lg shadow-lg p-4 text-xs border border-gray-600 pointer-events-auto">
                <div className="font-bold text-base mb-1">{supplier.fornecedor}</div>
                <div className="mb-1 text-gray-400">
                  Emp: <span className="text-white">{supplier.empresa}</span> | Fil: <span className="text-white">{supplier.filial}</span>
                </div>
                <div className="mb-1">Dia <span className="font-semibold">{day}</span></div>
                <div className="mb-1">
                  Status: <span className="font-semibold">{statusTitles[diaData?.status || "pendente"]}</span>
                </div>
                {diaData?.HORA_ARQUIVO && (
                  <div className="mb-1">
                    Horário: <span className="font-mono">{diaData.HORA_ARQUIVO}</span>
                  </div>
                )}
                {diaData?.ROTINA && (
                  <div className="mb-1">
                    Arquivo: <span className="font-mono">{diaData.ROTINA}</span>
                  </div>
                )}
              </div>
            </div>,
            document.body
          )}
      </>
    )
  }

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const supplier = suppliers[index]
    return (
      <div
        style={{
          ...style,
          display: "flex",
          width: "100%",
        }}
        className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1b222c] hover:bg-gray-50 dark:hover:bg-[#232b36] transition-colors"
      >
        {/* Coluna fixa */}
        <div
          className="flex flex-col justify-center px-4 py-2 bg-gray-100 dark:bg-[#232b36] border-r border-gray-200 dark:border-gray-700 sticky left-0 z-10 min-w-[220px] w-[220px] h-full"
          style={{ boxShadow: "2px 0 4px -2px #0004" }}
        >
          <span className="font-semibold text-gray-900 dark:text-gray-100">{supplier.fornecedor}</span>
          <span className="text-xs text-gray-700 dark:text-gray-400">Emp: {supplier.empresa} | Fil: {supplier.filial}</span>
        </div>
        {/* Dias */}
        <div className="flex flex-1 h-full">
          {Array.from({ length: daysInMonth }, (_, i) => {
            const dia = supplier.dias[i + 1]
            const status = dia?.status || "pendente"
            return (
              <div
                key={i + 1}
                className="min-w-[40px] max-w-[40px] w-[40px] flex items-center justify-center h-full border-r border-gray-200 dark:border-gray-700"
              >
                <StatusTooltip
                  supplier={supplier}
                  day={i + 1}
                  diaData={dia}
                >
                  <span className={`${statusColors[status] || "bg-gray-700"} w-5 h-5 rounded-full`} />
                </StatusTooltip>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="border rounded-lg bg-white dark:bg-[#1b222c] w-full">
      <div className="overflow-x-auto">
        {/* Header */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 min-w-fit">
          {/* Coluna fixa do cabeçalho */}
          <div className="px-4 py-2 font-semibold text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-[#232b36] border-r border-gray-200 dark:border-gray-700 text-sm flex items-end sticky left-0 z-10 min-w-[220px] w-[220px]" style={{ boxShadow: "2px 0 4px -2px #0004" }}>
            Fornecedor
          </div>
          {/* Cabeçalho dos dias */}
          <div className="flex">
            {daysHeader}
          </div>
        </div>
        {/* Linhas */}
        <List
          height={500}
          itemCount={suppliers.length}
          itemSize={48}
          width={"100%"}
          className="w-full min-w-fit"
        >
          {Row}
        </List>
      </div>
    </div>
  )
})