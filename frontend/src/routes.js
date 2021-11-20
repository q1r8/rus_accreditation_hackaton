import MainPage from './pages/MainPage/MainPage';
import InputPage from './pages/InputPage/InputPage';
import {
  MAIN_ROUTE,
  INPUT_ROUTE
} from './utils/consts';

export const routes = [
  {
    path: MAIN_ROUTE,
    component: MainPage
  },
  {
    path: INPUT_ROUTE,
    component: InputPage
  }
];
