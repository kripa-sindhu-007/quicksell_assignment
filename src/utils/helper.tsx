import { BiRadioCircle } from "react-icons/bi"; // Importing icons for status indicators
import { LuMoreHorizontal } from "react-icons/lu"; // Importing additional icons
import { TbProgress } from "react-icons/tb";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { AiFillCloseCircle, AiFillWarning } from "react-icons/ai";
import { BiSignal2, BiSignal3, BiSignal4 } from "react-icons/bi";

/**
 * Returns the appropriate icon component based on the provided priority level.
 *
 * @param {string} priority - The priority level of a task (e.g., 'No priority', 'Low', 'Medium', 'High', 'Urgent').
 * @returns {JSX.Element} - The corresponding icon component for the priority level.
 */
export const getPriorityIcon = (priority: string): JSX.Element => {
  switch (priority) {
    case "No priority":
      return <LuMoreHorizontal color="#797d84" size={14} />; // Icon for no priority
    case "Low":
      return <BiSignal2 color="#6b6f76" size={14} />; // Icon for low priority
    case "Medium":
      return <BiSignal3 color="#6b6f76" size={14} />; // Icon for medium priority
    case "High":
      return <BiSignal4 color="#6b6f76" size={14} />; // Icon for high priority
    case "Urgent":
      return <AiFillWarning color="#fc7840" size={14} />; // Icon for urgent priority
    default:
      return <AiFillWarning color="#fc7840" size={14} />; // Default to urgent warning if no match
  }
};

/**
 * Returns the appropriate icon component based on the provided status.
 *
 * @param {string} status - The status of a task (e.g., 'Backlog', 'Todo', 'In progress', 'Done', 'Canceled').
 * @returns {JSX.Element} - The corresponding icon component for the task status.
 */
export const getStatusIcon = (status: string): JSX.Element => {
  switch (status) {
    case "Backlog":
    case "Todo":
      return <BiRadioCircle color="#e2e2e2" size={24} />; // Icon for backlog or todo status
    case "In progress":
      return <TbProgress color="#f1ca4b" size={16} />; // Icon for in-progress status
    case "Done":
      return <IoCheckmarkDoneCircle color="#5e6ad2" size={16} />; // Icon for done status
    case "Canceled":
      return <AiFillCloseCircle color="#94a2b3" size={16} />; // Icon for canceled status
    default:
      return <AiFillCloseCircle color="#94a2b3" size={16} />; // Default to canceled icon if no match
  }
};
