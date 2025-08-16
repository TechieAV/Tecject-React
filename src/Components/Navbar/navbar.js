import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Button,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import ProfileSidebar from "../ProfileSideBar/ProfileSidebar";

const Navbar = () => {
  const [role, setRole] = useState("user");

   useEffect(() => {
  const storedRole = localStorage.getItem("role");
  setRole((storedRole || "").toLowerCase() === "admin" ? "admin" : "user");
}, []);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Convert label to PascalCase
  const toPascalCase = (text) =>
    text
      .replace(/[_-]/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join("");

  // Sync isLoggedIn state with localStorage (reactive)
  useEffect(() => {
    const checkLogin = () => {
      const loginState = localStorage.getItem("isLogin");
      setIsLoggedIn(loginState === "true");
    };

    checkLogin();
    window.addEventListener("storage", checkLogin);
    window.addEventListener("loginChange", checkLogin);

    return () => {
      window.removeEventListener("storage", checkLogin);
      window.removeEventListener("loginChange", checkLogin);
    };
  }, []);

  const handleProjectsMenuOpen = (event) => {
    navigate("/home"); // Redirect to home
    setAnchorEl(event.currentTarget); // Still show the submenu if needed
  };
  const handleProjectsMenuClose = () => setAnchorEl(null);
  const toggleDrawer = (open) => () => setDrawerOpen(open);

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      localStorage.removeItem("isLogin");
      localStorage.removeItem("Id");
      localStorage.removeItem("role");
      localStorage.removeItem("username");
      localStorage.removeItem("loginType");
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      setIsLoggedIn(false);
      window.dispatchEvent(new Event("loginChange"));
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  const commonLinks = [
    { label: "home", path: "/" },
    {
      label: "projects",
      subMenu: [
        { label: "enterprises", path: "/enterprises" },
        { label: "professionals", path: "/Professionals" },
        { label: "main project", path: "/home" }, // assuming "Main Project" is Home
        { label: "mini project", path: "/miniProject" },
      ],
    },
  ];


  const userLinks = [
    { label: "purchased", path: "/receipt" },
    { label: "about", path: "/about" },
    { label: "contact", path: "/contact" },
  ];

const roleLinks = userLinks;

  return (
    <>
      <AppBar position="static" className="navbar">
        <Toolbar className="navbar-toolbar">
          <Box
            display="flex"
            alignItems="center"
            sx={{ cursor: "pointer" }}
          onClick={() => {
  const storedRole = (localStorage.getItem("role") || "").toLowerCase();
  navigate(storedRole === "admin" ? "/admin" : "/");
}}

          >
            <img
              src={logo}
              alt="Tec-ject Logo"
              style={{ height: 40, marginRight: 8 }}
            />
            <Typography variant="h6" className="navbar-title">
              Tec-ject 
            </Typography>
          </Box>

          {/* Spacer */}
          <Box sx={{ flexGrow: 1 }} />

          {isMobile ? (
            <>
              <IconButton
                color="inherit"
                edge="end"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
  anchor="right"
  open={drawerOpen}
  onClose={toggleDrawer(false)}
>
  <Box
    sx={{ width: 250 }}
    role="presentation"
    onClick={toggleDrawer(false)}
  >
    <List>
      {/* Common links */}
      {role === "user" &&
        commonLinks.map((item) => (
          item.subMenu ? (
            <React.Fragment key={item.label}>
              <ListItem>
                <ListItemText primary={toPascalCase(item.label)} />
              </ListItem>
              {item.subMenu.map((sub) => (
                <ListItem
                  button
                  key={sub.label}
                  sx={{ pl: 4 }}
                  onClick={() => navigate(sub.path)}
                >
                  <ListItemText primary={toPascalCase(sub.label)} />
                </ListItem>
              ))}
            </React.Fragment>
          ) : (
            <ListItem
              button
              key={item.label}
              onClick={() => navigate(item.path)}
            >
              <ListItemText primary={toPascalCase(item.label)} />
            </ListItem>
          )
        ))}

      {/* Role-specific links */}
      {roleLinks.map((item) => (
        <ListItem
          button
          key={item.label}
          onClick={() => navigate(item.path)}
        >
          <ListItemText primary={toPascalCase(item.label)} />
        </ListItem>
      ))}

      {/* Login / Logout */}
      <ListItem button onClick={handleLoginLogout}>
        <ListItemText
          primary={toPascalCase(isLoggedIn ? "logout" : "login")}
        />
      </ListItem>
    </List>
  </Box>
</Drawer>

            </>
          ) : (
            <>
              {role === "user" &&
                commonLinks.map((item) =>
                  item.subMenu ? (
                    <div key={item.label}>
                      <Button
                        className="nav-button"
                        onClick={(e) => setAnchorEl(e.currentTarget)}
                      >
                        {toPascalCase(item.label)}
                      </Button>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={() => setAnchorEl(null)}
                      >
                        {item.subMenu.map((sub) => (
                          <MenuItem
                            key={sub.label}
                            onClick={() => {
                              navigate(sub.path);
                              setAnchorEl(null);
                            }}
                          >
                            {toPascalCase(sub.label)}
                          </MenuItem>
                        ))}
                      </Menu>
                    </div>
                  ) : (
                    <Button
                      key={item.label}
                      className="nav-button"
                      onClick={() => navigate(item.path)}
                    >
                      {toPascalCase(item.label)}
                    </Button>
                  )
                )}

              {roleLinks.map((item) => (
                <Button
                  key={item.label}
                  className="nav-button"
                  onClick={() => navigate(item.path)}
                >
                  {toPascalCase(item.label)}
                </Button>
              ))}

              <Button onClick={handleLoginLogout} className="nav-button">
                {toPascalCase(isLoggedIn ? "logout" : "login")}
              </Button>

              <IconButton
                color="inherit"
                className="nav-icon-button"
                onClick={() => setProfileOpen(true)}
              >
                <PersonOutlineIcon />
              </IconButton>
            </>
          )}
        </Toolbar>
      </AppBar>

      <ProfileSidebar
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
      />
    </>
  );
};

export default Navbar;
