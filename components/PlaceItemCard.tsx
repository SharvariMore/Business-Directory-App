import Image from "next/image";
import React from "react";

const BASE_URL_PHOTO =
  "https://maps.googleapis.com/maps/api/place/photo?maxwidth=800";

interface PlacePhoto {
  photo_reference: string;
}

interface Place {
  place_id?: string;
  name?: string;
  formatted_address?: string;
  rating?: number;
  user_ratings_total?: number;
  photos?: PlacePhoto[];
}

interface PlaceItemCardProps {
  place: Place;
}

function PlaceItemCard({ place }: PlaceItemCardProps) {
  const photoReference = place?.photos?.[0]?.photo_reference;
  const googlePlacesKey = process.env.NEXT_PUBLIC_GOOGLE_PLACE_KEY;

  const imageUrl =
    photoReference && googlePlacesKey
      ? `${BASE_URL_PHOTO}&photo_reference=${photoReference}&key=${googlePlacesKey}`
      : "/placeholder.jpg";

  return (
    <article
      className="flex h-100 w-full cursor-pointer flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <Image
        src={imageUrl}
        alt={place?.name ? `${place.name} image` : "Place image"}
        width={800}
        height={450}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="h-56.25 w-full shrink-0 object-cover"
      />

      {/* Card content */}
      <div className="flex min-h-0 flex-1 flex-col p-3">
        {/* Place name */}
        <h2 className="min-h-14 line-clamp-2 text-xl font-medium leading-7 text-black">
          {place?.name || "Unknown place"}
        </h2>

        {/* Address */}
        <div className="mt-3 flex min-h-12 items-start gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6 shrink-0 text-red-500"
            aria-hidden="true"
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

          <p className="line-clamp-2 text-sm leading-5 text-gray-400">
            {place?.formatted_address || "Address unavailable"}
          </p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 pt-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5 shrink-0 text-red-500"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>

          <p className="text-sm tracking-wide text-gray-400">
            {place?.rating ?? "No rating"}

            {place?.user_ratings_total !== undefined && (
              <span> ({place.user_ratings_total})</span>
            )}
          </p>
        </div>
      </div>
    </article>
  );
}

export default PlaceItemCard;
