import React from "react";
import "./card.css"; // Importing external stylesheet for styling the Card component
import UserIcon from "../UserIcon"; // Importing UserIcon component for displaying user avatar
import { LuMoreHorizontal } from "react-icons/lu"; // Importing horizontal more icon for additional options
import { Ticket, User } from "../../interfaces"; // Importing TypeScript interfaces for type safety
import { getStatusIcon } from "../../utils/helper"; // Importing utility function to get appropriate status icon

/**
 * Card Component
 * This component is responsible for rendering a card UI element that displays ticket details along with optional user profile and status icons.
 *
 * Props:
 * - ticket (Ticket): The ticket object containing the details like id, status, title, and tags.
 * - userData (User): The user object containing the details of the user like name and availability.
 * - hideStatusIcon (boolean): Flag to hide or show the status icon based on the requirements.
 * - hideProfileIcon (boolean): Flag to hide or show the user profile icon based on the requirements.
 */
function Card({
  ticket, // Ticket object passed as a prop, containing all relevant ticket data
  userData, // User data object, containing user name and availability status
  hideStatusIcon, // Boolean flag to determine if the status icon should be hidden
  hideProfileIcon, // Boolean flag to determine if the profile icon should be hidden
}: {
  ticket: Ticket; // TypeScript type for the 'ticket' prop
  userData: User; // TypeScript type for the 'userData' prop
  hideStatusIcon: boolean; // TypeScript type for the 'hideStatusIcon' prop
  hideProfileIcon: boolean; // TypeScript type for the 'hideProfileIcon' prop
}) {
  return (
    <div className="card">
      {" "}
      {/* Main card container */}
      {/* Top section containing ticket ID and optional user profile icon */}
      <div className="top-container">
        <div className="ticket-id">{ticket.id}</div> {/* Display ticket ID */}
        {/* Conditionally render the user profile icon based on the hideProfileIcon flag */}
        {!hideProfileIcon && (
          <UserIcon name={userData.name} available={userData.available} /> // Displaying user icon with name and availability status
        )}
      </div>
      {/* Middle section containing ticket title and optional status icon */}
      <div className="middle-container">
        {/* Conditionally render the status icon based on the hideStatusIcon flag */}
        {!hideStatusIcon && getStatusIcon(ticket.status)}{" "}
        {/* Utility function to get the status icon */}
        <div className="title">{ticket.title}</div> {/* Display ticket title */}
      </div>
      {/* Bottom section containing tags and the more options icon */}
      <div className="bottom-container">
        <div className="more-icon-container">
          <LuMoreHorizontal color="#797d84" />{" "}
          {/* Displaying 'more' icon for additional options */}
        </div>

        {/* Rendering all tags related to the ticket */}
        {ticket.tag.map((t: string) => (
          <div key={t} className="tag-container">
            {" "}
            {/* Key ensures unique identification of each tag for rendering */}
            <div className="tag-icon"></div>{" "}
            {/* Placeholder for tag-specific icon */}
            <div className="tag-text">{t}</div> {/* Displaying the tag text */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Card; // Exporting the Card component for reuse in other parts of the application
