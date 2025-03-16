#!/usr/bin/env node

/**
 * Script interativo para criar commits seguindo a convenção do projeto
 * Uso: npm run commit
 */

const { execSync } = require('node:child_process');
const readline = require('node:readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Tipos de commit com seus emojis
const commitTypes = [
  { type: 'feat', emoji: '✨', description: 'Novo recurso' },
  { type: 'fix', emoji: '🐛', description: 'Correção de bug' },
  { type: 'docs', emoji: '📚', description: 'Documentação' },
  { type: 'test', emoji: '🧪', description: 'Testes' },
  { type: 'build', emoji: '📦', description: 'Build e dependências' },
  { type: 'perf', emoji: '⚡', description: 'Performance' },
  { type: 'style', emoji: '💄', description: 'Estilo de código' },
  { type: 'refactor', emoji: '♻️', description: 'Refatoração' },
  { type: 'chore', emoji: '🔧', description: 'Tarefas gerais' },
  { type: 'ci', emoji: '🧱', description: 'Integração contínua' },
  { type: 'raw', emoji: '🗃️', description: 'Dados e configurações' },
  { type: 'cleanup', emoji: '🧹', description: 'Limpeza de código' },
  { type: 'remove', emoji: '🗑️', description: 'Remoção de arquivos/recursos' },
  { type: 'init', emoji: '🎉', description: 'Commit inicial' },
];

// Cores para o console
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',

  fg: {
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
  },

  bg: {
    black: '\x1b[40m',
    red: '\x1b[41m',
    green: '\x1b[42m',
    yellow: '\x1b[43m',
    blue: '\x1b[44m',
    magenta: '\x1b[45m',
    cyan: '\x1b[46m',
    white: '\x1b[47m',
  },
};

// Função para imprimir o título
function printTitle() {
  console.log(
    `${colors.fg.cyan}${colors.bright}=== Assistente de Commit Convencional ===${colors.reset}\n`
  );
  console.log(
    `${colors.fg.yellow}Este assistente ajuda a criar commits seguindo a convenção do projeto.${colors.reset}\n`
  );
}

// Função para listar os tipos de commit
function listCommitTypes() {
  console.log(`${colors.fg.green}Tipos de commit disponíveis:${colors.reset}\n`);

  commitTypes.forEach((type, index) => {
    console.log(
      `${colors.fg.yellow}${index + 1}.${colors.reset} ${type.emoji} ${colors.fg.cyan}${type.type}${colors.reset} - ${type.description}`
    );
  });

  console.log('');
}

// Função principal
async function main() {
  printTitle();

  try {
    // Verificar se há arquivos em staging
    const stagedFiles = execSync('git diff --name-only --cached').toString().trim();

    if (!stagedFiles) {
      console.log(
        `${colors.fg.yellow}Nenhum arquivo em staging. Deseja adicionar arquivos?${colors.reset} (s/n)`
      );

      const addFiles = await new Promise((resolve) => {
        rl.question('> ', (answer) => {
          resolve(answer.toLowerCase() === 's' || answer.toLowerCase() === 'sim');
        });
      });

      if (addFiles) {
        console.log(`${colors.fg.yellow}Adicionando todos os arquivos...${colors.reset}`);
        execSync('git add .');
      } else {
        console.log(
          `${colors.fg.red}Nenhum arquivo para commit. Adicione arquivos primeiro com 'git add'.${colors.reset}`
        );
        rl.close();
        return;
      }
    }

    // Listar os tipos de commit
    listCommitTypes();

    // Solicitar o tipo de commit
    const typeIndex = await new Promise((resolve) => {
      rl.question(
        `${colors.fg.green}Escolha o tipo de commit (1-${commitTypes.length}):${colors.reset} `,
        (answer) => {
          const index = Number.parseInt(answer) - 1;
          if (Number.isNaN(index) || index < 0 || index >= commitTypes.length) {
            console.log(
              `${colors.fg.red}Opção inválida. Usando 'feat' como padrão.${colors.reset}`
            );
            resolve(0); // feat
          } else {
            resolve(index);
          }
        }
      );
    });

    const selectedType = commitTypes[typeIndex];

    // Solicitar o escopo (opcional)
    const scope = await new Promise((resolve) => {
      rl.question(
        `${colors.fg.green}Escopo (opcional, ex: auth, dashboard):${colors.reset} `,
        (answer) => {
          resolve(answer.trim());
        }
      );
    });

    // Solicitar a mensagem
    const message = await new Promise((resolve) => {
      rl.question(`${colors.fg.green}Mensagem do commit:${colors.reset} `, (answer) => {
        if (!answer.trim()) {
          console.log(`${colors.fg.red}A mensagem não pode estar vazia.${colors.reset}`);
          resolve('atualização');
        } else {
          resolve(answer.trim());
        }
      });
    });

    // Montar a mensagem de commit
    let commitMessage = `${selectedType.emoji} ${selectedType.type}`;

    if (scope) {
      commitMessage += `(${scope})`;
    }

    commitMessage += `: ${message}`;

    // Solicitar corpo (opcional)
    const body = await new Promise((resolve) => {
      rl.question(
        `${colors.fg.green}Corpo do commit (opcional, pressione Enter para pular):${colors.reset} `,
        (answer) => {
          resolve(answer.trim());
        }
      );
    });

    if (body) {
      commitMessage += `\n\n${body}`;
    }

    // Confirmar o commit
    console.log(`\n${colors.fg.cyan}Mensagem de commit:${colors.reset} ${commitMessage}\n`);

    const confirm = await new Promise((resolve) => {
      rl.question(`${colors.fg.yellow}Confirmar commit? (s/n)${colors.reset} `, (answer) => {
        resolve(answer.toLowerCase() === 's' || answer.toLowerCase() === 'sim');
      });
    });

    if (confirm) {
      try {
        execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
        console.log(`\n${colors.fg.green}Commit realizado com sucesso!${colors.reset}`);
      } catch (error) {
        console.error(`\n${colors.fg.red}Erro ao realizar commit:${colors.reset}`, error.message);
      }
    } else {
      console.log(`\n${colors.fg.yellow}Commit cancelado.${colors.reset}`);
    }
  } catch (error) {
    console.error(`\n${colors.fg.red}Erro:${colors.reset}`, error.message);
  } finally {
    rl.close();
  }
}

main();
