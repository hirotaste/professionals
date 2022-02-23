export type TipoProfissional = {
  id?: string,                  // ID 
  descricao: string,        // descricao do tipo *Obrigatório
  situacao: boolean,           // situacao do cadastro *Obrigatório
  updatedAt: Date,            // data e hora ultima atualizacao *Obrigatório
  createdAt: Date             // data e hora de cadastro *Obrigatório
}