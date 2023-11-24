export type NutritionData = {
  intake: number;
  goal: number;
};

export type NutritionDataItem = {
  date: string;
  carbohydrate: NutritionData;
  protein: NutritionData;
  fat: NutritionData;
  water: NutritionData;
};

/** GET getMonthNutrition */
export interface ParamsGetMonthNutrition {
  year: number;
  month: number;
}

export interface RequestGetMonthNutrition {
  year: number;
  month: number;
}

export interface ResponseGetMonthNutrition {
  result: NutritionDataItem[];
}

export interface MonthNutrition {
  result: NutritionDataItem[];
}

export type TypeServing = 'many' | 'normal' | 'few'; // many: 1.2배, normal: 1배, few: 0.8배

export type Nutrition =
  | 'calorie'
  | 'carbohydrate'
  | 'protein'
  | 'fat'
  | 'sugar'
  | 'sodium';

export interface NutrientInfo {
  foodName: string;
  serving: string;
  nutrient: {
    calorie: number;
    carbohydrate: number;
    protein: number;
    fat: number;
    sugar: number;
    sodium: number;
  };
}
