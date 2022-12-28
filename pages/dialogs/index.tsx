import { AccountCircle, ExitToApp } from "@mui/icons-material"
import { Avatar, Button, Grid, IconButton, } from "@mui/material"
import React from "react"
import MainLayout from "../../layouts/MainLayout"

interface ProfilePropTypes {

}

const Index:React.FC<ProfilePropTypes> = () => {
    return (  
        <MainLayout title={'Диалоги'}>
           <div>
                Dialogs
           </div>
        </MainLayout>
    )
}

export default Index