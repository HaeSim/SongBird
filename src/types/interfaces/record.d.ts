type NutritionData = {
  name: string;
  calorie: number;
  carbohydrate: number;
  protein: number;
  fat: number;
  sugar: number;
  sodium: number;
  unit: number;
};

/** POST postImageNutrition */
export interface ParamsPostImageNutrition {
  image: string; // base64로 인코딩된 이미지 데이터
}

export interface RequestPostImageNutrition {
  image: string; // base64로 인코딩된 이미지 데이터
}

export interface ResponsePostImageNutrition {
  result: NutritionData[];
}
