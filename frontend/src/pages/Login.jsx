import { useState } from "react";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";

import AuthFormTemplate from "../ui/AuthFormTemplate";
import InputEmail from "../ui/InputEmail";
import InputPassword from "../ui/InputPassword";
import newRequest from "../utils/newRequest";
import { handleApiError } from "../utils/handleApiError";
import { useAuth } from "../contexts/useAuth";

const Login = () => {
  const { setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["token"]);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    try {
      e.preventDefault();
      setIsLoading(true);
      const res = await newRequest.post(
        "/users/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      if (!res.data) return;

      // Setting cookie, showing notification, navigating to main page
      setCookie("token", res.data.token);
      setIsLoggedIn(true);
      toast("Logged in successfully", { type: "success" });

      navigate("/");
    } catch (err) {
      return handleApiError(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthFormTemplate heading="Login">
      <InputEmail email={email} onChange={(e) => setEmail(e.target.value)} />

      <InputPassword
        label="Password"
        placeholder="Enter your password"
        password={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        type="submit"
        radius="sm"
        disabled={isLoading}
        isLoading={isLoading}
        color="secondary"
        variant="solid"
        onClick={handleLogin}
      >
        {isLoading ? "Loading..." : "Login"}
      </Button>

      <p className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/signup" className="text-blue-500 hover:underline">
          Sign up
        </Link>
      </p>
    </AuthFormTemplate>
  );
};

export default Login;
