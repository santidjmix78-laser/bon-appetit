import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AppProvider } from './context/AppContext';
import { CookModePage } from './pages/CookModePage';
import { FavoritesPage } from './pages/FavoritesPage';
import { HomePage } from './pages/HomePage';
import { KitchenPage } from './pages/KitchenPage';
import { MyRecipesPage } from './pages/MyRecipesPage';
import { RecipeFormPage } from './pages/RecipeFormPage';
import { RecipePage } from './pages/RecipePage';
import { RecommendPage } from './pages/RecommendPage';
import { SettingsPage } from './pages/SettingsPage';
import { WeekPage } from './pages/WeekPage';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="cocina" element={<KitchenPage />} />
            <Route path="semana" element={<WeekPage />} />
            <Route path="favoritos" element={<FavoritesPage />} />
            <Route path="mis-recetas" element={<MyRecipesPage />} />
            <Route path="mis-recetas/nueva" element={<RecipeFormPage />} />
            <Route path="mis-recetas/editar/:id" element={<RecipeFormPage />} />
            <Route path="ajustes" element={<SettingsPage />} />
            <Route path="recomendar" element={<RecommendPage />} />
            <Route path="receta/:id" element={<RecipePage />} />
            <Route path="receta/:id/cocinar" element={<CookModePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
