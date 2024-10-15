import React, { useMemo } from "react";
import Card from "../Card";
import "./column.css"; // Importing external stylesheet for styling the Column component
import { GrAdd } from "react-icons/gr"; // Importing 'Add' icon from react-icons
import { LuMoreHorizontal } from "react-icons/lu"; // Importing horizontal more icon
import { Ticket, User } from "../../interfaces"; // Importing TypeScript interfaces for type safety
import { getPriorityIcon, getStatusIcon } from "../../utils/helper"; // Utility functions for getting icons
import UserIcon from "../UserIcon"; // UserIcon component for displaying user profile icon

/**
 * Column Component
 * This component is responsible for displaying a group of tickets based on the specified grouping criteria.
 * It dynamically renders a header with an icon and title, and lists all associated tickets.
 *
 * Props:
 * - tickets (Ticket[]): Array of ticket objects to be displayed in the column.
 * - grouping (string): Determines how the tickets are grouped (e.g., by 'status', 'priority', or 'user').
 * - groupBy (string): The specific value of the grouping (e.g., 'open' for status, 'high' for priority).
 * - userIdToData (Record<string, User>): A mapping from user IDs to user data (name, availability).
 */
function Column({
  tickets, // Array of tickets that belong to this column
  grouping, // Grouping type (e.g., status, priority, user)
  groupBy, // Specific grouping identifier (e.g., 'open', 'high', userId)
  userIdToData, // Mapping of userId to user data for displaying user information
}: {
  tickets: Ticket[]; // Type for tickets array
  grouping: string; // Type for grouping criteria
  groupBy: string; // Type for the grouping identifier
  userIdToData: Record<string, User>; // Type for userId to user data mapping
}) {
  /**
   * Dynamically determine the title of the column based on the grouping type.
   * The title could be a status, priority, or user name.
   */
  const title = useMemo(() => {
    if (grouping === "status") return groupBy; // For status-based grouping, use groupBy value (e.g., 'Open')
    if (grouping === "priority") return groupBy; // For priority-based grouping, use groupBy value (e.g., 'High')
    if (grouping === "user") return userIdToData[groupBy].name; // For user-based grouping, fetch user's name
  }, [grouping, groupBy, userIdToData]);

  /**
   * Dynamically determine the icon to display based on the grouping type.
   * The icon could represent status, priority, or a user's profile.
   */
  const icon = useMemo(() => {
    if (grouping === "status") return getStatusIcon(groupBy); // Get the status icon for status-based grouping
    if (grouping === "priority") return getPriorityIcon(groupBy); // Get the priority icon for priority-based grouping
    if (grouping === "user") {
      // For user-based grouping, display user's profile icon
      const user = userIdToData[groupBy];
      return <UserIcon name={user.name} available={user.available} />;
    }
  }, [grouping, groupBy, userIdToData]);

  return (
    <div className="column">
      {" "}
      {/* Main column container */}
      {/* Column header containing the dynamic icon, title, ticket count, and action icons */}
      <div className="column-header">
        {/* Left part of the header containing the icon and title */}
        <div className="column-header-left-container">
          {icon} {/* Display the icon based on the grouping */}
          {/* Title and ticket count */}
          <div className="column-title">
            {title} {/* Render the dynamically calculated title */}
            <span className="count">{tickets.length}</span>{" "}
            {/* Display the number of tickets in the column */}
          </div>
        </div>

        {/* Right part of the header containing action icons ('Add' and 'More options') */}
        <div className="column-header-right-container">
          <GrAdd color="#797d84" size={12} /> {/* 'Add' icon */}
          <LuMoreHorizontal color="#797d84" size={14} />{" "}
          {/* 'More options' icon */}
        </div>
      </div>
      {/* Cards container rendering the list of tickets */}
      <div className="cards-container">
        {tickets.map((ticket: Ticket) => (
          <Card
            key={ticket.id} // Key for efficient rendering in React
            ticket={ticket} // Pass the ticket data to the Card component
            userData={userIdToData[ticket.userId]} // Fetch and pass user data for this ticket
            hideStatusIcon={grouping === "status"} // Hide status icon if grouped by status
            hideProfileIcon={grouping === "user"} // Hide profile icon if grouped by user
          />
        ))}
      </div>
    </div>
  );
}

export default Column; // Exporting the Column component for reuse in other parts of the application
