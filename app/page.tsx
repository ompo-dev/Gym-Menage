import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link href="/" className="flex items-center font-bold text-xl">
          <span className="text-primary">Fit</span>Manager
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4">
            Funcionalidades
          </Link>
          <Link href="#pricing" className="text-sm font-medium hover:underline underline-offset-4">
            Preços
          </Link>
          <Link href="#testimonials" className="text-sm font-medium hover:underline underline-offset-4">
            Depoimentos
          </Link>
        </nav>
        <div className="ml-4 flex items-center gap-2">
          <Link href="/login">
            <Button variant="outline" size="sm">
              Entrar
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm">Registrar</Button>
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Gerencie sua academia com facilidade
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Sistema completo para academias de bairro gerenciarem clientes, funcionários, equipamentos e
                    pagamentos em um só lugar.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/register">
                    <Button size="lg" className="gap-1">
                      Começar agora
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#demo">
                    <Button size="lg" variant="outline">
                      Ver demonstração
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="/placeholder.svg?height=550&width=550"
                  alt="Dashboard da aplicação"
                  className="rounded-lg object-cover border shadow-lg"
                  width={550}
                  height={550}
                />
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Funcionalidades completas para sua academia
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Tudo o que você precisa para gerenciar sua academia de forma eficiente
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
              {[
                {
                  title: "Gestão de Clientes",
                  description: "Cadastre, acompanhe e gerencie todos os seus clientes em um só lugar.",
                },
                {
                  title: "Controle de Pagamentos",
                  description: "Processe pagamentos, gere faturas e acompanhe mensalidades com facilidade.",
                },
                {
                  title: "Gestão de Funcionários",
                  description: "Gerencie horários, salários e desempenho dos seus funcionários.",
                },
                {
                  title: "Inventário de Equipamentos",
                  description: "Controle todos os equipamentos da academia, incluindo manutenção e depreciação.",
                },
                {
                  title: "Agendamento de Aulas",
                  description: "Crie e gerencie horários de aulas e permita que clientes façam reservas.",
                },
                {
                  title: "Relatórios e Análises",
                  description: "Visualize dados importantes sobre seu negócio para tomar decisões informadas.",
                },
              ].map((feature, index) => (
                <div key={index} className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Planos que cabem no seu bolso
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Escolha o plano ideal para o tamanho da sua academia
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8 mt-8">
              {[
                {
                  title: "Básico",
                  price: "R$99",
                  description: "Ideal para academias pequenas",
                  features: ["Até 100 clientes", "2 funcionários", "Gestão de pagamentos", "Suporte por email"],
                },
                {
                  title: "Profissional",
                  price: "R$199",
                  description: "Para academias em crescimento",
                  features: [
                    "Até 300 clientes",
                    "5 funcionários",
                    "Gestão de pagamentos",
                    "Controle de equipamentos",
                    "Suporte prioritário",
                  ],
                },
                {
                  title: "Empresarial",
                  price: "R$349",
                  description: "Para academias estabelecidas",
                  features: [
                    "Clientes ilimitados",
                    "Funcionários ilimitados",
                    "Todas as funcionalidades",
                    "API personalizada",
                    "Suporte 24/7",
                  ],
                },
              ].map((plan, index) => (
                <div
                  key={index}
                  className={`flex flex-col rounded-lg border p-6 shadow-sm ${
                    index === 1 ? "border-primary shadow-md" : ""
                  }`}
                >
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">{plan.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400">{plan.description}</p>
                  </div>
                  <div className="mt-4">
                    <div className="text-4xl font-bold">{plan.price}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">por mês</div>
                  </div>
                  <ul className="mt-4 space-y-2 flex-1">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <svg
                          className="h-4 w-4 text-primary mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Button className="w-full" variant={index === 1 ? "default" : "outline"}>
                      Começar agora
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full border-t px-4 md:px-6">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2025 FitManager. Todos os direitos reservados.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Termos de Serviço
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Política de Privacidade
          </Link>
        </nav>
      </footer>
    </div>
  )
}

