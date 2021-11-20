import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button, Container, useMediaQuery } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { MAIN_ROUTE } from '../../utils/consts';
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
            {!isPhone && <Typography component="div" sx={{ flexGrow: 1 }}>
              Каникулы Бонифация (NapIT)
            </Typography>}
            <Typography component="div" sx={{ flexGrow: 1 }}>
              Демонстрация работы API
            </Typography>
            <Link to={{ pathname: MAIN_ROUTE }} style={{ WebkitTapHighlightColor: 'transparent', textDecoration: 'none' }}>
              <Button 
                variant="contained" 
                color="secondary" 
                startIcon={<KeyboardBackspaceIcon/>}
                size="small"
              >
                На главную
              </Button>
            </Link>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default NavBar;