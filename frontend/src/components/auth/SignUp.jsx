import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import clsx from "clsx";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(20),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  text: {
    marginBottom: theme.spacing(3),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const SignUp = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [passwordValues, setPasswordValues] = useState({ showPassword: false });
  const [password_confValues, setPassword_confValues] = useState({
    showPassword: false,
  });
  const history = useHistory();

  const handleClickShowPassword = () => {
    setPasswordValues({
      ...passwordValues,
      showPassword: !passwordValues.showPassword,
    });
  };

  const handleClickShowPassword_conf = () => {
    setPassword_confValues({
      ...password_confValues,
      showPassword: !password_confValues.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseDownPassword_conf = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios({
      method: "POST",
      url: "http://localhost:8000/auth",
      data: {
        email: email,
        password: password,
        password_confirmation: password_confirmation,
      },
    }).then((response) => {
      console.log(response);
      localStorage.setItem(
        "user",
        JSON.stringify({
          "access-token": response.headers["access-token"],
          client: response.headers["client"],
          uid: response.data.data.uid,
        })
      );
      history.push("/community");
    });
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Card className={classes.paper}>
        <CardContent>
          <Typography component="h1" variant="h4">
            Signup
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              id="standard-password-input"
              label="Email"
              type="Email"
              autoComplete="current-email"
              fullWidth
              className={classes.text}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <FormControl
              className={clsx(classes.margin, classes.textField)}
              fullWidth
              className={classes.text}
            >
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                id="standard-adornment-password"
                type={passwordValues.showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {passwordValues.showPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl
              className={clsx(classes.margin, classes.textField)}
              fullWidth
              className={classes.text}
            >
              <InputLabel htmlFor="standard-adornment-password">
                Password Confirmation
              </InputLabel>
              <Input
                id="standard-adornment-password"
                type={password_confValues.showPassword ? "text" : "password"}
                value={password_confirmation}
                onChange={(event) =>
                  setPassword_confirmation(event.target.value)
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword_conf}
                      onMouseDown={handleMouseDownPassword_conf}
                    >
                      {password_confValues.showPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <CardActions>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
              >
                Login
              </Button>
            </CardActions>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};
