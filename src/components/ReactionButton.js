import {useDispatch} from 'react-redux';
import {reactionAdded} from '../feactureSlices/postSlice';
import React from 'react';

const reactEmojis ={
      thumsUp:"👍",
      wow:"😮",
      heart:"❤️",
      rocket:"🚀",
      coffee:"☕"
}



const ReactionButton =({post}) =>{
const dispatch = useDispatch();
const renderReaction = Object.entries(reactEmojis).map(([name,emoji])=>{
    return (
      <button key={name} type='button' className='reactionButton' onClick={()=> dispatch(reactionAdded({postId:post.id ,reaction:name}))}>
         {emoji} {post.reactions[name]}
      </button>
    )
})


  return (
    <div>
      {renderReaction}
    </div>
  )
}

export default ReactionButton
