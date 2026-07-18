"use client";

import React, { useEffect, useState } from "react";
import type { FormEvent } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

interface ContactApiResponse {
  success?: boolean;
  message?: string;
}

// Replace this with your real public contact email.
const DISPLAY_CONTACT_EMAIL = "sharvarimore90@gmail.com";

function ContactPage() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  // Hide success or error message after 5 seconds.
  useEffect(() => {
    if (!statusMessage) return;

    const timer = window.setTimeout(() => {
      setStatusMessage("");
      setStatus("idle");
    }, 5000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [statusMessage]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const requestBody = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      subject: String(formData.get("subject") || "").trim(),
      message: String(formData.get("message") || "").trim(),
      website: String(formData.get("website") || "").trim(),
    };

    setStatus("submitting");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const result = (await response
        .json()
        .catch(() => ({}))) as ContactApiResponse;

      if (!response.ok) {
        throw new Error(result.message || "The message could not be sent.");
      }

      setStatus("success");
      setStatusMessage(
        result.message ||
          "Your message was sent successfully. We will respond soon.",
      );

      form.reset();
    } catch (error) {
      setStatus("error");

      setStatusMessage(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again.",
      );
    }
  };

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

            <div className="space-y-7">
              <div>
                <p className="mb-1 text-sm text-red-100">Email</p>

                <a
                  href={`mailto:${DISPLAY_CONTACT_EMAIL}`}
                  className="break-all text-lg font-semibold hover:underline"
                >
                  {DISPLAY_CONTACT_EMAIL}
                </a>
              </div>

              <div>
                <p className="mb-1 text-sm text-red-100">Response time</p>

                <p className="text-lg font-semibold">
                  Usually within 1 - 2 business days
                </p>
              </div>

              <div>
                <p className="mb-1 text-sm text-red-100">Support hours</p>

                <p className="text-lg font-semibold">
                  Monday - Friday, 9 AM - 5 PM EST
                </p>

                {/* <p className="text-red-50">
                  9 AM - 5 PM EST
                </p> */}
              </div>

              <div>
                <p className="mb-1 text-sm text-red-100">We can help with</p>

                <p className="leading-7 text-red-50">
                  Search problems, incorrect place information, map issues,
                  feature requests, and general feedback.
                </p>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="p-8 md:p-12">
            <h2 className="mb-2 text-2xl font-semibold text-gray-900">
              Send Us A Message!
            </h2>

            <p className="mb-7 text-sm leading-6 text-gray-500">
              Complete the form and your message will be sent to the Explore
              support inbox.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
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
                  maxLength={100}
                  autoComplete="name"
                  placeholder="Enter your name"
                  disabled={status === "submitting"}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100 disabled:cursor-not-allowed disabled:bg-gray-100"
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
                  maxLength={254}
                  autoComplete="email"
                  placeholder="Enter your email"
                  disabled={status === "submitting"}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100 disabled:cursor-not-allowed disabled:bg-gray-100"
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
                  maxLength={150}
                  placeholder="How can we help?"
                  disabled={status === "submitting"}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100 disabled:cursor-not-allowed disabled:bg-gray-100"
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
                  maxLength={5000}
                  rows={6}
                  placeholder="Write your message"
                  disabled={status === "submitting"}
                  className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100 disabled:cursor-not-allowed disabled:bg-gray-100"
                />
              </div>

              {/* Hidden spam-protection field */}
              <div
                aria-hidden="true"
                className="absolute -left-2500 top-auto h-px w-px overflow-hidden"
              >
                <label htmlFor="website">Leave this field empty</label>

                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-red-600 px-6 py-3 font-semibold text-white transition-all hover:scale-[1.02] hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
              >
                {status === "submitting" ? (
                  <>
                    <svg
                      className="h-5 w-5 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />

                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z"
                      />
                    </svg>

                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.8}
                      stroke="currentColor"
                      className="h-5 w-5 -rotate-45"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L6 12Zm0 0h7.5"
                      />
                    </svg>
                  </>
                )}
              </button>

              {statusMessage && (
                <div
                  role="status"
                  aria-live="polite"
                  className={`rounded-lg border px-4 py-3 text-sm ${
                    status === "success"
                      ? "border-green-200 bg-green-50 text-green-700"
                      : "border-red-200 bg-red-50 text-red-700"
                  }`}
                >
                  {statusMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ContactPage;
