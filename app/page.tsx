'use client'

import Link from "next/link"
import { 
  ArrowRight, 
  Smartphone, 
  Building2, 
  Users, 
  Dumbbell, 
  Calendar, 
  CreditCard, 
  BarChart, 
  Shield, 
  Cloud, 
  Zap,
  CheckCircle2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full justify-center items-center bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <header className="px-4 lg:px-6 h-20 flex items-center border-b w-full backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 fixed top-0 z-50">
        <Link href="/" className="flex items-center font-bold text-2xl">
          <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Fit</span>
          <span className="text-gray-800 dark:text-white">Manager Pro</span>
        </Link>
        <nav className="ml-auto flex gap-6 sm:gap-8">
          <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
            Funcionalidades
          </Link>
          <Link href="#benefits" className="text-sm font-medium hover:text-primary transition-colors">
            Benefícios
          </Link>
          <Link href="#app" className="text-sm font-medium hover:text-primary transition-colors">
            App
          </Link>
          <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
            Preços
          </Link>
        </nav>
        <div className="ml-6 flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="hover:bg-gray-100 dark:hover:bg-gray-800">
              Entrar
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm" className="bg-gradient-to-r from-primary to-purple-600 hover:opacity-90">
              Teste Grátis
            </Button>
          </Link>
        </div>
      </header>
      <main className="flex-1 w-full pt-20">
        <section className="relative flex flex-col items-center justify-center w-full py-24 md:py-32 lg:py-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent dark:from-primary/10" />
          <motion.div 
            initial="initial"
            animate="animate"
            variants={staggerChildren}
            className="container px-4 md:px-6 relative"
          >
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <motion.div 
                variants={fadeIn}
                className="flex flex-col justify-center space-y-8"
              >
                <div className="space-y-6">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
                    Gestão Completa para Academias e Redes
                  </h1>
                  <p className="max-w-[600px] text-gray-600 md:text-xl dark:text-gray-300">
                    Plataforma all-in-one para gestão de academias. Controle múltiplas unidades, alunos, treinos, pagamentos e muito mais em um só lugar.
                  </p>
                </div>
                <div className="space-y-4">
                  <motion.div 
                    whileHover={{ x: 10 }}
                    className="flex gap-4 items-center p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-100 dark:border-gray-700"
                  >
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-medium">Gestão de múltiplas unidades</span>
                  </motion.div>
                  <motion.div 
                    whileHover={{ x: 10 }}
                    className="flex gap-4 items-center p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-100 dark:border-gray-700"
                  >
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Smartphone className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-medium">App mobile para alunos</span>
                  </motion.div>
                  <motion.div 
                    whileHover={{ x: 10 }}
                    className="flex gap-4 items-center p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-100 dark:border-gray-700"
                  >
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Dumbbell className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-medium">Avaliações físicas completas</span>
                  </motion.div>
                </div>
                <div className="flex flex-col gap-3 min-[400px]:flex-row">
                  <Link href="/register">
                    <Button size="lg" className="w-full bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 gap-2">
                      Teste Grátis 14 Dias
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#demo">
                    <Button size="lg" variant="outline" className="w-full hover:bg-gray-100 dark:hover:bg-gray-800">
                      Ver demonstração
                    </Button>
                  </Link>
                </div>
              </motion.div>
              <motion.div 
                variants={fadeIn}
                className="flex items-center justify-center"
              >
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary to-purple-600 rounded-xl blur-xl opacity-20 animate-pulse" />
                  <img
                    src="/dashboard-preview.png"
                    alt="Dashboard do FitManager Pro"
                    className="relative rounded-xl object-cover border shadow-2xl"
                    width={550}
                    height={550}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        <section id="features" className="relative flex flex-col items-center justify-center w-full py-24 md:py-32 lg:py-32 bg-white dark:bg-gray-900">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(var(--primary-rgb),0.1),transparent)]" />
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren} 
            className="container px-4 md:px-6"
          >
            <motion.div 
              variants={fadeIn}
              className="flex flex-col items-center justify-center space-y-4 text-center"
            >
              <div className="space-y-2 max-w-3xl">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
                  Funcionalidades Completas para seu Negócio
                </h2>
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Tudo que você precisa para gerenciar sua academia ou rede de forma profissional
                </p>
              </div>
            </motion.div>
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-16">
              {[
                {
                  icon: Building2,
                  title: "Gestão de Múltiplas Unidades",
                  description: "Controle centralizado de toda sua rede de academias com métricas consolidadas e KPIs em tempo real.",
                  features: ["Dashboard unificado", "Métricas consolidadas", "Controle de filiais"]
                },
                {
                  icon: Users,
                  title: "Gestão de Clientes",
                  description: "Perfil completo dos alunos com histórico de treinos, avaliações e evolução.",
                  features: ["Check-in em tempo real", "Histórico de frequência", "Objetivos e restrições"]
                },
                {
                  icon: Dumbbell,
                  title: "Avaliações Físicas",
                  description: "Sistema completo de avaliação física com medidas, fotos e comparativos.",
                  features: ["Medidas bilaterais", "Registro fotográfico", "Cálculos automáticos"]
                },
                {
                  icon: Calendar,
                  title: "Programas de Treino",
                  description: "Crie e gerencie treinos personalizados com biblioteca de exercícios.",
                  features: ["Biblioteca de exercícios", "Progressão de cargas", "Observações por exercício"]
                },
                {
                  icon: CreditCard,
                  title: "Gestão Financeira",
                  description: "Controle completo de mensalidades, pagamentos e inadimplência.",
                  features: ["Múltiplos pagamentos", "Controle de inadimplência", "Relatórios detalhados"]
                },
                {
                  icon: BarChart,
                  title: "Relatórios e Analytics",
                  description: "Dashboard completo com métricas de negócio e previsões.",
                  features: ["KPIs em tempo real", "Análise de retenção", "Previsões e tendências"]
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className="group relative flex flex-col space-y-4 rounded-2xl border p-6 hover:border-primary/50 transition-colors bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-2 relative">
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400">{feature.description}</p>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-500 relative">
                    {feature.features.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <section id="app" className="relative flex flex-col items-center justify-center w-full py-24 md:py-32 lg:py-32 bg-gray-50 dark:bg-gray-800 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(var(--primary-rgb),0.1),transparent)]" />
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="container px-4 md:px-6 relative"
          >
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <motion.div
                variants={fadeIn}
                className="flex items-center justify-center order-2 lg:order-1"
              >
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary to-purple-600 rounded-[2rem] blur-xl opacity-20 animate-pulse" />
                  <img
                    src="/app-preview.png"
                    alt="App FitManager Pro"
                    className="relative rounded-[2rem] shadow-2xl border border-gray-200 dark:border-gray-700"
                    width={300}
                    height={600}
                  />
                </div>
              </motion.div>
              <motion.div
                variants={fadeIn} 
                className="flex flex-col justify-center space-y-8 order-1 lg:order-2"
              >
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
                    App Mobile para seus Alunos
                  </h2>
                  <p className="text-gray-600 md:text-xl dark:text-gray-300">
                    Ofereça uma experiência completa para seus alunos com nosso app mobile
                  </p>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  {[
                    {
                      title: "Treinos",
                      description: "Acesso a todos os treinos e exercícios"
                    },
                    {
                      title: "Agendamentos",
                      description: "Reserve aulas e horários com personal"
                    },
                    {
                      title: "Evolução",
                      description: "Acompanhamento de resultados e medidas"
                    },
                    {
                      title: "Pagamentos",
                      description: "Visualização e pagamento de mensalidades"
                    },
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      variants={fadeIn}
                      className="group space-y-2 p-4 rounded-xl hover:bg-white/50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{feature.title}</h3>
                      <p className="text-gray-500 dark:text-gray-400">{feature.description}</p>
                    </motion.div>
                  ))}
                </div>
                <div className="flex gap-4">
                  <Button size="lg" className="bg-gradient-to-r from-primary to-purple-600 hover:opacity-90">
                    Baixar App
                  </Button>
                  <Button size="lg" variant="outline" className="hover:bg-white/50 dark:hover:bg-gray-700/50">
                    Saiba mais
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        <section id="benefits" className="relative flex flex-col items-center justify-center w-full py-24 md:py-32 lg:py-32">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(var(--primary-rgb),0.1),transparent)]" />
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="container px-4 md:px-6"
          >
            <motion.div
              variants={fadeIn}
              className="flex flex-col items-center justify-center space-y-4 text-center"
            >
              <div className="space-y-2 max-w-3xl">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
                  Diferenciais Competitivos
                </h2>
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Tecnologia de ponta para impulsionar seu negócio
                </p>
              </div>
            </motion.div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-16">
              {[
                {
                  icon: Cloud,
                  title: "100% em Nuvem",
                  features: ["Acesso de qualquer lugar", "Backups automáticos", "Atualizações constantes"]
                },
                {
                  icon: Shield,
                  title: "Segurança Total",
                  features: ["Proteção LGPD", "Criptografia avançada", "Controle de acesso"]
                },
                {
                  icon: Zap,
                  title: "Alta Performance",
                  features: ["Sistema otimizado", "Carregamento rápido", "Suporte 24/7"]
                },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className="group relative flex flex-col items-center text-center space-y-4 rounded-2xl border p-8 hover:border-primary/50 transition-colors bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <benefit.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold relative">{benefit.title}</h3>
                  <ul className="space-y-3 text-gray-500 relative">
                    {benefit.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 justify-center">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <section id="pricing" className="relative flex flex-col items-center justify-center w-full py-24 md:py-32 lg:py-32 bg-gray-50 dark:bg-gray-800 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(var(--primary-rgb),0.1),transparent)]" />
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="container px-4 md:px-6"
          >
            <motion.div
              variants={fadeIn}
              className="flex flex-col items-center justify-center space-y-4 text-center"
            >
              <div className="space-y-2 max-w-3xl">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
                  Planos para Todos os Tamanhos
                </h2>
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Escolha o plano ideal para o seu negócio
                </p>
              </div>
            </motion.div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12 mt-16">
              {[
                {
                  title: "Básico",
                  price: "R$199",
                  description: "Ideal para academias iniciantes",
                  features: [
                    "Até 200 alunos ativos",
                    "3 funcionários",
                    "App mobile básico",
                    "Avaliações físicas",
                    "Gestão financeira básica",
                    "Suporte por email"
                  ]
                },
                {
                  title: "Premium",
                  price: "R$399",
                  description: "Para academias em crescimento",
                  features: [
                    "Até 500 alunos ativos",
                    "10 funcionários",
                    "App mobile completo",
                    "Sistema de afiliados",
                    "Integrações básicas",
                    "Suporte prioritário"
                  ]
                },
                {
                  title: "Enterprise",
                  price: "Consulte",
                  description: "Para redes de academia",
                  features: [
                    "Alunos ilimitados",
                    "Funcionários ilimitados",
                    "Gestão de rede",
                    "API personalizada",
                    "Integrações avançadas",
                    "Suporte 24/7 dedicado"
                  ]
                }
              ].map((plan, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className={`group relative flex flex-col rounded-2xl border p-8 ${
                    index === 1 
                      ? "border-primary shadow-xl scale-105 bg-white dark:bg-gray-800" 
                      : "hover:border-primary/50 transition-colors bg-white/50 dark:bg-gray-800/50"
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl transition-opacity ${
                    index === 1 ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`} />
                  <div className="space-y-2 relative">
                    <h3 className="text-2xl font-bold">{plan.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400">{plan.description}</p>
                  </div>
                  <div className="mt-4 relative">
                    <div className="flex items-baseline">
                      <div className="text-4xl font-bold">{plan.price}</div>
                      {plan.price !== "Consulte" && (
                        <div className="text-sm text-gray-500 dark:text-gray-400 ml-2">por mês</div>
                      )}
                    </div>
                  </div>
                  <ul className="mt-8 space-y-3 flex-1 relative">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 relative">
                    <Button 
                      className={`w-full ${
                        index === 1 
                          ? "bg-gradient-to-r from-primary to-purple-600 hover:opacity-90" 
                          : "hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`} 
                      variant={index === 1 ? "default" : "outline"}
                    >
                      {index === 2 ? "Falar com consultor" : "Começar agora"}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="relative flex flex-col items-center justify-center w-full py-24 md:py-32 lg:py-32">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.1),transparent)]" />
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="container px-4 md:px-6"
          >
            <motion.div
              variants={fadeIn}
              className="flex flex-col items-center justify-center space-y-8 text-center"
            >
              <div className="space-y-4 max-w-3xl">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
                  Comece Agora Mesmo
                </h2>
                <p className="text-gray-600 md:text-xl dark:text-gray-300">
                  14 dias grátis com todas as funcionalidades. Sem compromisso.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-3 max-w-3xl w-full">
                <motion.div
                  variants={fadeIn}
                  className="flex gap-4 items-center justify-center p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-100 dark:border-gray-700"
                >
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium">Migração gratuita</span>
                </motion.div>
                <motion.div
                  variants={fadeIn}
                  className="flex gap-4 items-center justify-center p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-100 dark:border-gray-700"
                >
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium">Treinamento incluído</span>
                </motion.div>
                <motion.div
                  variants={fadeIn}
                  className="flex gap-4 items-center justify-center p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-100 dark:border-gray-700"
                >
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium">Suporte dedicado</span>
                </motion.div>
              </div>
              <motion.div
                variants={fadeIn}
                className="flex flex-col gap-3 min-[400px]:flex-row"
              >
                <Link href="/register">
                  <Button size="lg" className="bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 gap-2 min-w-[200px]">
                    Começar período gratuito
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>
      </main>
      <footer className="relative flex flex-col items-center justify-center w-full border-t px-4 py-12 md:px-6 bg-white dark:bg-gray-900">
        <div className="container flex flex-col gap-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <Link href="/" className="flex items-center font-bold text-xl">
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Fit</span>
              <span className="text-gray-800 dark:text-white">Manager Pro</span>
            </Link>
            <nav className="flex gap-6 mt-4 md:mt-0">
              <Link href="#" className="text-sm text-gray-500 hover:text-primary transition-colors">
                Termos de Serviço
              </Link>
              <Link href="#" className="text-sm text-gray-500 hover:text-primary transition-colors">
                Política de Privacidade
              </Link>
              <Link href="#" className="text-sm text-gray-500 hover:text-primary transition-colors">
                Suporte
              </Link>
            </nav>
          </div>
          <div className="border-t pt-8">
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              © 2024 FitManager Pro. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

