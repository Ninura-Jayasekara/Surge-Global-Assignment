import React from  "react";
import './Home.css';

function Home() {
    return(
    <>
     <div class = "pg">
        
        <div class="box2">
            <a href="/admin" class="button"><span>ADMIN</span></a>
            <a href="/dashboard" class="button"><span> STUDENT</span></a>
            
        </div>
     </div>
    </>
  )
}

export default Home;