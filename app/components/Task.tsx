"use client";

import { ITask } from "@/types/tasks";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { RiCloseLargeFill } from "react-icons/ri";
import { FaChevronDown } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuFilePlus } from "react-icons/lu";
import Modal from "@/app/components/Modal";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteToDo, editToDo } from "@/api";
import { useAlert } from "@/app/components/AlertContext";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const [modalOpenEdit, setModalOpenEdit] = useState<boolean>(false);
  const [modalOpenDelete, setModalOpenDelete] = useState<boolean>(false);
  const [taskToDoEdit, setTaskToDoEdit] = useState<string>(task.text);

  const [selectedStatus, setSelectedStatus] = useState<"Not Yet" | "On Going" | "Done">(task.status);

  const statusColors: Record<string, string> = {
    "Not Yet": "btn-error",
    "On Going": "btn-warning",
    Done: "btn-success",
    Status: "btn-primary",
  };

  const statusIcons: Record<string, React.ReactNode> = {
    "Not Yet": <RiCloseLargeFill />,
    "On Going": <FaArrowRotateLeft />,
    Done: <FaCheck />,
    Status: <FaChevronDown />,
  };

  type TaskStatus = "Not Yet" | "On Going" | "Done";

  const handleStatusChange = async (newStatus: TaskStatus) => {
    setSelectedStatus(newStatus);
    await editToDo({
      id: task.id,
      text: task.text,
      status: newStatus,
    });
    router.refresh();
  };

  const handleSubmitEditToDo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editToDo({
      id: task.id,
      text: taskToDoEdit,
      status: selectedStatus,
    });
    setTaskToDoEdit("");
    setModalOpenEdit(false);
    showAlert("Your task has been edited!", "warning");
    router.refresh();
  };

  // Delete task
  const handleDeleteTask = async (id: string) => {
    await deleteToDo(id);
    setModalOpenDelete(false);
    showAlert("Your task has been deleted!", "error");
    router.refresh();
  };

  const { showAlert } = useAlert();

  return (
    <tr className="hover:bg-base-300" key={task.id}>
      <td>{task.text}</td>
      <td className="text-nowrap">
        <div className="dropdown dropdown-center">
          <div
            tabIndex={0}
            role="button"
            className={`btn m-1 ${statusColors[selectedStatus]}`}
          >
            {selectedStatus} {statusIcons[selectedStatus]}
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content bg-base-300 rounded-box z-1 w-52 p-2 shadow-sm"
          >
            <li className="hover:bg-base-100">
              <button
                className="btn btn-error"
                onClick={() => handleStatusChange("Not Yet")}
              >
                Not Yet <RiCloseLargeFill />
              </button>
            </li>
            <li className="hover:bg-base-100">
              <button
                className="btn btn-warning"
                onClick={() => handleStatusChange("On Going")}
              >
                On Going <FaArrowRotateLeft />
              </button>
            </li>
            <li className="hover:bg-base-100">
              <button
                className="btn btn-success"
                onClick={() => handleStatusChange("Done")}
              >
                Done <FaCheck />
              </button>
            </li>
          </ul>
        </div>
      </td>
      <td>
        <div className="action flex gap-2">
          <button
            onClick={() => {
              setModalOpenEdit(true);
            }}
            className="btn btn-soft"
          >
            <GrEdit className="text-bold text-warning" />
          </button>
          <Modal modalOpen={modalOpenEdit} setModalOpen={setModalOpenEdit}>
            <form onSubmit={handleSubmitEditToDo}>
              <h3 className="font-bold text-lg flex justify-start">
                Edit Your Task
              </h3>
              <div className="modal-action flex justify-center">
                <label className="input input-warning">
                  <LuFilePlus className="font-bold" />
                  <input
                    value={taskToDoEdit}
                    onChange={(e) => setTaskToDoEdit(e.target.value)}
                    type="text"
                    className="grow"
                    placeholder="What is your task?"
                  />
                </label>
                <button type="submit" className="btn btn-warning">
                  <GrEdit className="font-bold text-xl" />
                </button>
              </div>
            </form>
          </Modal>

          <button
            onClick={() => {
              setModalOpenDelete(true);
            }}
            className="btn btn-soft"
          >
            <FaRegTrashAlt className="text-bold text-error" />
          </button>
          <Modal
            modalOpen={modalOpenDelete}
            setModalOpen={setModalOpenDelete}
            showCloseButton={false}
          >
            <div className="confirmation flex flex-col justify-between gap-5">
              <h3 className="font-bold text-lg flex justify-start">
                Sure Delete This Task?
              </h3>
              <div className="confirm-button flex gap-1.5 justify-end">
                <button
                  type="button"
                  className="btn btn-soft btn-error"
                  onClick={() => setModalOpenDelete(false)}
                >
                  No
                </button>
                <button
                  onClick={() => {
                    handleDeleteTask(task.id);
                  }}
                  type="submit"
                  className="btn btn-soft btn-success"
                >
                  Yes
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </td>
    </tr>
  );
};

export default Task;
