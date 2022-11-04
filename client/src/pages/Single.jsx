import React, {useState, useEffect} from 'react';
import axiosClient from '../api/axios.js';
import moment from 'moment';
import Edit from '../img/edit.png';
import Delete from '../img/delete.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Menu from '../components/Menu';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';


function Single() {

  const [post, setPost] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const postId = location.pathname.split('/')[2];
console.log(post)
  const {currentUser} = useContext(AuthContext);

  useEffect (()=> {
    const fetchdata = async ()=> {
      try {
        const res = await axiosClient.get(`/api/posts/${postId}`);
        setPost(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchdata();
  },[postId])

  const handleDelete = async ()=>{
   try {
    await axiosClient.delete(`/api/posts/${postId}`);
    navigate("/")
   } catch (error) {
    console.log(error);
   }
  }
  

  return (
    <div className='single'>
      <div className='single__content'>
          {/* <img className="single__content-img"src="https://media-cldnry.s-nbcnews.com/image/upload/newscms/2021_14/1699325/fruits-peel-pit-watermelon-kb-main-210408.jpg" alt="post_image" /> */}
          <img className="single__content-img" src={`../upload/${post?.img}`} alt="postImage"/>
       <div className="single__content-user">
          {/* <img className="single__content-avatar" src="https://media.istockphoto.com/vectors/default-avatar-photo-placeholder-icon-grey-profile-picture-business-vector-id1327592449?b=1&k=20&m=1327592449&s=170667a&w=0&h=19OfW-Ja5QoGQ7YXaHFrTKLA1Ewv_apjr7Fsz8xQ5TM=" alt="avatar" /> */}
          {post.userImg && (
            <img className="single__content-avatar" src={post.userImg} alt="userImage"/>
          )}
          <div className="single__content-info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          { currentUser.username === post.username && (
            <div className="single__edit">
            <Link to={`/write?edit=${postId}`} state = {post}>
              <img className="single__edit-img" src={Edit} alt="edit" />
            </Link>
            <Link>
            <img className="single__edit-img" src={Delete} alt="delete" onClick={handleDelete} />
            </Link>   
          </div>
          )}
          
       </div>
       <h1>{post.title}</h1>
       <p>{post.desc}</p>
      </div>
      <Menu cat={post.cat}/>
      </div>
  )
}

export default Single