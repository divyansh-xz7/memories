import React,{useState, useEffect} from 'react';
import useStyles from './styles';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import {useDispatch, useSelector} from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import { useNavigate } from 'react-router-dom'; 

export default function Form({setCurrentId, currentId}) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [postData,setPostData]=useState({
      title:'',message:'',tags:'',selectedFile:''
    });
    const post = useSelector((state)=> currentId?state.posts.posts.find((p)=>p._id===currentId):null);
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(()=>{
      if (post) setPostData(post);
    },[post]);

    const clear =()=>{
      setCurrentId(null);
      setPostData({
        title:'',message:'',tags:'',selectedFile:''
      });
    }

    const handleSubmit =(e)=>{
      e.preventDefault();
      if (currentId)
      dispatch(updatePost(currentId,{...postData, name:user?.result?.name}));
      else
      dispatch(createPost({...postData, name:user?.result?.name},navigate));
      clear();
    }

    if (!user?.result?.name)
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant='h6' align='center'>
          Please login to create your own post and like other's posts.
        </Typography>
      </Paper>
    )

    return (
        <Paper className={classes.paper} elevation={6}>
          <form autoComplete="off" noValidate className={`${classes.form} ${classes.root}`} onSubmit={handleSubmit}>

            <Typography variant="h6">{currentId?'Editing':'Creating'} a Memory</Typography>

            <TextField variant='outlined' name='title' label='Title' fullWidth value={postData.title} onChange={(e)=>setPostData({...postData, title:e.target.value})}/>

            <TextField variant='outlined' name='message' label='Message' fullWidth multiline rows={4} value={postData.message} onChange={(e)=>setPostData({...postData, message:e.target.value})}/>

            <TextField variant='outlined' name='tags' label='Tags' fullWidth value={postData.tags} onChange={(e)=>setPostData({...postData, tags:e.target.value.split(',')})}/>

            <div className={classes.fileInput}>
              <FileBase type='file' multiple={false} onDone={({base64})=>setPostData({...postData,selectedFile:base64})}/>
            </div>

            <Button className={classes.buttonSubmit} size='large' fullWidth color='primary' type='submit' variant='contained'>Submit</Button>

            <Button size='small' fullWidth color='secondary' variant='contained' onClick={clear}>Clear</Button>


          </form>
        </Paper>
  )
}
