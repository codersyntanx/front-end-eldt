// Import necessary libraries
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles for ReactQuill

const AddLessonForm = () => {
  // State to hold form data
  const [lessonData, setLessonData] = useState({
    lessonTitle: '',
    language: '',
    pages: [],
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLessonData({
      ...lessonData,
      [name]: value,
    });
  };

  // Handle adding a new page to the lesson
  const addPage = () => {
    setLessonData({
      ...lessonData,
      pages: [...lessonData.pages, { description: '', image: '' }],
    });
  };

  // Handle page description changes using ReactQuill
  const setDesc = (value, index) => {
    const updatedPages = [...lessonData.pages];
    updatedPages[index] = {
      ...updatedPages[index],
      description: value,
    };
    setLessonData({
      ...lessonData,
      pages: updatedPages,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make a PUT request to add the lesson
    const courseId = 'your_course_id'; // Replace with the actual course ID
    const response = await fetch(`/api/addLesson/${courseId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lessonData),
    });

    if (response.ok) {
      // Lesson added successfully
      console.log('Lesson added successfully');
    } else {
      // Handle errors
      const errorData = await response.json();
      console.error('Error adding lesson:', errorData.error);
    }
  };

  // Define Quill toolbar options
  const quillToolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                          // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],   // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean'],                                         // remove formatting button
  ];
  return (
    <div>
      <h2>Add Lesson</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Lesson Title:
          <input
            type="text"
            name="lessonTitle"
            value={lessonData.lessonTitle}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Language:
          <input
            type="text"
            name="language"
            value={lessonData.language}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <h3>Pages</h3>
        {lessonData.pages.map((page, index) => (
          <div key={index}>
            {/* Other input fields */}
            <label>
              Description:
              <ReactQuill
                theme="snow"
                value={page.description}
                onChange={(value) => setDesc(value, index)}
                modules={{ toolbar: quillToolbarOptions }}
                required
              />
            </label>
            <br />
          </div>
        ))}
        <button type="button" onClick={addPage}>
          Add Page
        </button>
        <br />
        <button type="submit">Add Lesson</button>
      </form>
    </div>
  );
};

export default AddLessonForm;