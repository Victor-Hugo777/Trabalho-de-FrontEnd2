import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
    background-color: #1c1c1c;
    color: #00ff00;
    text-align: center;
    padding: 20px;
    font-family: 'Press Start 2P', cursive;
    position: relative;
    width: 100%;
`;

const Header = () => {
    return (
        <HeaderContainer>
            <h1>Por: Victor Hugo Cazula</h1>
        </HeaderContainer>
    );
};

export default Header;
