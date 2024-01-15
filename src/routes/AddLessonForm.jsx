import React, { useState } from 'react';
import axios from 'axios';
import "./chapter.css"
const AddChapterForm = ({ courseId }) => {
  const [chapterData, setChapterData] = useState({
    pages: [
      {
        description: '',
        image: '',
        language: 'English', // Default language for the page
      },
    ],
  });

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    setChapterData((prevData) => {
      const updatedPages = [...prevData.pages];
      updatedPages[index] = {
        ...updatedPages[index],
        [name]: value,
      };
      return { ...prevData, pages: updatedPages };
    });
  };

  const handleAddPage = () => {
    setChapterData((prevData) => ({
      ...prevData,
      pages: [
        ...prevData.pages,
        {
          description: '',
          image: '',
          language: 'English',
        },
      ],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:3003/addChapter/65a4c6f18da1c1e2cb7621ac',
        {
          pages: chapterData.pages,
        }
      );

      alert('Chapter added successfully');
      console.log('Chapter added successfully:', response.data);
      // You can redirect or perform additional actions after successful chapter addition
    } catch (error) {
      console.error('Error adding chapter:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Chapter</h3>
      {chapterData.pages.map((page, index) => (
        <div key={index}>
          <label>
            Description:
            <textarea
              name="description"
              value={page.description}
              onChange={(e) => handleInputChange(e, index)}
            />
          </label>
          <label>
            Image:
            <input
              type="text"
              name="image"
              value={page.image}
              onChange={(e) => handleInputChange(e, index)}
            />
          </label>
          <label>
            Language:
            <select
              name="language"
              value={page.language}
              onChange={(e) => handleInputChange(e, index)}
            >
              {/* Options for languages */}
              <option value="English">English</option>
              {/* Add other languages as needed */}
            </select>
          </label>
        </div>
      ))}
      <button type="button" onClick={handleAddPage}>
        Add Page
      </button>
      <button type="submit">Add Chapter</button>
    </form>
  );
};

export default AddChapterForm;
