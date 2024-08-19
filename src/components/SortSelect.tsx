import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { sortOptions } from "@/constants";

const SortSelect: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedValue = useMemo(() => {
    return (
      sortOptions.find((item) => item.value === searchParams.get("sort"))
        ?.value || "default"
    );
  }, [searchParams]);

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value === "default") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }

    setSearchParams(params);
  };

  return (
    <Select value={selectedValue} onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {sortOptions.map((option) => (
            <SelectItem
              dir="rtl"
              className="text-right"
              key={option.value}
              value={option.value}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SortSelect;
