"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export interface AttendanceData {
  date: string
  attendance: number
}

interface AreaChartProps {
  data: AttendanceData[]
  title: string
  description?: string
}

const chartConfig = {
  attendance: {
    label: "Frequência",
    color: "hsl(var(--primary))"
  }
}

export function AreaChartComponent({ data, title, description }: AreaChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <XAxis
                dataKey="date"
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
              />
              <Area
                type="monotone"
                dataKey="attendance"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary)/.2)"
                strokeWidth={2}
              />
              <Tooltip
                content={({ active, payload, label }) => (
                  <ChartTooltip
                    active={active}
                    payload={payload?.map(item => ({
                      value: item.value as number,
                      name: item.name || '',
                      color: item.color || 'hsl(var(--primary))',
                      dataKey: item.dataKey || 'attendance'
                    }))}
                    label={label}
                    config={chartConfig}
                  />
                )}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
} 