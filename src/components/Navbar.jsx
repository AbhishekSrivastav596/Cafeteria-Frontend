import * as React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import cartIcon from "../assets/cart.png";
import Tooltip from "@mui/material/Tooltip";
import HomeIcon from "@mui/icons-material/Home";

const pages = ["Dishes", "Counters"];
const settings = [
  { name: "Profile", path: "/profile" },
  { name: "Login", path: "/login" },
  { name: "Signup", path: "/signup" },
  { name: "Logout", path: "#" },
];

function Navbar() {
  const totalQuantity = useSelector((state) =>
    state.cart.cartItems.reduce((acc, item) => acc + item.quantity, 0)
  );
  const loading = useSelector((state) => state.cart.loading);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#eed9c4" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1 }}>
            <Tooltip title="Open Menu">
              <IconButton onClick={handleOpenUserMenu} sx={{ color: "black" }}>
                <MenuIcon />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: "top", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: "center", color: "black" }}>
                    <Link
                      to={setting.path}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      {setting.name}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link to="/" style={{ color: "black" }}>
              <IconButton sx={{ color: "black" }}>
                <HomeIcon />
              </IconButton>
            </Link>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{ my: 2, mr: 1, color: "black", display: "block" }}
              >
                <Link
                  to={`/${page.toLowerCase()}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  {page}
                </Link>
              </Button>
            ))}
            <Link to="/cart" style={{ textDecoration: "none", color: "black" }}>
              <Button
                sx={{
                  color: "black",
                  textTransform: "none",
                  mr: 2,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {loading ? (
                  "Loading..."
                ) : (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      position: "relative",
                    }}
                  >
                    <div style={{ position: "relative" }}>
                      <img
                        src={cartIcon}
                        alt="Cart"
                        style={{
                          width: "30px",
                          height: "30px",
                          marginRight: "3px",
                        }}
                      />
                      {totalQuantity > 0 && (
                        <span className="absolute -top-3 -right-1 bg-orange-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                          {totalQuantity}
                        </span>
                      )}
                    </div>
                    <span style={{ marginLeft: "3px" }}>Cart</span>
                  </div>
                )}
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
