import React, {useState, useEffect} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { stripHtml } from "string-strip-html";
import axiosClient from '../api/axios';
import moment from "moment";

const Write = () => {
  const {state, search} = useLocation();
  const navigate = useNavigate();

  const [value, setValue] = useState(state?.title || "");
  const [title, setTitle] = useState(state?.desc || "");
  const [selectedFile, setSelectedFile] = useState(null);
  const [cat, setCat] = useState (state?.cat || "");


  useEffect(()=>{
    if(state) {
      setValue(state?.desc)
      setTitle(state?.title)
      setCat(state?.cat)
    };
    if(!state){
      setValue('')
      setTitle('')
      setCat('')
    }
  },[search, state])

  

 const handleChange = (e) => {
    setSelectedFile(e.target.files[0])
  }

  const upload = async() => {
    let formData = new FormData();
    formData.append('file', selectedFile);
      
    try {
      const config = {
         headers: {
          'Content-Type': 'multipart/form-data',
         }
      }
      const res = await axiosClient.post('/api/upload', formData, config);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  
  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();
    const { result } = stripHtml(value, {});

    try {
      state
        ? await axiosClient.put(`/api/posts/${state.id}`, {
            title,
            desc: result,
            cat,
            img: selectedFile ? imgUrl : "",
          })
        : await axiosClient.post(`/api/posts/`, {
            title,
            desc: result,
            cat,
            img: selectedFile ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
          navigate("/")
    } catch (err) {
      console.log(err);
    }

  }

  return (
    <div className='write' >
      <div className="write__content">
        <input className="write__content-input" type="text" placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} />
        <div className="editorContainer">
        <ReactQuill className="editorContainer__editor" theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
      <div className="write__menu">
        <div className="write__menu-item">
          <h1>Publish</h1>
          <span>
            <b>Status:</b> Draft
          </span>
          <span>
            <b>Visability:</b> Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name=""
            accept='image/*, .jpg, .png'
            onChange={handleChange}
          />
          <label className="file" htmlFor="file" >
            Upload Image
          </label>
          {selectedFile && (<div>Added file: <b>{selectedFile.name}</b></div> )}
          <div className="write__btn-block">
            <button className='write__btn' >Save as a draft</button>
            <button className='write__btn' onClick={handleClick} >Publish</button>
          </div>
        </div>
        <div className="write__menu-item">
          <h1>Category</h1>
          <div className="write__menu-inputs">
              <div className="write__menu-input">
               <input type="radio" checked={cat === "art"} name="cat" value="art" id="art" onChange={e => setCat(e.target.value)}/>
              <label htmlFor="art">Art</label>
              </div>
               <div className="write__menu-input">
              <input type="radio" checked={cat === "scince"} name="cat" value="scince" id="scince" onChange={e => setCat(e.target.value)}/>
              <label htmlFor="scince">Scince</label>
              </div>
              <div className="write__menu-input">
              <input type="radio" checked={cat === "technology"} name="cat" value="technology" id="technology" onChange={e => setCat(e.target.value)}/>
              <label htmlFor="technology">Technology</label>
              </div>
              <div className="write__menu-input">
              <input type="radio" checked={cat === "cinema"} name="cat" value="cinema" id="cinema" onChange={e => setCat(e.target.value)}/>
              <label htmlFor="cinema">Cinema</label>
              </div>
              <div className="write__menu-input">
              <input type="radio" checked={cat === "design"} name="cat" value="design" id="design" onChange={e => setCat(e.target.value)}/>
              <label htmlFor="design">Design</label>
              </div>
              <div className="write__menu-input">
              <input type="radio" checked={cat === "food"} name="cat" value="food" id="food" onChange={e => setCat(e.target.value)}/>
              <label htmlFor="food">Food</label>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Write