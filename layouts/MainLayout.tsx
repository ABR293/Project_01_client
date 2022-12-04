import { Container } from '@mui/material';
import Head from 'next/head';
import React, {useEffect} from 'react'
import Nawbar from '../components/Navbar';
import Player from '../components/Player';



interface IMainLayoutProps {
    children: JSX.Element | any
    title?: string
    keywords?: string
}

const MainLayout: React.FC<IMainLayoutProps> = ({children, title, keywords}) => {
 
    return (
        <>
            <Head>
                <title>{title || 'My music'}</title>
                <meta name='description' content={``}/>
                <meta name='robots' content='index, follow'/>
                <meta name='keywords' content={keywords || 'Music'}/>
            </Head>
            <Nawbar/>
            <Container style={{margin: '90px '}}>
                {children}
            </Container>
            <Player />
        </>
    )
}

export default MainLayout