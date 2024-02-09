import React from 'react';
import GoogleLogin from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logo-white.png';
import { useState } from "react";
import { client } from '../client';
import { v4 as uuidv4 } from 'uuid';
const Login = () => {
  const navigate = useNavigate();
  const[error,setError]=useState({email:"",password:""})
  const[Data,setData]=useState({email:"",password:""})
  
  const handleEmail=(e)=>{
    const value=e.target.value;
  const name =e.target.name;
  setData({...Data,[name]:value})
  if(value.trim()==""){
   setError({...error,email:"username must not be empty"})
  }else{
    setError({...error,email:""})
  }
  
  }
  
  const handlePassword=(e)=>{
    const value=e.target.value;
  const name =e.target.name;
  setData({...Data,[name]:value})
  if(value.trim()==""){
   setError({...error,password:"password must not be empty"})
  }else{
    setError({...error,password:""})
  }
  
  }
  const unique=uuidv4()
  const  handleSubmit=async (e)=>{
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify({ name:Data.email, googleId:unique, imageUrl:"/imageurl"+Data.password })); 
    const doc = {
      _id: unique,
      _type: 'user',
      userName: Data.email,
      image: "/imageurl"+Data.password,
    };
    client.createIfNotExists(doc).then(() => {
      navigate('/', { replace: true });
    });
  
  
  }

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className=" relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0    bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" />
          </div>

          <div className="shadow-2xl">
          <form className="my-20 w-full max-w-sm mx-auto"  onSubmit={handleSubmit}>
 
 <div className="mb-5">
   <label for="username-success" className="block mb-2 text-sm font-medium text-dark-700 dark:text-green-500">Username</label>
   <input type="text" onChange={handleEmail} value={Data.email} name="email" className="bg-white-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400" placeholder="username"/>
   {error.email==="username must not be empty"?<p className="mt-2 text-sm text-green-600 dark:text-green-500"><span className="font-medium">Alright!</span> Username available!</p>:""}
  </div>
  <div className="mb-5">
   <label for="username-success" className="block mb-2 text-sm font-medium text-dark-700 dark:text-green-500">Password</label>
   <input type="password" onChange={handlePassword} value={Data.password} name="password" className="bg-white-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400" placeholder="password"/>
   {error.password==="password must not be empty"?<p className="mt-2 text-sm text-green-600 dark:text-green-500"><span className="font-medium">Alright!</span> Username available!</p>:""}
  </div>

 <div className="flex items-center justify-between">
     <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
      Create Account
     </button>
     <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
       User? Login
     </a>
   </div>
</form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
