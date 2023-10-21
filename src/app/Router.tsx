import { Navigate, Route, Routes } from 'react-router-dom'

import { DEFAULT_PATH } from './routesConfig/routesConst'
import { TRoute, publicRoutes } from './routesConfig'

import Home from './views/Home'

const renderRoute = (route: TRoute) => (
  <Route key={route.path} path={route.path} element={route.element}>
    {route.children?.map(renderRoute)}
  </Route>
);

const renderRoutes = (publicR: TRoute[]) => (
  <Routes>
    <Route element={<Home/>}>{publicR.map(renderRoute)}</Route>
    <Route path='*' element={<Navigate to={DEFAULT_PATH} />} />
  </Routes>
);

function Router() {
  return renderRoutes(publicRoutes)
}

export default Router
