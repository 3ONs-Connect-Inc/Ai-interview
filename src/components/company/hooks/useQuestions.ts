import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  Timestamp,
  setDoc,
  doc,
} from "firebase/firestore";
import { useAuthStore } from "../../../store/useAuthStore";
import { db } from "../../../firebase/config";
import { toast } from "react-toastify";
import type { InterviewQuestion } from "../tables/QuestionsTable";
import { useNavigate } from "react-router-dom";

export const useAddQuestion = (companyId: string, editQuestion?: InterviewQuestion) => {
  const { user } = useAuthStore();
  const [interviewStyle, setInterviewStyle] = useState("behavioral");
  const [questions, setQuestions] = useState([
    {
      value: "",
      placeholder: "Tell me about a time you overcame a challenge.",
    },
  ]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const companyName = user?.companyName;
  const navigate = useNavigate();

 
useEffect(() => {
  const fetchCandidates = async () => {
    if (!companyName) return;

    const usersRef = collection(db, "users");
    const q = query(
      usersRef,
      where("companyName", "==", companyName),
      where("role", "==", "User")
    );

    const querySnapshot = await getDocs(q);
    const fetchedUsers = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      email: doc.data().email,
      customQuestion: "",
      isAssigned: false,
    }));

    //  If in edit mode, map customQuestions to users here
    if (editQuestion) {
      const mappedUsers = fetchedUsers.map((u) => {
        const match = editQuestion.customQuestions.find(cq => cq.candidateId === u.id);
        return match
          ? { ...u, isAssigned: true, customQuestion: match.question || "" }
          : u;
      });

      setUsers(mappedUsers);
      setInterviewStyle(editQuestion.interviewStyle);
      setQuestions(editQuestion.defaultQuestions.map(q => ({ value: q, placeholder: "" })));
    } else {
      setUsers(fetchedUsers);
    }
  };

  fetchCandidates();
}, [companyName, editQuestion]);

useEffect(() => {
  if (success && editQuestion) {
    navigate(`/company/${companyId}/view-interview-questions`);
  }
}, [success]);

  const handleStyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInterviewStyle(e.target.value);
  };

  const handleQuestionChange = (idx: number, value: string) => {
    setQuestions((prev) =>
      prev.map((q, i) => (i === idx ? { ...q, value } : q))
    );
  };

  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      { value: "", placeholder: "Enter a new question..." },
    ]);
  };

  const handleCustomQuestionChange = (idx: number, value: string) => {
    setUsers((prev) =>
      prev.map((u, i) => (i === idx ? { ...u, customQuestion: value } : u))
    );
  };

  const handleCandidateCheckbox = (idx: number, checked: boolean) => {
    setUsers((prev) =>
      prev.map((u, i) => (i === idx ? { ...u, isAssigned: checked } : u))
    );
  };

  const sendInterviewQuestions = async () => {
    setLoading(true);
    setSuccess(false);

    const defaultQuestionValues = questions.map((q) => q.value.trim());

    if (!interviewStyle) {
      toast.info("Please select an interview style.");
      setLoading(false);
      return;
    }
    const assignedUsers = users.filter((u) => u.isAssigned);
    if (assignedUsers.length === 0) {
      toast.info("Please assign at least one candidate.");
      setLoading(false);
      return;
    }

    if (defaultQuestionValues.some((q) => q === "")) {
      toast.info("Please fill out all default questions before submitting.");
      setLoading(false);
      return;
    }

    try {
      const createdBy = `${user?.firstName ?? user?.email ?? "Unknown"} ${
        user?.lastName ?? ""
      }`.trim();

      const questionData = {
        companyId,
        createdBy,
        interviewStyle,
        createdByUid: user?.uid,
        createdAt: Timestamp.now(),
        defaultQuestions: defaultQuestionValues,
        customQuestions: users
          .filter((u) => u.isAssigned)
          .map((u) => ({
            candidateId: u.id,
            email: u.email,
            question: u.customQuestion?.trim() || null,
          })),
      };
if (editQuestion) {
  await setDoc(doc(db, "interviewQuestions", editQuestion.id), questionData, { merge: true });
  toast.success("Interview questions updated!");
} else {
      await addDoc(collection(db, "interviewQuestions"), questionData);
      setSuccess(true);
      toast.success("Interview questions sent successfully!");
}
    //  Reset the form inputs
    setInterviewStyle("behavioral");
    setQuestions([
      {
        value: "",
        placeholder: "Tell me about a time you overcame a challenge.",
      },
    ]);
    setUsers((prev) =>
      prev.map((u) => ({
        ...u,
        customQuestion: "",
        isAssigned: false,
      }))
    );
    } catch (err) {
      console.error("Error sending questions:", err);
      toast.error("Failed to send interview questions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    interviewStyle,
    handleStyleChange,
    questions,
    addQuestion,
    handleQuestionChange,
    handleCandidateCheckbox,
    users,
    handleCustomQuestionChange,
    sendInterviewQuestions,
    loading,
    success,

  };
};
