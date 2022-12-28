import { ExitToApp, LinkOff } from "@mui/icons-material"
import { Avatar, Grid, IconButton, Box } from "@mui/material"
import { Container } from "@mui/system"
import React, { useEffect, useState } from "react"
import MainLayout from "../../layouts/MainLayout"
import styles from '../../styles/Profile.module.sass'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Api from "../../api"
import { END } from "redux-saga"
import { GetServerSideProps } from 'next';
import { wrapper } from "../../store"
import actionCreators from "../../store/actionCreators"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { useActions } from "../../hooks/useActions"
import { useRouter } from "next/router"

interface ProfilePropTypes {

}

let profileData = {
    firstName: 'John',
    lastName: 'Dou',
    nikName: 'BEERTRINKER!',
    status: 'Labor recedet, bene factum non abscedet',
    contacts: {
        phone: '',
        email: 'male@male.ru'
    },
    login: 'ququrma@mail.ru',
    passwordHash: 12323213,
    avatar: 'https://bugaga.ru/uploads/posts/2017-03/1489052030_kotik-hosiko-12.jpg', // 
    // dialogs: []
    photos: [
      {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
      },
      {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
      },
      {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
      },
      {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
      },
      {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        title: 'Hats',
      },
      {
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
        title: 'Honey',
      },
      {
        img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
        title: 'Basketball',
      },
      {
        img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
        title: 'Fern',
      },
      {
        img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
        title: 'Mushrooms',
      },
      {
        img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
        title: 'Tomato basil',
      },
      {
        img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
        title: 'Sea star',
      },
      {
        img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
        title: 'Bike',
      },
    ],
    music: []
}
////////


const Index:React.FC<ProfilePropTypes> = () => {

  const [userData, setUserData] = useState(null)

  const {
    userId,
    login,
    isAuth,
    isActivated,
  } = useTypedSelector(state => state.auth)

  console.log (
    'userId',userId,
    'login',login,
    'isAuth',isAuth,
    'isActivated',isActivated,
  )

  const router = useRouter()

  const {
    logoutUser
  } = useActions();

  const refresh = async() => {
    const res = await Api.refesh()
    console.log(res)
  }

    return (  
        <MainLayout title={'Профиль'}>
            <div className={styles.conteiner}>
            <div className={styles.cover}>
                <img src='https://u-stena.ru/upload/iblock/771/7713d686bee66674c5e3e68372215eb0.jpg' width="100%" height="300"/>
            </div>
            <div className={styles.content}>
            <Grid container spacing={2}>
                <Grid xs={3} >
                    <div className={styles.avatarLayout}>
                    <Avatar 
                        alt="Avatar" 
                        src={profileData.avatar} 
                        sx={{ width: 200, height: 200 }}
                    />
                    </div>
                </Grid>
                <Grid xs={3}></Grid>
                <Grid xs={6}>
                    <div className={styles.info}>
                        <h1>{profileData.firstName} {profileData.lastName} / {profileData.nikName}</h1>
                        <h5>{profileData.status}</h5>
                        <div style={{marginTop: '20px'}}>
                        <h5>Contacts</h5>
                            <ul>
                                {profileData.contacts && Object.keys(profileData.contacts).map(el => (
                                  profileData.contacts[el] && <li><p>{el}{profileData.contacts[el]}</p></li>
                                ))}
                            </ul>   
                        </div>
                       
                    </div>
                </Grid>
                <Grid xs={1}>
                    <div className={styles.info}>
                        <IconButton onClick={() => {
                          logoutUser()
                          router.push('./auth')
                          // refresh()
                        }}>
                            <ExitToApp/>
                        </IconButton>
                        <IconButton onClick={() => {
                          Api.getUsers();
                        }}>
                            getUsers
                        </IconButton>
                        <IconButton onClick={() => {
                          Api.refesh();
                        }}>
                            Refresh
                        </IconButton>
                    </div>
                </Grid>
                <Grid xs={12}></Grid>
                {/* <Grid xs={12}>
                    <div>
                        <h2>Photos</h2>
                        <ImageList sx={{ width: 1000, height: 150 }} cols={8} rowHeight={150}>
                        {profileData.photos.map((item) => (
                            <ImageListItem key={item.img}>
                            <img
                                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                alt={item.title}
                                loading="lazy"
                            />
                            </ImageListItem>
                        ))}
                        </ImageList>
                    </div>
                </Grid> */}
                {/* <Grid xs={6}>
                    <div>Dialogs</div>
                </Grid> */}
                {/* <Grid xs={6}>
                    <div>
                        <h2>Music</h2>
                    </div>
                </Grid> */}
            </Grid>   
            </div>
            </div>
        </MainLayout>
    )
}

export default Index
