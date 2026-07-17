import Link from "next/link";
import React from "react";

function AboutPage() {
  return (
    <main className="min-h-[calc(100vh-75px)] bg-gray-50 px-5 py-14 font-serif">
      <section className="mx-auto max-w-5xl">
        <div className="rounded-2xl bg-white p-7 shadow-md md:p-12">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-red-600">
            About Explore
          </p>

          <h1 className="mb-5 text-3xl font-bold text-gray-900 md:text-5xl">
            Discover useful places around your city
          </h1>

          <p className="text-lg leading-8 text-gray-600">
            Explore is a location-discovery application that helps users find
            restaurants, cafés, gas stations, shopping centers, banks, tourist
            attractions, and other useful places. Users can search by name or
            category, view ratings and addresses, open directions in Google
            Maps, and share locations with friends and family.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <div className="rounded-xl border border-gray-200 p-5">
              <div className="mb-3 text-3xl">🔎</div>

              <h2 className="mb-2 text-xl font-semibold">Search places</h2>

              <p className="leading-6 text-gray-600">
                Search for businesses, landmarks, services, or destinations
                using a simple search bar.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-5">
              <div className="mb-3 text-3xl">📍</div>

              <h2 className="mb-2 text-xl font-semibold">View locations</h2>

              <p className="leading-6 text-gray-600">
                See the address, rating, customer review count, photos, and map
                location for each result.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-5">
              <div className="mb-3 text-3xl">🗺️</div>

              <h2 className="mb-2 text-xl font-semibold">
                Navigate and share
              </h2>

              <p className="leading-6 text-gray-600">
                Open directions in Google Maps or share a location through your
                preferred application.
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-xl bg-red-50 p-6">
            <h2 className="mb-2 text-2xl font-semibold text-gray-900">
              Start Exploring
            </h2>

            <p className="mb-5 text-gray-600">
              Return to the home page and search for places near your city.
            </p>

            <Link
              href="/"
              className="inline-flex rounded-full bg-red-600 px-6 py-3 text-white transition-all hover:scale-105 hover:bg-red-700"
            >
              Explore places
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AboutPage;