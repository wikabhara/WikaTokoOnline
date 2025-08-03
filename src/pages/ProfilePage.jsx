import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function ProfilePage() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <div className="flex flex-col items-center justify-center p-8">
        <h1 className="text-3xl font-bold">Hallo {user.email}!</h1>

        <p className="mt-2 text-gray-500">User ID Anda adalah: {user.uid}</p>
      </div>
    </>
  );
}
