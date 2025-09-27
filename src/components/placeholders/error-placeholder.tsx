type Props = {
  title?: string;
  message?: string;
};

const ErrorPlaceholder = ({
  title = "Error",
  message = "An error occured.",
}: Props) => {
  return (
    <div className="flex flex-1 w-full items-center justify-center">
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ErrorPlaceholder;
