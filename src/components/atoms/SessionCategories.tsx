import { Category } from "@/sessionize/sessionizeApi";

export const SessionCategories: React.FC<{
  categories: Category[];
  ignoreCategories?: number[];
}> = ({ categories, ignoreCategories = [] }) => {
  // Sessionize returns an empty categoryItems array when no value is selected
  const visibleCategories = categories.filter(
    (category) =>
      !ignoreCategories.includes(category.id) &&
      category.categoryItems.length > 0
  );
  return (
    <div className="flex flex-wrap text-gray-100 my-2 space-x-2 text-sm">
      {visibleCategories.map((category) => (
        <div
          className={`${
            category.categoryItems[0].name === "可"
              ? "bg-blue-600"
              : "bg-red-600"
          }  px-1 rounded-md mt-1`}
          key={category.id}
        >
          {category.name}: {category.categoryItems.map((item) => item.name)}
        </div>
      ))}
    </div>
  );
};
