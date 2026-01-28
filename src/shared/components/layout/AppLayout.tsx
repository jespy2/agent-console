import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='app-shell' >
      <Header />

      <div className='app-body'>
        <Sidebar />
        <main className='app-main' role='main'>
          {children}
        </main>
      </div>
    </div>
  )
};
