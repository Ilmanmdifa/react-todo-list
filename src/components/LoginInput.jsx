import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { TbEye, TbEyeClosed } from "react-icons/tb";
import LocaleContext from "../context/LocaleContext";

function LoginInput({ login }) {
  const { locale } = useContext(LocaleContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onEmailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setFormError(null);
    setIsSubmitting(true);
    try {
      const { error, message } = await login({ email, password });
      if (error) {
        // Sengaja generik: pesan spesifik API ("email not found" vs
        // "password wrong") membocorkan email terdaftar ke penebak.
        // Detail asli hanya di-log saat development.
        if (import.meta.env.DEV) {
          console.error(message);
        }
        setFormError(
          locale === "id" ? "Email atau password salah." : "Wrong email or password."
        );
      }
    } catch {
      setFormError("Login failed. Check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <form className="login-form" onSubmit={onSubmitHandler}>
      <div className="login-brand">
        <span className="login-brand__mark">N</span>
        <p className="login-title">Sign in to use your app!</p>
      </div>
      <div className="login-input-container">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={onEmailChangeHandler}
          autoComplete="email"
          aria-label="Email"
        />
        <span aria-hidden="true">
          <MdOutlineAlternateEmail />
        </span>
      </div>
      <div className="login-input-container">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={onPasswordChangeHandler}
          autoComplete="current-password"
          aria-label="Password"
        />
        <button
          type="button"
          className="login-input-toggle"
          onClick={() => setShowPassword((v) => !v)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          title={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <TbEyeClosed /> : <TbEye />}
        </button>
      </div>
      <button className="login-submit" disabled={isSubmitting}>
        {isSubmitting ? "Signing in..." : "Login"}
      </button>
      {formError && (
        <p className="error-message" role="alert">
          {formError}
        </p>
      )}
      <p className="signup-link">
        Belum punya akun? <Link to="/register">Sign up</Link>
      </p>
    </form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
