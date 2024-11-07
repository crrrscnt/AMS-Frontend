import { Route, Routes } from "react-router-dom";
import SpaceObjectsPage from "./pages/SpaceObjectsPage";
import SpaceObjectDetailPage from "./pages/SpaceObjectDetailPage";
import { HomePage } from "./pages/HomePage.tsx";
import { ROUTES } from "./Routes";
import './App.css';

function App() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} index element={<HomePage />} />
      <Route path={ROUTES.SPACEOBJECTS} element={<SpaceObjectsPage />} />
      <Route path={`${ROUTES.SPACEOBJECTS}/:id`} element={<SpaceObjectDetailPage />} />
    </Routes>
  );
}

export default App;
