import { Container } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Nawbar from "../components/Navbar";
import Player from "../components/Player";
import { useTypedSelector } from "../hooks/useTypedSelector";
import actionCreators from "../store/actionCreators";
import jwt_decode from "jwt-decode";
import { UserDataType } from "../store/slicers/authSlicer";
import { useActions } from "../hooks/useActions";
import { Tokens } from "../types/auth";

interface IMainLayoutProps {
  children: JSX.Element | any;
  title?: string;
  keywords?: string;
  isAuth?: boolean;
  withAuthCheck?: boolean;
}

const MainLayout: React.FC<IMainLayoutProps> = ({
  children,
  title = "My music",
  withAuthCheck = true,
  keywords,
}) => {
  const { isAuth } = useTypedSelector((state) => state.auth);
  const router = useRouter();
  const { setUserData } = useActions();
  useEffect(() => {
    const token = localStorage.getItem(Tokens.Access);
    if (withAuthCheck && !isAuth) {
      if (token) {
        setUserData(jwt_decode(token) as UserDataType);
      } else {
        router.push("./auth");
      }
    }
  }, [isAuth]);

  if (!isAuth && withAuthCheck) {
    return null;
  } else {
    return (
      <>
        <Head>
          <title>{title}</title>
          <meta name="description" content={``} />
          <meta name="robots" content="index, follow" />
          <meta name="keywords" content={keywords || "Music"} />
        </Head>
        <Nawbar title={title} isAuth={isAuth} />
        <Container style={{ margin: "90px" }}>{children}</Container>
        <Player />
      </>
    );
  }
};

export default MainLayout;
