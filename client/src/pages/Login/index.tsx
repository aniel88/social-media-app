import React from "react";
import Box from "../../components/Box/Box";
import Button from "../../components/Button/Button";
import Form from "../../components/Form/Form";
import FormControl from "../../components/FormControl/FormControl";
import FormGroup from "../../components/FormGroup/FormGroup";
import Layout from "../../components/Layout/Layout";
import {
  RegisterImage,
  RegisterImageLayout,
  RegisterImageText,
  RegisterImageTitle,
} from "../../styles/RegisterImage.styled";
/* Assets */
import registerImageUrl from "../../assets/register_image.jpeg";
import Input from "../../components/Input/Input";

/* Font awesome icons */
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import Heading from "../../components/Heading/Heading";
import Text from "../../components/Text/Text";
import Container from "../../components/Container/Container";
const Login = (): JSX.Element => {
  return (
    <Layout extraStyle={{ backgroundColor: "#c3beff" }}>
      {" "}
      <Box flexDirection="row">
        <RegisterImageLayout>
          <RegisterImage>
            <Heading
              type="h1"
              align="right"
              weight="bold"
              extraStyle={{ color: "white", lineHeight: "50px" }}
            >
              Lama Social.
            </Heading>
            <Text
              align="right"
              extraStyle={{
                marginTop: "30px",
                lineHeight: "20px",
                color: "white",
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              eu nisi a nunc malesuada convallis. Pellentesque eu metus vel
            </Text>
            <Text
              align="right"
              extraStyle={{
                marginTop: "30px",
                marginBottom: "10px",
                lineHeight: "20px",
                color: "white",
                width: "100%",
              }}
            >
              Don't you have an account?
            </Text>
            <Container
              display="flex"
              justifyContent="end"
              alignItem="center"
              width="full"
            >
              <a href="/#/register">
                <Button size="small" variant="primary" type="button">
                  Register
                </Button>
              </a>
            </Container>
          </RegisterImage>
          <img src={registerImageUrl} alt="image" />
        </RegisterImageLayout>
        <Form>
          <FormGroup extraStyle={{ width: "300px" }}>
            <FormControl>
              <Input
                id="email"
                hasIcon={true}
                fontAwesomeIcon={faAt}
                placeholder="Email"
              />
            </FormControl>
          </FormGroup>
          <FormGroup extraStyle={{ width: "300px" }}>
            <FormControl>
              <Input
                id="email"
                type="password"
                hasIcon={true}
                fontAwesomeIcon={faLock}
                placeholder="Password"
              />
            </FormControl>
            <Button
              size="small"
              variant="primary"
              type="submit"
              extraStyle={{ marginTop: "10px" }}
            >
              Log in
            </Button>
          </FormGroup>
        </Form>
      </Box>
    </Layout>
  );
};

export default Login;
