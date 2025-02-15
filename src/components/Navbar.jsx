import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { userLogout } from "../slices/authSlice";

const pages = [
  { name: "Home", path: "/" },
  { name: "Dishes", path: "/dishes" },
  { name: "Counters", path: "/counters" },
];

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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openLogoutDialog, setOpenLogoutDialog] = React.useState(false);

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

  const handleLogoutClick = () => {
    setOpenLogoutDialog(true);
  };

  const handleCloseLogoutDialog = () => {
    setOpenLogoutDialog(false);
  };

  const handleConfirmLogout = () => {
    dispatch(userLogout());
    navigate("/login");
    setOpenLogoutDialog(false);
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
                <MenuItem
                  key={setting.name}
                  onClick={
                    setting.name === "Logout"
                      ? handleLogoutClick
                      : handleCloseUserMenu
                  }
                >
                  <Typography sx={{ textAlign: "center", color: "black" }}>
                    {setting.name === "Logout" ? (
                      "Logout"
                    ) : (
                      <Link
                        to={setting.path}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        {setting.name}
                      </Link>
                    )}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                sx={{
                  my: 2,
                  mr: 1,
                  color: "black",
                  display: "block",
                  textTransform: "none",
                }}
              >
                <Link
                  to={page.path}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  {page.name}
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
      <Dialog open={openLogoutDialog} onClose={handleCloseLogoutDialog}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLogoutDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmLogout} color="error">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
}

export default Navbar;
