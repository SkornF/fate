export type FateEvent = {
  title: string;
  date: string; // YYYY-MM-DD
  location: string;
  description?: string;
  link?: string;
};

// Add new rides here. Keep dates in YYYY-MM-DD format.
// Past events are automatically hidden from the site.
export const events: FateEvent[] = [
  {
    title: "[STAGING TEST] Delete me once preview URL is confirmed",
    date: "2026-12-31",
    location: "Test location",
  },
];
