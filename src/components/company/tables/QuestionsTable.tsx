
import React, { useEffect, useState } from "react";
import "../styles/questions/QuestionsTable.scss";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useAuthStore } from "../../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export interface InterviewQuestion {
  id: string;
  companyId: string;
  createdBy: string;
  createdByUid: string;
  interviewStyle: string;
  createdAt: any;
  defaultQuestions: string[];
  customQuestions: {
    candidateId: string;
    email: string;
    question: string | null;
  }[];
}

const QuestionsTable: React.FC = () => {
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, role } = useAuthStore();
  const navigate = useNavigate();

  const handleEdit = (question: InterviewQuestion) => {
    navigate(`/company/${question.companyId}/add-interview-question`, { state: { question } });
  };

  useEffect(() => {
    async function fetch() {
      const snap = await getDocs(collection(db, "interviewQuestions"));
      const data = snap.docs.map(
        (docSnap) => ({ id: docSnap.id, ...docSnap.data() } as InterviewQuestion)
      );
      setQuestions(data);
      setLoading(false);
    }
    fetch();
  }, []);

  const handleDelete = async (id: string) => {
  const question = questions.find((q) => q.id === id);
  if (!question) return;

  const isCreator = user?.uid === question.createdByUid;

  if (!isCreator) {
    toast.info("Sorry, you can only delete your own questions.");
    return;
  }

  if (!window.confirm("Delete this entry?")) return;

  await deleteDoc(doc(db, "interviewQuestions", id));
  setQuestions((qs) => qs.filter((q) => q.id !== id));
};
  const canModify = (q: InterviewQuestion) =>
    user?.uid === q.createdByUid || role === "Company";

  return (
    <div className="questions-table">
      <h2 className="questions-table__heading">Interview Questions</h2>
      {loading ? (
        <p className="questions-table__loading">Loading...</p>
      ) : (
        <div className="questions-table__responsive">
          <table className="questions-table__table">
            <thead>
              <tr>
                <th>Created By</th>
                <th>Style</th>
                <th>Default Questions</th>
                <th>Assigned Candidates</th>
                <th>Optional Questions</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((q) => (
                <tr key={q.id} className="questions-table__row">
                  <td>{q.createdBy}</td>
                  <td>{q.interviewStyle}</td>
                  <td>
                    <ul className="questions-table__list">
                      {q.defaultQuestions.map((dq, i) => (
                        <li key={i}>{dq}</li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <ul className="questions-table__list">
                      {q.customQuestions.map((cq, i) => (
                        <li key={i}>{cq.email}</li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <ul className="questions-table__list">
                      {q.customQuestions.map((cq, i) => (
                        <li key={i}>{cq.question || <em>No question</em>}</li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    {canModify(q) ? (
                      <div className="questions-table__actions">
                        <button className="questions-table__btn questions-table__btn--edit"
                            onClick={() => handleEdit(q)}>
                          Edit
                        </button>
                        <button
                          className="questions-table__btn questions-table__btn--delete"
                          onClick={() => handleDelete(q.id)}
                        >
                          Delete
                        </button>
                      </div>
                    ) : (
                      <em>—</em>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default QuestionsTable;
