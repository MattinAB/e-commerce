"use client";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import { Search } from "lucide-react";
export default function SearchPage() {
  return (
    <InputGroup className=" m-3">
      <InputGroupInput
        placeholder="Search..."
        type="search"
        // onChange={(e) => console.log(e.target.value)}
      />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
    </InputGroup>
  );
}
