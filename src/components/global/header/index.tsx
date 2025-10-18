"use client";

import React, { useState } from "react";
import { Button } from "../../ui/button";
import { Heart, ShoppingBag, Sparkles, Menu } from "lucide-react";
import { ModeToggle } from "../mode-toggle";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../../ui/sheet";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import NavItem from "./_components/nav-item";

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
          <NavItem href="/shop">Shop</NavItem>
          <SignedIn>
            <NavItem href="/product-management">My products</NavItem>
          </SignedIn>
          <NavItem href="#">Makeup</NavItem>
          <NavItem href="#">About</NavItem>
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
            <NavItem href="/" onClick={() => setIsOpen(false)}>
              Home
            </NavItem>
            <NavItem href="/shop" onClick={() => setIsOpen(false)}>
              Shop
            </NavItem>
            <SignedIn>
              <NavItem
                href="/product-management"
                onClick={() => setIsOpen(false)}
              >
                Manage my products
              </NavItem>
            </SignedIn>
            <NavItem href="#" onClick={() => setIsOpen(false)}>
              Makeup
            </NavItem>
            <NavItem href="#" onClick={() => setIsOpen(false)}>
              About
            </NavItem>

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
