import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex  w-full gap-5 flex-col h-screen items-center justify-center bg-color-a4">
      <div className="flex flex-col w-full max-w-lg rounded-xl bg-white mt-4 p-8">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
