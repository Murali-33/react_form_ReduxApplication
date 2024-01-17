import React, { useState } from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import { postAdded } from '../feactureSlices/postSlice';
import {selectAllUsers} from '../feactureSlices/userSlice';



function AddPostForm() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId,setUserId] = useState("");
  const canSave = Boolean(title) && Boolean(content) && Boolean(userId);

  const saveFormData = () => {
    if (title && content) {
      dispatch(postAdded(title,content,userId));
    }
    setContent('');
    setTitle('');
  };

const usersData = useSelector(selectAllUsers);
 const renderUser = usersData.map((users)=>{
     return <option key={users.id} value={users.id}>
       {users.name}
     </option>
 })
  return (
    <div>
      <h4>Add The New Post</h4>
      <article>
        <form>
          <label htmlFor="postTitle">Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          <label htmlFor="postAuthor">Users:</label>
          <select name="postAuthor" id="postAuthor" value={userId} onChange={(e)=>setUserId(e.target.value)}>
            <option value="" defaultChecked>Select</option>
            {renderUser}
          </select>
          <label htmlFor="postContent">Content:</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} name="postContent" id="postContent" cols="20" rows="2"></textarea>
          <button type='button' disabled={!canSave} onClick={saveFormData}>Save Post</button>
        </form>
      </article>
    </div>
  );
}

export default AddPostForm;
