import React from 'react';

type CategoriesProps = {
  activeIndex: number;
  onClickCategory: (index: number)=> void;
};

export const Categories: React.FC<CategoriesProps> = React.memo(({ activeIndex, onClickCategory }) => {
  const categories: string[] = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ];
  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => (
          <li
            onClick={() => onClickCategory(index)}
            className={index === activeIndex ? 'active' : ''}
            key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
});
