import { useState } from "react";
import { Button, Input, Checkbox } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

import AuthFormTemplate from "../ui/AuthFormTemplate";
import InputEmail from "../ui/InputEmail";
import InputPassword from "../ui/InputPassword";
import newRequest from "../utils/newRequest";
import { handleApiError } from "../utils/handleApiError";
import { useAuth } from "../contexts/useAuth";

const Signup = () => {
  const { setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["token"]);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    checkTermsAndConditions: false,
  });

  async function handleSignup(e) {
    e.preventDefault();
    const { email, password, passwordConfirm } = data;

    if ((!email, !password, !passwordConfirm))
      return toast("Please provide all the details", { type: "error" });

    try {
      setIsLoading(true);
      const res = await newRequest.post("/users/signup", data, {
        withCredentials: true,
      });

      if (!res.data) return;

      // Setting cookie, showing notification, navigating to main page
      setCookie("token", res.data.token);
      setIsLoggedIn(true);
      toast("A welcome email has been sent (fake)", { type: "info" });
      toast("Signed up successfully", { type: "success" });

      navigate("/");
    } catch (err) {
      return handleApiError(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthFormTemplate heading="Sign-up">
      <Input
        value={data.username}
        onChange={(e) => setData({ ...data, username: e.target.value })}
        type="text"
        variant="bordered"
        label="Username"
        placeholder="Enter your username"
      />
      <InputEmail
        email={data.email}
        onChange={(e) => setData({ ...data, email: e.target.value })}
      />
      <InputPassword
        label="Password"
        placeholder="Enter your password"
        password={data.password}
        onChange={(e) => setData({ ...data, password: e.target.value })}
      />
      <InputPassword
        label="Confirm Password"
        placeholder="Confirm your password"
        password={data.passwordConfirm}
        onChange={(e) => setData({ ...data, passwordConfirm: e.target.value })}
      />
      <Checkbox
        defaultSelected={data.checkTermsAndConditions}
        size="sm"
        color="secondary"
        onChange={(e) =>
          setData({ ...data, checkTermsAndConditions: e.target.checked })
        }
      >
        I agree with Advisorpedia&apos;s Terms and Conditions
      </Checkbox>

      <Button
        type="submit"
        radius="sm"
        color="secondary"
        disabled={isLoading}
        isLoading={isLoading}
        variant="solid"
        onClick={handleSignup}
      >
        {isLoading ? "Loading..." : "Signup"}
      </Button>

      <p className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
      </p>
    </AuthFormTemplate>
  );
};

export default Signup;
