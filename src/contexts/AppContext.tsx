import { createContext, useContext } from "react";
import { User, Notification } from "../type";

// AppContext 타입 정의
export interface AppContextType {
  theme: string;
  toggleTheme: () => void;
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  notifications: Notification[];
  addNotification: (message: string, type: Notification["type"]) => void;
  removeNotification: (id: number) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

// 커스텀 훅: useAppContext
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
