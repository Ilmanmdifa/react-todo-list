import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";

function LoginInput({ login }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      <p className="login-title">Sign in to use your app!</p>
      <div className="login-input-container">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={onEmailChangeHandler}
        />
        <span>
          <MdOutlineAlternateEmail />
        </span>
      </div>
      <div className="login-input-container">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={onPasswordChangeHandler}
        />
        <span>
          <TbLockPassword />
        </span>
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
