"use client"

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"

const accentColors = [
  { name: "Azul", value: "blue" },
  { name: "Verde", value: "green" },
  { name: "Vermelho", value: "red" },
  { name: "Roxo", value: "purple" },
  { name: "Laranja", value: "orange" },
  { name: "Amarelo", value: "yellow" },
  { name: "Rosa", value: "pink" },
]

export function ThemeToggle() {
  const { theme, setTheme, accent, setAccent } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Tema</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="mr-2 h-4 w-4" />
          Claro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="mr-2 h-4 w-4" />
          Escuro
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Cor de Destaque</DropdownMenuLabel>
        {accentColors.map((color) => (
          <DropdownMenuItem
            key={color.value}
            onClick={() => setAccent(color.value)}
            className="flex items-center"
          >
            <div
              className="mr-2 h-4 w-4 rounded-full"
              style={{
                backgroundColor: `hsl(var(--${color.value}))`,
              }}
            />
            {color.name}
            {accent === color.value && (
              <span className="ml-auto">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 