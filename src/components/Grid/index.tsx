import React, { useCallback, useMemo } from "react";
import "./grid.css"; // Importing external stylesheet for styling the Grid component
import Column from "../Column/Column"; // Importing Column component for rendering each column of tickets
import { Ticket, User } from "../../interfaces"; // Importing TypeScript interfaces for type safety

/**
 * Grid Component
 * This component is responsible for displaying a grid of columns, where each column represents a group
 * of tickets. The grouping could be based on 'status', 'user', or 'priority', and the gridData holds
 * the ticket data for each group.
 *
 * Props:
 * - gridData (Record<string, Ticket[]>): The data to be displayed in the grid. It's an object where the keys
 *   represent group identifiers (e.g., status, user, priority) and the values are arrays of tickets.
 * - grouping (string): The grouping criteria (e.g., 'status', 'user', 'priority').
 * - userIdToData (Record<string, User>): A mapping from user IDs to user data (name, availability).
 */
function Grid({
  gridData, // The grid data which holds tickets grouped by a certain category (status, user, priority)
  grouping, // The current grouping criteria
  userIdToData, // Mapping of user IDs to user details for rendering user-related information
}: {
  gridData: Record<string, Ticket[]>; // Type definition for gridData where keys are group IDs, and values are arrays of tickets
  grouping: string; // Type for the grouping criteria (e.g., 'status', 'user', 'priority')
  userIdToData: Record<string, User>; // Type definition for userId-to-user mapping
}) {
  /**
   * Memoized array of keys representing each group in gridData. The keys could be status types, user IDs,
   * or priority levels, depending on the grouping criteria.
   */
  const keys: string[] = useMemo(() => Object.keys(gridData), [gridData]);

  return (
    <div className="grid">
      {" "}
      {/* Main container for the grid */}
      {/* Rendering a Column component for each group in the gridData */}
      {keys.map((k: string) => (
        <Column
          key={k} // Key prop for efficient rendering in React
          tickets={gridData[k]} // Array of tickets belonging to this group
          grouping={grouping} // The current grouping criteria passed down to each column
          groupBy={k} // The key representing this group (could be status, user, or priority)
          userIdToData={userIdToData} // Mapping of user IDs to user data
        />
      ))}
    </div>
  );
}

export default Grid; // Exporting the Grid component for reuse in other parts of the application
