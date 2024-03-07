import { Input } from "@nextui-org/react";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const InputPassword = ({ password, onChange, placeholder, label }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Input
      label={label}
      value={password}
      onChange={onChange}
      variant="bordered"
      placeholder={placeholder}
      endContent={
        <button
          className="focus:outline-none"
          type="button"
          onClick={toggleVisibility}
        >
          {isVisible ? (
            <FaEye className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
      type={isVisible ? "text" : "password"}
      className="max-w-xs"
    />
  );
};

export default InputPassword;
