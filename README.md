# teste-gazin
api desenvolvida para o teste prático da empresa gazin

# Comandos habilitados
  Segue abaixo a lista de comandos habilitados para a aplicação

  # Para rodar no docker:
    1 - `docker build -t gazin-app .`
    2 - `docker-compose up -d`

  # Comandos para rodar local: 
    - `npm install` -> baixa as dependencias do projeto
    - `npm start` -> inicia a aplicação
    - `npm run debug` -> inicia a aplicação em modo debug

      # Comandos de Teste

        - `npm run test` -> roda toda a suite de teste
        - `npm run test:cov` -> Cobertura de testes: roda toda a suite de teste e apresenta o resultado da cobertura
        - `npm run test:watch` -> roda toda a suite de teste em watch mode
        - `npm run test-debug` -> roda toda a suite de teste em modo debug

        # Testes especificos
        Basta passar o caminho para qualquer um dos comandos acima para testar as funcionalidades separadas, exemplo:
        - `npm run test tests/developers`

