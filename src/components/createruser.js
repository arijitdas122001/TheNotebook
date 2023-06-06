import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../context/notes/Notescontext';
import Alert from './Alert';
const Createuser = () => {
   const {alerts,setAlert}=useContext(MyContext);
    const host="http://localhost:5000"
    const [details,setdetails]=useState({user:"",password:"",repassword:""});
   const navigate=useNavigate();
    const submitform=async(e)=>{
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/signup`, {
            method:'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
              "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0Yjk2ZTQ5N2YzMTVmYTU1OTEyZTc2In0sImlhdCI6MTY4MjY3NTQyOX0.I1uDnE1dZ2OV9XiYT8LLmUFIF1r_Sp8J2SMTzeM8xyM"
            },
            body:JSON.stringify({user:details.user,password:details.password})
          });
       const temp=await response.json();
      //  console.log(details.repassword);
       if(temp.success===true && details.password===details.repassword){
        navigate('/');
        setAlert("Successfully Created An Account","success");
       }else{
       setAlert("Please Fill With Correct Credentianls","danger");
       }
    };
    const onchange=(e)=>{
     setdetails({...details,[e.target.name]:e.target.value})
    };
  return (
    <div>
   <Alert alert={alerts}/>
    <form onSubmit={submitform}>
        <div className="mb-3">
  <label htmlFor="formGroupExampleInput" className="form-label">Example label</label>
  <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Enter The UserName(this is will be your userId)" onChange={onchange} name='user' value={details.user}/>
</div>
<div className="mb-3">
  <label htmlFor="formGroupExampleInput2" className="form-label">Another label</label>
  <input type="password" className="form-control" id="formGroupExampleInput2" placeholder="Enter the Password" onChange={onchange} name='password' value={details.password}/>
</div>
<div className="mb-3">
  <label htmlFor="formGroupExampleInput3" className="form-label">Another label</label>
  <input type="password" className="form-control" id="formGroupExampleInput3" placeholder="Re Enter Your Password" onChange={onchange} name='repassword' value={details.repassword}/>
</div>
<button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Createuser
