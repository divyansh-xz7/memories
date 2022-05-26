import React, {useState} from 'react';
import { Container, Avatar, Button, Paper, Grid, Typography } from '@material-ui/core';
import {GoogleLogin} from 'react-google-login';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import Icon from './icon';
import {AUTH} from './../../constants/actiontypes';

import {signup, signin} from './../../actions/auth';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const classes = useStyles();
    const [isSignUp,setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const handleShowPassword = () => setShowPassword((prevShowPassword)=>!prevShowPassword);

    const handleSubmit = (e) =>{
        e.preventDefault();
        if (isSignUp)
        dispatch(signup(formData, history));
        else
        dispatch(signin(formData, history));
    }
    const handleChange = (e) =>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }
    const switchMode = () =>{
        setIsSignUp((old)=>!old);
        handleShowPassword();
    }
    const googleSuccess = async (res) =>{
        const result = res?.profileObj;
        const token = res?.tokenId;
        // console.log(res);
        // console.log({result});
        // console.log({token});

        try {
            dispatch({type:AUTH, data:{result,token}});
            history('/');
        } catch (error) {
            console.log(error)
        }

    }
    const googleFailure = () => alert('Google Sign In failed...Try Again Later!');


  return (
    <Container component='main' maxWidth='xs'>
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography variant='h5'>
                {isSignUp?'Sign Up':'Sign In'}
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {isSignUp && (
                    <>
                    <Input name="firstName" label='First Name' autoFocus half handleChange={handleChange}/>
                    <Input name="lastName" label='Last Name' autoFocus half handleChange={handleChange}/>
                    </>
                    )}
                    <Input name='email' label='Email Address' handleChange={handleChange} type='email'/>
                    <Input name='password' label='Password' handleChange={handleChange} type={showPassword?"text":"password"} handleShowPassword={handleShowPassword} />
                    {isSignUp && <Input name='confirmPassword' label='Repeat Password' type='password' handleChange={handleChange} />}
                </Grid>
                <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                    {
                        isSignUp?"Sign Up":"Sign In"
                    }
                </Button>
                <GoogleLogin 
                    clientId='826907645940-614nk3nfsqj18scesj9t05udj22eoicp.apps.googleusercontent.com' 
                    render={(renderProps)=>(
                        <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} variant='contained' startIcon={<Icon/>}>
                            Sign In with Google
                        </Button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy='single_host_origin'
                />
                <Grid container justifyContent='flex-end'>
                    <Grid item>
                        <Button onClick={switchMode}>
                            {isSignUp?"Already have an Account? Sign In":"I don't have an account? Sign Up"}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    </Container>
  )
}

export default Auth