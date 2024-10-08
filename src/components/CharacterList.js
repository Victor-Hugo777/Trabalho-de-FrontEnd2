import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import CharacterCard from './CharacterCard';
import styled from 'styled-components';

const ListContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background-color: #1c1c1c;
    padding: 20px;
`;

const Title = styled.h1`
    text-align: center;
    color: #00ff00;
    font-family: 'Press Start 2P', cursive;
    margin-bottom: 20px;
`;

const FilterSelect = styled.select`
    margin: 20px;
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    background-color: #2d2d2d;
    color: #ffffff;
    border: 2px solid #00ff00;
`;

const CharacterList = () => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [species, setSpecies] = useState('');
    const [gender, setGender] = useState('');
    const [status, setStatus] = useState('');
    const itemsPerPage = 20;

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await api.get('/character', { params: { page } });
                setCharacters(prev => [...prev, ...response.data.results]);
                setLoading(false);
                setHasMore(response.data.info.next !== null);
            } catch (error) {
                setError('Erro ao buscar personagens.');
                setLoading(false);
            }
        };

        fetchCharacters();
    }, [page]);

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.offsetHeight && hasMore) {
            setPage(prev => prev + 1);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasMore]);

    const handleSpeciesChange = (e) => {
        setSpecies(e.target.value);
        setPage(1);
        setCharacters([]);
        fetchFilteredCharacters(e.target.value, gender, status);
    };

    const handleGenderChange = (e) => {
        setGender(e.target.value);
        setPage(1);
        setCharacters([]);
        fetchFilteredCharacters(species, e.target.value, status);
    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
        setPage(1);
        setCharacters([]);
        fetchFilteredCharacters(species, gender, e.target.value);
    };

    const fetchFilteredCharacters = async (species, gender, status) => {
        setLoading(true);
        try {
            const response = await api.get('/character', { params: { species, gender, status } });
            setCharacters(response.data.results);
            setLoading(false);
            setHasMore(response.data.info.next !== null);
        } catch (error) {
            setError('Erro ao buscar personagens.');
            setLoading(false);
        }
    };

    if (loading) return <p style={{ color: '#00ff00' }}>Carregando...</p>;
    if (error) return <p style={{ color: '#ff0000' }}>{error}</p>;

    return (
        <>
            <Title>Personagens de Rick and Morty</Title>
            <div>
                <FilterSelect onChange={handleSpeciesChange} value={species}>
                    <option value="">Todas as Espécies</option>
                    <option value="Human">Humanos</option>
                    <option value="Alien">Alienígenas</option>
                    <option value="Mythological Creature">Criaturas Mitológicas</option>
                    <option value="Animal">Animais</option>
                </FilterSelect>
                <FilterSelect onChange={handleGenderChange} value={gender}>
                    <option value="">Todos os Gêneros</option>
                    <option value="Male">Masculino</option>
                    <option value="Female">Feminino</option>
                    <option value="Genderless">Sem Gênero</option>
                    <option value="Unknown">Desconhecido</option>
                </FilterSelect>
                <FilterSelect onChange={handleStatusChange} value={status}>
                    <option value="">Todos os Status</option>
                    <option value="Alive">Vivo</option>
                    <option value="Dead">Mortos</option>
                    <option value="Unknown">Desconhecido</option>
                </FilterSelect>
            </div>
            <ListContainer>
                {characters.map(character => (
                    <Link to={`/character/${character.id}`} key={character.id}>
                        <CharacterCard character={character} />
                    </Link>
                ))}
            </ListContainer>
        </>
    );
};

export default CharacterList;
