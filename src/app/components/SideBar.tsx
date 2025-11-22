"use client";

import Link from "next/link";
import { X } from "lucide-react";
import React from "react";

interface Category {
  label: string;
  value: string;
}

interface SideBarProps {
  open: boolean;
  onClose: () => void;
  categories: Category[];
}

const SideBar: React.FC<SideBarProps> = ({ open, onClose, categories }) => {
  return (
    <aside
      className={`
        fixed top-0 right-0 h-full w-72 bg-white/90 backdrop-blur-md shadow-lg
        transform transition-all duration-300 z-50
        ${open ? "translate-x-0" : "translate-x-full"}
      `}
    >
      <div className="flex items-center justify-between px-4 py-4 border-b">
        <h2 className="text-lg font-semibold">Categories</h2>
        <button
          onClick={onClose}
          aria-label="Close Menu"
          className="p-1 rounded hover:bg-gray-100 cursor-pointer hover:text-black"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="px-4 py-6">
        <ul className="flex flex-col gap-3">
          {categories.map((cat) => (
            <li key={cat.value}>
              <Link
                href={`/category/${cat.value}`}
                onClick={onClose}
                className="block px-3 py-2 rounded hover:bg-gray-100"
              >
                {cat.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
