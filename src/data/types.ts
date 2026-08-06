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
  heroLabel: string;
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
  heroImage?: string;
};

export type GalleryImage = {
  image: string;
  caption?: string;
};

export type RidingArea = {
  name: string;
  type?: string; // e.g. "National Forest", "WMA", "State Forest"
  region: string; // e.g. "Ocala, FL"
  description: string;
  mapUrl?: string; // full Google Maps link; auto-generated from name + region if omitted
  moreInfoUrl?: string; // official site with permit/trail info
  image?: string;
};
