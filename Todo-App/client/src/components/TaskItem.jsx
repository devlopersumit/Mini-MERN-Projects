import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { FaTrashAlt } from "react-icons/fa";

export default function TaskItem({ task }) {
  const { toggleTask, deleteTask } = useContext(TaskContext);

  return (
    <li className="flex items-center justify-between py-3 px-2 hover:bg-gray-50 rounded-lg transition">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task._id)}
          className="w-4 h-4 text-indigo-600"
        />
        <span
          className={`text-gray-800 ${
            task.completed ? "line-through text-gray-400" : ""
          }`}
        >
          {task.title}
        </span>
      </div>
      <button
        onClick={() => deleteTask(task._id)}
        className="text-red-500 hover:text-red-700 transition"
      >
        <FaTrashAlt size={16} />
      </button>
    </li>
  );
}
