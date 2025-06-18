import axios from 'axios';

const handleLogout = async () => {
  try {
    await axios.delete('http://localhost:3000/api/users/logout'); 
    localStorage.removeItem('token'); 
    alert('Logged out successfully!');
   
    window.location.href = '/login'; 
  } catch (err) {
    console.error('Logout failed:', err);
    alert('Logout failed!');
  }
};
const Logout = () => {
  return (
    <div>
      <h2>Logout</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;