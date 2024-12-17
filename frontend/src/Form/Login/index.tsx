import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import React, {useState} from "react";
import Button from "@mui/material/Button";
import {login} from "../../fetchers/http";

type Props = {
  setPage: Function;
  setConfig: Function;
}

const Login = ({setPage, setConfig}: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const updateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  const updatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }
  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }
  const isValid = () => validateEmail(email) && password.length > 2;
  const handleLogin = () => login({email, password}).then((config) => {
    setConfig(config);
    setPage(2);
  });

  return  (
    <>
      <h4>Login</h4>
      <Box sx={{maxWidth: 600}}>
        <Card variant="elevation" sx={{padding: 2, margin: 1}}>
          <TextField onChange={updateEmail} sx={{marginRight: 3, marginBottom: 3}} label="Email" value={email} type={'email'} variant="outlined" />
          <TextField onChange={updatePassword} label="Password" value={password} type={'password'} variant="outlined" />
          <div>
            <Button disabled={!isValid()} onClick={handleLogin} size={'large'} variant="contained" color="primary">Login</Button>
          </div>
        </Card>
      </Box>
    </>

  )
}

export default Login
