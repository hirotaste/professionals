import styled from 'styled-components';

export const Container = styled.button`
  cursor: pointer;
  font-size: 1rem;
  color: var(--shape);
  background: var(--blue-light);
  border: 0;
  padding: 0 2rem;
  border-radius: 0.25rem;
  height: 3rem;

  &:hover {
      filter: brightness(90%);
  }
`;
