import React, { useState } from "react";
import { generateItems } from "./utils";
import { Item } from "./type";
import {
  ThemeProvider,
  UserProvider,
  NotificationsProvider,
  useNotificationsContext,
} from "./contexts";
import {
  Header,
  ItemList,
  ComplexForm,
  NotificationSystem,
} from "./components";
import { useThemeContext } from "./contexts/ThemeContext";
import { memo, useCallback } from "./@lib";

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>(generateItems(1000));
  const { addNotification } = useNotificationsContext();
  const addItems = useCallback(() => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  }, []);

  return (
    <NotificationsProvider>
      <ThemeProvider>
        <UserProvider addNotification={addNotification}>
          <AppContent items={items} onAddItems={addItems} />
        </UserProvider>
      </ThemeProvider>
    </NotificationsProvider>
  );
};

const AppContent: React.FC<{ items: Item[]; onAddItems: () => void }> = memo(
  ({ items, onAddItems }) => {
    const { theme } = useThemeContext();

    return (
      <div
        className={`min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}
      >
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 md:pr-4">
              <ItemList items={items} onAddItemsClick={onAddItems} />
            </div>
            <div className="w-full md:w-1/2 md:pl-4">
              <ComplexForm />
            </div>
          </div>
        </div>
        <NotificationSystem />
      </div>
    );
  }
);

export default App;
