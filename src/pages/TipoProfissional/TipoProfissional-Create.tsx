import React, { Component, useCallback, useEffect, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Input from "../../components/Input";
import { api } from '../../services/api';
import { Container, Dbuttons, SubmitButton } from './styles';
import Button from '../../components/Button';

interface ITipoProfissionalFormData {
    id?: string;
    descricao: string;
    situacao: boolean;
    updatedAt: Date;
    createdAt: Date; 
}

export function TipoProfissionalCreate() {
    const [descricao, setDescricao] = useState('');
    const [ativo, setAtivo] = useState(true);

    const formRef = useRef<FormHandles>(null);
    const navigate = useNavigate();    

    const { tipoId } = useParams();
    useEffect(() => {            
        if (tipoId) {
          api.get(`/tipos/${tipoId}`)
            .then(response => {
              const data = response.data?.profissionalTipo;
              setDescricao(data.descricao);
              setAtivo(data.situacao);
            }
          )
        }
    }, []);

    const handleSubmit = useCallback(
      async (data: ITipoProfissionalFormData) => {
        try {
          formRef.current?.setErrors({});

          const schema = Yup.object().shape({
            descricao: Yup.string().required('Descricao obrigatório')
          });

          await schema.validate(data, {
            abortEarly: false,
          });

          const formData = {
            ...data,
            id: tipoId,
            situacao: ativo
          };

          if (tipoId) {
            await api.put(`/tipos`, formData);
          } else {
            await api.post('/tipos', formData);
          }

          navigate('/tipos');

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
            <h1>Tipo de Profissional</h1>
            <Form
                ref={formRef}
                onSubmit={handleSubmit}
            >
                <Input
                  type="text" 
                  name="descricao"
                  placeholder="Descricao"
                  value={descricao} 
                  onChange={event => setDescricao(event?.target?.value)}
                />                
                
                <Dbuttons>
                  <Button type="button" className={ativo ? 'button-active' : ''} onClick={() => { setAtivo(true) }} >
                    Ativo
                  </Button>
                  <Button type="button" className={!ativo ? 'button-active' : ''} onClick={() => { setAtivo(false); }} >
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