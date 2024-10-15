import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  ChangeEvent,
} from "react";
import "./displayDropdown.css"; // Importing external CSS for styling the DisplayDropdown component
import { LuSettings2 } from "react-icons/lu"; // Importing 'Settings' icon from react-icons
import { BiChevronDown } from "react-icons/bi"; // Importing 'ChevronDown' icon for dropdown UI

/**
 * DisplayDropdown Component
 * This component provides a dropdown UI for users to select grouping and ordering preferences.
 * It also handles visibility and click events for showing or hiding the dropdown.
 *
 * Props:
 * - grouping (string): Current grouping selection (e.g., 'status', 'user', 'priority').
 * - setGrouping (function): Function to update the grouping selection.
 * - ordering (string): Current ordering selection (e.g., 'priority', 'title').
 * - setOrdering (function): Function to update the ordering selection.
 */
function DisplayDropdown({
  grouping, // The current value for grouping
  setGrouping, // Function to update the grouping selection
  ordering, // The current value for ordering
  setOrdering, // Function to update the ordering selection
}: {
  grouping: string; // Prop type for grouping value
  setGrouping: (grouping: string) => void; // Prop type for grouping update function
  ordering: string; // Prop type for ordering value
  setOrdering: (ordering: string) => void; // Prop type for ordering update function
}) {
  // State to manage visibility of the dropdown
  const [visible, setVisible] = useState(false);

  // useRef to store the component reference for detecting clicks outside the dropdown
  const componentRef = useRef<HTMLDivElement | null>(null);

  /**
   * Opens the dropdown by setting the `visible` state to true.
   * useCallback ensures the function is only recreated if dependencies change.
   */
  const openDropdown = useCallback(() => {
    setVisible(true);
  }, []); // No dependencies, so this function is stable across renders

  /**
   * Handles clicks outside the dropdown to close it.
   * If the click target is not inside the dropdown component, close the dropdown.
   */
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      componentRef.current &&
      !componentRef.current.contains(event.target as Node)
    ) {
      setVisible(false); // Close the dropdown if clicking outside of the component
    }
  }, []); // No dependencies

  /**
   * Updates the grouping state when the user selects a different grouping option.
   */
  const onGroupingChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setGrouping(e.target.value); // Update the grouping based on the selected value
    },
    [setGrouping]
  );

  /**
   * Updates the ordering state when the user selects a different ordering option.
   */
  const onOrderingChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setOrdering(e.target.value); // Update the ordering based on the selected value
    },
    [setOrdering]
  );

  /**
   * Registers the click event listener to detect outside clicks when the dropdown is open.
   * Removes the event listener when the component is unmounted or dependencies change.
   */
  useEffect(() => {
    document.addEventListener("click", handleClickOutside); // Add event listener

    return () => {
      document.removeEventListener("click", handleClickOutside); // Cleanup event listener on unmount
    };
  }, [handleClickOutside]); // Re-register only if handleClickOutside changes

  return (
    <div className="display-dropdown" ref={componentRef}>
      {" "}
      {/* Dropdown container */}
      {/* Dropdown label with icons and click handler to open dropdown */}
      <div className="dropdown-label-container" onClick={openDropdown}>
        <LuSettings2 color="#6b6f76" /> {/* Settings icon */}
        <div className="dropdown-label">Display</div> {/* Label text */}
        <BiChevronDown color="#6b6f76" />{" "}
        {/* Chevron icon indicating dropdown */}
      </div>
      {/* Dropdown content - visible when 'visible' state is true */}
      <div className={`dropdown-content-container ${visible ? "visible" : ""}`}>
        {" "}
        {/* Dynamically apply 'visible' class */}
        {/* Grouping selection */}
        <div className="dropdown-content-row">
          <div className="dropdown-content-label">Grouping</div>
          <select
            name="grouping"
            id="grouping"
            value={grouping}
            onChange={onGroupingChange}
          >
            <option value="status">Status</option>
            <option value="user">User</option>
            <option value="priority">Priority</option>
          </select>
        </div>
        {/* Ordering selection */}
        <div className="dropdown-content-row">
          <div className="dropdown-content-label">Ordering</div>
          <select
            name="ordering"
            id="ordering"
            value={ordering}
            onChange={onOrderingChange}
          >
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default DisplayDropdown; // Exporting the component for reuse
