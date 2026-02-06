import { ReactNode } from "react";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="ml-64">
        <div className="min-h-screen">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
