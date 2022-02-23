import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Sidebar } from "./components/sidebar";
import { ProfissionalList } from "./pages/Profissional/Profissional-List";
import { ProfissionalCreate } from "./pages/Profissional/Profissional-Create";

import { GlobalStyle } from "./styles/global";
import { TipoProfissionalList } from './pages/TipoProfissional/TipoProfissional-List';
import { TipoProfissionalCreate } from './pages/TipoProfissional/TipoProfissional-Create';

export function App() {
  return (
    <>
      <Sidebar />
      <main>
        <Routes>
          <Route path="/" element={<ProfissionalList />} />
          <Route path="/profissionais" element={<ProfissionalList />} />
          <Route path="/profissional/create" element={<ProfissionalCreate />} />
          <Route path="/profissional/:profissionalId" element={<ProfissionalCreate />} />
          <Route path="/tipos" element={<TipoProfissionalList />} />
          <Route path="/tipo/create" element={<TipoProfissionalCreate />} />
          <Route path="/tipo/:tipoId" element={<TipoProfissionalCreate />} />
        </Routes>
      </main>
      <GlobalStyle />
    </>
  );
}

