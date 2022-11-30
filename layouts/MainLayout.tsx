import { Container } from '@mui/material';
import React from 'react'
import Nawbar from '../components/Navbar';
import Player from '../components/Player';

const MainLayout: React.FC<any> = ({children}) => {
    return (
        <>
            <Nawbar/>
            <Container style={{margin: '90px '}}>
                {children}
            </Container>
            <Player />
        </>
    )
}

export default MainLayout