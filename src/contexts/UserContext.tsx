import { createContext, useContext, useState } from "react";
import { User } from "../type";
import { useCallback } from "../@lib";
import { Notification } from "../type";
interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

// NOTE: 의존성 분리 : 외부에서 addNotification 함수를 주입받도록 수정함
interface UserProviderProps {
  children: React.ReactNode;
  addNotification: (message: string, type: Notification["type"]) => void;
}

export const UserProvider = ({
  children,
  addNotification,
}: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  // NOTE: 의존성 주입 : 직접 NotificationsContext를 사용하는 강한 결합 -> 의존성 주입으로 사이드 이펙트 발생
  // const { addNotification } = useNotificationsContext();

  const login = useCallback(
    (email: string) => {
      setUser({ id: 1, name: "홍길동", email });
      addNotification("성공적으로 로그인되었습니다", "success");
    },
    [addNotification]
  );

  const logout = useCallback(() => {
    setUser(null);
    addNotification("로그아웃되었습니다", "info");
  }, [addNotification]);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
