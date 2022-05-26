import axios from 'axios';

const baseurl = "https://memories-div.herokuapp.com";
const API = axios.create({baseURL:baseurl});

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile'))
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    return req;
})

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likepost`);
export const commentPost = (comment,id) => API.post(`/posts/${id}/commentpost`,{comment});

export const signin = (formData)=> API.post('/user/signin',formData);
export const signup = (formData)=> API.post('/user/signup',formData);