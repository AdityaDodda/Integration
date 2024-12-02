import React, { useState } from "react";
import axios from "axios";

const CreatePracticeQuestion = ({ onAddQuestion }) => {
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    topic: "",
    company: "",
    link: "",
  });

  // Handle form submission to add a new question
  const handleAddQuestion = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/practice",
        newQuestion
      );
      onAddQuestion(response.data); // Pass the new question back to the parent
      setNewQuestion({ question: "", topic: "", company: "", link: "" }); // Reset form
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  return (
    <div>
      <h2>Add a New Question</h2>
      <form onSubmit={handleAddQuestion}>
        <input
          type="text"
          placeholder="Question"
          value={newQuestion.question}
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, question: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Topic"
          value={newQuestion.topic}
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, topic: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Company"
          value={newQuestion.company}
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, company: e.target.value })
          }
          required
        />
        <input
          type="url"
          placeholder="Practice Link"
          value={newQuestion.link}
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, link: e.target.value })
          }
          required
        />
        <button type="submit">Add Question</button>
      </form>
    </div>
  );
};

export default CreatePracticeQuestion;