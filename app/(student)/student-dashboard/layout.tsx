import { DashboardSidebar } from "@/components/DashboardSidebar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <DashboardSidebar>{children}</DashboardSidebar>
    </>
  );
};

export default layout;
