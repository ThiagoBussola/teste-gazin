# Teste gazin
API Desenvolvida para o teste prático da empresa gazin

# Comandos habilitados
  Segue abaixo a lista de comandos habilitados para a aplicação (Rode os comandos dentro da pasta raiz da aplicação)

  # Para rodar a aplicação no docker:
    1 - `docker build -t gazin-app .`
    2 - `docker-compose up -d`

  # Comandos para rodar a aplicação local: 
    - Lembre de derrumbar o container antes caso tenha subido ele anteriormente, no caso rode: `docker-compose down`
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
        
# Orientações Gerais
  - Documentação!!!!
    - Após iniciar a aplicação a documentação estará disponivel em http://localhost:3000/api-docs/
    - Nela você poderá testar todas as rotas da aplicação, mas caso preferir você pode usar o Insomnia
  Insomnia ou Postman: 
    - Caso prefira optar pelo Insomnia ou Postman para fazer as requisições, eu disponibilizei uma exportação das rotas que criei, o arquivo é o Insomnia_requests.json
    
  - Eu deixei um usuário pré criado e alguns desenvolvedores para facilitar as visualizações na documentação, então quando for criar um usuário `LEMBRE` de alterar o email do usuário default para um qualquer de sua preferencia!
  - Caso não queria criar um usuário pule direto para a rota de /auth e autentique o usuário default!
  - Agora vamos ao passo-a-passo:
    - Primeiro crie um usuário em post /users
    - Depois autentique o usuário criado em /auth
    - Agora você possui o token JWT retornado em acessToken, utilize ele nas autorizações Barear para ter acesso a todas as rotas da aplicação :D
  
  # Rota Developers
    - A rota developers é a principal da aplicação:
    - Quando for testar crie multiplos desenvolvedores para utilizar as versões de filtro!
    
