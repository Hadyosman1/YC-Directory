"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const ResetSearchInputBtn = () => {
  const [isHidden, setIsHidden] = useState(true);
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const searchInput = document.getElementById(
      "hero-search-input",
    ) as HTMLInputElement | null;

    searchInputRef.current = searchInput;

    const checkIfInputDirty = () => {
      if (searchInput?.value) setIsHidden(false);
      else setIsHidden(true);
    };

    searchInput?.addEventListener("input", checkIfInputDirty);

    return () => {
      searchInput?.removeEventListener("input", checkIfInputDirty);
    };
  }, []);

  if (isHidden) return null;

  return (
    <button
      type={"reset"}
      onClick={() => {
        if (searchInputRef.current) searchInputRef.current.value = "";
        router.replace("/", { scroll: false });
        setIsHidden(true);
      }}
      className={"search-input-icon"}
    >
      X
    </button>
  );
};
export default ResetSearchInputBtn;
