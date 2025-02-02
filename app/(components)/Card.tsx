import React from 'react';

export interface Recipe {
  recipe_name: string;
  allergens: string[];
  flagged_ingredients: { [key: string]: string[] };
  unrecognized_ingredients: string[];
  message: string;
}

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md mb-4">
      <h3 className="text-xl font-semibold mb-2">{recipe.recipe_name}</h3>
      <p className="font-medium mb-2">
        <strong>Allergens:</strong> {recipe.allergens.join(', ')}
      </p>

      {recipe.flagged_ingredients && Object.keys(recipe.flagged_ingredients).length > 0 && (
        <div className="mb-2">
          <strong>Flagged Ingredients:</strong>
          <ul className="list-disc pl-5">
            {Object.entries(recipe.flagged_ingredients).map(([ingredient, allergens]) => (
              <li key={ingredient}>
                <span className="font-medium">{ingredient}:</span> {allergens.join(', ')}
              </li>
            ))}
          </ul>
        </div>
      )}

      {recipe.unrecognized_ingredients && recipe.unrecognized_ingredients.length > 0 && (
        <div className="mb-2">
          <strong>Unrecognized Ingredients:</strong>
          <ul className="list-disc pl-5">
            {recipe.unrecognized_ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
      )}

      {recipe.message && (
        <p className="text-red-500 mt-2">
          <strong>Message:</strong> {recipe.message}
        </p>
      )}
    </div>
  );
};

export default RecipeCard;
