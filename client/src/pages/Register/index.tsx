import React, { Reducer, useReducer } from "react";
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
import Button from "../../components/Button/Button";
import FormGroup from "../../components/FormGroup/FormGroup";
import FormControl from "../../components/FormControl/FormControl";
import Input from "../../components/Input/Input";
import { regex } from "../../utils/regex";

import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { faAt } from "@fortawesome/free-solid-svg-icons";
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

  // const renderAlert = (registrationStatus: RegisterResponse) => {
  //   switch (registrationStatus.register.status) {
  //     case "success":
  //       return <Alert severity="success">Account created successfuly!</Alert>;
  //     case "pending":
  //       return <div>A</div>;
  //     case "error":
  //       return <Alert severity="error">This account already exists! </Alert>;
  //     case "unknown":
  //       return <></>;
  //     case "warning":
  //       return <Alert severity="warning">Something get wrong!</Alert>;
  //   }
  // };

  return (
    <Layout>
      <Box flexDirection="row">
        <Form onSubmit={onSubmitHandler}>
          <FormGroup extraStyle={{ width: "300px" }}>
            {/* {renderAlert(state)} */}

            <FormControl>
              <Input
                id="firstName"
                placeholder="First name"
                value={formValues.firstName}
                onChange={(event) =>
                  setFormValues({
                    value: event.target.value,
                    type: event.target.id,
                  })
                }
                pattern={regex.firstname}
                hasIcon={true}
                fontAwesomeIcon={faUser}
                iconColor="gray"
              />
            </FormControl>
            <FormControl>
              <Input
                id="lastName"
                placeholder="Last name"
                value={formValues.lastName}
                onChange={(event) =>
                  setFormValues({
                    value: event.target.value,
                    type: event.target.id,
                  })
                }
                pattern={regex.lastname}
                hasIcon={true}
                fontAwesomeIcon={faUser}
                iconColor="gray"
              />
            </FormControl>
            <FormControl>
              <Input
                id="userName"
                placeholder="Username"
                value={formValues.userName}
                onChange={(event) =>
                  setFormValues({
                    value: event.target.value,
                    type: event.target.id,
                  })
                }
                pattern={regex.username}
                hasIcon={true}
                fontAwesomeIcon={faUser}
                iconColor="gray"
              />
            </FormControl>
            <FormControl>
              <Input
                id="email"
                placeholder="Email"
                value={formValues.email}
                onChange={(event) =>
                  setFormValues({
                    value: event.target.value,
                    type: event.target.id,
                  })
                }
                pattern={regex.email}
                hasIcon={true}
                fontAwesomeIcon={faAt}
                iconColor="gray"
              />
            </FormControl>
            <FormControl>
              <Input
                type="password"
                placeholder="Password"
                value={formValues.password}
                onChange={(event) =>
                  setFormValues({
                    value: event.target.value,
                    type: event.target.id,
                  })
                }
                pattern={regex.password}
                id="password"
                hasIcon={true}
                fontAwesomeIcon={faLock}
                iconColor="gray"
              />
            </FormControl>
            <Button
              size="small"
              variant="primary"
              type="submit"
              extraStyle={{ marginTop: "10px" }}
            >
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
              <Button size="small" variant="primary" type="button">
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
