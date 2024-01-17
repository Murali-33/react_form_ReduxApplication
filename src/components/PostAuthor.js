import { useSelector } from 'react-redux';
import {selectAllUsers} from '../feactureSlices/userSlice';


import React from 'react';

const  PostAuthor =({userId}) => {
  const usersData = useSelector(selectAllUsers);
   const author = usersData.find(user => user.id === userId)
  return <span>by {author ? author.name : "Unknow user"}</span>
}

export default PostAuthor
