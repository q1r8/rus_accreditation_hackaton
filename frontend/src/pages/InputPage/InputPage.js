import { 
  Box,
  Button, 
  Container, 
  Fade, 
  Grid, 
  // InputAdornment, 
  LinearProgress, 
  // List, 
  // ListItem, 
  Paper, 
  Slide, 
  // SvgIcon, 
  TextField, 
  Typography,
  Zoom
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useRef, useState } from 'react';
import classes from './InputPage.module.css'
// import SearchIcon from '@mui/icons-material/Search';
// import categories from '../../assets/categories';
import testMessages from '../../assets/testMessages';
import axios from 'axios';
import ErrorSnackbar from '../../components/ErrorSnackbar/ErrorSnackbar';
import InputNavbar from '../../components/InputNavbar/InputNavbar';
import FileLoad from '../../components/FileLoad/FileLoad';

const InputPage = () => {
  const [description, setDescirption] = useState('');
  // const [searchValue, setSearchValue] = useState('');
  // const [activeSearch, setActiveSearch] = useState(false);
  const [resultReceived, setResultReceived] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [code, setCode] = useState('');
  const [category, setCategory] = useState('');

  const errorRef = useRef();

  const useStyles = makeStyles(() => ({
    descriptionField: {
      color: '#000000',
      backgroundColor: '#e7e4df',
      borderRadius: '5px',
      marginBottom: '10px'
    },
    '&:hover': {
      backgroundColor: '#fff',
    }
  }));

  const styles = useStyles();

  const onSendMessage = async () => {
    if (description === '') { 
      errorRef.current.handleOpenSnackbar();
      return; };
    console.log('sendMessage', 'description: ', description);
    setMessageSent(true);

    try {
      await axios.post('http://51.250.10.93:5000/model_inference', 
        {
          description,
        },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            "Content-type": "application/json; charset=UTF-8",
            'withCredentials': 'true'
          },

        }
      ).then((response) => {
        if (response.status === 200) { 
          console.log(response);
          setCode(response.data.model_response_category_code);
          setCategory(response.data.model_response_category_name);
          setResultReceived(true);
        };
      });
    } catch (err) {
      console.log(err);
    }
  };

  const onValueChange = (e) => {
    setDescirption(e.target.value);
  };

  // useEffect(() => {
  //   const timeOutId = setTimeout(async() => {
  //     try {
  //       await axios.post('http://localhost:5000/model_inference', 
  //         {
  //           description
  //         },
  //         {
  //           headers: {
  //             "Content-type": "application/json; charset=UTF-8",
  //           }
  //         }
  //       ).then((response) => {
  //         if (response.status === 200) { console.log(response); };
  //       });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }, 1500);

  //   return () => clearTimeout(timeOutId);

  // }, [description]);

  // const onListItemClick = (category) => {
  //   console.log(category.title);
  //   setSearchValue(category.title);
  //   setActiveSearch(false);
  // };

  // const onListItemKeyDown = (e, category) => {
  //   if(e.key === 'Enter'){
  //     console.log(category.title);
  //     setSearchValue(category.title);
  //     setActiveSearch(false);
  //   }
  // };

  const onBeginAgain = () => {
    setDescirption('');
    // setSearchValue('');
    // setActiveSearch(false);
    setResultReceived(false);
    setMessageSent(false);
  };

  const onPasteMessage = (text) => {
    setDescirption(text);
  };

  return (
      <div className={classes.wrapper}>
      <InputNavbar />
      <Slide 
        direction="right" 
        in 
        mountOnEnter 
        unmountOnExit 
      >
          <Typography 
            className={classes.categoryBlock__valueText}
            variant="h6"
            color="primary"
            style={{textAlign: 'center', paddingTop: '10px'}}
          >
            Помощь в выборе подкатегории
          </Typography>
      </Slide>
      <Slide 
        direction="right" 
        in 
        mountOnEnter 
        unmountOnExit 
      >
      <Container maxWidth="lg" disableGutters style={{padding: '5px'}}>
        <Grid container className={classes.container}>
          <Grid
            item
            container 
            className={classes.formBlock}
            md={12}
            xs={12}
            justifyContent="flex-end"
            alignItems="flex-start"
          >
            <Grid
              item
              container 
              className={classes.blockContainer}
              justifyContent="flex-end"
              alignItems="flex-start"
              md={12}
              xs={12}
              >
              <Typography className={classes.formBlock__inputtext} color="text.primary" style={{ paddingLeft: '5px' }}>
                В поле ниже пользователь может начать вводить описание товара, интерфейс подскажет необходимый его объём. Для облегчения процесса Вы можете воспользоваться одним из заготовленных примеров и нажать на кнопку «Отправить», модель предскажет подходящую подкатегорию, согласно тексту описания.
              </Typography>
                {testMessages.map((message, i) => (
                  <Grid
                    item
                    container 
                    className={classes.exampleBlock}
                    md={6}
                    xs={12}
                  >
                    <Paper className={classes.variant} key={message.text} elevation={3}>
                      <Box className={classes.variant__titleBlock}>
                        <Typography className={classes.variantText} color="secondary">
                          Пример {i + 1}:
                        </Typography>
                        <Button
                          className={classes.sendButton}
                          size="small"
                          variant="contained"
                          color="secondary"
                          onClick={() => onPasteMessage(message.text)}
                          disabled={messageSent && resultReceived}
                        >
                          Использовать
                        </Button>
                      </Box>
                      <Typography>
                        {message.text.substr(0, 120) + '...'}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}

                <TextField
                  id="outlined-multiline-flexible"
                  variant="filled"
                  placeholder="Введите общее наименование продукции"
                  fullWidth
                  multiline
                  maxRows={12}
                  minRows={12}
                  value={description}
                  onChange={onValueChange}
                  InputProps={{
                    className: styles.descriptionField
                  }}
                  disabled={messageSent && resultReceived}
                  style={{ padding: '0 5px' }}
                />
              {/* <TextField
                fullWidth
                InputProps={{
                  className: styles.descriptionField,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="secondary">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Введите код или категорию"
                variant="filled"
                value={searchValue}
                onChange={onValueChange}
                size="small"
                onFocus={() => { setActiveSearch(true); }}
                disabled={messageSent && resultReceived}
              />
              <Box
                style={{display: 'flex', justifyContent: 'flex-start', width: '100%'}}>
                <Box
                  className={classes.categoriesListContainer}
                >
                  {activeSearch && <List component="div" disablePadding dense>
                    {categories
                      .filter((category) => searchValue === '' || category.title.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1)
                      .map((category) => (
                        <Slide 
                          direction="down" 
                          in 
                          mountOnEnter 
                          unmountOnExit 
                        >
                          <Box
                            style={{ position: 'relative' }}
                            key={category.title}
                            onClick={() => onListItemClick(category)}
                          >
                            <ListItem
                              style={{ color: '#ffffff' }}
                              button
                              display="flex"
                              onKeyDown={(e) => onListItemKeyDown(e, category)}
                            >
                              {category.title}      
                            </ListItem>
                          </Box>
                        </Slide>
                      ))}
                  </List>}
                </Box>
              </Box> */}

              {description.length > 0 && !(messageSent && resultReceived)
                ? (
                  <Box 
                    className="symbolCounter" 
                    style={{
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      maxWidth: '60%', 
                      padding: '0 10px',
                      marginRight: 'auto',
                      marginBottom: '10px', 
                      backgroundColor: `${description.length < 75 ? 'rgba(255, 0, 0, .3)' : (description.length >= 75 && description.length < 150 ? 'grey' : 'rgba(0, 128, 0, .3)')}`, 
                      borderRadius: '15px', color: '#ffffff'}}>
                    <Typography style={{marginRight: '5px'}}>
                      Полнота описания
                    </Typography>
                    {description.length < 75 && <Typography>недостаточная</Typography>}
                    {description.length >= 75 && description.length < 150 && <Typography>умеренная</Typography>}
                    {description.length >= 150 && <Typography>достаточная</Typography>}
                  </Box>
                ) : null
              }
              
              {messageSent && resultReceived ? (
                <Zoom 
                  direction="left" 
                  in 
                  mountOnEnter 
                  unmountOnExit 
                >
                  <Button
                    className={classes.sendButton}
                    variant="contained"
                    color="secondary"
                    onClick={onBeginAgain}
                    style={{marginRight: '10px'}}
                  >
                    Начать заново
                  </Button>
                </Zoom>
                ): null}
                <Button
                  className={classes.sendButton}
                  variant="contained"
                  color="secondary"
                  onClick={onSendMessage}
                  disabled={messageSent && resultReceived}
                >
                  Отправить
                </Button>
              {messageSent && resultReceived ? (
                <Zoom 
                  direction="left" 
                  in 
                  mountOnEnter 
                  unmountOnExit 
                >
                  <Box style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', width: '100%'}}>
                    <Typography className={classes.result} variant="h6" color="text.primary" component="div">
                      Предполагаемая категория: 
                    </Typography>
                    <Typography className={classes.resultValue} variant="h6" color="secondary" component="div">
                      { code } &nbsp; { category }
                    </Typography>
                  </Box>
                </Zoom>
              ): null }
              {messageSent && !resultReceived ? (
                <Fade 
                  direction="left" 
                  in 
                  mountOnEnter 
                  unmountOnExit 
                >
                  <Box style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', width: '100%', marginTop: '25px'}}>
                    <Typography className={classes.resultCheck} variant="h6" component="div" color="secondary">
                      Подождите, идет подбор категории: 
                    </Typography>
                    <br />
                    <LinearProgress color="secondary" />
                  </Box>
                </Fade>
              ) : null }
            </Grid>
            <Grid
              item
              container 
              className={classes.formBlock}
              md={12}
              xs={12}
              justifyContent="center"
              alignItems="flex-start"
            >
              <Typography 
                className={classes.categoryBlock__valueText}
                variant="h6"
                color="primary"
                style={{textAlign: 'center', paddingBottom: '10px'}}
              >
                Анализ исторических данных
              </Typography>
            </Grid>
            <Grid
              item
              container 
              className={classes.blockContainer}
              md={12}
              xs={12}
              >
                <Grid
                  item
                  container 
                  className={classes.formBlock}
                  md={12}
                  xs={12}
                  justifyContent="center"
                  alignItems="flex-start"
                >
                  <Typography className={classes.formBlock__inputtext} color="text.primary" style={{width: '100%', paddingLeft: '5px'}}>
                    Ниже Вы можете протестировать работу нашей модели на срезе данных из тестового датасета. Модель добавит дополнительный столбец в исходный файл со степенью уверенности и предложит его сохранить.
                  </Typography>
                  <FileLoad />
                </Grid>
              </Grid> 
          </Grid>
          <ErrorSnackbar 
            ref={errorRef} 
          />
        </Grid>
      </Container>
    </Slide>
      
    </div>
  );
};

export default InputPage;
