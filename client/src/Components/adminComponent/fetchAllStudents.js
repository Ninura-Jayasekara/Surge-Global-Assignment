import React, {useState, useEffect} from "react";
import axios from "axios";
import  Navbar  from './NavBar';


//View  All students in database
export default function FetchAllStudents(){

    const [students, setStudents] = useState([]);

    //fetching all the students
    useEffect(() => {
    function getStudents() {
        axios.get("http://localhost:8080/api/users/fetch").then((res) => {
            setStudents(res.data);
            
        }).catch((error) => {
            alert(error.message);
        })
    }
    getStudents();


    }, [])
   

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
        <table className="table table-striped table-hover table-sm caption-top"  style={{  background: "#FFFFFF" }}>
            <thead>
                <tr className=" border-bottom: 1px solid #ddd">
                    <th className="text-center" scope="col">ID</th>
                    <th className="text-center" scope="col">First Name</th>
                    <th className="text-center" scope="col">Last Name</th>
                    <th className="text-center" scope="col">Email</th>
                    <th className="text-center" scope="col">Date Of Birth</th>
                    <th className="text-center" scope="col">Mobile</th>
                    
                </tr>
            </thead>


            <tbody>
            {students.map((students) => {
                    
                return (
                    <tr >
                        <td className="text-center" >{students.id}</td>
                        <td className="text-center">{students.firstName}</td>
                        <td className="text-center">{students.lastName}</td>
                        <td className="text-center">{students.email}</td>
                        <td className="text-center">{students.dateOfBirth}</td>
                        <td className="text-center">{students.mobile}</td>
                            
                    </tr>
                    );
                    
                })}
            </tbody>
             
        </table>
        <br></br>
    </div>

</div>
</div>


   );
}