import React, { useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function CreateBlog() {
  const [title, setTitle] = useState('');
  const [sections, setSections] = useState([{ sectionTitle: '', sectionContent: '' }]);
  const [image, setImage] = useState(null);

  const addSection = () => setSections([...sections, { sectionTitle: '', sectionContent: '' }]);

  const handleChange = (index, field, value) => {
    const updatedSections = [...sections];
    updatedSections[index][field] = value;
    setSections(updatedSections);
  };

  const submitBlog = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('sections', JSON.stringify(sections));
    if (image) formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:5000/blogs', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Blog created successfully:', response.data);
      alert('Blog created successfully!');
    } catch (error) {
      console.error('Error creating blog:', error);
      alert('Failed to create blog.');
    }
  };

  return (
    <div>
      <h1>Create a Blog</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      {sections.map((section, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Section Title"
            value={section.sectionTitle}
            onChange={(e) => handleChange(index, 'sectionTitle', e.target.value)}
          />
          <ReactQuill
            value={section.sectionContent}
            onChange={(content) => handleChange(index, 'sectionContent', content)}
            theme="snow"
          />
        </div>
      ))}
      <button onClick={addSection}>Add Section</button>
      <button onClick={submitBlog}>Submit Blog</button>
    </div>
  );
}

export default CreateBlog;