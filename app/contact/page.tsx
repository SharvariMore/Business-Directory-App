import React from "react";

function ContactPage() {
  return (
    <main className="min-h-[calc(100vh-75px)] bg-gray-50 px-5 py-14 font-serif">
      <section className="mx-auto max-w-5xl">
        <div className="grid overflow-hidden rounded-2xl bg-white shadow-md md:grid-cols-2">
          {/* Contact information */}
          <div className="bg-red-600 p-8 text-white md:p-12">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-red-100">
              Contact us
            </p>

            <h1 className="mb-5 text-3xl font-bold md:text-4xl">
              We would love to hear from you
            </h1>

            <p className="mb-10 leading-7 text-red-50">
              Contact the Explore team to report an issue, suggest a feature,
              ask a question, or share feedback about your experience.
            </p>

            <div className="space-y-6">
              <div>
                <p className="mb-1 text-sm text-red-100">Email</p>

                <a
                  href="mailto:support@example.com"
                  className="text-lg font-semibold hover:underline"
                >
                  support@example.com
                </a>
              </div>

              <div>
                <p className="mb-1 text-sm text-red-100">Phone</p>

                <a
                  href="tel:+13055550123"
                  className="text-lg font-semibold hover:underline"
                >
                  +1 (305) 555-0123
                </a>
              </div>

              <div>
                <p className="mb-1 text-sm text-red-100">Support hours</p>

                <p className="text-lg font-semibold">
                  Monday - Friday, 9 AM - 5 PM
                </p>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="p-8 md:p-12">
            <h2 className="mb-6 text-2xl font-semibold text-gray-900">
              Send Us A Message!
            </h2>

            <form className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Your Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Enter your name"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Subject
                </label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  placeholder="How can we help?"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Write your message"
                  className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                />
              </div>

              <button
                type="submit"
                className="w-full cursor-pointer rounded-full bg-red-600 px-6 py-3 font-semibold text-white transition-all hover:scale-[1.02] hover:bg-red-700"
              >
                Send message
              </button>
            </form>

            <p className="mt-4 text-xs leading-5 text-gray-400">
              The contact details above are sample details. Replace them with
              your actual email address and phone number before publishing.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ContactPage;