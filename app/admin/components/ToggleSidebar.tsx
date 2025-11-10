"use client";

import { Button } from "@/components/ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

interface ToggleSidebarProps {
  onClick: () => void;
}

export default function ToggleSidebar({ onClick }: ToggleSidebarProps) {
  return (
    <Button variant="outline" onClick={onClick}>
      <HamburgerMenuIcon />
    </Button>
  );
}
