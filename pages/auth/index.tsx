import { AccountCircle, ExitToApp } from "@mui/icons-material";
import { Avatar, Button, Grid, IconButton } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SignIn from "../../components/signIn";
import SignUp from "../../components/signUp";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import MainLayout from "../../layouts/MainLayout";
import jwt_decode from "jwt-decode";
import { UserDataType } from "../../store/slicers/authSlicer";
import { Tokens } from "../../types/auth";

interface ProfilePropTypes {}

const Index: React.FC<ProfilePropTypes> = () => {
  const [reg, setReg] = useState(false);

  const router = useRouter();
  const { setUserData } = useActions();
  const { isAuth } = useTypedSelector((state) => state.auth);
  useEffect(() => {
    const token = localStorage.getItem(Tokens.Access);
    console.log(token);
    if (token) {
      setUserData(jwt_decode(token) as UserDataType);
      router.push("./profile");
    }
  }, [isAuth]);

  if (isAuth) {
    return null;
  } else {
    return (
      <MainLayout title={""} withAuthCheck={false} isAuth={false}>
        {reg ? (
          <SignUp onChangeReg={() => setReg(false)} />
        ) : (
          <SignIn onChangeReg={() => setReg(true)} />
        )}
      </MainLayout>
    );
  }
};

export default Index;
