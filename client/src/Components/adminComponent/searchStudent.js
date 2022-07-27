import React, { useState, useEffect } from "react";
import axios from "axios";
import  Navbar  from './NavBar';


  //creting a function for search students
  export default function  SearchStudents() {
    
  
    const [id, setID] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [mobile, setMobile] = useState('');
    
    const [input, setInput] = useState('');
  
    
  
    const  loadStudentDetails = async () => {
      await axios.get(`http://localhost:8080/api/users/search?q=${input}`).then((res) => {

        
        setID(res.data.students.id);
        setFirstName(res.data.students.firstName);
        setLastName(res.data.students.lastName);
        setEmail(res.data.students.email);
        setDateOfBirth(res.data.students.dateOfBirth);
        setMobile(res.data.students.mobile);
        
        
      }).catch((err) => {
        alert(err.message)
      })
    };
  

  return (

    <div>

      <Navbar/>

      <div>
          <center>
              <h1 className='heading'>Administration</h1>
          </center>
          <center>
              <h2 className='heading'>Students</h2>
          </center>

      <div>

          <div class="row g-3 align-items-center">
              <div>
                  <div class="col-auto">
                      <label for="input"  ><strong>Search</strong></label>
                  </div>
              </div>
          <div>
          <div class="col-auto">
              <input type="text" id="input" class="form-control" 
                minLength={6} maxLength={6} value={input}  placeholder="search here..." required 
                onChange={(e)=>{

                setInput(e.target.value);

                <br></br>

              }} />

          </div>
          </div>

            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button class="btn btn-primary me-md-2" type="submit" onClick={loadStudentDetails}>Search Student</button>
            </div>
            
          </div>

          <table class="table table-striped table-light table table-hover">
            <tbody>
                <tr>
                  <td>ID: </td>
                  <td>{id}</td>
                </tr>
                <tr>
                  <td>First NAME    :</td>
                  <td>{firstName}</td>
                </tr>
                <tr>
                  <td>Last Name    :</td>
                  <td>{lastName}</td>
                </tr>
                <tr>
                  <td>Email      :</td>
                  <td>{email}</td>
                </tr>
                <tr>
                  <td>Date of birth      :</td>
                  <td>{dateOfBirth}</td>
                </tr>
                <tr>
                  <td>Mobile      :</td>
                  <td>{mobile}</td>
                </tr>
                
            </tbody>   
          </table>     
        </div>
      </div>
  </div>
  );
}


