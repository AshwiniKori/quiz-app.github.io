import * as React from 'react';
import { useNavigate } from 'react-router-dom';

const Hello = () => {
  const navigate = useNavigate();
  const handleClick = () => navigate('/home');

  return (
    <button type="button" onClick={handleClick}>
      Home
    </button>
  );
};

export default Hello;