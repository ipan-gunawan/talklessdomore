"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type AlertType = {
  message: string;
  type: "success" | "error" | "info" | "warning" | null;
};

const AlertContext = createContext<{
  alert: AlertType;
  showAlert: (message: string, type: AlertType["type"]) => void;
  hideAlert: () => void;
}>({
  alert: { message: "", type: null },
  showAlert: () => {},
  hideAlert: () => {},
});

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alert, setAlert] = useState<AlertType>({
    message: "",
    type: null,
  });

  const showAlert = (message: string, type: AlertType["type"]) => {
    setAlert({ message, type });
    setTimeout(() => setAlert({ message: "", type: null }), 3000); // auto hide
  };

  const hideAlert = () => setAlert({ message: "", type: null });

  return (
    <AlertContext.Provider value={{ alert, showAlert, hideAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
