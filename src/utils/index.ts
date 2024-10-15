import { Ticket, User } from "../interfaces";

/**
 * Groups an array of tickets by their status.
 *
 * @param {Ticket[]} tickets - The array of tickets to be grouped.
 * @returns {Record<string, Ticket[]>} - An object where the keys are the status values and the values are arrays of tickets.
 */
export const groupTicketsByStatus = (
  tickets: Ticket[]
): Record<string, Ticket[]> => {
  const groups: Record<string, Ticket[]> = tickets.reduce(
    (result: Record<string, Ticket[]>, ticket: Ticket) => {
      // Initialize the status group if it doesn't exist
      if (!result[ticket.status]) {
        result[ticket.status] = [];
      }
      // Add the ticket to the corresponding status group
      result[ticket.status].push(ticket);
      return result;
    },
    {
      Backlog: [],
      Todo: [],
      "In progress": [],
      Done: [],
      Canceled: [], // Initialize with all possible statuses to ensure consistent group keys
    }
  );

  return groups;
};

/**
 * Groups an array of tickets by their priority.
 *
 * @param {Ticket[]} tickets - The array of tickets to be grouped.
 * @returns {Record<string, Ticket[]>} - An object where the keys are priority labels and the values are arrays of tickets.
 */
export const groupTicketsByPriority = (
  tickets: Ticket[]
): Record<string, Ticket[]> => {
  const groups: Record<string, Ticket[]> = tickets.reduce(
    (result: Record<string, Ticket[]>, ticket: Ticket) => {
      const priority = getPriorityLabel(ticket.priority); // Convert the priority number to a human-readable label
      // Initialize the priority group if it doesn't exist
      if (!result[priority]) {
        result[priority] = [];
      }
      // Add the ticket to the corresponding priority group
      result[priority].push(ticket);
      return result;
    },
    {
      "No priority": [],
      Low: [],
      Medium: [],
      High: [],
      Urgent: [], // Initialize with all possible priority levels
    }
  );

  return groups;
};

/**
 * Groups an array of tickets by the user ID.
 *
 * @param {Ticket[]} tickets - The array of tickets to be grouped.
 * @returns {Record<string, Ticket[]>} - An object where the keys are user IDs and the values are arrays of tickets.
 */
export const groupTicketsByUserId = (
  tickets: Ticket[]
): Record<string, Ticket[]> => {
  const groups: Record<string, Ticket[]> = tickets.reduce(
    (result: Record<string, Ticket[]>, ticket: Ticket) => {
      // Initialize the user group if it doesn't exist
      if (!result[ticket.userId]) {
        result[ticket.userId] = [];
      }
      // Add the ticket to the corresponding user group
      result[ticket.userId].push(ticket);
      return result;
    },
    {}
  );

  return groups;
};

/**
 * Maps an array of users by their user ID.
 *
 * @param {User[]} users - The array of users to be mapped.
 * @returns {Record<string, User>} - An object where the keys are user IDs and the values are user objects.
 */
export const mapUsersByUserId = (users: User[]): Record<string, User> => {
  return users.reduce((accumulator: Record<string, User>, user: User) => {
    // Create a mapping of userId to user object
    accumulator[user.id] = user;
    return accumulator;
  }, {});
};

/**
 * Converts a numeric priority to a human-readable label.
 *
 * @param {number} priority - The numeric priority value.
 * @returns {string} - The corresponding human-readable label.
 */
const getPriorityLabel = (priority: number): string => {
  switch (priority) {
    case 0:
      return "No priority";
    case 1:
      return "Low";
    case 2:
      return "Medium";
    case 3:
      return "High";
    case 4:
      return "Urgent";
    default:
      return "NA"; // Return "NA" if the priority is unrecognized
  }
};

/**
 * Sorts an array of tickets by priority in descending order.
 *
 * @param {Ticket[]} tickets - The array of tickets to be sorted.
 * @returns {Ticket[]} - The sorted array of tickets.
 */
const orderByPriority = (tickets: Ticket[]): Ticket[] =>
  tickets.sort((a: Ticket, b: Ticket) => b.priority - a.priority); // Corrected comparison

/**
 * Sorts an array of tickets alphabetically by title.
 *
 * @param {Ticket[]} tickets - The array of tickets to be sorted.
 * @returns {Ticket[]} - The sorted array of tickets.
 */
const orderByTitle = (tickets: Ticket[]): Ticket[] =>
  tickets.sort((a: Ticket, b: Ticket) => a.title.localeCompare(b.title));

/**
 * Groups and orders tickets based on the selected grouping and ordering criteria.
 *
 * @param {Ticket[]} tickets - The array of tickets to be processed.
 * @param {string} grouping - The criterion by which to group the tickets ('status', 'priority', 'user').
 * @param {string} ordering - The criterion by which to order the tickets ('priority', 'title').
 * @returns {Record<string, Ticket[]>} - The grouped and ordered tickets.
 */
export const loadGrid = (
  tickets: Ticket[],
  grouping: string,
  ordering: string
): Record<string, Ticket[]> => {
  let orderedTickets: Ticket[];

  // Apply the ordering based on the specified criterion
  if (ordering === "priority") {
    orderedTickets = orderByPriority(tickets);
  } else if (ordering === "title") {
    orderedTickets = orderByTitle(tickets);
  } else {
    orderedTickets = tickets; // Fallback if ordering is not defined
  }

  // Group the tickets based on the selected grouping criterion
  switch (grouping) {
    case "status":
      return groupTicketsByStatus(orderedTickets);
    case "priority":
      return groupTicketsByPriority(orderedTickets);
    case "user":
      return groupTicketsByUserId(orderedTickets);
    default:
      return groupTicketsByStatus(orderedTickets); // Default to grouping by status if no match
  }
};
