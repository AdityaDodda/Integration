import React, { useState, useEffect } from "react";
import axios from "axios";

const GetPracticeQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [topicFilter, setTopicFilter] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");

  // Fetch questions on component load
  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/practice");
      setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  // Filter questions based on search and tags
  const filteredQuestions = questions.filter((q) => {
    const matchesSearch = q.question
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTopic = topicFilter
      ? q.topic.toLowerCase().includes(topicFilter.toLowerCase())
      : true;
    const matchesCompany = companyFilter
      ? q.company.toLowerCase().includes(companyFilter.toLowerCase())
      : true;
    return matchesSearch && matchesTopic && matchesCompany;
  });

  return (
    <div className="practice-container">
      <h1>Practice Questions</h1>

      {/* Search and Filter Section */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search questions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by topic..."
          value={topicFilter}
          onChange={(e) => setTopicFilter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by company..."
          value={companyFilter}
          onChange={(e) => setCompanyFilter(e.target.value)}
        />
      </div>

      {/* Questions List */}
      <ul className="questions-list">
        {filteredQuestions.map((q) => (
          <li key={q._id}>
            <strong>{q.question}</strong> <br />
            <em>Topic:</em> {q.topic} | <em>Company:</em> {q.company} <br />
            <a href={q.link} target="_blank" rel="noopener noreferrer">
              Practice Here
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetPracticeQuestions;