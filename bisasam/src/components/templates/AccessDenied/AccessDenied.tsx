import { signIn } from "next-auth/client";
import React from "react";

const AccessDenied: React.FC = () => {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <h1>Access Denied</h1>
      <button type="submit" onClick={() => signIn()}>
        <span>Sign in to get Access</span>
      </button>
    </div>
  );
};

export default AccessDenied;
