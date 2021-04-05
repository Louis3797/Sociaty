import { signIn } from "next-auth/client";
import React from "react";

const AccessDenied: React.FC = () => {
  return (
    <div>
      <h1>Access Denied</h1>
      <button type="submit" onClick={() => signIn()}>
        Sign in to get Access
      </button>
    </div>
  );
};

export default AccessDenied;
