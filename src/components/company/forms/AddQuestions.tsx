
import React from "react";
import "../styles/questions/addQuestions.scss";
import { useLocation, useParams } from "react-router-dom";
import { useAddQuestion } from "../hooks/useQuestions";
import { cn } from "../../../lib/utils";


const AddQuestions: React.FC = () => {
  const { companyId } = useParams<{ companyId: string }>();
  const location = useLocation();
  const editQuestion = location.state?.question; 

  const {
    interviewStyle,
    handleStyleChange,
    questions,
    addQuestion,
    handleQuestionChange,
    users,
    handleCustomQuestionChange,
    sendInterviewQuestions,
    handleCandidateCheckbox,
    loading,

  } = useAddQuestion(companyId!, editQuestion); 
 
const isFormValid = interviewStyle && questions.every((q) => q.value.trim() !== "");

 return (
    <div className="add-questions">
      <h2 className="add-questions__heading">Set Interview Questions</h2>

      <div className="add-questions__section">
        <label className="add-questions__label">Interview Style</label>
        <select
          value={interviewStyle}
          onChange={handleStyleChange}
          className="add-questions__select"
          required
        >
          <option value="behavioral">Behavioral (STAR)</option>
          <option value="technical">Technical Challenge</option>
          <option value="situational">Situational Judgement</option>
          <option value="mixed">Mixed</option>
        </select>
      </div>

      <div className="add-questions__section">
        <span className="add-questions__subheading">Default Questions</span>
        {questions.map((q, idx) => (
          <div key={idx} className="add-questions__question-group">
            <label className="add-questions__question-label">
              Question {idx + 1}
            </label>
            <textarea
              placeholder={q.placeholder}
              value={q.value}
              onChange={(e) => handleQuestionChange(idx, e.target.value)}
              className="add-questions__textarea"
            />
          </div>
        ))}
        <button onClick={addQuestion} className="add-questions__add-btn">
          + Add Another Default Question
        </button>
      </div>

      <div className="add-questions__table-wrapper">
        <h2 className="add-questions__table-heading">Candidate Pool</h2>
        <p className="add-questions__table-subtext">
          Add a custom question for any specific candidate (optional).
        </p>
        <table className="add-questions__table">
          <thead>
            <tr>
                <th>Assign</th>
              <th>Candidate</th>
              <th>Email</th>
              <th>Custom Question</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={idx}>
                <td>
                  <input
                    type="checkbox"
                    checked={user.isAssigned || false}
                    onChange={(e) => handleCandidateCheckbox(idx, e.target.checked)}
                  />
                </td>
                <td>{user.firstName ?? user.email}</td>
                <td>{user.email}</td>
                <td>
                  <textarea
                    placeholder={`Optional custom question for ${user.firstName ?? user.email}...`}
                    value={user.customQuestion || ""}
                    onChange={(e) =>
                      handleCustomQuestionChange(idx, e.target.value)
                    }
                    className="add-questions__custom-textarea"
                    disabled={!user.isAssigned}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={sendInterviewQuestions}
        disabled={loading || !isFormValid}
        className={cn(
          "add-questions__submit",
         (loading || !isFormValid) && "add-questions__submit--disabled"
        )}
      >
        {loading ? "Sending..." : "Send Interview Questions"}
      </button>
    </div>
  );
};

export default AddQuestions;