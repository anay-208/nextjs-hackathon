import { createSafeActionClient, DEFAULT_SERVER_ERROR_MESSAGE } from "next-safe-action";
import { ActionError } from "./consts";


export const actionClient = createSafeActionClient({
  // Can also be an async function.
  handleServerError(e) {

    // In this case, we can use the 'ActionError` class to unmask errors
    // and return them with their actual messages to the client.
    if (e instanceof ActionError) {
      return e.message;
    }

    
    // Log to console.
    console.error("Action error:", e.message);

    // Every other error that occurs will be masked with the default message.
    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
});