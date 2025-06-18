import React from 'react';
import axios from 'axios';
const handleLogout = async () => {
  try {
    await axios.delete('http://localhost:3000/api/users/logout'); 
    alert('Logged out successfully!');
  
    window.location.href = '/register';
  } catch (err) {
    console.error('Logout failed:', err);
    alert('Logout failed!');
  }
};
export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">PMS</a>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-light" type="submit" onClick={handleLogout}>
              Logout
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
}
