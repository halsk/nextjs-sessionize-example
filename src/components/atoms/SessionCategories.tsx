import { Category } from "@/sessionize/sessionizeApi";

export const SessionCategories: React.FC<{
  categories: Category[];
  ignoreCategories?: number[];
}> = ({ categories, ignoreCategories = [] }) => {
  return (
    <div className="flex flex-wrap text-gray-100 my-2 text-sm">
      {categories.map((category, index) => {
        if (!ignoreCategories.includes(category.id))
          return (
            <div
              className={`${
                category.categoryItems[0].name === "可"
                  ? "bg-blue-600"
                  : "bg-red-600"
              }  ml-1 px-1 rounded-md mt-1`}
              key={category.id}
            >
              {category.name}: {category.categoryItems.map((item) => item.name)}
            </div>
          );
      })}
    </div>
  );
};
