import { type ReactNode } from "react";
import HeaderComponent from "./Header";

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {

  return (
    <div>
      <HeaderComponent />
      <main style={{textAlign:"left"}}>
        {children}
      </main>
    </div>
  );
};
