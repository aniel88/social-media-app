import {
  faArrowLeft,
  faBell,
  faCaretDown,
  faCircleInfo,
  faGear,
  faMessage,
  faRightFromBracket,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import DropdownItem from "../DropdownItem/DropdownItem";
import DropdownItemUserInfo from "../DropdownItemUserInfo/DropdownItemUserInfo";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import Hamburger from "../Hamburger/Hamburger";
import MobileSideMenu from "../MobileSideMenu/MobileSideMenu";
import Navbar from "../Navbar/Navbar";
import NavItem from "../NavItem/NavItem";
import NavItems from "../NavItems/NavItems";
import Search from "../Search/Search";
import { ISideMenuProps } from "../SideMenu/SideMenu";

interface IHeaderProps {
  menu: ISideMenuProps[];
}

export interface IMenuItemType {
  type: string;
  icon: IconDefinition;
  url: string;

  onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined;
}

const Header = ({ menu }: IHeaderProps) => {
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const navigate = useNavigate();
  const [token, setToken, removeToken] = useCookies(["access-token"]);
  const cookieToken = token["access-token"] || undefined;

  const logout = () => {
    removeToken("access-token");
    navigate("/login");
  };

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;

    if (currentScrollPos > prevScrollPos) {
      setShowSideMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  });

  const menuItems: IMenuItemType[] = [
    {
      type: "Settings",
      icon: faGear,
      url: "",
    },
    { type: "Help", icon: faCircleInfo, url: "" },
    {
      type: "Logout",
      icon: faRightFromBracket,
      url: "",
      onClick: logout,
    },
  ];

  return (
    <div className="sticky top-0 z-40">
      {showSideMenu ? (
        <MobileSideMenu
          onCloseClick={() => setShowSideMenu(false)}
          menuItems={menu}
        />
      ) : (
        ""
      )}

      <Navbar>
        {/* Hamburger and Logo container */}
        <div className="flex flex-row items-center">
          <Hamburger onClick={() => setShowSideMenu(true)} />
          <div style={{ color: "white", fontWeight: "bold" }}>LamaSocial</div>
        </div>

        {/* Search */}
        <Search />
        <NavItems>
          <NavItem icon={faBell} title="Notifications">
            <DropdownMenu>
              <p>Notifications</p>
            </DropdownMenu>
          </NavItem>
          <NavItem icon={faMessage} title="Messages">
            <DropdownMenu>
              <DropdownItem></DropdownItem>
              <DropdownItem></DropdownItem>
              <DropdownItem></DropdownItem>
              <DropdownItem></DropdownItem>
            </DropdownMenu>
          </NavItem>
          <NavItem icon={faCaretDown} title="Menu">
            <DropdownMenu>
              <DropdownItemUserInfo imageUrl="" name="Morohoshi Daniel-Iosif" />
              <>
                {menuItems.map((item, id) => (
                  <DropdownItem
                    key={id}
                    onClick={item.onClick}
                    title={item.type}
                    icon={item.icon}
                  />
                ))}
              </>
            </DropdownMenu>
          </NavItem>
        </NavItems>
      </Navbar>
    </div>
  );
};

export default Header;
