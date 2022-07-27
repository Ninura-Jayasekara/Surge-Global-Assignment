import React from  "react";
import './Home.css';

function Home() {

  // A basic home page for switch between roles

    return(
    <div>
     <div class = "pg">
        
        <div class="box2">
            <a href="/admin" class="button"><span>ADMIN</span></a>
            <a href="/dashboard" class="button"><span> STUDENT</span></a>
            
        </div>
     </div>
    </div>
  )
}

export default Home;