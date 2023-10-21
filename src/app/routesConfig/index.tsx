import { RouteProps } from 'react-router-dom'

import { DEFAULT_PATH } from './routesConst'
import Home from '../views/Home';

export type TRoute = RouteProps & {
  exact?: boolean;
  children?: TRoute[];
};

export const publicRoutes: TRoute[] = [
  {
    exact: true,
    path: DEFAULT_PATH,
    element: <Home />,
  },
];
