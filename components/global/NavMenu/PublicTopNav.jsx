"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ShoppingCart } from "lucide-react";

import APIKit from "@/lib/apiKit";
import { getToken } from "@/actions/cookieActions";

import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";

import Container from "@/components/shared/Container/Container";

export default function PublicTopNav() {
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: APIKit.categories.getAllCategories,
  });

  const { data: cart, isLoading: isCartLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: APIKit.cart.getCart,
  });

  return (
    <Container extraClassName="flex h-20 w-full shrink-0 items-center justify-between px-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <Link href="#" className="mr-6 hidden lg:flex" prefetch={false}>
            <MountainIcon className="h-6 w-6" />
            <span className="sr-only">OmniMart</span>
          </Link>
          <nav className="grid gap-2 py-6">
            <Link
              href="/home"
              className="flex w-full items-center py-2 text-lg font-semibold"
              prefetch={false}
            >
              Home
            </Link>
            {data?.data.categories?.map((navLink) => (
              <Link
                key={navLink.slug}
                href={`/categories/${navLink.slug}`}
                className="flex w-full items-center py-2 text-lg font-semibold"
                prefetch={false}
              >
                {navLink.name}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <Link href="/home" className="mr-6 hidden lg:flex" prefetch={false}>
        <MountainIcon className="h-6 w-6" />
        <span className="sr-only">OmniMart</span>
      </Link>
      <nav className="hidden lg:flex gap-6">
        <Link
          href={"/home"}
          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
          prefetch={false}
        >
          Home
        </Link>

        {data?.data.categories?.map((navLink) => (
          <Link
            key={navLink.slug}
            href={`/categories/${navLink.slug}`}
            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
            prefetch={false}
          >
            {navLink.name}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-5">
        <Link href="/user/cart" className="relative">
          <span className="absolute top-0 left-0 w-6 h-6 bg-red-600 text-center font-semibold text-white rounded-full transform -translate-y-4 translate-x-4">
            {isCartLoading ? (
              <span>...</span>
            ) : (
              <span>
                {cart.data.cart ? cart.data.cart.CartItems.length : 0}
              </span>
            )}
          </span>
          <ShoppingCart width={30} />
        </Link>
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
      </div>
    </Container>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
