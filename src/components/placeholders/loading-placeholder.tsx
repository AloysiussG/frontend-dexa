import { Spinner } from "@heroui/react";

const LoadingPlaceholder = () => {
  return (
    <div className="flex flex-1 w-full items-center justify-center">
      <Spinner label="Loading..." color="current" />
    </div>
  );
};

export default LoadingPlaceholder;
