import { Button, ButtonProps, cn } from "@heroui/react";
import React from "react";

const PrimaryButton = (props: ButtonProps) => {
  return (
    <Button
      color="primary"
      variant="solid"
      {...props}
      className={cn("bg-dexa-primary text-white w-full", props?.className)}
    >
      {props.children}
    </Button>
  );
};

export default PrimaryButton;
