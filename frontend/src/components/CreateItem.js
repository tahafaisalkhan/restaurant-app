import React, { useState } from 'react';
import axios from 'axios';
import { Navbar } from './navbar';

export const CreateMenuItem = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try 
    {
      const res = await axios.post('http://localhost:8000/menu/create', 
      {
        name,
        description,
        price
      });
      console.log(res.data);
      setName('');
      setDescription('');
      setPrice('');
      window.alert('Menu item created successfully!');
    } 
    catch (error) 
    {
      console.error(error);
      window.alert('Failed to create menu item.');
    }
  };
  

  return (
    <div>
      <Navbar />
      <h1>Create Menu Item</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={e => setName(e.target.value)} required />
        </label>
        <label>
          Description:
          <input type="text" value={description} onChange={e => setDescription(e.target.value)} required />
        </label>
        <label>
          Price:
          <input type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} required />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
