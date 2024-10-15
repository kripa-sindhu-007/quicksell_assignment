import React from "react";
import "./usericon.css"; // Importing external CSS for styling the UserIcon component

/**
 * UserIcon Component
 * This component displays a user's icon, which consists of the user's initials (derived from their name)
 * and a status indicator showing whether the user is available or not.
 *
 * Props:
 * - name (string): The full name of the user, used to generate initials.
 * - available (boolean): A flag indicating whether the user is currently available (true) or unavailable (false).
 */
function UserIcon({
  name, // Full name of the user, e.g., "John Doe"
  available, // Boolean indicating whether the user is available
}: {
  name: string; // Prop type for user name
  available: boolean; // Prop type for availability status
}) {
  /**
   * Memoized function to generate user initials from the name.
   * - Takes the first letter of each word in the user's name, capitalizes them, and joins them.
   * - Example: "John Doe" becomes "JD".
   */
  const text = React.useMemo(() => {
    return name
      .split(" ") // Split the name by spaces into an array of words
      .map((item: string) => item[0]) // Map each word to its first character
      .join(""); // Join the characters together to form the initials
  }, [name]);

  return (
    <div className="usericon-container">
      {" "}
      {/* Container for the user icon */}
      <div className="usericon-text">{text}</div>{" "}
      {/* Displaying user initials */}
      {/* Status indicator for availability, conditionally adding the 'available' class */}
      <div className={`user-status ${available ? "available" : ""}`}></div>
    </div>
  );
}

export default UserIcon; // Exporting the UserIcon component for reuse
