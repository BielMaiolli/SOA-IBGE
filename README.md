Sistema SOA - Análise de Nomes Brasil 📊
Este projeto implementa um sistema baseado na arquitetura SOA (Service-Oriented Architecture) para análise de dados de nomes brasileiros utilizando a API do IBGE. O sistema permite consultar a evolução de nomes ao longo das décadas, comparar nomes e visualizar rankings por localidade.
🏗️ Arquitetura SOA Implementada
1. Separação em Serviços
O projeto está estruturado em serviços independentes e reutilizáveis:

IbgeService (ibge.service.ts): Responsável pela comunicação com a API externa do IBGE
CacheService (cache.service.ts): Gerencia o cache de dados no MongoDB
NamesService (implícito): Orquestra a lógica de negócio para análise de nomes
AppService (app.service.ts): Serviço principal da aplicação

2. Baixo Acoplamento
Os serviços são independentes e comunicam-se através de interfaces bem definidas:
typescript// IbgeService é injetado onde necessário, mas mantém independência
@Injectable()
export class IbgeService {
  async getNameEvolution(name: string, localidade?: string): Promise<any>
  async getTopNamesInLocation(localidade: string): Promise<any>
}
3. Reusabilidade
Os serviços podem ser reutilizados em diferentes contextos:

IbgeService: Pode ser usado por qualquer módulo que precise de dados do IBGE
CacheService: Serviço genérico de cache, reutilizável para qualquer tipo de dado
Módulos exportáveis: Através do padrão de módulos do NestJS

4. Interoperabilidade
O sistema se comunica com serviços externos através de APIs REST:

API do IBGE: https://servicodados.ibge.gov.br/api/v2/censos/nomes
Interface HTTP: O frontend consome a API através de endpoints REST
Formato JSON: Dados padronizados para comunicação entre serviços

5. Abstração de Serviços
Cada serviço encapsula sua funcionalidade específica:
typescript// Abstração do cache
export class CacheService {
  async get(key: string): Promise<any>
  async set(key: string, data: any, localidade?: string): Promise<void>
}

// Abstração da API do IBGE
export class IbgeService {
  private readonly baseUrl = 'https://servicodados.ibge.gov.br/api/v2/censos/nomes'
  // Métodos abstraem a complexidade da API externa
}
6. Governança de Serviços
Implementação de padrões e validações:

DTOs para validação de entrada:

CompareNamesDto: Validação para comparação de nomes
LocationNamesDto: Validação para consultas por localidade
NameEvolutionDto: Validação para evolução de nomes


Tratamento de erros padronizado:

typescriptcatch (error) {
  throw new HttpException(
    'Erro ao consultar API do IBGE',
    HttpStatus.SERVICE_UNAVAILABLE
  );
}
🚀 Tecnologias Utilizadas

Backend: NestJS (Framework Node.js)
Frontend: HTML5, CSS3, JavaScript (Vanilla)
Banco de Dados: MongoDB com Mongoose
Visualização: Chart.js
Validação: class-validator
API Externa: IBGE - Serviço de Dados

📋 Funcionalidades
1. Evolução do Nome 📈

Consulta a frequência de um nome ao longo das décadas
Filtros por período (década inicial e final)
Visualização em gráfico de linha

2. Nomes por Localidade 🗺️

Top 3 nomes mais frequentes por estado brasileiro
Ranking com medalhas (🥇🥈🥉)
Apresentação em tabela

3. Comparação de Nomes ⚖️

Comparação lado a lado de dois nomes
Visualização comparativa em gráfico
Análise de tendências

🛠️ Instalação e Execução
Pré-requisitos

Node.js (versão 16 ou superior)
MongoDB
npm ou yarn

Passos para execução

Clone o repositório

bashgit clone [seu-repositório]
cd nome-trends-soa

Instale as dependências

bashnpm install

Configure o MongoDB

bash# Certifique-se de que o MongoDB esteja rodando em localhost:27017
# O banco 'nome-trends' será criado automaticamente

Execute a aplicação

bashnpm run start:dev

Acesse o sistema

http://localhost:3000
🏛️ Estrutura do Projeto
src/
├── app.controller.ts          # Controller principal
├── app.module.ts             # Módulo principal da aplicação
├── app.service.ts            # Serviço principal
├── main.ts                   # Ponto de entrada da aplicação
├── cache/                    # Módulo de cache
│   ├── cache.module.ts
│   ├── cache.service.ts
│   └── schemas/
│       └── name-data.schema.ts
├── ibge/                     # Módulo de integração com IBGE
│   ├── ibge.module.ts
│   └── ibge.service.ts
├── names/                    # Módulo de nomes (DTOs)
│   ├── dto/
│   │   ├── compare-names.dto.ts
│   │   ├── location-names.dto.ts
│   │   └── name-evolution.dto.ts
└── frontend/                 # Interface web
    ├── index.html
    ├── script.js
    └── styles.css
🔧 Benefícios da Arquitetura SOA Aplicada
1. Manutenibilidade

Cada serviço pode ser modificado independentemente
Códigos organizados por responsabilidade

2. Escalabilidade

Serviços podem ser escalados individualmente
Cache reduz chamadas à API externa

3. Testabilidade

Serviços podem ser testados isoladamente
Mocks podem ser facilmente implementados

4. Flexibilidade

Fácil adição de novos serviços
Integração com outras APIs possível

5. Reutilização

Serviços podem ser usados em outros projetos
Lógica de negócio centralizada

🎯 Conclusão
Este projeto demonstra uma implementação prática dos princípios SOA em uma aplicação web moderna. A separação clara de responsabilidades, o baixo acoplamento entre serviços e a padronização de interfaces garantem um sistema robusto, escalável e de fácil manutenção.
A utilização do NestJS facilita a implementação dos padrões SOA através de seu sistema de módulos, injeção de dependência e decorators, proporcionando uma base sólida para o desenvolvimento de aplicações empresariais.
