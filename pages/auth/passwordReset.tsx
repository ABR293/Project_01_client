import { AccountCircle, ExitToApp, Password } from "@mui/icons-material"
import { Avatar, Button, Grid, IconButton, } from "@mui/material"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import PasswordReset from "../../components/PasswordReset"
import SignUp from "../../components/signUp"
import { useActions } from "../../hooks/useActions"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import MainLayout from "../../layouts/MainLayout"
import jwt_decode from "jwt-decode";
import { UserDataType } from "../../store/slicers/authSlicer"

interface ProfilePropTypes {

}

const Index:React.FC<any> = (props) => {
        return (  
            <MainLayout title={''} withAuthCheck={false} isAuth={false}>
                <PasswordReset />
            </MainLayout>
        )
    }

export default Index