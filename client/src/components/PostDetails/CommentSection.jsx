import React,{useState, useRef} from 'react';
import { Typography, TextField, Button, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { commentPost } from '../../actions/posts';

import useStyles from './styles'

const CommentSection = ({post}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [comments,setComments] = useState(post?.comments);
    const [comment,setComment] = useState('');
    const commentsRef = useRef();
    const user = JSON.parse(localStorage.getItem('profile'));

    const handleSubmit = async() => {
        const finalComment = `${user.result.name}: ${comment}`;
        const newComments = await dispatch(commentPost(finalComment,post._id));
        setComments(newComments);
        setComment('');
        commentsRef.current.scrollIntoView({behaviour:'smooth'});
    }

  return (
    <div>
        <div className={classes.commentsOuterContainer}>
            <div className={classes.commentsInnerContainer}>
                <Typography gutterBottom variant='h6'>Comments</Typography>
                {comments.map((c,i)=>(
                    <Typography gutterBottom variant='subtitle1' key={i}>
                        <strong>{c.split(': ')[0]}</strong>
                        {c.split(':')[1]}
                    </Typography>
                ))}
                <div ref={commentsRef}/>
            </div>
            {!user && (
                <Paper style={{width:'40%', display:'flex', justifyContent:'center',paddingTop:'12%'}} raised elevation={5}>
                    <Typography variant='body1' align='center'>Sign In to Comment on posts.</Typography>
                </Paper>
            )}
            {user?.result?.name && (
                <div style={{width:'40%'}}>
                    <Typography gutterBottom variant='h6'>Write a Comment</Typography>
                    <TextField multiline rows={3} fullWidth variant='outlined' label='Comment' value={comment} onChange={(e)=>setComment(e.target.value)}/>
                    <Button style={{marginTop:'10px'}} fullWidth disabled={!comment} onClick={handleSubmit} variant='contained' color='primary'>
                        Comment
                    </Button>

                </div>
            )}
        </div>
    </div>
  )
}

export default CommentSection