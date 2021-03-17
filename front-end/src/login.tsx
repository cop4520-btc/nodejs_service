import React, { useReducer, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';


import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Image from 'react-bootstrap/Image'
import './login.css'



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 500,
      margin: `${theme.spacing(0)} auto`
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1
    },
    header: {
      textAlign: 'center',
      background: '#212121',
      color: '#fff'
    },
    card: {
      marginTop: theme.spacing(10)
    }
  })
);

//state type

type State = {
  username: string,
  password:  string,
  isButtonDisabled: boolean,
  helperText: string,
  isError: boolean
};

const initialState:State = {
  username: '',
  password: '',
  isButtonDisabled: true,
  helperText: '',
  isError: false
};

type Action = { type: 'setUsername', payload: string }
  | { type: 'setPassword', payload: string }
  | { type: 'setIsButtonDisabled', payload: boolean }
  | { type: 'loginSuccess', payload: string }
  | { type: 'loginFailed', payload: string }
  | { type: 'setIsError', payload: boolean };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setUsername': 
      return {
        ...state,
        username: action.payload
      };
    case 'setPassword': 
      return {
        ...state,
        password: action.payload
      };
    case 'setIsButtonDisabled': 
      return {
        ...state,
        isButtonDisabled: action.payload
      };
    case 'loginSuccess': 
      return {
        ...state,
        helperText: action.payload,
        isError: false
      };
    case 'loginFailed': 
      return {
        ...state,
        helperText: action.payload,
        isError: true
      };
    case 'setIsError': 
      return {
        ...state,
        isError: action.payload
      };
  }
}

const Login = () => {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.username.trim() && state.password.trim()) {
     dispatch({
       type: 'setIsButtonDisabled',
       payload: false
     });
    } else {
      dispatch({
        type: 'setIsButtonDisabled',
        payload: true
      });
    }
  }, [state.username, state.password]);

  const handleLogin = () => {
    if (state.username === 'abc@email.com' && state.password === 'password') {
      dispatch({
        type: 'loginSuccess',
        payload: 'Login Successfully'
      });
    } else {
      dispatch({
        type: 'loginFailed',
        payload: 'Incorrect username or password'
      });
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.keyCode === 13 || event.which === 13) {
      state.isButtonDisabled || handleLogin();
    }
  };

  const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({
        type: 'setUsername',
        payload: event.target.value
      });
    };

  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({
        type: 'setPassword',
        payload: event.target.value
      });
    }
  return (
    <form className={classes.container+' abc'} noValidate autoComplete="off">
      <Card className={classes.card}>

	  	
	  	<Image src="data:image/png;base64,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" fluid />
        
		
		
		<CardContent>
          <div>






            <TextField
              error={state.isError}
              fullWidth
              id="username"
              type="email"
              label="Username"
              placeholder="Username"
              margin="normal"
              onChange={handleUsernameChange}
              onKeyPress={handleKeyPress}
            />
            <TextField
              error={state.isError}
              fullWidth
              id="password"
              type="password"
              label="Password"
              placeholder="Password"
              margin="normal"
              helperText={state.helperText}
              onChange={handlePasswordChange}
              onKeyPress={handleKeyPress}
            />
			<Link className="registerLink" id="registerLink" to="/register">Don't have an account? Sign Up</Link>
          </div>
        </CardContent>
        <CardActions>

          <Button
            variant="contained"
            size="large"
            color="secondary"
            className={classes.loginBtn}
            onClick={handleLogin}
            disabled={state.isButtonDisabled}>
            Login
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}



export default Login;
