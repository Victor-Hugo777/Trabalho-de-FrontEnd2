import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
    background-color: #2d2d2d;
    border: 2px solid #00ff00;
    border-radius: 10px;
    width: 150px;
    margin: 10px;
    padding: 10px;
    text-align: center;
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.05);
        border-color: #ffcc00;
    }
`;

const CharacterImage = styled.img`
    width: 100%;
    border-radius: 10px;
`;

const CharacterName = styled.h2`
    color: #00ff00;
    font-family: 'Press Start 2P', cursive;
    font-size: 1.2em;
`;

const CharacterCard = ({ character }) => {
    return (
        <CardContainer>
            <CharacterImage src={character.image} alt={character.name} />
            <CharacterName>{character.name}</CharacterName>
        </CardContainer>
    );
};

export default CharacterCard;
