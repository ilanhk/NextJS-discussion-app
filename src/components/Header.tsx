import { Suspense } from "react"; //need to add Suspense for SearchInput or else there will be a warning/error when run build
import Link from "next/link";
import { 
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import HeaderAuth from "@/components/HeaderAuth";
import SearchInput from "@/components/SearchInput";  


export default function Header() {
  

  return (
    <Navbar className="shadow mb-6">
      <NavbarBrand>
        <Link href="/" className="font-bold">Discussion</Link>
      </NavbarBrand>

      <NavbarContent justify="center">
        <NavbarItem>
          <Suspense>
            <SearchInput />
          </Suspense>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
          <HeaderAuth />
      </NavbarContent>
    </Navbar>
  );
};
