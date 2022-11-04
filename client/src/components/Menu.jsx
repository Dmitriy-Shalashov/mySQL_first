import React, {useState, useEffect} from 'react';
import axiosClient from '../api/axios.js';

function Menu({cat}) {

  const [posts, setPosts] = useState([]);

  useEffect (()=> {
    const fetchdata = async ()=> {
      try {
        const res = await axiosClient.get(`/api/posts/?cat=${cat}`);
        setPosts(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchdata();
  },[cat])

  //  const posts = [
  //     {
  //       id: 1,
  //       title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //       desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //       img: "https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //     },
  //     {
  //       id: 2,
  //       title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //       desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //       img: "https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //     },
  //     {
  //       id: 3,
  //       title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //       desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //       img: "https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //     },
  //     {
  //       id: 4,
  //       title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //       desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //       img: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //     },
  //   ];
  return (
    <div className='single__menu' >
      <h3>Other posts you may like</h3>
      {posts.map(post => (
         <div className="single__menu-post" key={post.id}>
            <img className="single__menu-img" src={`../upload/${post?.img}`} alt="post-img" />
            <h4>{post.title}</h4>
            <button className="single__menu-btn">Read More</button>
         </div>
      ))}
    </div>
  )
}

export default Menu