import { cn } from "@/lib/utils";

const Container = ({ children, extraClassName }) => {
  return (
    <div className={cn("container mx-auto", extraClassName)}>{children}</div>
  );
};

export default Container;
