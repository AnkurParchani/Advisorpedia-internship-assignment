import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import newRequest from "../utils/newRequest";
import { useAuth } from "../contexts/useAuth";

const Nav = ({ navigate }) => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  // Checking if the user is logged in or not
  useEffect(() => {
    async function getCurrentUser() {
      const res = await newRequest.get("/users");

      if (res?.data?.status === "success") setIsLoggedIn(true);
      else setIsLoggedIn(false);
    }

    getCurrentUser();
  }, [setIsLoggedIn]);

  // Logging out functionality
  function handleLogout() {
    removeCookie("token");
    navigate("/login");
    setIsLoggedIn(false);
    toast("Logged out successfully", { type: "success" });
  }

  return (
    <Navbar isBordered>
      <NavbarBrand>
        <img
          onClick={() => navigate("/")}
          className="cursor-pointer h-10 sm:h-14 w-auto"
          src="/logo.png"
          alt="company-img"
        />
      </NavbarBrand>

      <NavbarContent justify="end">
        {/* Rendering buttons according to the size of the screen */}
        {/* If the screen is bigger than normal buttons */}
        {isLoggedIn ? (
          <NavbarItem>
            <Button onClick={handleLogout} color="secondary" variant="solid">
              Logout
            </Button>
          </NavbarItem>
        ) : (
          <>
            <NavbarItem className="hidden sm:block">
              <Button
                onClick={() => navigate("/signup")}
                color="secondary"
                variant="flat"
              >
                Sign Up
              </Button>
            </NavbarItem>
            <NavbarItem className="hidden sm:block">
              <Button onClick={() => navigate("/login")} color="secondary">
                Login
              </Button>
            </NavbarItem>

            {/* If the screen is less in width then size of the buttons should be small */}
            <NavbarItem className="sm:hidden">
              <Button
                size="sm"
                onClick={() => navigate("/signup")}
                color="secondary"
                variant="flat"
              >
                Sign Up
              </Button>
            </NavbarItem>
            <NavbarItem className="sm:hidden">
              <Button
                size="sm"
                onClick={() => navigate("/login")}
                color="secondary"
              >
                Login
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
};

export default Nav;
