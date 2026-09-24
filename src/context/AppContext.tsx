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
  Feeling,
  FoodCategory,
  FoodItem,
  MealEntry,
  MealType,
  StorageZone,
} from '../types';
import { getDefaultState, loadState, saveState } from '../utils/storage';
import { nowTime, slugify, todayISO } from '../utils/helpers';

interface AppContextValue {
  state: AppState;
  toggleFood: (foodId: string) => void;
  isAvailable: (foodId: string) => boolean;
  addCustomFood: (name: string, zone: StorageZone, category: FoodCategory) => void;
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
  clearAllData: () => void;
  todayMeals: MealEntry[];
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => loadState());

  useEffect(() => {
    saveState(state);
  }, [state]);

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
      addCustomFood,
      toggleFavorite,
      isFavorite,
      addMealEntry,
      setFeeling,
      clearAllData,
      todayMeals,
    }),
    [
      state,
      toggleFood,
      isAvailable,
      addCustomFood,
      toggleFavorite,
      isFavorite,
      addMealEntry,
      setFeeling,
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
