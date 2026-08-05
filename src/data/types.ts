export type FateEvent = {
  title: string;
  start: string; // YYYY-MM-DDTHH:mm
  end?: string; // YYYY-MM-DDTHH:mm, omit for a single point-in-time event
  location: string;
  mapUrl?: string; // full Google Maps link; auto-generated from location if omitted
  description?: string;
  link?: string;
};

export type SiteContent = {
  memberCountText: string;
  heroSubheading: string;
  aboutHeadline: string;
  aboutBody: string;
  facebookGroupUrl: string;
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
};
