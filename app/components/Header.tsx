"use client";

import Link from "next/link";
import { useState } from "react";
import { FaTasks } from "react-icons/fa";
import { CgMenuGridO } from "react-icons/cg";
import Report from "./Report";
import Setting from "./Setting";
import SignIn from "./SignIn";
import Others from "./Others";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-10 py-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 font-bold text-2xl">
          <FaTasks />
          Talk Less Do More
        </Link>

        {/* Toggle + Menu Mobile Wrapper */}
        <div className="relative lg:hidden">
          {/* Button toggle (mobile only) */}
          <button
            className="btn p-2 min-h-0 h-auto"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <CgMenuGridO className="text-xl" />
          </button>

          {/* Menu mobile (dropdown style) */}
          {menuOpen && (
            <nav className="absolute right-0 top-full mt-2 w-max bg-base-100 border shadow-white shadow-md rounded-md pe-8">
              <ul className="flex flex-col p-3 gap-2 text-sm">
                <li>
                  <Report />
                </li>
                <li>
                  <Setting />
                </li>
                <li>
                  <SignIn />
                </li>
                <li>
                  <Others />
                </li>
              </ul>
            </nav>
          )}
        </div>

        {/* Menu desktop */}
        <nav className="hidden lg:block">
          <ul className="flex gap-8 items-center">
            <li>
              <Report />
            </li>
            <li>
              <Setting />
            </li>
            <li>
              <SignIn />
            </li>
            <li>
              <Others />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
