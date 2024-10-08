import React from 'react';
import styled from 'styled-components';

const SpinnerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; 
`;

const Spinner = styled.div`
    border: 8px solid #f3f3f3; 
    border-top: 8px solid #00ff00;
    border-radius: 50%;
    width: 50px; 
    height: 50px; 
    animation: spin 1s linear infinite;

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

const Loader = () => (
    <SpinnerContainer>
        <Spinner />
    </SpinnerContainer>
);

export default Loader;
