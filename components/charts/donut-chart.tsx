"use client"

import * as React from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

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
  ChartTooltipContent,
} from "@/components/ui/chart"

export interface PlanData {
  name: string
  value: number
}

interface DonutChartProps {
  data: PlanData[]
  title: string
  description?: string
}

const chartConfig = {
  plan: {
    label: "Plano",
    color: "hsl(var(--primary))"
  }
}

const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--primary)/.8)",
  "hsl(var(--primary)/.6)",
  "hsl(var(--primary)/.4)",
  "hsl(var(--primary)/.2)",
]

export function DonutChartComponent({ data, title, description }: DonutChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                  />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload, label }) => (
                  <ChartTooltip
                    active={active}
                    payload={payload?.map(item => ({
                      value: item.value as number,
                      name: item.name || '',
                      color: COLORS[data.findIndex(d => d.name === item.name) % COLORS.length],
                      dataKey: 'plan'
                    }))}
                    label={label}
                    config={chartConfig}
                    formatter={(value) => {
                      const percentage = ((value / total) * 100).toFixed(1)
                      return `${value} (${percentage}%)`
                    }}
                  />
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
} 