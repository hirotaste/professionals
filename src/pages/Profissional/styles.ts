import styled from "styled-components";

export const Container = styled.div`
  padding: 16px;

  h1 {
    margin-bottom: 24px;
  }

  @media (min-width:800px) {
    padding-left: 20%;
    padding-right: 20%;
  }

  .select {
    background: #232129;
    border-radius: 10px;
    padding: 16px;
    width: 100%;

    border: 2px solid #232129;
    color: #666360;

    display: flex;
    align-items: center;

    & + div {
      margin-top: 8px;
    }

    select {
      flex: 1;
      background: #232129;
      border: 0;
      color: white;

      &::placeholder {
        color: #666360;
      }
    }
  }

  table {
    margin: auto;
    margin-top: 2rem;
    tr {
      td {
        padding: 1rem;
        min-width: 120px;
      }
    }
    .cursor-pointer {
      cursor: pointer;
    }
  }
`

export const TextCenter = styled.div`
  text-align: center;
`

export const Dflex = styled.div`
  display: flex;
  justify-content: space-between;
`

export const Dbuttons = styled.div`
  display: flex;
  justify-content: space-between;

  Button {
    min-width: 47%;
    margin-top: 1rem;
    filter: brightness(40%);
  }

  .button-active {
    font-weight: bold;
    background-color: var(--blue);
    filter: brightness(90%);
  }
`

export const SubmitButton = styled.div`
  display: flex;
  justify-content: center;

  Button {
    width: 100%;
    margin-top: 3rem;
    background-color: var(--green);
  }
`