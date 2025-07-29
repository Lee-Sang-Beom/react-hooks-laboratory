const simulateApiDelay = (ms: number = 2000) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const addMessageAPI = async (message: string) => {
  await simulateApiDelay(1500);
  return {
    id: Date.now(),
    text: message,
    timestamp: new Date().toLocaleTimeString(),
    status: "sent" as const,
  };
};

export const likePostAPI = async () => {
  await simulateApiDelay(1000);
  return { success: true };
};
