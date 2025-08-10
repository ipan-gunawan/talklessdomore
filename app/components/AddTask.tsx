"use client";
import { FaRegCalendarPlus } from "react-icons/fa6";
import Modal from "./Modal";
import { FormEventHandler, useState } from "react";
import { LuFilePlus } from "react-icons/lu";
import { FiPlusCircle } from "react-icons/fi";
import { addToDo } from "@/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { useAlert } from "@/app/components/AlertContext";

const AddTask = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [newTaskValue, setNewTaskValue] = useState("");
  const { showAlert } = useAlert();

  const handleNewSubmitToDo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    await addToDo({
      id: uuidv4(),
      text: newTaskValue,
    });

    setNewTaskValue("");
    setModalOpen(false);

    // Trigger alert global
    showAlert("Successfully added new task", "success");

    router.refresh();
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full mb-4">
      <button
        className="btn btn-primary text-base w-full"
        onClick={() => setModalOpen(true)}
      >
        <FaRegCalendarPlus />
        Add Task
      </button>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleNewSubmitToDo}>
          <h3 className="font-bold text-lg flex justify-start">
            Add a New Task
          </h3>
          <div className="modal-action flex justify-center">
            <label className="input input-primary">
              <LuFilePlus className="font-bold" />
              <input
                value={newTaskValue}
                onChange={(e) => setNewTaskValue(e.target.value)}
                type="text"
                className="grow"
                placeholder="What is your task?"
              />
            </label>
            <button type="submit" className="btn btn-primary">
              <FiPlusCircle className="font-bold text-xl" />
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddTask;
