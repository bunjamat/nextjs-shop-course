"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { LuShoppingCart } from "react-icons/lu";
import { MdLogout } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <nav className="container flex-between w-full mb-16 pt-3 max-w-7xl">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Next Shop</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex items-center gap-3 md:gap-5">
            <Link
              href="/cart"
              className="btn btn-primary rounded-full"
            >
              <FiShoppingCart className="w-6 h-6" />
              ตระกร้าของฉัน
            </Link>

            <button
              type="button"
              onClick={signOut}
              className="btn btn-error rounded-full gap-2"
            >
              <MdLogout className="w-6 h-6" />
              ออกจากระบบ
            </button>

            <Link href="/">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="btn btn-neutral rounded-full gap-2"
                >
                  <FcGoogle className="w-6 h-6" />
                  เข้าสู่ระบบด้วย Google
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex items-center ">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/cart"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  ตระกร้าของฉัน
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full btn btn-error"
                >
                  ออกจากระบบ
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="btn btn-accent"
                >
                  <FcGoogle className="w-6 h-6" />
                  เข้าสู่ระบบด้วย Google
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
