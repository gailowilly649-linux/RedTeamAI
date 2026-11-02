/**
 * Sends a chat request to the backend Express proxy server.
 *
 * @param {string} conversationId - Current conversation identifier
 * @param {Array<{role: string, content: string}>} messages - Conversation message history
 * @returns {Promise<{conversationId: string, reply: string}>}
 */
export async function sendChatMessage(conversationId, messages) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      conversationId,
      messages
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || 'Failed to send chat message.');
    error.status = response.status;
    error.title = data.error || 'Server Error';
    throw error;
  }

  return data;
}
