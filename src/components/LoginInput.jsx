import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { TbEye, TbEyeClosed } from "react-icons/tb";

function LoginInput({ login }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onEmailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    login({ email, password });
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
      <button className="login-submit">Login</button>
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
