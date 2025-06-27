import { AppBar, Button, Stack, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import './Nav.css' 

const Nav = () => {
  return (

    <div className="nav">
      <AppBar position="static" sx={{ backgroundColor: '#7F461B', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} className="appbar">
        <Toolbar>
          <Link to="/" style={{ textDecoration: 'none' }}>
          <Typography variant="h6"sx={{color: '#FDF6EC',fontSize:'30px',fontFamily: 'Lilita One',fontWeight: 700,letterSpacing: '1px'}} className="logo">
            Woodly
          </Typography>
          </Link>
          <div style={{ flexGrow: 1 }}></div>
          <Stack direction="row" spacing={2}>
            <Link to="/login">
              <Button className="nav-btn">Login</Button>
            </Link>
            <Link to="/signup">
              <Button className="nav-btn">Signup</Button>
            </Link>
             <Link to="/Cart">
              <Button className="nav-btn">Cart</Button>
            </Link>
          </Stack>
        </Toolbar>
      </AppBar>
      
    </div>
  )
}

export default Nav
