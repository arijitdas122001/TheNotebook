import React, { useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../context/notes/Notescontext';
import Alert from './Alert';
const Login = () => {
  const {setAlert,alerts}=useContext(MyContext);
    const host="http://localhost:5000"
  const [credentials,setcredentials]=useState({user:"",password:""});
   const navigate=useNavigate();
    const checklogin=async(e)=>{
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/authei`, {
            method:'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json"
            },
            body:JSON.stringify({user:credentials.user,password:credentials.password})
          });
          const details=await response.json();
        //   console.log(details) 
          if(details.success){
           navigate("/");
           setAlert('Successfully Logged In','success');
          }else{
            setAlert('Please Enter Correct Credentials','warning')
          }

    };
    const onchange=(e)=>{
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    };
  return (
    <>
    <Alert alert={alerts}/>
    <div className='container mt-5'>
      <form onSubmit={checklogin}>
  <div className="mb-3 w-50">
    <label htmlFor="exampleInputEmail1" className="form-label">User</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={credentials.user} name='user'  onChange={onchange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3 w-50">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" value={credentials.password} name='password'  onChange={onchange}/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
    </>
  )
}

export default Login
