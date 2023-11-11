import { SessionGrid } from "@/sessionize/sessionizeApi";
import { format } from "date-fns";
import { Fragment } from "react";

type GridSelectorProps = {
  grids: SessionGrid[];
  groupId: number;
  changeDate: (index: number) => () => void;
};
const GridSelector: React.FC<GridSelectorProps> = ({
  grids,
  groupId,
  changeDate,
}) => {
  return (
    <div className="text-md font-medium text-center text-primary border-b border-gray-200">
      <ul className="flex flex-wrap -mb-px justify-center">
        {grids.map((grid, index) => (
          <Fragment key={`date-${index}`}>
            {index !== groupId ? (
              <li className="mr-2">
                <a
                  href={`#${index}`}
                  onClick={changeDate(index)}
                  className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-blue-500"
                >
                  {format(grid.date, "M月d日")}
                </a>
              </li>
            ) : (
              <li className="mr-2 inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500">
                {format(grid.date, "M月d日")}
              </li>
            )}
          </Fragment>
        ))}
      </ul>
    </div>
  );
};
export default GridSelector;
