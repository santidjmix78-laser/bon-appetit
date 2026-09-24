import type { MealType } from '../types';

const MEAL_SESSION_KEY = 'ba-selected-meal-type';

export function setSelectedMealType(mealType: MealType): void {
  try {
    sessionStorage.setItem(MEAL_SESSION_KEY, mealType);
  } catch {
    /* ignore */
  }
}

export function getSelectedMealType(): MealType {
  try {
    const v = sessionStorage.getItem(MEAL_SESSION_KEY);
    if (v === 'desayuno' || v === 'comida' || v === 'merienda' || v === 'cena') {
      return v;
    }
  } catch {
    /* ignore */
  }
  return 'cena';
}
