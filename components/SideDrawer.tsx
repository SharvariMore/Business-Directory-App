"use client";

import Image from "next/image";
import React, { useState } from "react";

const BASE_URL_PHOTO =
  "https://maps.googleapis.com/maps/api/place/photo?maxwidth=800";

function SideDrawer({ place, close }: any) {
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [copied, setCopied] = useState(false);

  const photoReference = place?.photos?.[0]?.photo_reference;

  const imageUrl = photoReference
    ? `${BASE_URL_PHOTO}&photo_reference=${photoReference}&key=${process.env.NEXT_PUBLIC_GOOGLE_PLACE_KEY}`
    : "/placeholder.jpg";

  const locationQuery = `${place?.name || ""} ${
    place?.formatted_address || ""
  }`.trim();

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    locationQuery,
  )}`;

  const shareText = `Check out ${place?.name || "this location"}${
    place?.formatted_address ? ` at ${place.formatted_address}` : ""
  }`;

  const onDirectionClick = () => {
    window.open(mapUrl, "_blank", "noopener,noreferrer");
  };

  const openShareWindow = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
    setShowShareOptions(false);
  };

  const shareOnWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
      `${shareText}\n${mapUrl}`,
    )}`;

    openShareWindow(whatsappUrl);
  };

  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      mapUrl,
    )}`;

    openShareWindow(facebookUrl);
  };

  const shareOnX = () => {
    const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText,
    )}&url=${encodeURIComponent(mapUrl)}`;

    openShareWindow(xUrl);
  };

  const shareByEmail = () => {
    const subject = encodeURIComponent(`Check out ${place?.name || "this place"}`);
    const body = encodeURIComponent(`${shareText}\n\n${mapUrl}`);

    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    setShowShareOptions(false);
  };

  const copyLocationLink = async () => {
    try {
      await navigator.clipboard.writeText(mapUrl);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
        setShowShareOptions(false);
      }, 1500);
    } catch (error) {
      console.error("Could not copy the location link:", error);
    }
  };

  const openNativeShare = async () => {
    if (!navigator.share) {
      await copyLocationLink();
      return;
    }

    try {
      await navigator.share({
        title: place?.name || "Location",
        text: shareText,
        url: mapUrl,
      });

      setShowShareOptions(false);
    } catch (error) {
      console.log("Share menu closed:", error);
    }
  };

  return (
    <div className="h-screen w-screen md:w-100 bg-white shadow-lg p-5 z-20 overflow-auto">
      <button
        type="button"
        className="cursor-pointer"
        onClick={close}
        aria-label="Close place details"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div>
        <h2 className="line-clamp-2 text-[20px] font-semibold mb-3">
          {place?.name}
        </h2>

        <Image
          src={imageUrl}
          alt={place?.name || "Place image"}
          width={800}
          height={340}
          className="w-full rounded-xl h-42.5 object-cover"
        />

        {/* Address */}
        <div className="flex gap-2 mt-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 shrink-0 text-red-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>

          <h2 className="text-[16px] text-gray-400 line-clamp-2">
            {place?.formatted_address}
          </h2>
        </div>

        {/* Rating */}
        <div className="flex gap-2 mt-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 shrink-0 text-red-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>

          <h2 className="text-[16px] text-gray-400 tracking-wider flex items-center">
            {place?.rating ?? "No rating"} (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
            <span>{place?.user_ratings_total ?? 0}</span>)
          </h2>
        </div>

        {/* Direction and share buttons */}
        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={onDirectionClick}
            className="flex items-center gap-2 p-1 px-3 bg-red-500 rounded-full text-white hover:scale-105 transition-all cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
              />
            </svg>

            <span>Direction</span>
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setShowShareOptions((currentValue) => !currentValue)
              }
              className="flex items-center gap-2 p-1 px-3 bg-red-500 rounded-full text-white hover:scale-105 transition-all cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                />
              </svg>

              <span>Share</span>
            </button>

            {/* Share options */}
            {showShareOptions && (
              <div className="absolute right-0 top-full z-50 mt-3 w-55 overflow-hidden rounded-xl border border-gray-200 bg-white text-black shadow-xl">
                <div className="border-b border-gray-100 px-4 py-3">
                  <h3 className="font-semibold">Share location</h3>
                  <p className="mt-1 line-clamp-1 text-xs text-gray-400">
                    {place?.name}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={shareOnWhatsApp}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-gray-100 cursor-pointer"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 font-semibold text-white">
                    W
                  </span>
                  <span>WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={shareOnFacebook}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-gray-100 cursor-pointer"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                    f
                  </span>
                  <span>Facebook</span>
                </button>

                <button
                  type="button"
                  onClick={shareOnX}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-gray-100 cursor-pointer"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white">
                    X
                  </span>
                  <span>Share on X</span>
                </button>

                <button
                  type="button"
                  onClick={shareByEmail}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-gray-100 cursor-pointer"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-500 text-white">
                    @
                  </span>
                  <span>Email</span>
                </button>

                <button
                  type="button"
                  onClick={copyLocationLink}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-gray-100 cursor-pointer"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white">
                    🔗
                  </span>
                  <span>{copied ? "Link copied!" : "Copy link"}</span>
                </button>

                <button
                  type="button"
                  onClick={openNativeShare}
                  className="flex w-full items-center gap-3 border-t border-gray-100 px-4 py-3 text-left hover:bg-gray-100 cursor-pointer"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-white">
                    •••
                  </span>
                  <span>More options</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Google map */}
        <div className="mt-5">
          <iframe
            width="450"
            height="250"
            loading="lazy"
            title={`${place?.name || "Place"} map`}
            className="w-full h-50 rounded-lg"
            src={`https://www.google.com/maps/embed/v1/place?key=${
              process.env.NEXT_PUBLIC_GOOGLE_PLACE_KEY
            }&q=${encodeURIComponent(place?.formatted_address || locationQuery)}`}
          />
        </div>
      </div>
    </div>
  );
}

export default SideDrawer;