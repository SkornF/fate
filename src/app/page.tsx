import Image from "next/image";
import eventsData from "@/data/events.json";
import siteContent from "@/data/site.json";
import galleryData from "@/data/gallery.json";
import ridingAreasData from "@/data/riding-areas.json";
import type {
  FateEvent,
  SiteContent,
  GalleryImage,
  RidingArea,
} from "@/data/types";

const events = eventsData.events as FateEvent[];
const site = siteContent as SiteContent;
const galleryImages = galleryData.images as GalleryImage[];
const ridingAreas = ridingAreasData.areas as RidingArea[];

const DATE_OPTS: Intl.DateTimeFormatOptions = {
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
};
const TIME_OPTS: Intl.DateTimeFormatOptions = {
  hour: "numeric",
  minute: "2-digit",
};

function getMapHref(event: FateEvent) {
  return (
    event.mapUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      event.location,
    )}`
  );
}

function getAreaMapHref(area: RidingArea) {
  return (
    area.mapUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${area.name} ${area.region}`,
    )}`
  );
}

function getDateBadge(event: FateEvent) {
  const start = new Date(event.start);
  return {
    month: start.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
    day: start.getDate(),
  };
}

function formatEventWhen(event: FateEvent) {
  const start = new Date(event.start);
  const end = event.end ? new Date(event.end) : null;

  const startDateStr = start.toLocaleDateString("en-US", DATE_OPTS);
  const startTimeStr = start.toLocaleTimeString("en-US", TIME_OPTS);

  if (!end) {
    return `${startDateStr} · ${startTimeStr}`;
  }

  const endTimeStr = end.toLocaleTimeString("en-US", TIME_OPTS);
  const sameDay = start.toDateString() === end.toDateString();

  if (sameDay) {
    return `${startDateStr} · ${startTimeStr} – ${endTimeStr}`;
  }

  const endDateStr = end.toLocaleDateString("en-US", DATE_OPTS);
  return `${startDateStr}, ${startTimeStr} – ${endDateStr}, ${endTimeStr}`;
}

function MapPinIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M10 18s6-5.686 6-10a6 6 0 10-12 0c0 4.314 6 10 6 10zm0-7a3 3 0 100-6 3 3 0 000 6z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <path d="M22 12a10 10 0 10-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.5-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0022 12z" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <path d="M9 10a4 4 0 100-8 4 4 0 000 8zM3 18a6 6 0 0112 0v.5a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5V18zM16.5 8.5a3 3 0 10-2.7-4.3c-.13.26.02.55.28.66A5.98 5.98 0 0117 10v.28c0 .18.13.34.31.36 1.02.14 1.69-.9 1.69-1.9V8.5a2 2 0 00-2.5-1.94V8.5z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.5A2.25 2.25 0 0117.75 6.25v9A2.25 2.25 0 0115.5 17.5h-11A2.25 2.25 0 012.25 15.25v-9A2.25 2.25 0 014.5 4h.5V2.75A.75.75 0 015.75 2zM3.75 8v7.25c0 .414.336.75.75.75h11a.75.75 0 00.75-.75V8h-12.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function CompassIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.06-11.06a.75.75 0 01.24.86l-1.4 3.9a1.5 1.5 0 01-.9.9l-3.9 1.4a.75.75 0 01-.96-.96l1.4-3.9a1.5 1.5 0 01.9-.9l3.9-1.4a.75.75 0 01.72.1z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M6.5 3.5A1.5 1.5 0 018 2h4a1.5 1.5 0 011.5 1.5V4h1A2.5 2.5 0 0117 6.5v8A2.5 2.5 0 0114.5 17h-9A2.5 2.5 0 013 14.5v-8A2.5 2.5 0 015.5 4h1v-.5zM10 7a3.5 3.5 0 100 7 3.5 3.5 0 000-7z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function Home() {
  const now = new Date();
  const upcomingEvents = events
    .filter((event) => new Date(event.end ?? event.start) >= now)
    .sort((a, b) => a.start.localeCompare(b.start));

  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-neutral-800">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <span className="text-lg font-bold tracking-widest">F.A.T.E.</span>
          <div className="flex gap-6 text-sm text-neutral-400">
            <a href="#about" className="hover:text-neutral-100">
              About
            </a>
            {ridingAreas.length > 0 && (
              <a href="#riding-areas" className="hover:text-neutral-100">
                Riding Areas
              </a>
            )}
            <a href="#events" className="hover:text-neutral-100">
              Events
            </a>
            {galleryImages.length > 0 && (
              <a href="#gallery" className="hover:text-neutral-100">
                Gallery
              </a>
            )}
            <a href="#contact" className="hover:text-neutral-100">
              Contact
            </a>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden">
          {site.heroImage && (
            <>
              <div
                className="absolute inset-x-0 top-0 aspect-[4/3] sm:aspect-auto sm:h-full"
                style={{
                  maskImage:
                    "linear-gradient(to bottom, black 55%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black 55%, transparent 100%)",
                }}
              >
                <Image
                  src={site.heroImage}
                  alt=""
                  fill
                  priority
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/55 via-neutral-950/80 to-neutral-950" />
            </>
          )}
          <div
            className="bg-dot-grid pointer-events-none absolute inset-0"
            style={{
              maskImage:
                "radial-gradient(ellipse 60% 55% at 50% 35%, black 0%, transparent 75%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 60% 55% at 50% 35%, black 0%, transparent 75%)",
            }}
          />
          <div className="relative mx-auto max-w-5xl px-6 py-24 text-center sm:py-32">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">
              Florida Off-Road Riding
            </p>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-6xl">
              F.A.T.E.
            </h1>
            <p className="mt-2 text-sm font-medium text-neutral-500 sm:text-base">
              {site.heroSubheading}
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-400">
              {site.memberCountText}
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <a
                href={site.facebookGroupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-orange-600 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-500"
              >
                <FacebookIcon />
                Join Us on Facebook
              </a>
              <a
                href="#about"
                className="rounded-md border border-neutral-700 bg-neutral-950/40 px-6 py-3 text-sm font-semibold text-neutral-200 backdrop-blur-sm hover:border-neutral-500"
              >
                Learn More
              </a>
            </div>

            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 border-t border-neutral-800 pt-10 sm:grid-cols-3">
              <div>
                <p className="text-3xl font-extrabold text-orange-500 sm:text-4xl">
                  {site.stat1Value}
                </p>
                <p className="mt-1 text-sm text-neutral-400">
                  {site.stat1Label}
                </p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-orange-500 sm:text-4xl">
                  {site.stat2Value}
                </p>
                <p className="mt-1 text-sm text-neutral-400">
                  {site.stat2Label}
                </p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-orange-500 sm:text-4xl">
                  {site.stat3Value}
                </p>
                <p className="mt-1 text-sm text-neutral-400">
                  {site.stat3Label}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="about"
          className="border-t border-neutral-800 bg-neutral-900/40"
        >
          <div className="mx-auto max-w-5xl px-6 py-20">
            <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">
              <UsersIcon />
              About Us
            </h2>
            <p className="mt-4 max-w-3xl text-2xl font-semibold text-neutral-100">
              {site.aboutHeadline}
            </p>
            <p className="mt-6 max-w-3xl text-neutral-400">
              {site.aboutBody}
            </p>
          </div>
        </section>

        {ridingAreas.length > 0 && (
          <section id="riding-areas" className="border-t border-neutral-800">
            <div className="mx-auto max-w-5xl px-6 py-20">
              <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">
                <CompassIcon />
                Riding Areas
              </h2>

              <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {ridingAreas.map((area) => (
                  <li
                    key={area.name}
                    className="overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/40"
                  >
                    {area.image && (
                      <div className="relative aspect-video w-full">
                        <Image
                          src={area.image}
                          alt=""
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-semibold text-neutral-100">
                          {area.name}
                        </h3>
                        {area.type && (
                          <span className="rounded-full bg-orange-600/10 px-2 py-0.5 text-xs font-semibold text-orange-500">
                            {area.type}
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-neutral-500">
                        {area.region}
                      </p>
                      <p className="mt-3 text-sm text-neutral-400">
                        {area.description}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                        <a
                          href={getAreaMapHref(area)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-medium text-orange-500 hover:text-orange-400"
                        >
                          <MapPinIcon />
                          Map
                        </a>
                        {area.moreInfoUrl && (
                          <a
                            href={area.moreInfoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-orange-500 hover:text-orange-400"
                          >
                            More info ↗
                          </a>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <section id="events" className="border-t border-neutral-800">
          <div className="mx-auto max-w-5xl px-6 py-20">
            <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">
              <CalendarIcon />
              Upcoming Events
            </h2>

            {upcomingEvents.length === 0 ? (
              <p className="mt-4 max-w-2xl text-neutral-400">
                Nothing posted here yet — rides and trail days are being
                planned all the time in the{" "}
                <a
                  href={site.facebookGroupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-500 hover:text-orange-400"
                >
                  Facebook group
                </a>
                . Check there for the latest.
              </p>
            ) : (
              <ul className="mt-8 space-y-4">
                {upcomingEvents.map((event) => {
                  const badge = getDateBadge(event);
                  return (
                    <li
                      key={`${event.start}-${event.title}`}
                      className="group flex gap-5 rounded-lg border border-neutral-800 bg-neutral-900/40 p-5 transition-colors hover:border-orange-600/40"
                    >
                      <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-md bg-orange-600/10">
                        <span className="text-xs font-bold uppercase tracking-wide text-orange-500">
                          {badge.month}
                        </span>
                        <span className="text-2xl font-extrabold leading-none text-orange-500">
                          {badge.day}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-lg font-semibold text-neutral-100">
                          {event.link ? (
                            <a
                              href={event.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="transition-colors group-hover:text-orange-500"
                            >
                              {event.title}
                            </a>
                          ) : (
                            event.title
                          )}
                        </p>
                        <p className="mt-1 text-sm text-neutral-400">
                          {formatEventWhen(event)}
                        </p>
                        {event.description && (
                          <p className="mt-2 text-sm text-neutral-400">
                            {event.description}
                          </p>
                        )}
                        <a
                          href={getMapHref(event)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-orange-500 hover:text-orange-400"
                        >
                          <MapPinIcon />
                          {event.location}
                        </a>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </section>

        {galleryImages.length > 0 && (
          <section
            id="gallery"
            className="border-t border-neutral-800 bg-neutral-900/40"
          >
            <div className="mx-auto max-w-5xl px-6 py-20">
              <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">
                <CameraIcon />
                Gallery
              </h2>
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {galleryImages.map((photo, i) => (
                  <div
                    key={`${photo.image}-${i}`}
                    className="group relative aspect-square overflow-hidden rounded-md bg-neutral-800"
                  >
                    <Image
                      src={photo.image}
                      alt={photo.caption ?? ""}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {photo.caption && (
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
                        <p className="text-xs text-neutral-100">
                          {photo.caption}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <footer
        id="contact"
        className="border-t border-neutral-800 px-6 py-10 text-center text-sm text-neutral-500"
      >
        <p>
          Want to ride with us?{" "}
          <a
            href={site.facebookGroupUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-500 hover:text-orange-400"
          >
            Join the Facebook group
          </a>
          .
        </p>
        <p className="mt-2">© {new Date().getFullYear()} F.A.T.E.</p>
      </footer>
    </div>
  );
}
