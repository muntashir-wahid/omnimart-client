import { cn } from "@/lib/utils";

const DataLoadingState = ({
  content = "Please wait. Data is Loading...",
  extraClassNames,
}) => {
  return (
    <div
      className={cn(
        "min-h-[72vh] flex items-center justify-center text-center",
        extraClassNames
      )}
    >
      <p className="text-lg font-medium">{content}</p>
    </div>
  );
};

export default DataLoadingState;
