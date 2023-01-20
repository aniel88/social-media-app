import React, { Reducer, useReducer } from "react";
import {
  Alert,
  Button,
  FormControl,
  FormGroup,
  Input,
  InputLabel,
} from "@mui/material";
import StyledLogo from "../../components/Logo/index.styled";
import StyledSection from "../../components/Box/Box.styled";
import RegisterLayout from "../../styles/Layout";
import { RegisterType } from "../../models/register";
import {
  inputFormReducer,
  Action,
} from "../../redux/reducers/register/registerForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { error, success } from "../../redux/reducers/register/registerSlice";
import { useDispatch, useSelector } from "react-redux/es/exports";

import { RegisterResponse } from "../../redux/store/store";
import Layout from "../../styles/Layout";
import registerImageUrl from "../../assets/register_image.jpeg";
import Form from "../../styles/Form.styled";

import Box from "../../components/Box/Box.styled";
import {
  RegisterImageLayout,
  RegisterImage,
  RegisterImageTitle,
  RegisterImageText,
} from "../../styles/RegisterImage.styled";
import Title from "../../styles/Title.styled";

const initialFormInput: RegisterType = {
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  password: "",
};

const Register = (): JSX.Element => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useReducer<Reducer<any, Action>>(
    inputFormReducer,
    initialFormInput
  );
  const dispatch = useDispatch();
  const state: RegisterResponse = useSelector(
    (state: RegisterResponse) => state
  );

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    axios
      .post("http://localhost:8080/api/auth/register", formValues)
      .then((response) => {
        dispatch(success());
        navigate("/login");
      })
      .catch((err) => {
        dispatch(error());
      });
  };

  const renderAlert = (registrationStatus: RegisterResponse) => {
    switch (registrationStatus.register.status) {
      case "success":
        return <Alert severity="success">Account created successfuly!</Alert>;
      case "pending":
        return <div>A</div>;
      case "error":
        return <Alert severity="error">This account already exists! </Alert>;
      case "unknown":
        return <></>;
      case "warning":
        return <Alert severity="warning">Something get wrong!</Alert>;
    }
  };

  return (
    <Layout>
      <Box flexDirection="row">
        <Form onSubmit={onSubmitHandler}>
          <FormGroup sx={{ width: 300 }}>
            {renderAlert(state)}

            <FormControl sx={{ margin: "10px 0" }}>
              <InputLabel htmlFor="firstName">First Name</InputLabel>
              <Input
                id="firstName"
                value={formValues.firstName}
                aria-describedby="first-name"
                onChange={(event) =>
                  setFormValues({
                    value: event.target.value,
                    type: event.target.id,
                  })
                }
                required
              />
            </FormControl>
            <FormControl sx={{ margin: "10px 0" }}>
              <InputLabel htmlFor="lastName">Last Name</InputLabel>
              <Input
                id="lastName"
                value={formValues.lastName}
                onChange={(event) =>
                  setFormValues({
                    value: event.target.value,
                    type: event.target.id,
                  })
                }
                aria-describedby="last-name"
                required
              />
            </FormControl>
            <FormControl sx={{ margin: "10px 0" }}>
              <InputLabel htmlFor="userName">Username</InputLabel>
              <Input
                id="userName"
                value={formValues.userName}
                onChange={(event) =>
                  setFormValues({
                    value: event.target.value,
                    type: event.target.id,
                  })
                }
                aria-describedby="userName"
                required
              />
            </FormControl>
            <FormControl sx={{ margin: "10px 0" }}>
              <InputLabel htmlFor="email">Email address</InputLabel>
              <Input
                id="email"
                value={formValues.email}
                onChange={(event) =>
                  setFormValues({
                    value: event.target.value,
                    type: event.target.id,
                  })
                }
                aria-describedby="email-address"
                required
              />
            </FormControl>
            <FormControl sx={{ margin: "10px 0" }}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                type="password"
                value={formValues.password}
                onChange={(event) =>
                  setFormValues({
                    value: event.target.value,
                    type: event.target.id,
                  })
                }
                id="password"
                aria-describedby="password"
                required
              />
            </FormControl>
            <Button type="submit" variant="contained" color="success">
              Create account
            </Button>
          </FormGroup>
        </Form>

        <RegisterImageLayout>
          <RegisterImage>
            <RegisterImageTitle>Lama Social.</RegisterImageTitle>
            <RegisterImageText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              eu nisi a nunc malesuada convallis. Pellentesque eu metus vel
            </RegisterImageText>
            <RegisterImageText>Do you have an account?</RegisterImageText>
            <a href="/login">
              <Button variant="contained" color="success">
                Login
              </Button>
            </a>
          </RegisterImage>
          <img src={registerImageUrl} alt="image" />
        </RegisterImageLayout>
      </Box>
    </Layout>
  );
};

export default Register;
