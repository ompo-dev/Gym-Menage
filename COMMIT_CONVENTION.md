# Convenção de Commits

Este projeto segue a convenção de [Conventional Commits](https://www.conventionalcommits.org/) com emojis para facilitar a identificação visual do tipo de alteração.

## Formato

```
[emoji] [tipo]([escopo]): [mensagem]

[corpo]

[rodapé]
```

- **emoji**: Ícone visual que representa o tipo de alteração
- **tipo**: Identifica o tipo de alteração (feat, fix, docs, etc.)
- **escopo** (opcional): Contexto da alteração (auth, dashboard, etc.)
- **mensagem**: Descrição concisa da alteração
- **corpo** (opcional): Descrição detalhada da alteração
- **rodapé** (opcional): Informações adicionais (breaking changes, referências a issues, etc.)

## Tipos de Commits

| Tipo | Emoji | Descrição |
|------|-------|-----------|
| feat | ✨ | Novo recurso |
| fix | 🐛 | Correção de bug |
| docs | 📚 | Documentação |
| test | 🧪 | Testes |
| build | 📦 | Build e dependências |
| perf | ⚡ | Performance |
| style | 💄 | Estilo de código |
| refactor | ♻️ | Refatoração |
| chore | 🔧 | Tarefas gerais |
| ci | 🧱 | Integração contínua |
| raw | 🗃️ | Dados e configurações |
| cleanup | 🧹 | Limpeza de código |
| remove | 🗑️ | Remoção de arquivos/recursos |

## Emojis Adicionais

| Contexto | Emoji | Descrição |
|----------|-------|-----------|
| Commit inicial | 🎉 | Primeiro commit |
| Acessibilidade | ♿ | Melhorias de acessibilidade |
| Animações | 💫 | Animações e transições |
| Comentários | 💡 | Adição de comentários |
| Deploy | 🚀 | Publicação/deploy |
| Em progresso | 🚧 | Trabalho em andamento |
| Infraestrutura | 🧱 | Mudanças na infraestrutura |
| Lista de tarefas | 🔜 | Tarefas futuras |
| Mover/Renomear | 🚚 | Mover ou renomear arquivos |
| Responsividade | 📱 | Melhorias para dispositivos móveis |
| Revertendo mudanças | 💥 | Reverter alterações |
| Segurança | 🔒️ | Correções de segurança |
| SEO | 🔍️ | Otimização para motores de busca |
| Versão | 🔖 | Tag de versão |
| Texto | 📝 | Alterações em textos |
| Tipagem | 🏷️ | Tipagem TypeScript |
| Tratamento de erros | 🥅 | Captura e tratamento de erros |

## Exemplos

```
✨ feat: adicionar página de login
🐛 fix: corrigir bug na autenticação
📚 docs: atualizar README
🧪 test: adicionar testes para o componente de login
♻️ refactor(dashboard): melhorar estrutura de componentes
🔧 chore: atualizar dependências
🧹 cleanup: remover código comentado
🗑️ remove: excluir arquivos não utilizados
```

## Dicas

- Mantenha a primeira linha com no máximo 72 caracteres
- Use o imperativo na mensagem: "adicionar" em vez de "adicionado"
- Seja específico e conciso na descrição
- Use o corpo para explicar "o quê" e "por quê" em vez de "como" 