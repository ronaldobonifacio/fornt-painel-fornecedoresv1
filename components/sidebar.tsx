"use client"

import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, Package, FileText, Settings, Building2 } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Fornecedores",
    href: "/dashboard/fornecedores",
    icon: Users,
  },
  {
    title: "Produtos",
    href: "/dashboard/produtos",
    icon: Package,
  },
  {
    title: "Relatórios",
    href: "/dashboard/relatorios",
    icon: FileText,
  },
  {
    title: "Configurações",
    href: "/dashboard/configuracoes",
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="pb-12 w-64">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="flex items-center mb-6">
            <Building2 className="h-8 w-8 mr-2 text-primary" />
            <h2 className="text-lg font-semibold tracking-tight">Painel Fornecedores</h2>
          </div>
          <div className="space-y-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {sidebarNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    pathname === item.href && "bg-muted text-primary",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}
