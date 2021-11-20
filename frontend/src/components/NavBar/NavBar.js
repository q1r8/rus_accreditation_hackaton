import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import { Button, Container, useMediaQuery } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { INPUT_ROUTE } from '../../utils/consts';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const isPhone = useMediaQuery('(max-width:600px)');
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" color="primary">
        <Container 
          maxWidth="lg" 
          disableGutters>
          <Toolbar variant="dense" disableGutters style={{padding: '5px'}}>
            {/* <IconButton
              size="large"
              edge="start"
              color="secondary"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton> */}
            {!isPhone && <Typography component="div" sx={{ flexGrow: 1 }}>
              Каникулы Бонифация (NapIT)
            </Typography>}
            <Typography component="div" sx={{ flexGrow: 1 }}>
              Демонстрация работы API
            </Typography>
            <Link to={{ pathname: INPUT_ROUTE }} style={{ WebkitTapHighlightColor: 'transparent', textDecoration: 'none' }}>
              <Button 
                variant="contained" 
                color="secondary" 
                endIcon={<ArrowRightAltIcon/>}
                size="small"
              >
                Попробовать
              </Button>
            </Link>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default NavBar;