import * as api from '../api/index.js';
import {AUTH} from '../constants/actiontypes';

export const signin = (formData, navigate) => async(dispatch) => {
    try {
        const res = await api.signin(formData);
        console.log(res);
        if(res?.data?.message)
        {
            alert(res.data.message);
        }
        else{
            dispatch({type:AUTH, data:res.data});
            navigate('/');
        }
    } catch (error) {
        console.log(error.response.message);
        console.log(error);
    }
};

export const signup = (formData, navigate) => async(dispatch) => {
    try {
        const {data} = await api.signup(formData);
        dispatch({type:AUTH, data});
        navigate('/');
    } catch (error) {
        console.log(error);
    }
}