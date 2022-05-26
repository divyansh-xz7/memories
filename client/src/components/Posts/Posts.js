import React from 'react';
import Post from './Post/Post';
import useStyles from './styles';
import {useSelector} from 'react-redux';
import {Grid , CircularProgress} from '@material-ui/core';

export default function Posts({setCurrentId}) {
  const {posts, isLoading} = useSelector((state)=>state.posts);
  const classes = useStyles();

  if (!posts?.length && !isLoading)
  return ('No posts');
  
  return (
    <>
    {isLoading?<CircularProgress/>:
    <Grid container className={classes.container} spacing={3} alignItems='stretch' >
      {
        posts.map((post)=>(
          <Grid item key={post._id} xs={12} sm={12} md={6} lg={4}><Post post={post} setCurrentId={setCurrentId} /></Grid>
        ))
      }
    </Grid>
    }
    </>
  ) 
}
