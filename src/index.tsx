import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';

createServer({
  models: {
    profissional: Model,
    profissionalTipo: Model,
  },

  seeds(server) {
    server.db.loadData({
      profissionals: [
        {
          id: 1,
          nome: 'João',
          telefone: '9999-9999',
          email: 'joao@email.com',
          tipoDeProfissional: 1,
          situacao: true,
          updatedAt: new Date('2022-02-12 09:25:34'),
          createdAt: new Date('2022-01-02 09:25:34')
        },
        {
          id: 2,
          nome: 'Maria',
          telefone: '8888-8888',
          email: 'maria@email.com',
          tipoDeProfissional: 3,
          situacao: true,
          updatedAt: new Date('2022-02-02 09:25:34'),
          createdAt: new Date('2022-01-25 09:25:34')
        },
        {
          id: 3,
          nome: 'Manoel',
          telefone: '7777-7777',
          email: 'manoel@email.com',
          tipoDeProfissional: 2,
          situacao: true,
          updatedAt: new Date('2022-02-20 09:25:34'),
          createdAt: new Date('2022-02-10 09:25:34')
        },
      ],

      profissionalTipos: [
        {
          id: 1,
          descricao: 'Administrador',
          situacao: true,
          updatedAt: new Date('2022-02-12 09:25:34'),
          createdAt: new Date('2022-01-02 09:25:34')
        },
        {
          id: 2,
          descricao: 'Desenvolvedor',
          situacao: true,
          updatedAt: new Date('2022-02-02 09:25:34'),
          createdAt: new Date('2022-01-25 09:25:34')
        },
        {
          id: 3,
          descricao: 'HelpDesk',
          situacao: true,
          updatedAt: new Date('2022-02-20 09:25:34'),
          createdAt: new Date('2022-02-10 09:25:34')
        },
      ]
    })
  },

  routes() {
    this.namespace = 'api';

    this.get('/profissionals', () => {
      return this.schema.all('profissional');
    });

    this.get("/profissionals/:id", (schema, request) => {
      let id = request.params.id

      return schema.find('profissional', id);
    });

    this.post('/profissionals', (schema, request) => {
      const data = JSON.parse(request.requestBody);
      return schema.create('profissional', { ...data, createdAt: new Date(), updatedAt: new Date() });
    });

    this.put('/profissionals', (schema, request) => {
      const data = JSON.parse(request.requestBody);
      if (data.id) {
        const put = schema.find('profissional', data.id);
        const { nome, email, telefone, situacao, tipoDeProfissional } = data;
        put?.update({ nome, email, telefone, situacao, tipoDeProfissional, updatedAt: new Date() });
        return true;
      } else {
        return false;
      }
    });

    this.get('/tipos', () => {
      return this.schema.all('profissionalTipo');
    });

    this.get("/tipos/:id", (schema, request) => {
      let id = request.params.id

      return schema.find('profissionalTipo', id);
    });

    this.post('/tipos', (schema, request) => {
      const data = JSON.parse(request.requestBody);
      return schema.create('profissionalTipo', { ...data, createdAt: new Date(), updatedAt: new Date() });
    });

    this.put('/tipos', (schema, request) => {
      const data = JSON.parse(request.requestBody);
      if (data.id) {
        const put = schema.find('profissionalTipo', data.id);
        const { descricao, situacao } = data;
        put?.update({ descricao, situacao, updatedAt: new Date() });
        return true;
      } else {
        return false;
      }
    });
  }
});

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
