// import React from 'react'
// import { Helmet } from 'react-helmet'

// const Login = () => {
//   return (
//     <div>
//         <Helmet><title>Quiz-Login</title></Helmet>
//         <h1>Welcome to Quiz Login</h1>
//     </div>
//   )
// }

// export default Login

import React from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";

  
function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const onSubmit = (data) => {
    const userData = JSON.parse(localStorage.getItem(data.email));
    if (userData) { // getItem can return actual value or null
      if (userData.password === data.password) {
        console.log(userData.name + " You Are Successfully Logged In");
      } else {
        console.log("Email or Password is not matching with our record");
      }
    } else {
      console.log("Email or Password is not matching with our record");
    }
  };
  return (
    <>
    <Helmet><title>Quiz-Login</title></Helmet>
      <p className="title">Login Form</p>
  
      <form className="App" onSubmit={handleSubmit(onSubmit)}>
        <input type="email" {...register("email", { required: true })} placeholder="Enter Your Email" />
        {errors.email && <span style={{ color: "red" }}>
         *Email* is mandatory </span>}
        <input type="password" {...register("password")} placeholder="Enter Your Password"/>
        <input type={"submit"} style={{ backgroundColor: "#a1eafb" }} />
      </form>
    </>
  );
}
export default Login;