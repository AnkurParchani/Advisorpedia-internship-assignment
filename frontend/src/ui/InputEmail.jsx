import { useMemo } from "react";
import { Input } from "@nextui-org/react";

const InputEmail = ({ email, onChange }) => {
  // Function to check if the provided value is a type of email of not
  const validateEmail = (value) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  // Checking if the email is valid
  const isInvalid = useMemo(() => {
    if (email === "") return false;

    return validateEmail(email) ? false : true;
  }, [email]);

  return (
    <Input
      value={email}
      type="email"
      label="Email"
      placeholder="someone@example.com"
      variant="bordered"
      isInvalid={isInvalid}
      color={isInvalid ? "danger" : "success"}
      errorMessage={isInvalid && "Please enter a valid email"}
      onChange={onChange}
      className="max-w-xs"
    />
  );
};

export default InputEmail;
