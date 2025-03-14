"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function PageSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header com título e botão */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-4 w-[300px]" />
        </div>
        <Skeleton className="h-10 w-[150px]" />
      </div>

      {/* Card principal */}
      <Card>
        <CardHeader>
          <div className="space-y-2">
            <Skeleton className="h-5 w-[150px]" />
            <Skeleton className="h-4 w-[250px]" />
          </div>
        </CardHeader>
        <CardContent>
          {/* Tabs */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-9 w-[100px]" />
                ))}
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-9 w-[200px]" />
                <Skeleton className="h-9 w-[100px]" />
              </div>
            </div>

            {/* Tabela */}
            <div className="rounded-md border">
              <div className="p-4">
                {/* Cabeçalho da tabela */}
                <div className="flex items-center gap-4 border-b pb-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Skeleton key={i} className="h-4 flex-1" />
                  ))}
                </div>

                {/* Linhas da tabela */}
                {[1, 2, 3, 4, 5].map((row) => (
                  <div key={row} className="flex items-center gap-4 border-b py-4">
                    {[1, 2, 3, 4, 5, 6].map((col) => (
                      <Skeleton key={col} className="h-4 flex-1" />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 