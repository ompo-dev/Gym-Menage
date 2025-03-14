"use client"

import * as React from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart"

export interface RevenueData {
  month: string
  mensalidades: number
  produtos: number
  servicos: number
}

interface StackedBarChartProps {
  data: RevenueData[]
  title: string
  description?: string
}

const chartConfig = {
  mensalidades: {
    label: "Mensalidades",
    color: "hsl(var(--primary))"
  },
  produtos: {
    label: "Produtos",
    color: "hsl(var(--primary)/.6)"
  },
  servicos: {
    label: "Serviços",
    color: "hsl(var(--primary)/.3)"
  }
} satisfies ChartConfig

export function StackedBarChartComponent({ data, title, description }: StackedBarChartProps) {
  const totalRevenue = data.reduce((total, item) => {
    return total + item.mensalidades + item.produtos + item.servicos
  }, 0)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const barColors = {
    mensalidades: "var(--primary)",
    produtos: "var(--primary-alpha-60)",
    servicos: "var(--primary-alpha-30)"
  }

  React.useEffect(() => {
    document.documentElement.style.setProperty('--primary-alpha-60', 'hsl(var(--primary)/.6)')
    document.documentElement.style.setProperty('--primary-alpha-30', 'hsl(var(--primary)/.3)')
  }, [])

  return (
    <Card>
      <style>
        {`
          .recharts-bar-rectangle:hover {
            fill: inherit !important;
          }
        `}
      </style>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          <div className="text-2xl font-bold">
            {formatCurrency(totalRevenue)}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                fontSize={12}
                tickMargin={8}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                fontSize={12}
                tickMargin={8}
                tickFormatter={(value) => `R$ ${value}`}
              />
              <Bar
                dataKey="mensalidades"
                stackId="revenue"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="produtos"
                stackId="revenue"
                fill="hsl(var(--primary)/.6)"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="servicos"
                stackId="revenue"
                fill="hsl(var(--primary)/.3)"
                radius={[4, 4, 0, 0]}
              />
              <Tooltip
                content={({ active, payload, label }) => (
                  <ChartTooltip
                    active={active}
                    payload={payload?.map(item => ({
                      value: item.value as number,
                      name: item.name || '',
                      color: item.dataKey === 'mensalidades' 
                        ? 'hsl(var(--primary))' 
                        : item.dataKey === 'produtos' 
                          ? 'hsl(var(--primary)/.6)' 
                          : 'hsl(var(--primary)/.3)',
                      dataKey: item.dataKey || ''
                    }))}
                    label={label}
                    config={chartConfig}
                    formatter={formatCurrency}
                  />
                )}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
} 