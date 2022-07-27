import React from  "react";


function Navbar() {
    return(
        <>

<nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">
    
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">

        <a class="nav-link active" aria-current="page" href="/admin">Admin</a>
        <a class="nav-link" href="/register">Create Student</a>
        <a class="nav-link" href="/search">Search</a>
        
      </div>
    </div>
  </div>
</nav>

</>
  )
}

export default Navbar;