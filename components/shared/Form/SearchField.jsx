import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SearchField = () => {
  return (
    <div className="relative">
      <Search
        size={20}
        className="absolute top-1/2 left-2 transform -translate-y-[50%] text-gray-500"
      />
      <Input className="pl-8" />
    </div>
  );
};

export default SearchField;
