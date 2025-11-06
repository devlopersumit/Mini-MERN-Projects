import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskItem from "./TaskItem";

export default function TaskList() {
  const { tasks } = useContext(TaskContext);

  if (!tasks.length)
    return <p className="text-center text-gray-500 mt-4">No tasks yet 😴</p>;

  return (
    <ul className="divide-y divide-gray-200">
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} />
      ))}
    </ul>
  );
}
