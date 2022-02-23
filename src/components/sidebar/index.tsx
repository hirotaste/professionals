import { useNavigate } from "react-router-dom";

import { Container, Content } from "./styles";

export function Sidebar() {
    const navigate = useNavigate();

    return (
        <Container>
            <Content>
                <button onClick={() => navigate('/profissionais')}>Profissionais</button>
                <button onClick={() => navigate('/tipos')}>Tipos de profissional</button>
            </Content>
        </Container>
    )
}