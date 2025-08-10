import { ITask } from "@/types/tasks";
import Task from "./Task";

interface ToDoListProps {
  tasks: ITask[];
}

const ToDoList: React.FC<ToDoListProps> = ({ tasks }) => {
  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 w-full">
      <table className="table">
        <thead>
          <tr>
            <th>Your Today&apos;s Tasks</th>
            <th className="text-center">Status</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <Task key={task.id} task={task}></Task>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ToDoList;
