import './App.css';
import PostList from './components/PostList';
import AddPostForm from './components/AddPostForm';


function App() {
  return (
      <main className='App'>
        <AddPostForm/>
        <PostList/>
      </main>
  );
}

export default App;
