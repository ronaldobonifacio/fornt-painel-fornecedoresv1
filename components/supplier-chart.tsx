"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    total: 12,
  },
  {
    name: "Fev",
    total: 18,
  },
  {
    name: "Mar",
    total: 25,
  },
  {
    name: "Abr",
    total: 15,
  },
  {
    name: "Mai",
    total: 22,
  },
  {
    name: "Jun",
    total: 28,
  },
]

export function SupplierChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
