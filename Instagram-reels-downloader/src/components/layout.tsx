"use client";

import React from "react";
import Link from "next/link";

import { MobileNav } from "./mobile-nav";
import { ThemeToggle } from "./theme-toggle";

import { cn } from "@/lib/utils";

export function Navbar() {
  return (
    <header className="header">
      <div className="header-content">
        <a href="http://localhost:5000" className="logo">
          <span className="logo-icon">▶</span>
          <span className="logo-text">Video Downloader Pro</span>
        </a>
        <nav className="nav-links">
          <a href="http://localhost:5000" className="nav-link">YouTube</a>
          <a href="http://localhost:5000/facebook" className="nav-link">Facebook</a>
          <a href="http://localhost:3003" className="nav-link">Instagram</a>
          <a href="http://localhost:5000/about" className="nav-link">About</a>
          <a href="http://localhost:5000/help" className="nav-link">Help</a>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2024 Video Downloader Pro. Download videos responsibly and respect copyright laws.</p>
      </div>
    </footer>
  );
}
