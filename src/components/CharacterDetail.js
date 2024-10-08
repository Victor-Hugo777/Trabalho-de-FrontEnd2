import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Loader from './Spinner'; 

const DetailContainer = styled.div`
    padding: 20px;
    text-align: center;
`;

const Message = styled.div`
    color: ${(props) => (props.success ? 'green' : 'red')};
    margin-bottom: 20px;
`;

const CharacterImage = styled.img`
    max-width: 200px; 
    height: auto; 
`;

const BackButton = styled.button`
    background-color: #1c1c1c;
    color: #00ff00;
    border: none;
    padding: 10px 20px;
    margin-top: 20px;
    font-family: 'Press Start 2P', cursive;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #00ff00;
        color: #1c1c1c;
    }
`;

const CharacterDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const fetchCharacterDetail = async () => {
            try {
                const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
                setCharacter(response.data);
                setSuccess("Detalhes do personagem carregados com sucesso!");
            } catch (err) {
                setError("Erro ao carregar os detalhes do personagem.");
            } finally {
                setLoading(false);
            }
        };

        fetchCharacterDetail();
    }, [id]);

    if (loading) return <Loader />; 

    return (
        <DetailContainer>
            {success && <Message success>{success}</Message>}
            {error && <Message>{error}</Message>}
            {character && (
                <>
                    <h2>{character.name}</h2>
                    <CharacterImage src={character.image} alt={character.name} />
                    <p>Espécie: {character.species}</p>
                    <p>Gênero: {character.gender}</p>
                    <p>Status: {character.status}</p>
                    <BackButton onClick={() => navigate(-1)}>Voltar</BackButton>
                </>
            )}
        </DetailContainer>
    );
};

export default CharacterDetail;
