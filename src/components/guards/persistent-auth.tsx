"use client";

import React from "react";
import { useAuth } from "@/hooks/use-queries";
import LoadingPlaceholder from "../placeholders/loading-placeholder";

const PersistentAuth = ({ children }: { children: React.ReactNode }) => {
  const { isLoading } = useAuth();
  if (isLoading)
    return (
      <div className="p-10 py-30">
        <LoadingPlaceholder />
      </div>
    );
  return children;
};

export default PersistentAuth;
