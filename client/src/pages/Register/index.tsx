/* React */
import React, { Reducer, useEffect, useReducer } from "react";

/* Redux */
import type { AppDispatch } from "../../redux/store/store";

/* Models */
import { RegisterInputFormType, RegisterType } from "../../models/register";

/* Reducers */
import { inputFormReducer, Action } from "../../redux/reducers/register/form";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { createAccount } from "../../redux/reducers/register/registerSlice";

/* Axios */
import axios from "axios";

/* React router */
import { useNavigate } from "react-router-dom";

/* Custom style */
import {
  RegisterImageLayout,
  RegisterImage,
} from "../../styles/RegisterImage.styled";

/* Components */
import Button from "../../components/Button/Button";
import FormGroup from "../../components/FormGroup/FormGroup";
import FormControl from "../../components/FormControl/FormControl";
import Input from "../../components/Input/Input";
import InputError from "../../components/InputError/InputError";
import Layout from "../../components/Layout/Layout";
import Box from "../../components/Box/Box";
import Form from "../../components/Form/Form";
import Text from "../../components/Text/Text";
import Container from "../../components/Container/Container";
import Heading from "../../components/Heading/Heading";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Href from "../../components/Href/Href";

/* Regex */
import { regex } from "../../utils/regex";

/* Font awesome icons */
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { faAt } from "@fortawesome/free-solid-svg-icons";

/* Utils */
import { debounceHandler, debounceWaitTime } from "../../utils/debounce";
import checkFormSubmission from "../../utils/checkFormSubmission";
import { selectLoadingStatusCreateAccount } from "../../utils/selectors";
import isAuth from "../../utils/isAuth";

/* Assets */
import registerImageUrl from "../../assets/register_image.jpeg";

/* Cookie */
import { useCookies } from "react-cookie";

const initialFormInput: RegisterInputFormType = {
  firstName: {
    value: "",
    isValid: undefined,
    regex: new RegExp(regex.firstname),
    errorMessage: "Please enter your first name.",
  },
  lastName: {
    value: "",
    isValid: undefined,
    regex: new RegExp(regex.lastname),
    errorMessage: "Please enter your last name.",
  },
  userName: {
    value: "",
    isValid: undefined,
    regex: new RegExp(regex.username),
    errorMessage: "Invalid username.",
  },
  email: {
    value: "",
    isValid: undefined,
    regex: new RegExp(regex.email),
    errorMessage: "Invalid email.",
  },
  password: {
    value: "",
    isValid: undefined,
    regex: new RegExp(regex.password),
    errorMessage: "Invalid password.",
  },
};

const Register = (): JSX.Element => {
  const [token, setToken, removeToken] = useCookies(["access-token"]);
  const cookieToken = token["access-token"] || undefined;
  const navigate = useNavigate();
  const isLoading = useSelector(selectLoadingStatusCreateAccount);
  const dispatch = useDispatch<AppDispatch>();

  const [formValues, setFormValues] = useReducer<Reducer<any, Action>>(
    inputFormReducer,
    initialFormInput
  );

  useEffect(() => {
    isAuth(cookieToken)
      .then((_userData) => navigate("/"))
      .catch((_err) => {});
  });

  const usernameExist = async (username: string) => {
    const response = await axios.get(
      `http://${
        process.env.NODE_ENV === "development"
          ? process.env.REACT_APP_DEVELOPMENT_SERVER_DOMAIN
          : process.env.REACT_APP_PRODUCTION_SERVER_DOMAIN
      }:${
        process.env.NODE_ENV === "development"
          ? process.env.REACT_APP_DEVELOPMENT_SERVER_PORT
          : process.env.REACT_APP_PRODUCTION_SERVER_PORT
      }/api/auth/check/username/${username}`
    );
    return response.data.exist;
  };

  const emailExist = async (email: string) => {
    const response = await axios.get(
      `http://${
        process.env.NODE_ENV === "development"
          ? process.env.REACT_APP_DEVELOPMENT_SERVER_DOMAIN
          : process.env.REACT_APP_PRODUCTION_SERVER_DOMAIN
      }:${
        process.env.NODE_ENV === "development"
          ? process.env.REACT_APP_DEVELOPMENT_SERVER_PORT
          : process.env.REACT_APP_PRODUCTION_SERVER_PORT
      }/api/auth/check/email/${email}`
    );
    return response.data.exist;
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formInputValues: RegisterType = {
      firstName: formValues.firstName.value,
      lastName: formValues.lastName.value,
      userName: formValues.userName.value,
      email: formValues.email.value,
      password: formValues.password.value,
    };

    dispatch(createAccount(formInputValues)).then(({ payload }: any) => {
      navigate(`success/${payload}`);
    });
  };

  return (
    <>
      {isLoading ? <LoadingSpinner /> : ""}
      <Layout extraStyle={{ backgroundColor: "#c3beff" }}>
        <Box flexDirection="row">
          <Form onSubmit={onSubmitHandler}>
            <FormGroup extraStyle={{ width: "300px" }}>
              <FormControl>
                <Input
                  id="firstName"
                  placeholder="First name"
                  value={formValues.firstName.value}
                  onChange={debounceHandler(
                    (event: any) =>
                      setFormValues({
                        value: event.target.value,
                        type: event.target.id,
                      }),
                    debounceWaitTime
                  )}
                  isValid={formValues.firstName.isValid}
                  hasIcon={true}
                  fontAwesomeIcon={faUser}
                  iconColor="gray"
                />
                <InputError
                  isActive={formValues.firstName.isValid}
                  message={formValues.firstName.errorMessage}
                />
              </FormControl>
              <FormControl>
                <Input
                  id="lastName"
                  placeholder="Last name"
                  value={formValues.lastName.value}
                  isValid={formValues.lastName.isValid}
                  onChange={debounceHandler(
                    (event: any) =>
                      setFormValues({
                        value: event.target.value,
                        type: event.target.id,
                      }),
                    debounceWaitTime
                  )}
                  hasIcon={true}
                  fontAwesomeIcon={faUser}
                  iconColor="gray"
                />
                <InputError
                  isActive={formValues.lastName.isValid}
                  message={formValues.lastName.errorMessage}
                />
              </FormControl>
              <FormControl>
                <Input
                  id="userName"
                  value={formValues.userName.value}
                  placeholder="Username"
                  isValid={formValues.userName.isValid}
                  onChange={debounceHandler(async (event: any) => {
                    if (
                      event.target.value &&
                      (await usernameExist(event.target.value))
                    ) {
                      setFormValues({
                        value: event.target.value,
                        type: event.target.id,
                        valid: false,
                        customErrorMessage: "This username already exists",
                      });
                    } else {
                      setFormValues({
                        value: event.target.value,
                        type: event.target.id,
                        customErrorMessage:
                          initialFormInput.userName.errorMessage,
                      });
                    }
                  }, debounceWaitTime)}
                  hasIcon={true}
                  fontAwesomeIcon={faUser}
                  iconColor="gray"
                />

                <InputError
                  isActive={formValues.userName.isValid}
                  message={formValues.userName.errorMessage}
                />
              </FormControl>
              <FormControl>
                <Input
                  id="email"
                  placeholder="Email"
                  value={formValues.email.value}
                  isValid={formValues.email.isValid}
                  onChange={debounceHandler(async (event: any) => {
                    if (
                      event.target.value &&
                      (await emailExist(event.target.value))
                    ) {
                      setFormValues({
                        value: event.target.value,
                        type: event.target.id,
                        valid: false,
                        customErrorMessage: "This email already exists",
                      });
                    } else {
                      setFormValues({
                        value: event.target.value,
                        type: event.target.id,
                        customErrorMessage: initialFormInput.email.errorMessage,
                      });
                    }
                  }, debounceWaitTime)}
                  hasIcon={true}
                  fontAwesomeIcon={faAt}
                  iconColor="gray"
                />
                <InputError
                  isActive={formValues.email.isValid}
                  message={formValues.email.errorMessage}
                />
              </FormControl>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Password"
                  value={formValues.password.value}
                  isValid={formValues.password.isValid}
                  onChange={debounceHandler(
                    (event: any) =>
                      setFormValues({
                        value: event.target.value,
                        type: event.target.id,
                      }),
                    debounceWaitTime
                  )}
                  id="password"
                  hasIcon={true}
                  fontAwesomeIcon={faLock}
                  iconColor="gray"
                />
                <InputError
                  isActive={formValues.password.isValid}
                  message={formValues.password.errorMessage}
                />
              </FormControl>
              <Button
                size="small"
                variant="primary"
                type="submit"
                isDisabled={checkFormSubmission(formValues)}
                extraStyle={{ marginTop: "10px" }}
              >
                Create account
              </Button>
            </FormGroup>
          </Form>

          <RegisterImageLayout>
            <RegisterImage>
              <Heading
                type="h1"
                align="left"
                weight="bold"
                extraStyle={{ color: "white", lineHeight: "50px" }}
              >
                Lama Social.
              </Heading>
              <Text
                align="left"
                extraStyle={{
                  marginTop: "30px",
                  lineHeight: "20px",
                  color: "white",
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Maecenas eu nisi a nunc malesuada convallis. Pellentesque eu
                metus vel
              </Text>
              <Text
                align="left"
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
                justifyContent="start"
                alignItem="center"
                width="full"
              >
                <Href href="/#/login">
                  <Button size="small" variant="primary" type="button">
                    Login
                  </Button>
                </Href>
              </Container>
            </RegisterImage>
            <img src={registerImageUrl} alt="image" />
          </RegisterImageLayout>
        </Box>
      </Layout>
    </>
  );
};

export default Register;
