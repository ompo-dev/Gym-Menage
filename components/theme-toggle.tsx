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
        <Button variant="outline" size="icon" className="hover-transition">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 icon-transition dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 icon-transition dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="gradient-transition">
        <DropdownMenuLabel>Tema</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => setTheme("light")} className="hover-transition">
          <Sun className="mr-2 h-4 w-4 icon-transition" />
          Claro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="hover-transition">
          <Moon className="mr-2 h-4 w-4 icon-transition" />
          Escuro
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Cor de Destaque</DropdownMenuLabel>
        {accentColors.map((color) => (
          <DropdownMenuItem
            key={color.value}
            onClick={() => setAccent(color.value)}
            className="flex items-center hover-transition"
          >
            <div
              className="mr-2 h-4 w-4 rounded-full gradient-transition"
              style={{
                backgroundColor: `hsl(var(--${color.value}))`,
              }}
            />
            {color.name}
            {accent === color.value && (
              <span className="ml-auto icon-transition">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 