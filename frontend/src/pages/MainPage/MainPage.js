import { Box, Button, Container, Grid, Paper, Slide, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import classes from './MainPage.module.css';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { INPUT_ROUTE } from '../../utils/consts';
import { Link } from 'react-router-dom';

const MainPage = () => {
  const isPhone = useMediaQuery('(max-width:600px)');
  return (
    <div className={classes.wrapper}>
      <NavBar />
      <Container 
        maxWidth="lg"
        disableGutters
        style={{padding: '5px'}}
      >
        <Grid container className={classes.container}>
        <Slide 
            direction="right" 
            in 
            mountOnEnter 
            unmountOnExit 
          >
            <div>
              <Typography 
                className={classes.categoryBlock__valueText}
                variant="h6"
                color="primary"
                style={{textAlign: 'center'}}
              >
                Результаты работы модели
              </Typography>
              <Typography 
                className={classes.categoryBlock__valueText}
                color="text.primary"
                style={{textAlign: 'left'}}
              >
                Ниже Вы можете ознакомиться с результатами работы нашей модели на примере нескольких реальных описаний товаров. Категория и подкатегория предсказана ИИ.
                Также Вы можете протестировать нашу модель самостоятельно, нажав на кнопку "Попробовать".
              </Typography>
            </div>
          </Slide>
          <Slide 
            direction="right" 
            in 
            mountOnEnter 
            unmountOnExit 
          >
            <Grid
              item
              container 
              className={classes.contentBlock}
              md={12}
              xs={12}
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Grid
                item
                container
                md={12}
                xs={12}
                justifyContent="space-between"
                alignItems="flex-start" 
              >
                <Grid 
                  item
                  container
                  md={10}
                  sm={9}
                  xs={7}
                  justifyContent="space-between"
                  className={classes.categoryBlock}
                >
                  <Grid 
                    item
                    justifyContent="center"
                    alignItems="center" 
                  >
                    <Typography 
                      className={classes.categoryBlock__valueText}
                      variant="h5"
                      color="primary"
                    >
                      Предсказанная категория и подкатегория
                    </Typography>
                  </Grid>
                  <Grid
                    className={classes.categoryTextContainer} 
                    item
                    md={12}
                    xs={12}
                  >
                    <Typography color="secondary">
                      - 1481 Посуда хозяйственная стальная эмалированная
                    </Typography>
                    <Typography color="secondary">
                      - 1481.1 Посуда хозяйственная стальная эмалированная для взрослых
                    </Typography>
                  </Grid>
                </Grid>
                <Grid 
                  item
                  md={2}
                  sm={3}
                  xs={5}
                >
                  <Box className={classes.confidenceDegree} style={{backgroundColor: 'rgba(0, 128, 0, .3)'}}>
                    <Typography color="text.primary">
                      Степень <br /> уверенности
                    </Typography>
                    <Typography color="secondary" variant="h4">
                      100%
                    </Typography>
                  </Box>
                </Grid>

                <Grid 
                  item
                  container
                  className={classes.categoryBlock}
                >
                  <Grid 
                    item
                    md={12}
                    xs={12}
                    justifyContent="center"
                    alignItems="center" 
                  >
                    <Typography 
                      className={classes.categoryBlock__valueText}
                      variant="h5"
                      color="primary"
                    >
                      Общее наименование продукции
                    </Typography>
                  </Grid>
                  <Grid 
                    item
                    md={12}
                    xs={12}
                  >
                    <Paper className={classes.categoryBlock__text}>
                      Посуда хозяйственная стальная эмалированная для взрослых в наборах и отдельными предметами, в том числе с элементами из пластмассы, дерева, стекла.
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Slide>

          <Slide 
            direction="right" 
            in 
            mountOnEnter 
            unmountOnExit 
          >
            <Grid
              item
              container 
              className={classes.contentBlock}
              md={12}
              xs={12}
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Grid
                item
                container
                md={12}
                xs={12}
                justifyContent="space-between"
                alignItems="flex-start" 
              >
                <Grid 
                  item
                  container
                  md={10}
                  sm={9}
                  xs={7}
                  justifyContent="space-between"
                  className={classes.categoryBlock}
                >
                  <Grid 
                    item
                    justifyContent="center"
                    alignItems="center" 
                  >
                    <Typography 
                      className={classes.categoryBlock__valueText}
                      variant="h5"
                      color="primary"
                    >
                      Предсказанная категория и подкатегория
                    </Typography>
                  </Grid>
                  <Grid
                    className={classes.categoryTextContainer} 
                    item
                    md={12}
                    xs={12}
                  >
                    <Typography color="secondary">
                      - 5460 Тетради школьные ученические, обои и товары бумажно-беловые
                    </Typography>
                    <Typography color="secondary">
                      - 5460.1 Обои
                    </Typography>
                  </Grid>
                </Grid>
                <Grid 
                  item
                  md={2}
                  sm={3}
                  xs={5}
                >
                  <Box className={classes.confidenceDegree} style={{backgroundColor: 'rgba(0, 128, 0, .3)'}}>
                    <Typography color="text.primary">
                      Степень <br /> уверенности
                    </Typography>
                    <Typography color="secondary" variant="h4" >
                      100%
                    </Typography>
                  </Box>
                </Grid>

                <Grid 
                  item
                  container
                  className={classes.categoryBlock}
                >
                  <Grid 
                    item
                    md={12}
                    xs={12}
                    justifyContent="center"
                    alignItems="center" 
                  >
                    <Typography 
                      className={classes.categoryBlock__valueText}
                      variant="h5"
                      color="primary"
                    >
                      Общее наименование продукции
                    </Typography>
                  </Grid>
                  <Grid 
                    item
                    md={12}
                    xs={12}
                  >
                    <Paper className={classes.categoryBlock__text}>
                      Обои виниловые на тканевой основе в рулонах, толщиной от 0,4 мм до 2,2 мм, поверхностной плотностью 0,116 кг/кв.м. до 0,350 кг/кв.м., рельефные, тисненые , профильные, марки  Newmor, Sunglo, GFX
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Slide>

          <Slide 
            direction="right" 
            in 
            mountOnEnter 
            unmountOnExit 
          >
            <Grid
              item
              container 
              className={classes.contentBlock}
              md={12}
              xs={12}
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Grid
                item
                container
                md={12}
                xs={12}
                justifyContent="space-between"
                alignItems="flex-start" 
              >
                <Grid 
                  item
                  container
                  md={10}
                  sm={9}
                  xs={7}
                  justifyContent="space-between"
                  className={classes.categoryBlock}
                >
                  <Grid 
                    item
                    justifyContent="center"
                    alignItems="center" 
                  >
                    <Typography 
                      className={classes.categoryBlock__valueText}
                      variant="h5"
                      color="primary"
                    >
                      Предсказанная категория и подкатегория
                    </Typography>
                  </Grid>
                  <Grid
                    className={classes.categoryTextContainer} 
                    item
                    md={12}
                    xs={12}
                  >
                    <Typography color="secondary">
                      - 1482 Посуда из нержавеющей стали
                    </Typography>
                    <Typography color="secondary">
                      - 1482.1 Посуда из коррозионно-стойкой стали для взрослых
                    </Typography>
                  </Grid>
                </Grid>
                <Grid 
                  item
                  md={2}
                  sm={3}
                  xs={5}
                >
                  <Box className={classes.confidenceDegree}>
                    <Typography color="text.primary">
                      Степень <br /> уверенности
                    </Typography>
                    <Typography color="secondary" variant="h4">
                      72%
                    </Typography>
                  </Box>
                </Grid>

                <Grid 
                  item
                  container
                  className={classes.categoryBlock}
                >
                  <Grid 
                    item
                    md={12}
                    xs={12}
                    justifyContent="center"
                    alignItems="center" 
                  >
                    <Typography 
                      className={classes.categoryBlock__valueText}
                      variant="h5"
                      color="primary"
                    >
                      Общее наименование продукции
                    </Typography>
                  </Grid>
                  <Grid 
                    item
                    md={12}
                    xs={12}
                  >
                    <Paper className={classes.categoryBlock__text}>
                    Термос-бутылка с маркировкой "Naked", предназначенная для использования с пищевой продукцией
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Slide>
          {isPhone 
            ? (<Link to={{ pathname: INPUT_ROUTE }} style={{ WebkitTapHighlightColor: 'transparent', textDecoration: 'none', marginLeft: 'auto', marginRight: '10px', marginBottom: '10px'}}>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  endIcon={<ArrowRightAltIcon/>}
                  size="small"
                >
                  Попробовать
                </Button>
              </Link>) : null
            }
        </Grid>
      </Container>
    </div>
  );
};

export default MainPage;