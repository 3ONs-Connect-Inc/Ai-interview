import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./config";


export const checkFieldExists = async (field: "companyName" | "companyEmail", value: string) => {
  const q = query(collection(db, "users"), where(field, "==", value.trim()));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
};

