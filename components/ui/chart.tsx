'use client';

import type * as React from 'react';
import { Legend, type TooltipProps } from 'recharts';
import type { Payload } from 'recharts/types/component/DefaultTooltipContent';

import { cn } from '@/lib/utils';

export interface ChartConfig {
  [key: string]: {
    label: string;
    color?: string;
    theme?: {
      light: string;
      dark: string;
    };
  };
}

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig;
}

export function ChartContainer({ config, children, className, ...props }: ChartContainerProps) {
  // Create CSS variables for all colors in the config
  const colorVariables = Object.entries(config).reduce(
    (acc, [key, value]) => {
      if (value.color) {
        acc[`--chart-color-${key}`] = value.color;
      }
      return acc;
    },
    {} as Record<string, string>
  );

  return (
    <div
      className={cn('w-full', className)}
      style={{ ...colorVariables } as React.CSSProperties}
      {...props}
    >
      {children}
    </div>
  );
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string | number;
    color: string;
    dataKey: string | number;
  }>;
  label?: string;
  config: ChartConfig;
  formatter?: (value: number) => string;
}

export function ChartTooltip({
  active,
  payload,
  label,
  config,
  formatter = (value) => value.toString(),
}: ChartTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="grid gap-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="font-semibold">{label}</div>
          </div>
        </div>
        <div className="grid gap-1">
          {payload.map((item, index) => {
            const configItem = config[String(item.dataKey)];
            if (!configItem) return null;

            return (
              <div
                key={`chart-item-${item.name || item.dataKey}`}
                className="flex items-center justify-between gap-8"
              >
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-muted-foreground">{configItem.label}</span>
                </div>
                <span className="text-sm font-medium">{formatter(item.value)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

interface ChartTooltipContentProps {
  hideLabel?: boolean;
  labelFormatter?: (value: string) => string;
  valueFormatter?: (value: number) => string;
  indicator?: 'dot' | 'line' | 'dashed';
  labelKey?: string;
  nameKey?: string;
}

type ExtendedPayload = Payload<number, string> & {
  [key: string]: unknown;
};

export function ChartTooltipContent({
  active,
  payload,
  label,
  hideLabel = false,
  labelFormatter = (value) => value,
  valueFormatter = (value) => value.toString(),
  indicator = 'dot',
  labelKey,
  nameKey,
}: ChartTooltipContentProps & TooltipProps<number, string>) {
  if (!active || !payload) {
    return null;
  }

  const extendedPayload = payload as ExtendedPayload[];

  return (
    <div className="grid gap-2">
      {!hideLabel && (
        <div className="grid gap-1">
          <div className="text-sm font-medium">
            {labelFormatter(labelKey ? (extendedPayload[0]?.[labelKey] as string) : label)}
          </div>
        </div>
      )}
      <div className="grid gap-1">
        {extendedPayload.map((item, index) => (
          <div
            key={`tooltip-item-${item.name || item.dataKey || ''}`}
            className="flex items-center justify-between gap-8"
          >
            <div className="flex items-center gap-2">
              {indicator === 'dot' ? (
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
              ) : (
                <div
                  className={cn('h-1 w-4', {
                    'border-t-2 border-dashed': indicator === 'dashed',
                  })}
                  style={{ backgroundColor: item.color }}
                />
              )}
              <span className="text-sm text-muted-foreground">
                {nameKey ? (item[nameKey] as React.ReactNode) : item.name}
              </span>
            </div>
            <div className="text-sm font-medium">{valueFormatter(Number(item.value))}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const ChartLegend = Legend;

interface ChartLegendContentProps {
  payload?: Array<{
    value: string;
    color: string;
    [key: string]: unknown;
  }>;
  nameKey?: string;
}

export function ChartLegendContent({ payload, nameKey }: ChartLegendContentProps) {
  if (!payload) return null;

  return (
    <div className="flex flex-wrap gap-4">
      {payload.map((entry, index) => (
        <div key={`legend-item-${entry.value || ''}`} className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-sm text-muted-foreground">
            {nameKey ? (entry[nameKey] as React.ReactNode) : entry.value}
          </span>
        </div>
      ))}
    </div>
  );
}
