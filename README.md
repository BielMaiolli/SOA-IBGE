# Sistema SOA - Análise de Nomes Brasil 📊

Este projeto implementa um sistema baseado na arquitetura SOA (Service-Oriented Architecture) para análise de dados de nomes brasileiros utilizando a API do IBGE. O sistema permite consultar a evolução de nomes ao longo das décadas, comparar nomes e visualizar rankings por localidade.

---

## 🏗️ Arquitetura SOA Implementada

### 1. Separação em Serviços

O projeto está estruturado em serviços independentes e reutilizáveis:

* **IbgeService** (`ibge.service.ts`): Responsável pela comunicação com a API externa do IBGE.
* **CacheService** (`cache.service.ts`): Gerencia o cache de dados no MongoDB.
* **NamesService** (implícito): Orquestra a lógica de negócio para análise de nomes.
* **AppService** (`app.service.ts`): Serviço principal da aplicação.

<details>
<summary>Exemplo de IbgeService</summary>

```typescript
@Injectable()
export class IbgeService {
  private readonly baseUrl = 'https://servicodados.ibge.gov.br/api/v2/censos/nomes';

  async getNameEvolution(name: string, localidade?: string): Promise<any> {
    // implementação...
  }

  async getTopNamesInLocation(localidade: string): Promise<any> {
    // implementação...
  }
}
```

</details>

### 2. Baixo Acoplamento

Os serviços comunicam-se através de interfaces bem definidas e são injetados onde necessário, mantendo independência:

```typescript
// IbgeService é injetado no NamesService, mas mantém independência
typedef Injectable();
export class NamesService {
  constructor(private readonly ibgeService: IbgeService) {}
  // lógica de negócio...
}
```

### 3. Reusabilidade

* **IbgeService**: Pode ser usado por qualquer módulo que precise de dados do IBGE.
* **CacheService**: Genérico e reutilizável para qualquer tipo de dado.
* Módulos exportáveis via padrão de módulos do NestJS.

### 4. Interoperabilidade

* Comunicação via **API REST**.
* **API do IBGE**: `https://servicodados.ibge.gov.br/api/v2/censos/nomes`.
* Dados em **JSON** padronizado.

### 5. Abstração de Serviços

Cada serviço encapsula sua funcionalidade:

<details>
<summary>Exemplo de CacheService</summary>

```typescript
export class CacheService {
  async get(key: string): Promise<any> {
    // busca no MongoDB...
  }

  async set(key: string, data: any, localidade?: string): Promise<void> {
    // grava no MongoDB...
  }
}
```

</details>

### 6. Governança de Serviços

* **DTOs** para validação de entrada:

  * `CompareNamesDto`: Validação para comparação de nomes.
  * `LocationNamesDto`: Validação para consultas por localidade.
  * `NameEvolutionDto`: Validação para evolução de nomes.

* Tratamento de erros padronizado:

```typescript
catch (error) {
  throw new HttpException(
    'Erro ao consultar API do IBGE',
    HttpStatus.SERVICE_UNAVAILABLE
  );
}
```

---

## 🚀 Tecnologias Utilizadas

* **Backend**: NestJS (Framework Node.js)
* **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
* **Banco de Dados**: MongoDB com Mongoose
* **Visualização**: Chart.js
* **Validação**: class-validator
* **API Externa**: IBGE - Serviço de Dados

---

## 📋 Funcionalidades

1. **Evolução do Nome** 📈

   * Consulta a frequência de um nome ao longo das décadas.
   * Filtros por período (década inicial e final).
   * Visualização em gráfico de linha.

2. **Nomes por Localidade** 🗺️

   * Top 3 nomes mais frequentes por estado brasileiro.
   * Ranking com medalhas (🥇🥈🥉).
   * Apresentação em tabela.

3. **Comparação de Nomes** ⚖️

   * Comparação lado a lado de dois nomes.
   * Visualização comparativa em gráfico.
   * Análise de tendências.

---

## 🛠️ Instalação e Execução

### Pré-requisitos

* Node.js (versão 16 ou superior)
* MongoDB
* npm ou yarn

### Passos para execução

1. **Clone o repositório**

   ```bash
   git clone [seu-repositório]
   cd nome-trends-soa
   ```

2. **Instale as dependências**

   ```bash
   npm install
   # ou yarn install
   ```

3. **Configure o MongoDB**

   ```bash
   # Certifique-se de que o MongoDB esteja rodando em localhost:27017
   # O banco 'nome-trends' será criado automaticamente
   ```

4. **Execute a aplicação**

   ```bash
   npm run start:dev
   ```

5. **Acesse o sistema**

   * Acesse: `http://localhost:3000`

---

## 🏛️ Estrutura do Projeto

```
src/
├── app.controller.ts          # Controller principal
├── app.module.ts              # Módulo principal da aplicação
├── app.service.ts             # Serviço principal
├── main.ts                    # Ponto de entrada da aplicação
├── cache/                     # Módulo de cache
│   ├── cache.module.ts
│   ├── cache.service.ts
│   └── schemas/
│       └── name-data.schema.ts
├── ibge/                      # Módulo de integração com IBGE
│   ├── ibge.module.ts
│   └── ibge.service.ts
├── names/                     # Módulo de nomes (DTOs)
│   ├── dto/
│   │   ├── compare-names.dto.ts
│   │   ├── location-names.dto.ts
│   │   └── name-evolution.dto.ts
└── frontend/                  # Interface web
    ├── index.html
    ├── script.js
    └── styles.css
```

---

## 🔧 Benefícios da Arquitetura SOA Aplicada

1. **Manutenibilidade**

   * Cada serviço pode ser modificado independentemente.
   * Códigos organizados por responsabilidade.

2. **Escalabilidade**

   * Serviços podem ser escalados individualmente.
   * Cache reduz chamadas à API externa.

3. **Testabilidade**

   * Serviços podem ser testados isoladamente.
   * Mocks podem ser facilmente implementados.

4. **Flexibilidade**

   * Fácil adição de novos serviços.
   * Integração com outras APIs possível.

5. **Reutilização**

   * Serviços podem ser usados em outros projetos.
   * Lógica de negócio centralizada.

---

## 🎯 Conclusão

Este projeto demonstra uma implementação prática dos princípios SOA em uma aplicação web moderna. A separação clara de responsabilidades, o baixo acoplamento entre serviços e a padronização de interfaces garantem um sistema robusto, escalável e de fácil manutenção.

A utilização do NestJS facilita a implementação dos padrões SOA através de seu sistema de módulos, injeção de dependência e decorators, proporcionando uma base sólida para o desenvolvimento de aplicações empresariais.
