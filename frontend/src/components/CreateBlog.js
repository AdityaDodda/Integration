// src/components/CreateBlog.js
import React, { useState } from 'react';
import ReactQuill from 'react-quill';  // Importing Quill editor
import 'react-quill/dist/quill.snow.css';  // Importing Quill's default theme CSS
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {
  const [blogData, setBlogData] = useState({
    title: '',
    sections: [{ sectionTitle: '', sectionContent: '' }],
    imageUrl: '',
  });

  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedSections = [...blogData.sections];
    updatedSections[index][name] = value;
    setBlogData({ ...blogData, sections: updatedSections });
  };

  const handleEditorChange = (content, delta, source, editor) => {
    const updatedSections = [...blogData.sections];
    updatedSections[0].sectionContent = content; // Assuming there's only one section
    setBlogData({ ...blogData, sections: updatedSections });
  };

  const handleAddSection = () => {
    setBlogData({
      ...blogData,
      sections: [
        ...blogData.sections,
        { sectionTitle: '', sectionContent: '' },
      ],
    });
  };

  const handleRemoveSection = (index) => {
    const updatedSections = [...blogData.sections];
    updatedSections.splice(index, 1);
    setBlogData({ ...blogData, sections: updatedSections });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make sure the sections and title are valid
      if (!blogData.title || !blogData.sections[0].sectionTitle || !blogData.sections[0].sectionContent) {
        alert('Please fill in all fields!');
        return;
      }

      const response = await axios.post('http://localhost:5000/api/blogs', blogData);
      console.log('Blog created successfully:', response.data);
      navigate('/blogs');
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  return (
    <div>
      <h1>Create a New Blog</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="title"
            value={blogData.title}
            onChange={(e) => setBlogData({ ...blogData, title: e.target.value })}
            placeholder="Blog Title"
            required
          />
        </div>

        <div>
          <label>Sections</label>
          {blogData.sections.map((section, index) => (
            <div key={index}>
              <input
                type="text"
                name="sectionTitle"
                value={section.sectionTitle}
                onChange={(e) => handleChange(e, index)}
                placeholder={`Section ${index + 1} Title`}
                required
              />
              <ReactQuill
                value={section.sectionContent}
                onChange={handleEditorChange}
                modules={CreateBlog.modules} // Add editor modules
                theme="snow"
                placeholder={`Write your section ${index + 1} content here`}
              />
              <button
                type="button"
                onClick={() => handleRemoveSection(index)}
              >
                Remove Section
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddSection}>
            Add Section
          </button>
        </div>

        <div>
          <input
            type="url"
            name="imageUrl"
            value={blogData.imageUrl}
            onChange={(e) => setBlogData({ ...blogData, imageUrl: e.target.value })}
            placeholder="Image URL (Optional)"
          />
        </div>

        <button type="submit">Create Blog</button>
      </form>
    </div>
  );
};

// Add some Quill editor configurations
CreateBlog.modules = {
  toolbar: [
    [{ 'header': '1'}, { 'header': '2'}, { 'font': [] }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['bold', 'italic', 'underline'],
    [{ 'align': [] }],
    ['link'],
    ['image'],
    ['blockquote'],
    ['code-block'],
  ],
};

export default CreateBlog;