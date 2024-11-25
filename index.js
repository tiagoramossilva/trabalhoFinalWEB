// Importa o CORS
const cors = require('cors');

// Importa as bibliotecas
require('dotenv').config();
const server = require('./server');
const clientesRoutes = require('./routes/clientes');
const produtosRoutes = require('./routes/produtos');
const pdvRoutes = require('./routes/ponto_de_venda');

// Configuração do CORS
server.use(cors()); // Isso permitirá que todas as origens acessem o back-end

// Ou, se você quiser permitir apenas uma origem específica (por exemplo, o seu front-end em http://127.0.0.1:5500)
// server.use(cors({ origin: 'http://127.0.0.1:5500' }));

// Importa as funções de upsert
const { upsertClientes } = require('./collection_clientes'); 
const { upsertProdutos } = require('./collection_produtos');

// Importa bibliotecas para Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

// Importa definição e rotas do Swagger
const swaggerDefinition = require('./swagger/swaggerDef');
const swaggerRoutes = require('./swagger/swaggerRoutes');

const PORT = process.env.PORT || 3000;

// Configuração do Swagger JSDoc
const swaggerOptions = {
  swaggerDefinition,
  apis: [],
};

// Combina a definição Swagger com as rotas
const swaggerDocs = {
  ...swaggerJsDoc(swaggerOptions),
  paths: swaggerRoutes.paths,
};

// Configura o Swagger UI no servidor
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Função para inicializar o banco de dados e o servidor
async function initialize() {
  try {
    // Executa o upsert das coleções de clientes e produtos
    await upsertClientes();
    await upsertProdutos();

    // Configuração das rotas
    clientesRoutes(server);
    produtosRoutes(server);
    pdvRoutes(server);

    // Inicia o servidor
    server.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
      console.log(`Documentação Swagger disponível em http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error("Erro ao inicializar o servidor:", error);
  }
}

// Chama a função de inicialização
initialize();
