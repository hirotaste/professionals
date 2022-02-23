import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

import Button from "../../components/Button";
import { TipoProfissional } from "../../models/TipoProfissional";
import { api } from "../../services/api";
import { Container, Dflex, TextCenter } from './styles';

export function TipoProfissionalList() {
    const [profissionais, setProfissionais] = useState<TipoProfissional[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.get('tipos')
            .then(response => {
                setProfissionais(response.data.profissionalTipos)
            })
    }, []);

    const handleTipo = (tipoID: string | undefined) => {
        navigate(`/tipo/${tipoID}`);
    }

    const datePipe = (date: any) => {
        return format(new Date(date), "dd/MM/yyyy");
    }

    return (
        <Container>
            <Dflex>
                <div>
                    <h1>Listagem de Tipos de Profissional</h1>
                </div>
                <div>
                    <Button type="button" onClick={() => navigate('/tipo/create')}>Cadastrar Tipo</Button>
                </div>
            </Dflex>            
            
            <table>
                <thead>
                    <tr>
                        <th>Descrição</th>
                        <th>Situação</th>
                        <th>Criação</th>
                        <th>Atualização</th>
                    </tr>
                </thead>
                <tbody>
                    {profissionais?.map(tipo => {
                        return (
                            <tr className='cursor-pointer' key={tipo.id} onClick={() => handleTipo(tipo.id)}>
                                <td>{tipo.descricao}</td>
                                <td>
                                    <TextCenter>{tipo.situacao ? 'Ativo' : 'Inativo'}</TextCenter>
                                </td>
                                <td>{ datePipe(tipo.createdAt) }</td>
                                <td>{ datePipe(tipo.updatedAt) }</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </Container>
    )
}