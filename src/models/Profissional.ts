import { TipoProfissional } from "./TipoProfissional";

export type Profissional = {
    id?: string;                            // ID
    nome: string;                       // Nome do profisisonal *Obrigatório
    telefone?: string;                  // Telefone
    email?: string;                       // Endereço de e-mail do profissional
    tipoDeProfissional: string;   // Vinculo com o tipo de profissional *Obrigatório
    situacao: boolean;                     // Situação do cadastro *Obrigatório
    updatedAt: Date;                      // Data e hora da última atualização *Obrigatório
    createdAt: Date;                      // Data e hora da de cadastro *Obrigatório
}