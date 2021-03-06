import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { loginUser } from "./services/authorization";
import van from "./images/van.jpg";
import {
  Body,
  ColoredBackgroundHeader,
  LeftColumnHeader,
  LoginLeft,
  LoginRight,
  Image,
  Label,
  Input,
  Container,
  TransparentButton,
  FullButton,
  Error
} from "./styles";

export const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorText, setErrorText] = useState(false);
  const history = useHistory();

  const handleLoginUser = async event => {
    event.preventDefault();
    const response = await loginUser(email, password);
    if (response.success) {
      history.push("/sessions");
      console.log(response.success);

      return;
    }
    setErrorText(true);
  };

  return (
    <Body>
      <Container>
        <LoginLeft>
          <p>Welcome back!</p>
          <LeftColumnHeader>Login to your account</LeftColumnHeader>
          <Label>Email</Label>
          <Input
            type="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
          ></Input>
          <Label>Password</Label>
          <Input
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          ></Input>
          <FullButton onClick={event => handleLoginUser(event)}>Login</FullButton>
          {errorText && <Error>User not found, access forbidden</Error>}
        </LoginLeft>
        <LoginRight>
          <Image src={van} />
          <ColoredBackgroundHeader>Still not a member?</ColoredBackgroundHeader>
          <TransparentButton onClick={() => history.push("/register")}>
            Sign up for an account
          </TransparentButton>
        </LoginRight>
      </Container>
    </Body>
  );
};
