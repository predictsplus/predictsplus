export const api = {
  getBets: async () => {
    // Example API call
    return fetch("/api/bets").then(res => res.json());
  }
};
