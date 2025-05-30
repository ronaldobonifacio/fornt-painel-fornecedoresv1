import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const recentSuppliers = [
  {
    id: 1,
    name: "Tech Solutions Ltda",
    email: "contato@techsolutions.com",
    initials: "TS",
  },
  {
    id: 2,
    name: "Materiais Industriais SA",
    email: "vendas@materiais.com",
    initials: "MI",
  },
  {
    id: 3,
    name: "Logística Express",
    email: "info@logistica.com",
    initials: "LE",
  },
  {
    id: 4,
    name: "Equipamentos Pro",
    email: "comercial@equipamentos.com",
    initials: "EP",
  },
  {
    id: 5,
    name: "Serviços Gerais Ltda",
    email: "atendimento@servicos.com",
    initials: "SG",
  },
]

export function RecentSuppliers() {
  return (
    <div className="space-y-8">
      {recentSuppliers.map((supplier) => (
        <div key={supplier.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback>{supplier.initials}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{supplier.name}</p>
            <p className="text-sm text-muted-foreground">{supplier.email}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
