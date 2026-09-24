import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type {
  AppState,
  AppearancePrefs,
  EquipmentId,
  Feeling,
  FoodCategory,
  FoodItem,
  MealEntry,
  MealType,
  Recipe,
  StorageZone,
} from '../types';
import { applyAppearance } from '../utils/appearance';
import { nowTime, slugify, todayISO } from '../utils/helpers';
import {
  emptyKitchenLibrary,
  getDefaultState,
  loadState,
  restoreKitchenLibrary,
  saveState,
} from '../utils/storage';

interface AppContextValue {
  state: AppState;
  toggleFood: (foodId: string) => void;
  isAvailable: (foodId: string) => boolean;
  removeFromLibrary: (foodId: string) => void;
  addCustomFood: (name: string, zone: StorageZone, category: FoodCategory) => void;
  clearKitchenLibrary: () => void;
  restoreDefaultKitchen: () => void;
  toggleFavorite: (recipeId: string) => void;
  isFavorite: (recipeId: string) => boolean;
  addMealEntry: (partial: {
    text: string;
    mealType: MealType;
    recipeId?: string;
    mainIngredients?: string[];
    date?: string;
  }) => MealEntry;
  setFeeling: (recipeId: string, feeling: Feeling, mealEntryId?: string) => void;
  setAppearance: (partial: Partial<AppearancePrefs>) => void;
  toggleEquipment: (id: EquipmentId) => void;
  saveCustomRecipe: (recipe: Recipe) => void;
  deleteCustomRecipe: (id: string) => void;
  clearAllData: () => void;
  todayMeals: MealEntry[];
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => loadState());

  useEffect(() => {
    saveState(state);
  }, [state]);

  useEffect(() => {
    applyAppearance(state.appearance);
  }, [state.appearance]);

  useEffect(() => {
    if (state.appearance.theme !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: light)');
    const onChange = () => applyAppearance(state.appearance);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [state.appearance]);

  const toggleFood = useCallback((foodId: string) => {
    setState((prev) => {
      const has = prev.availableFoodIds.includes(foodId);
      return {
        ...prev,
        availableFoodIds: has
          ? prev.availableFoodIds.filter((id) => id !== foodId)
          : [...prev.availableFoodIds, foodId],
      };
    });
  }, []);

  const isAvailable = useCallback(
    (foodId: string) => state.availableFoodIds.includes(foodId),
    [state.availableFoodIds],
  );

  const removeFromLibrary = useCallback((foodId: string) => {
    setState((prev) => {
      const isCustom = prev.customFoods.some((f) => f.id === foodId);
      return {
        ...prev,
        availableFoodIds: prev.availableFoodIds.filter((id) => id !== foodId),
        customFoods: isCustom
          ? prev.customFoods.filter((f) => f.id !== foodId)
          : prev.customFoods,
        hiddenFoodIds: isCustom
          ? prev.hiddenFoodIds
          : prev.hiddenFoodIds.includes(foodId)
            ? prev.hiddenFoodIds
            : [...prev.hiddenFoodIds, foodId],
      };
    });
  }, []);

  const addCustomFood = useCallback(
    (name: string, zone: StorageZone, category: FoodCategory) => {
      const trimmed = name.trim();
      if (!trimmed) return;
      const id = `custom-${slugify(trimmed)}-${Date.now().toString(36)}`;
      const food: FoodItem = {
        id,
        name: trimmed,
        zone,
        category,
        custom: true,
      };
      setState((prev) => ({
        ...prev,
        customFoods: [...prev.customFoods, food],
        availableFoodIds: [...prev.availableFoodIds, id],
      }));
    },
    [],
  );

  const clearKitchenLibrary = useCallback(() => {
    setState((prev) => emptyKitchenLibrary(prev));
  }, []);

  const restoreDefaultKitchen = useCallback(() => {
    setState((prev) => restoreKitchenLibrary(prev));
  }, []);

  const toggleFavorite = useCallback((recipeId: string) => {
    setState((prev) => {
      const has = prev.favoriteRecipeIds.includes(recipeId);
      return {
        ...prev,
        favoriteRecipeIds: has
          ? prev.favoriteRecipeIds.filter((id) => id !== recipeId)
          : [...prev.favoriteRecipeIds, recipeId],
      };
    });
  }, []);

  const isFavorite = useCallback(
    (recipeId: string) => state.favoriteRecipeIds.includes(recipeId),
    [state.favoriteRecipeIds],
  );

  const addMealEntry = useCallback(
    (partial: {
      text: string;
      mealType: MealType;
      recipeId?: string;
      mainIngredients?: string[];
      date?: string;
    }): MealEntry => {
      const entry: MealEntry = {
        id: `meal-${Date.now()}`,
        date: partial.date ?? todayISO(),
        time: nowTime(),
        mealType: partial.mealType,
        text: partial.text.trim(),
        recipeId: partial.recipeId,
        mainIngredients: partial.mainIngredients,
        createdAt: new Date().toISOString(),
      };
      setState((prev) => ({
        ...prev,
        mealEntries: [entry, ...prev.mealEntries],
      }));
      return entry;
    },
    [],
  );

  const setFeeling = useCallback(
    (recipeId: string, feeling: Feeling, mealEntryId?: string) => {
      setState((prev) => ({
        ...prev,
        recipeFeelings: { ...prev.recipeFeelings, [recipeId]: feeling },
        mealEntries: mealEntryId
          ? prev.mealEntries.map((e) =>
              e.id === mealEntryId ? { ...e, feeling } : e,
            )
          : prev.mealEntries.map((e) =>
              e.recipeId === recipeId && !e.feeling ? { ...e, feeling } : e,
            ),
      }));
    },
    [],
  );

  const setAppearance = useCallback((partial: Partial<AppearancePrefs>) => {
    setState((prev) => ({
      ...prev,
      appearance: { ...prev.appearance, ...partial },
    }));
  }, []);

  const toggleEquipment = useCallback((id: EquipmentId) => {
    setState((prev) => {
      const has = prev.equipmentIds.includes(id);
      return {
        ...prev,
        equipmentIds: has
          ? prev.equipmentIds.filter((e) => e !== id)
          : [...prev.equipmentIds, id],
      };
    });
  }, []);

  const saveCustomRecipe = useCallback((recipe: Recipe) => {
    setState((prev) => {
      const exists = prev.customRecipes.some((r) => r.id === recipe.id);
      return {
        ...prev,
        customRecipes: exists
          ? prev.customRecipes.map((r) => (r.id === recipe.id ? recipe : r))
          : [...prev.customRecipes, recipe],
      };
    });
  }, []);

  const deleteCustomRecipe = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      customRecipes: prev.customRecipes.filter((r) => r.id !== id),
      favoriteRecipeIds: prev.favoriteRecipeIds.filter((fid) => fid !== id),
    }));
  }, []);

  const clearAllData = useCallback(() => {
    setState(getDefaultState());
  }, []);

  const todayMeals = useMemo(
    () => state.mealEntries.filter((e) => e.date === todayISO()),
    [state.mealEntries],
  );

  const value = useMemo(
    () => ({
      state,
      toggleFood,
      isAvailable,
      removeFromLibrary,
      addCustomFood,
      clearKitchenLibrary,
      restoreDefaultKitchen,
      toggleFavorite,
      isFavorite,
      addMealEntry,
      setFeeling,
      setAppearance,
      toggleEquipment,
      saveCustomRecipe,
      deleteCustomRecipe,
      clearAllData,
      todayMeals,
    }),
    [
      state,
      toggleFood,
      isAvailable,
      removeFromLibrary,
      addCustomFood,
      clearKitchenLibrary,
      restoreDefaultKitchen,
      toggleFavorite,
      isFavorite,
      addMealEntry,
      setFeeling,
      setAppearance,
      toggleEquipment,
      saveCustomRecipe,
      deleteCustomRecipe,
      clearAllData,
      todayMeals,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
