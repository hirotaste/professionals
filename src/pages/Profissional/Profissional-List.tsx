import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

import Button from "../../components/Button";
import { Profissional } from "../../models/Profissional";
import { TipoProfissional } from "../../models/TipoProfissional";
import { api } from "../../services/api";
import { Container, Dflex, TextCenter } from './styles';

export function ProfissionalList() {
    const [profissionais, setProfissionais] = useState<Profissional[]>([]);
    const [tiposProfissional, setTiposProfissional] = useState<TipoProfissional[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.get('profissionals')
            .then(response => setProfissionais(response.data.profissionals));

        api.get('tipos')
            .then(response => setTiposProfissional(response.data.profissionalTipos));
    }, []);

    const handleProfissional = (profissionalID: string | undefined) => {
        navigate(`/profissional/${profissionalID}`);
    }

    const getProfissional = (tipoID: string) => {
        const tipo = tiposProfissional.find(tipo => tipo.id == tipoID);
        return tipo ? tipo.descricao : '';
    }

    return (
        <Container>
            <Dflex>
                <div>
                    <h1>Listagem de Profissionais</h1>
                </div>
                <div>
                    <Button type="button" onClick={() => navigate('create')}>Cadastrar Profissional</Button>
                </div>
            </Dflex>            
            
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Telefone</th>
                        <th>Email</th>
                        <th>Tipo</th>
                        <th>Situação</th>
                    </tr>
                </thead>
                <tbody>
                    {profissionais?.map(profissional => {
                        return (
                            <tr className='cursor-pointer' key={profissional.id} onClick={() => handleProfissional(profissional.id)}>
                                <td>{profissional.nome}</td>
                                <td>
                                    <TextCenter>{profissional.telefone}</TextCenter>
                                </td>
                                <td>{profissional.email}</td>
                                <td>{ getProfissional(profissional.tipoDeProfissional) }</td>
                                <td>
                                    <TextCenter>{profissional.situacao ? 'Ativo' : 'Inativo'}</TextCenter>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </Container>
    )
}