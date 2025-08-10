import MainActivity from "./components/MainActivity";
import AddTask from "./components/AddTask";
import ToDoList from "./components/ToDoList";
import { getAllTodos } from "@/api";
import GlobalAlert from "./components/GlobalAlert";

export default async function Home() {
  const tasks = await getAllTodos();
  console.log(tasks);
  return (
    <div className="font-sans flex flex-col items-center justify-center lg:w-xl h-screen min-h-screen py-20 mx-auto">
      <MainActivity></MainActivity>
      <AddTask></AddTask>
      <ToDoList tasks={tasks}></ToDoList>
      <GlobalAlert></GlobalAlert>
    </div>
  );
}
