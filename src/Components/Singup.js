// // import React from 'react'
// // import { Helmet } from 'react-helmet'

// // const SingUp = () => {
// //   return (
// //     <div>
// //         <Helmet><title>Quiz-Singup</title></Helmet>
// //         <h1>Welcome to Quiz SingUp</h1>
// //     </div>
// //   )
// // }

// // export default SingUp

// import React from 'react'
// import { useState } from 'react';
// import { Helmet } from 'react-helmet';
 
// export default function Form() {
 
//   // States for registration
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
 
//   // States for checking the errors
//   const [submitted, setSubmitted] = useState(false);
//   const [error, setError] = useState(false);
 
//   // Handling the name change
//   const handleName = (e) => {
//     setName(e.target.value);
//     setSubmitted(false);
//   };
 
//   // Handling the email change
//   const handleEmail = (e) => {
//     setEmail(e.target.value);
//     setSubmitted(false);
//   };
 
//   // Handling the password change
//   const handlePassword = (e) => {
//     setPassword(e.target.value);
//     setSubmitted(false);
//   };

// //   const handleOnSubmit = (e) => {
// //     e.preventDefault();
// //   }
 
//   // Handling the form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (name === '' || email === '' || password === '') {
//       setError(true);
//     } else {
//       setSubmitted(true);
//       setError(false);
//     }
//   };
 
//   // Showing success message
//   const successMessage = () => {
//     return (
//       <div>
//         <Helmet><title>Quiz-Signup</title></Helmet>
//         <div
//         className="success"
//         style={{
//           display: submitted ? '' : 'none',
//         }}>
//         <h1 style={{color:"green"}}>{name} you are successfully registered!!</h1>
//       </div>
//       </div>
//     );
//   };
 
//   // Showing error message if error is true
//   const errorMessage = () => {
//     return (
//       <div
//         className="error"
//         style={{
//           display: error ? '' : 'none',
//         }}>
//         <h1 style={{color:"red"}}>Please enter all the fields</h1>
//       </div>
//     );
//   };
 
//   return (
//     <div className="form">
//       <div>
//         <br/><br/>
//         <h1>User Registration</h1>
//       </div>
 
//       {/* Calling to the methods */}
//       <div className="messages">
//         {errorMessage()}
//         {successMessage()}
//       </div>
 
//       <form onSubmit={handleSubmit}>
//         {/* Labels and inputs for form data */}
//         <label className="label">Name</label>
//         <input onChange={handleName} className="input"
//           value={name} type="text" />
 
//         <label className="label">Email</label>
//         <input onChange={handleEmail} className="input"
//           value={email} type="email" />
 
//         <label className="label">Password</label>
//         <input onChange={handlePassword} className="input"
//           value={password} type="password" />

//         <label className="label">Confirm Password</label>
//         <input onChange={handlePassword} className="input"
//         value={password} type="password" />
 
//         <button className="btn" type="submit">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }

import React from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
  
function Singup() {
  const {register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = (data) => console.log(data);
    
  return (
    <>
    <Helmet><title>Quiz-Singup</title></Helmet>
      <p className="title">SignUp Form</p>
  
      <form className="App" onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("name")} placeholder="Enter Your Name"/>
        <input type="email" {...register("email", { required: true })} placeholder="Enter Your Email" />
        {errors.email && <span style={{ color: "red" }}>
        *Email* is mandatory </span>}
        <input type="password" {...register("password")} placeholder="Enter Password"/>
        <input type="password" {...register("password")} placeholder="Confirm Password"/>
        <input type={"submit"} style={{ backgroundColor: "#a1eafb" }}/>
      </form>
    </>
  );
}
export default Singup;