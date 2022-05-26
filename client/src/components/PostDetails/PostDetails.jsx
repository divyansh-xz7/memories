import React from 'react';
import { useEffect } from 'react';
import {Paper , Typography, CircularProgress, Divider, Grid, CardMedia, Card} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {useParams, useNavigate} from 'react-router-dom';

import {getPost, getPostsBySearch} from '../../actions/posts';

import useStyles from './styles';
import CommentSection from './CommentSection';

const PostDetails = () => {
  const {post, posts, isLoading} = useSelector((state)=>state.posts);
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {id} = useParams();

  useEffect(()=>{
    dispatch(getPost(id));
  },[id]);

  useEffect(()=>{
    if(post)
    dispatch(getPostsBySearch({search:'none', tags:post?.tags.join(',')}))
  },[post])

  if(!post) return null;

  if (isLoading){
    return (
      <Paper className={classes.loadingPaper} elevation={6}>
        <CircularProgress size="7em"/>
      </Paper>
    )
  }

  let recommendedPosts = posts.filter(({_id})=>_id!==post._id);
  recommendedPosts = recommendedPosts.sort((a,b)=>b.likes.length-a.likes.length);
  
  const openPost = (id) => navigate(`/posts/${id}`);

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
            <CommentSection post={post}/>
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </div>
      </div>
      {
        recommendedPosts.length && (
          <div className={classes.section}>
            <Typography gutterBottom variant='h5'><strong>Similar Posts you might like :</strong></Typography>
            <div className={classes.recommendedPosts}>
              {
              recommendedPosts.slice(0,5).map(({ title, name, message, likes, selectedFile, _id })=>(
                <Paper className={classes.recommend} raised elevation={4}>

                <div style={{margin:'10px',cursor:'pointer'}} onClick={()=>openPost(_id)} key={_id}>
                  <img src={selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} style={{borderRadius:'10px'}} width="100%" />
                  <Typography gutterBottom variant="h6" >{title}</Typography>
                  <Typography gutterBottom variant="subtitle2">{name}</Typography>
                  <Typography gutterBottom variant="subtitle2">{message.length>100?`${message.slice(0,100)} ...`:message}</Typography>
                  <Typography gutterBottom variant="subtitle2" >Likes: {likes.length}</Typography>
                </div>
                </Paper>
              ))}
            </div>
          </div>
        )
      }
    </Paper>
  )
}

export default PostDetails