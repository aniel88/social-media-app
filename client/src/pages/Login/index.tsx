import React from "react";
import { Container } from "@mui/material";
import Layout from "../../styles/Layout";
import Box from "../../components/Box/Box.styled";
import Button from "../../components/Button/Button";

const Login = (): JSX.Element => {
  return (
    <Layout>
      <Button
        size="medium"
        variant="primary"
        isDisabled={false}
        type="button"
        onClick={() => console.log("on submit")}
      >
        Submit button
      </Button>
    </Layout>
  );
};

export default Login;
