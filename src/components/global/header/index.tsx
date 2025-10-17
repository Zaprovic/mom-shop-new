"use client";

import React, { useState } from "react";
import { Button } from "../../ui/button";
import { Heart, ShoppingBag, Sparkles, Menu } from "lucide-react";
import { ModeToggle } from "../mode-toggle";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../../ui/sheet";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <Link href={"/"}>
            <span className="text-xl font-bold text-foreground">
              GlowBeauty
            </span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/shop"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Shop
          </Link>
          <SignedIn>
            <Link
              href="/product-management"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              My products
            </Link>
          </SignedIn>
          <a
            href="#"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Makeup
          </a>
          <a
            href="#"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            About
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Heart className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <ShoppingBag className="h-5 w-5" />
          </Button>
          <ModeToggle />

          {/* Authentication Section */}
          <SignedOut>
            <Link href="/sign-in">
              <Button variant="default" size="sm" className="hidden md:flex">
                Sign In
              </Button>
            </Link>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Shop
            </Link>
            <SignedIn>
              <Link
                href="/product-management"
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Manage my products
              </Link>
            </SignedIn>
            <a
              href="#"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Makeup
            </a>
            <a
              href="#"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About
            </a>

            {/* Mobile Authentication */}
            <div className="pt-4 border-t">
              <SignedOut>
                <Link href="/sign-in" onClick={() => setIsOpen(false)}>
                  <Button variant="default" className="w-full">
                    Sign In
                  </Button>
                </Link>
              </SignedOut>
              <SignedIn>
                <div className="flex items-center gap-2">
                  <UserButton afterSignOutUrl="/" />
                  <span className="text-sm text-foreground/80">Account</span>
                </div>
              </SignedIn>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Header;
