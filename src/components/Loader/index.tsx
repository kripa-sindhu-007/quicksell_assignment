import React from "react";
import "./loader.css"; // Importing the external CSS for the Loader component

/**
 * Loader Component
 * This component displays a loading animation, with an optional fullscreen mode.
 *
 * Props:
 * - fullscreen (boolean, optional): Determines whether the loader should occupy the full screen or not.
 *   Defaults to true if not provided.
 */
function Loader({
  fullscreen = true, // Default value for fullscreen is true
}: {
  fullscreen?: boolean; // Optional prop type for fullscreen, indicating whether the loader covers the entire screen
}) {
  return (
    <div className={`loader-container ${fullscreen ? "fullscreen" : ""}`}>
      {" "}
      {/* Conditionally applying the fullscreen class */}
      <span className="loader">Loading...</span>{" "}
      {/* Loading text or animation */}
    </div>
  );
}

export default Loader; // Exporting the Loader component for reuse
