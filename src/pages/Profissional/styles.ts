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

  table {
    margin: auto;
    margin-top: 2rem;
    tr {
      td {
        padding: 1rem;
        min-width: 100px;
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