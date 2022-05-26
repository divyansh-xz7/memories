import {CREATE, UPDATE, DELETE, FETCH_ALL, LIKE, FETCH_BY_SEARCH, START_LOADING, STOP_LOADING, FETCH_POST, COMMENT} from '../constants/actiontypes';


export default (state={isLoading:true, posts:[]}, action)=>{
    switch (action.type) {
        case FETCH_ALL:
            return {...state, posts:action.payload.data, currentPage:action.payload.currentPage, numberOfPages:action.payload.numberOfPages};
        case CREATE:
            return {...state,posts:[...state.posts,action.payload]};
        case UPDATE:
        case LIKE:
            return {...state,posts:state.posts.map((post)=> post._id===action.payload._id?action.payload:post)};
        case DELETE:
            return {...state,posts:state.posts.filter((p)=>p._id!==action.payload)};
        case FETCH_BY_SEARCH:
            return {...state,posts:action.payload};
        case FETCH_POST:
            return {...state,post:action.payload};
        case START_LOADING:
            return {...state,isLoading:true};
        case STOP_LOADING:
            return {...state,isLoading:false};
        case COMMENT:
            return {
                ...state,
                posts:state.posts.map((post)=>{
                    if (post._id===action.payload._id)
                    return action.payload;
                    return post;
                })
            }
        default:
            return state;
    }
}