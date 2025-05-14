# Desafio TECSCI

Este projeto consiste no desenvolvimento de uma API RESTful para monitoramento de usinas fotovoltaicas, criado como parte do processo seletivo da TECSCI. O sistema tem como objetivo ingerir, validar, armazenar e processar dados operacionais de inversores distribuídos em diferentes usinas, a partir de arquivos externos no formato JSON. A aplicação fornece funcionalidades de CRUD para usinas e inversores, além de endpoints analíticos que permitem consultar potência máxima diária, média de temperatura e geração de energia por intervalo de tempo.

O sistema foi modelado utilizando três tabelas principais:

**Usina**: contém os dados das usinas, como _id_ e _nome_. Optei por utilizar o identificador _id_ gerado automaticamente pelo banco de dados.

**Inversor**: armazena informações como _id_, _modelo_ e a _usinaId_ chave estrangeira referenciando a usina à qual o inversor está associado.

**Leitura**: foi criada com base no arquivo Metrics.json e registra dados como _potenciaAtivaWatt_, _temperaturaCelsius_, _datetime_ e, principalmente, o _inversorId_ ao qual a leitura está vinculada.

O sistema foi desenvolvido seguindo os princípios do padrão de camadas, com uma separação clara entre os controllers, services, repositories e o uso de DTOs para validação de dados. Essa organização visa tornar o código mais modular, legível e fácil de manter, além de facilitar a implementação de testes e futuras expansões.

## Tecnologias

**Servidor:** Node, Express, TypeScript, Nodemon, Prisma, Swagger UI

**Banco de dados:** Postgresql

**Outros:** Docker, Postman, Git, GitHub

## Rodar localmente

Iniciando o projeto

```bash
  git clone https://github.com/wellingtonengps/desafio-TECSCI
```

Vai até o diretório

```bash
  cd desafio-TECSCI
```

Instale as dependências

```bash
  npm install
```

Estou utilizando Docker para criar um banco de dados PostgreSQL. Para inicializar o container e criar a imagem, execute o comando abaixo. Caso prefira não utilizar o Docker, basta alterar as configurações de conexão no arquivo **.env**.

Antes de tudo, renomeie o arquivo **.env.example** para **.env**. Esse arquivo contém as variáveis de ambiente necessárias para a aplicação funcionar corretamente.

```bash
  docker-compose up -d
```

Além de iniciar o banco de dados, o Docker também disponibiliza uma interface de gerenciamento na porta http://localhost:8080/.
Para acessá-la, utilize as informações definidas no seu arquivo **.env** (usuário, senha e nome do banco de dados).

Para gravar as informações no banco, optei por utilizar o Prisma ORM. Para criar as migrations, execute o seguinte comando:

```bash
  npx prisma migrate dev --name init
```

Para iniciar o servidor, basta rodar o comando abaixo. Além de iniciar o servidor, o banco será populado com 2 usinas e 8 inversores. Optei por fazer essa inserção diretamente no código.

```bash
  npm run dev
```

O sistema estará disponível em: http://localhost:3000/.
A documentação da API pode ser acessada em: http://localhost:3000/api-docs, onde estão listadas todas as rotas disponíveis.

A documentação foi gerada utilizando o Swagger UI.

Caso queira **limpar o banco** para fazer novos teste, basta rodar o seguinte comando:

```bash
  npx prisma migrate reset
```

### Metrics.json

Optei por criar a rota http://localhost:3000/api/leitura/upload para realizar o upload do arquivo de métricas. Adotei esse padrão por considerá-lo mais flexível para integrações com outros sistemas ou dispositivos IoT.

Na documentação http://localhost:3000/api-docs você encontrará uma rota já configurada para envio do arquivo Metrics.json. Caso prefira, também estou compartilhando a workspace do Postman que utilizei para realizar os testes:

Postman: https://winter-resonance-425711.postman.co/workspace/My-Workspace~b855f837-c63c-4708-8bea-af557bd462c8/collection/22374523-d2d0d95f-6956-499f-b18a-c16cb4055621?action=share&creator=22374523

Todos os erros encontrados durante esse processo são registrados em um arquivo de log. Esse arquivo é salvo na pasta **/logs**, criada automaticamente na raiz do projeto, permitindo fácil rastreamento e análise posterior dos problemas ocorridos no upload.

## Execução / Testes dos Endpoints

Na execução dos endpoints que recebem parâmetros de data (**data_inicio**, **data_fim**), é necessário seguir o mesmo padrão utilizado no campo datetime do arquivo **Metrics.json**.

O formato deve ser:

```bash
  2025-01-01T14:58:33.583Z
```

Para testar os endpoints, você tem duas opções:

- Utilizar a workspace no Postman, disponível no link compartilhado acima.

- Acessar a documentação interativa gerada com Swagger em http://localhost:3000/api-docs.

Ambos os caminhos permitem testar todas as funcionalidades da API de forma prática e rápida.

### Endpoints de DELETE

Alguns registros não poderão ser excluídos diretamente devido às **relações existentes entre as tabelas**. Por exemplo, não será possível deletar uma usina que ainda possua inversores associados, ou um inversor que possua leituras registradas no sistema.

Essa restrição foi mantida intencionalmente para preservar a **integridade dos dados**. Caso seja necessário realizar uma exclusão, primeiro é preciso remover ou tratar os registros dependentes relacionados.
