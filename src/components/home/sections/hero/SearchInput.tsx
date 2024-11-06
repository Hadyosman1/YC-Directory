import React from "react";
import searchIcon from "@/../public/search.svg";
import Image from "next/image";
import Form from "next/form";
import ResetSearchInputBtn from "@/components/home/sections/hero/ResetSearchInputBtn";

const SearchInput = () => {
  return (
    <Form
      action="/"
      scroll={false}
      className="flex w-full max-w-[700px] items-center justify-center gap-1 overflow-hidden rounded-[80px] bg-white px-4 ring-[5px] ring-black md:px-9"
    >
      <input
        id={"hero-search-input"}
        name={"query"}
        type={"text"}
        placeholder={"SEARCH STARTUP"}
        className={
          "h-[55px] w-6 max-w-full grow py-2 text-base font-bold text-black placeholder:text-black focus:outline-none focus:placeholder:text-black-300 md:h-[70px] md:py-4 md:text-2xl md:leading-[70px]"
        }
      />

      <ResetSearchInputBtn />

      <button className={"search-input-icon"}>
        <Image
          src={searchIcon}
          alt={"search"}
          width={20}
          height={20}
          priority
        />
      </button>

      <label className={"sr-only"} htmlFor={"hero-search-input"}>
        search input
      </label>
    </Form>
  );
};
export default SearchInput;
