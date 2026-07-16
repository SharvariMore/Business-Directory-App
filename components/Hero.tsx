"use client";

import category from "@/data/category";
import Image from "next/image";
import React, { useState } from "react";

function Hero({ userInput }: any) {
  const [searchPlace, setSearchPlace] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleSearch = () => {
    const trimmedSearch = searchPlace.trim();

    if (!trimmedSearch) return;

    setSelectedCategory("");
    userInput(trimmedSearch);
  };

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setSearchPlace(categoryName);
    userInput(categoryName);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="relative overflow-hidden text-center font-serif">
      {/* Background image */}
      <Image
        src="/bg-1.png"
        alt="City background"
        width={1600}
        height={400}
        priority
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30"
      />

      {/* Hero content */}
      <div className="relative z-10 mt-10 px-4 pb-8">
        <h1 className="text-[40px] font-semibold tracking-widest text-red-600 md:text-[55px]">
          EXPLORE
        </h1>

        <h2 className="text-xl md:text-2xl">Your Amazing City</h2>

        {/* Search */}
        <div className="z-10 mt-5 flex items-center justify-center gap-2">
          <input
            value={searchPlace}
            onChange={(event) => setSearchPlace(event.target.value)}
            onKeyDown={handleKeyDown}
            type="text"
            placeholder="Search Anything..."
            className="z-10 w-[75%] rounded-full border border-gray-400 bg-white p-3 px-5 shadow-lg outline-red-300 md:w-[50%] lg:w-[36%]"
          />

          <button
            type="button"
            onClick={handleSearch}
            aria-label="Search places"
            className="z-10 cursor-pointer rounded-full bg-red-600 p-3 shadow-md transition-all hover:scale-105 hover:bg-red-700
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </div>

        {/* Categories */}
        <div className="mt-5 flex flex-col items-center justify-center">
          <h2 className="text-xl font-medium">Or Browse the Category</h2>

          <div className="mt-4 grid w-full grid-cols-3 justify-items-center gap-5 sm:grid-cols-4 md:w-[80%] md:grid-cols-7 lg:w-[60%]">
            {category.map((item, index) => {
              const isSelected = selectedCategory === item.name;

              return (
                <button
                  type="button"
                  key={`${item.name}-${index}`}
                  onClick={() => handleCategoryClick(item.name)}
                  className="group flex flex-col items-center gap-2 cursor-pointer"
                >
                  <div
                    className={`flex h-18 w-18 items-center justify-center rounded-full bg-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl
                      ${
                        isSelected
                          ? "scale-110 border-2 border-red-600"
                          : "border-2 border-transparent"
                      }
                    `}
                  >
                    <Image
                      src={item.icon}
                      alt={item.name}
                      width={32}
                      height={32}
                      className="object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  {/* Category name */}
                  <span
                    className={`text-sm font-medium transition-colors
                      ${
                        isSelected
                          ? "text-red-600"
                          : "text-gray-700 group-hover:text-red-600"
                      }
                    `}
                  >
                    {item.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected category message */}
          {selectedCategory && (
            <div className="mt-5 rounded-full bg-red-50 px-5 py-2 text-sm font-medium text-red-600">
              Showing results for: {selectedCategory}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Hero;
