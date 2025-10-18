"use client";

import React, { ReactNode } from "react";
import Link from "next/link";

type props = {
  href: string;
  children: ReactNode;
  onClick?: () => void;
};

const NavItem = ({ href, children, onClick }: props) => {
  return (
    <Link
      href={href}
      className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default NavItem;
