import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you are using React Router

function Logout() {
  const history = useNavigate();

  useEffect(() => {
    // Remove userId from local storage
    localStorage.removeItem('userId');
    // Redirect to login page or any other desired page
    history('/login');
  }, [history]);

  return null; // Since there's no content to render in the Logout component
}

export default Logout;
