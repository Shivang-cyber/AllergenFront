import React, {useContext} from 'react';
import RecipeCard, { Recipe } from './Card';
import { AppContext } from '../page';

const CardDisplayer = () => {
    const data = useContext(AppContext);
  return (
    <div className="space-y-4">
      {data?.messages.map((recipe, index) => (
        <RecipeCard key={index} recipe={recipe} />
      ))}
    </div>
  );
};

export default CardDisplayer;
