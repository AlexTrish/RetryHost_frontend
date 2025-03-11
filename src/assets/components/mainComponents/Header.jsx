import * as React from 'react';
import Link from '@mui/material/Link';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

    return (
      <>
      <header>
        <div className="logo"></div>
        <div className="menu">
          <ul className="listMenu">
            <a href="#" className="link homeLink">Home</a>
            <Link id="Services-Link" aria-controls={open ? 'Services-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick}>
              Services
            </Link>
            <a href="#" className="link ReferralLink">Referral System</a>
            <a href="#" className="link aboutAsBtn">About-us</a>
          </ul>
        </div>
      </header>

      {/* Menu Services */}
      <Menu id="Services-menu" anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{ 'aria-labelledby': 'basic-button', }}>
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
      </>
    )
  }
  
  export default Header