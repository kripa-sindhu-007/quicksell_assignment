import React from "react";
import "./header.css"; // Importing the external CSS stylesheet for the header component
import DisplayDropdown from "../Dropdowns/DisplayDropdown"; // Importing the DisplayDropdown component

/**
 * Header Component
 * This component serves as the header for the application, and it includes a DisplayDropdown
 * for managing grouping and ordering preferences.
 *
 * Props:
 * - grouping (string): The current grouping selection (e.g., 'status', 'user', 'priority').
 * - setGrouping (function): Function to update the grouping selection.
 * - ordering (string): The current ordering selection (e.g., 'priority', 'title').
 * - setOrdering (function): Function to update the ordering selection.
 */
function Header({
  grouping, // The current grouping criteria (e.g., 'status', 'user', 'priority')
  setGrouping, // Function to update the grouping state
  ordering, // The current ordering criteria (e.g., 'priority', 'title')
  setOrdering, // Function to update the ordering state
}: {
  grouping: string; // Prop type for grouping value
  setGrouping: (grouping: string) => void; // Prop type for function to update grouping
  ordering: string; // Prop type for ordering value
  setOrdering: (ordering: string) => void; // Prop type for function to update ordering
}) {
  return (
    <header>
      {" "}
      {/* Container for the header */}
      {/* Rendering the DisplayDropdown component with props to manage grouping and ordering */}
      <DisplayDropdown
        grouping={grouping} // Passing current grouping state to DisplayDropdown
        setGrouping={setGrouping} // Passing function to update grouping
        ordering={ordering} // Passing current ordering state to DisplayDropdown
        setOrdering={setOrdering} // Passing function to update ordering
      />
    </header>
  );
}

export default Header; // Exporting the Header component for reuse in other parts of the application
