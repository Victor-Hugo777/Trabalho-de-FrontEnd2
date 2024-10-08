import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyles';
import CharacterList from './components/CharacterList';
import CharacterDetail from './components/CharacterDetail';
import Header from './components/Header';

const App = () => {
    return (
        <Router>
            <GlobalStyle />
            <Header />
            <Routes>
                <Route path="/" element={<CharacterList />} />
                <Route path="/character/:id" element={<CharacterDetail />} />
            </Routes>
        </Router>
    );
};

export default App;
