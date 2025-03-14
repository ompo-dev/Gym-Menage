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

export interface WorkoutData {
  name: string
  completed: number
  missed: number
}

interface MultipleBarChartProps {
  data: WorkoutData[]
  title: string
  description?: string
}

const chartConfig = {
  completed: {
    label: "Realizados",
    color: "hsl(var(--primary))"
  },
  missed: {
    label: "Perdidos",
    color: "hsl(var(--destructive))"
  }
}

export function MultipleBarChartComponent({ data, title, description }: MultipleBarChartProps) {
  return (
    <Card>
      <style>
        {`
          .recharts-rectangle.recharts-tooltip-cursor {
            z-index: -1;
            transform: translateY(8px);
          }
          .recharts-bar-rectangles {
            z-index: 1;
          }
        `}
      </style>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
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
                dataKey="name"
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
              <Bar
                dataKey="completed"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="missed"
                fill="hsl(var(--destructive))"
                radius={[4, 4, 0, 0]}
              />
              <Tooltip
                cursor={{
                  fill: "rgb(243 244 246 / 0.05)",
                  radius: 5
                }}
                content={({ active, payload, label }) => (
                  <ChartTooltip
                    active={active}
                    payload={payload?.map(item => ({
                      value: item.value as number,
                      name: item.name || '',
                      color: item.dataKey === 'completed' ? 'hsl(var(--primary))' : 'hsl(var(--destructive))',
                      dataKey: item.dataKey || ''
                    }))}
                    label={label}
                    config={chartConfig}
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