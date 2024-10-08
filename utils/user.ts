import { useAuth } from "@/context/AuthContext";
import axios from "axios";

export const accountDelete = async (userID: string) => {
  if (!userID) {
    return {
      ok: false,
      message: "User not found",
    };
  }
  const formData = new FormData();
  formData.append("id", userID);
  const req = await axios.post(
    "https://mobil.alacakaya.com/delete-user",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  const data = await req.data;

  if (data.ok) {
    return {
      ok: true,
      message: "User deleted",
    };
  }
  return {
    ok: false,
    message: "User not deleted",
  };
};
