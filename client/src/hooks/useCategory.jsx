import React, { useEffect, useState } from 'react';

const useCategory = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  const getAllCategory = async () => {
    try {
      const response = await fetch('http://localhost:7000/api/v1/category/get-category/');
      
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }

      const data = await response.json();
      setCategories(data.category || []);
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return { categories, error };
};

export default useCategory;
