/* React */
import React, { Reducer, useEffect, useReducer } from "react";

/* Components */
import Box from "../../components/Box/Box";
import Button from "../../components/Button/Button";
import Form from "../../components/Form/Form";
import FormControl from "../../components/FormControl/FormControl";
import FormGroup from "../../components/FormGroup/FormGroup";
import Layout from "../../components/Layout/Layout";
import Input from "../../components/Input/Input";
import Heading from "../../components/Heading/Heading";
import Text from "../../components/Text/Text";
import Container from "../../components/Container/Container";
import InputError from "../../components/InputError/InputError";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Href from "../../components/Href/Href";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

/* Styles */
import {
  RegisterImage,
  RegisterImageLayout,
} from "../../styles/RegisterImage.styled";

/* Assets */
import registerImageUrl from "../../assets/register_image.jpeg";

/* Font awesome icons */
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import { regex } from "../../utils/regex";

/* Reducers */
import { Action, inputFormReducer } from "../../redux/reducers/register/form";

/* Utils */
import { debounceHandler, debounceWaitTime } from "../../utils/debounce";
import checkFormSubmission from "../../utils/checkFormSubmission";
import {
  errorMessageLogin,
  selectLoadingStatusLogin,
} from "../../utils/selectors";
import isAuth from "../../utils/isAuth";

/* Router */
import { useNavigate } from "react-router-dom";

/* Cookies */
import { useCookies } from "react-cookie";

/* Redux */
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store/store";
import { login } from "../../redux/reducers/login/loginSlice";

/* Models */
import { LoginInputFormType, LoginType } from "../../models/login";

const initialFormInput: LoginInputFormType = {
  email: {
    value: "",
    isValid: undefined,
    regex: new RegExp(regex.email),
    errorMessage: "Email Error message",
  },
  password: {
    value: "",
    isValid: undefined,
    regex: new RegExp(""),
    errorMessage: "Password error message",
  },
};

const Login = (): JSX.Element => {
  const errorMessage = useSelector(errorMessageLogin);
  const isLoading = useSelector(selectLoadingStatusLogin);
  const [token, setToken, removeToken] = useCookies(["access-token"]);
  const cookieToken = token["access-token"] || undefined;
  const navigate = useNavigate();
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

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formInputValues: LoginType = {
      email: formValues.email.value,
      password: formValues.password.value,
    };

    dispatch(login(formInputValues))
      .then((response: any) => {
        console.log(response);
        const { token } = response.payload.data;
        setToken("access-token", token, {
          path: "/",
        });
        navigate(`/`);
      })
      .catch((err: any) => console.log(err));
  };

  return (
    <>
      {isLoading ? <LoadingSpinner /> : ""}
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Maecenas eu nisi a nunc malesuada convallis. Pellentesque eu
                metus vel
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
                <Href href="/#/register">
                  <Button size="small" variant="primary" type="button">
                    Register
                  </Button>
                </Href>
              </Container>
            </RegisterImage>
            <img src={registerImageUrl} alt="image" />
          </RegisterImageLayout>
          <Form onSubmit={onSubmitHandler}>
            <FormGroup extraStyle={{ width: "300px" }}>
              <FormControl>
                <Input
                  id="email"
                  value={formValues.email}
                  hasIcon={true}
                  fontAwesomeIcon={faAt}
                  placeholder="Email"
                  isValid={formValues.email.isValid}
                  onChange={debounceHandler(
                    (event: any) =>
                      setFormValues({
                        value: event.target.value,
                        type: event.target.id,
                      }),
                    debounceWaitTime
                  )}
                  autoComplete="on"
                />
              </FormControl>
              <InputError
                isActive={formValues.email.isValid}
                message={formValues.email.errorMessage}
              />
            </FormGroup>
            <FormGroup extraStyle={{ width: "300px" }}>
              <FormControl>
                <Input
                  id="password"
                  value={formValues.password}
                  placeholder="Password"
                  isValid={formValues.password.isValid}
                  onChange={debounceHandler(
                    (event: any) =>
                      setFormValues({
                        value: event.target.value,
                        type: event.target.id,
                      }),
                    debounceWaitTime
                  )}
                  type="password"
                  hasIcon={true}
                  fontAwesomeIcon={faLock}
                  iconColor="gray"
                  autoComplete="on"
                />
                <InputError
                  isActive={formValues.password.isValid}
                  message={formValues.password.errorMessage}
                />
              </FormControl>
              <ErrorMessage message={errorMessage} />
              <Button
                size="small"
                variant="primary"
                type="submit"
                extraStyle={{ marginTop: "10px" }}
                isDisabled={checkFormSubmission(formValues)}
              >
                Log in
              </Button>
            </FormGroup>
          </Form>
        </Box>
      </Layout>
    </>
  );
};

export default Login;
