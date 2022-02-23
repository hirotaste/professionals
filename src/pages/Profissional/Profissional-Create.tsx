import React, { Component, useCallback, useEffect, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Input from "../../components/Input";
import { TipoProfissional } from "../../models/TipoProfissional";
import { api } from '../../services/api';
import { Container, Dbuttons, SubmitButton } from './styles';
import Button from '../../components/Button';

interface IProfissionalFormData {
    id?: string;
    nome: string;
    telefone?: string;
    email?: string;
    tipoDeProfissional: TipoProfissional;
    situacao: boolean;
    updatedAt: Date;
    createdAt: Date; 
}

export function ProfissionalCreate() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [ativo, setAtivo] = useState(true);
    const [tipo, setTipo] = useState('');

    const formRef = useRef<FormHandles>(null);
    const navigate = useNavigate();    

    const { profissionalId } = useParams();
    const [tiposProfissional, settiposProfissional] = useState<TipoProfissional[]>([]);
    useEffect(() => {
        api.get('tipos')
            .then(response => settiposProfissional(response?.data?.profissionalTipos));
            
        if (profissionalId) {
          api.get(`/profissionals/${profissionalId}`)
            .then(response => {
              const data = response.data?.profissional;
              setNome(data.nome);
              setEmail(data.email);
              setTelefone(data.telefone);
              setAtivo(data.situacao);
              setTipo(data.tipoDeProfissional);
            }
          )
        }
    }, []);

    const handleAtivo = (ativo: boolean) => {
      setAtivo(ativo);
      api.put('/profissionals', { id: profissionalId, situacao: ativo });
    }

    const handleTipo = (tipo: string) => {
      setTipo(tipo.toString());
      api.put('/profissionals', { id: profissionalId, tipoDeProfissional: tipo.toString() });
    }

    const handleSubmit = useCallback(
      async (data: IProfissionalFormData) => {
        try {
          formRef.current?.setErrors({});

          const schema = Yup.object().shape({
            nome: Yup.string().required('Nome obrigatório'),
            email: Yup.string()
              .email('Digite um e-mail válido'),
            telefone: Yup.string()
          });

          await schema.validate(data, {
            abortEarly: false,
          });

          const formData = {
            ...data,
            id: profissionalId,
            situacao: ativo
          };

          if (profissionalId) {
            await api.put(`/profissionals`, formData);
          } else {
            await api.post('/profissionals', formData);
          }

          navigate('/');

          toast.success("As informações foram salvas");
        } catch (err) {
          if (err instanceof Yup.ValidationError && err.errors?.length) {
            toast.error(err.errors[0]);
          } else {
            toast.error("Não foi possível salvar as informações");
          }
        }
      },
      [navigate],
    );

    return (
        <Container>
            <ToastContainer />
            <h1>Profissional</h1>
            <Form
                ref={formRef}
                onSubmit={handleSubmit}
            >
                <Input
                  type="text" 
                  name="nome"
                  placeholder="Nome"
                  value={nome} 
                  onChange={event => setNome(event?.target?.value)}
                />
                <Input
                  type="text" 
                  name="telefone"
                  placeholder="Telefone"
                  value={telefone} 
                  onChange={event => setTelefone(event?.target?.value)}
                />
                <Input
                  type="text" 
                  name="email"
                  placeholder="E-mail"
                  value={email} 
                  onChange={event => setEmail(event?.target?.value)}
                />

                <select className="select" name="tipoDeProfissional" value={tipo} onChange={event => handleTipo(event?.target?.value)} >
                   {tiposProfissional?.map(tipo => {
                      return (
                        <option key={tipo.id} value={tipo.id}>{tipo.descricao}</option>
                      )
                    })}
                </select>
                
                <Dbuttons>
                  <Button type="button" className={ativo ? 'button-active' : ''} onClick={() => { handleAtivo(true) }} >
                    Ativo
                  </Button>
                  <Button type="button" className={!ativo ? 'button-active' : ''} onClick={() => { handleAtivo(false); }} >
                    Inativo
                  </Button>
                </Dbuttons>
                
                <SubmitButton>
                  <Button type="submit" className='btn-submit'>
                    Salvar dados
                  </Button>
                </SubmitButton>
                
            </Form>
        </Container>
    )
}