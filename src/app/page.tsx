import eventsData from "@/data/events.json";
import siteContent from "@/data/site.json";
import type { FateEvent, SiteContent } from "@/data/types";

const events = eventsData.events as FateEvent[];
const site = siteContent as SiteContent;

function formatEventDate(dateStr: string) {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function Home() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcomingEvents = events
    .filter((event) => new Date(`${event.date}T00:00:00`) >= today)
    .sort((a, b) => a.date.localeCompare(b.date));

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
                {upcomingEvents.map((event) => (
                  <li
                    key={`${event.date}-${event.title}`}
                    className="flex flex-col gap-1 rounded-md border border-neutral-800 bg-neutral-900/40 p-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                  >
                    <div>
                      <p className="text-lg font-semibold text-neutral-100">
                        {event.link ? (
                          <a
                            href={event.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-orange-500"
                          >
                            {event.title}
                          </a>
                        ) : (
                          event.title
                        )}
                      </p>
                      {event.description && (
                        <p className="mt-1 text-sm text-neutral-400">
                          {event.description}
                        </p>
                      )}
                    </div>
                    <div className="shrink-0 text-sm text-neutral-400 sm:text-right">
                      <p>{formatEventDate(event.date)}</p>
                      <p>{event.location}</p>
                    </div>
                  </li>
                ))}
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
