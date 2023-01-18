import React from "react";
import PasswordReset from "../../components/PasswordReset";
import MainLayout from "../../layouts/MainLayout";

interface ProfilePropTypes {}

const Index: React.FC<any> = (props) => {
  return (
    <MainLayout title={""} withAuthCheck={false} isAuth={false}>
      <PasswordReset />
    </MainLayout>
  );
};

export default Index;
