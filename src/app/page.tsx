const FACEBOOK_GROUP_URL = "https://www.facebook.com/groups/fatemcmx";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-neutral-800">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <span className="text-lg font-bold tracking-widest">F.A.T.E.</span>
          <div className="flex gap-6 text-sm text-neutral-400">
            <a href="#about" className="hover:text-neutral-100">
              About
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
          <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-400">
            9,000+ Florida dirt bike riders hitting the trails, wrenching on
            bikes, and riding together every chance we get.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <a
              href={FACEBOOK_GROUP_URL}
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
              We&apos;re a growing community of Florida off-road riders
              who&apos;d rather be on two wheels than anywhere else.
            </p>
            <p className="mt-6 max-w-3xl text-neutral-400">
              F.A.T.E. — Florida Adventure and Trail Exploration — started as
              a Facebook group and has grown into a community of over 9,000
              riders. Whether it&apos;s a weekend trail day, a group ride out
              to one of Florida&apos;s off-road parks, or just swapping
              stories and wrench tips, F.A.T.E. is about riding together and
              looking out for each other on and off the trail. Riders of all
              experience levels are welcome — the easiest way to jump in is
              through the Facebook group.
            </p>
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
            href={FACEBOOK_GROUP_URL}
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
