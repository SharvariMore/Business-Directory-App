"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const navigationItems = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Contact Us",
    href: "/contact",
  },
];

function Header() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="relative z-30 flex items-center justify-between bg-white p-3 px-5 shadow-sm">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3">
        <Image
          src="/logo.png"
          alt="Explore logo"
          width={50}
          height={50}
          priority
        />

        <h2 className="font-serif text-[25px] font-semibold tracking-widest text-red-600 transition-colors hover:text-rose-800">
          EXPLORE
        </h2>
      </Link>

      {/* Navigation */}
      <nav aria-label="Main navigation">
        <ul className="flex items-center gap-4 md:gap-8">
          {navigationItems.map((item) => {
            const active = isActive(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`
                    relative
                    py-2
                    font-serif
                    text-[14px]
                    transition-colors
                    md:text-[16px]
                    ${
                      active
                        ? "font-semibold text-red-600"
                        : "text-gray-800 hover:text-red-500"
                    }
                  `}
                >
                  {item.name}

                  {active && (
                    <span className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-red-600" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

export default Header;