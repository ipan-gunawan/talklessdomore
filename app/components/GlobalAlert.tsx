"use client";
import { useAlert } from "@/app/components/AlertContext";
import { FaCheck } from "react-icons/fa";

export default function GlobalAlert() {
  const { alert } = useAlert();

  if (!alert.type) return null;

  const color = {
    success: "alert-success",
    error: "alert-error",
    info: "alert-info",
    warning: "alert-warning",
  }[alert.type];

  return (
    <div className={`alert ${color} fixed bottom-5 shadow-lg w-fit`}>
      <span className="flex gap-2 items-center">
        <FaCheck></FaCheck>
        {alert.message}
      </span>
    </div>
  );
}
