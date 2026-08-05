import eventsData from "@/data/events.json";
import siteContent from "@/data/site.json";
import type { FateEvent, SiteContent } from "@/data/types";

const events = eventsData.events as FateEvent[];
const site = siteContent as SiteContent;

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
            <a href="#events" className="hover:text-neutral-100">
              Events
            </a>
            <a href="#contact" className="hover:text-neutral-100">
              Contact
            </a>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-6 py-24 text-center sm:py-32">
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
              className="rounded-md bg-orange-600 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-500"
            >
              Join Us on Facebook
            </a>
            <a
              href="#about"
              className="rounded-md border border-neutral-700 px-6 py-3 text-sm font-semibold text-neutral-200 hover:border-neutral-500"
            >
              Learn More
            </a>
          </div>
        </section>

        <section
          id="about"
          className="border-t border-neutral-800 bg-neutral-900/40"
        >
          <div className="mx-auto max-w-5xl px-6 py-20">
            <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">
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

        <section id="events" className="border-t border-neutral-800">
          <div className="mx-auto max-w-5xl px-6 py-20">
            <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">
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
