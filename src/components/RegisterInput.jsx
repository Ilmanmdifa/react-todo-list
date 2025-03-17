import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";

function RegisterInput({ register }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retryPassword, setRetryPassword] = useState("");
  const [error, setError] = useState("");

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onRetryPasswordChange = (event) => {
    const value = event.target.value;
    setRetryPassword(value);

    if (value && value !== password) {
      setError("Passwords do not match");
    } else {
      setError("");
    }
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (password !== retryPassword) {
      setError("Passwords does not match");
      return;
    }

    setError("");
    register({ name, email, password });
  };

  return (
    <form onSubmit={onSubmitHandler} className="register-form">
      <p className="register-title">Create new account!</p>
      <div className="register-input-container">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={onNameChange}
        />
      </div>
      <div className="register-input-container">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={onEmailChange}
        />
      </div>
      <div className="register-input-container">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={onPasswordChange}
        />
      </div>
      <div className="register-input-container">
        <input
          type="password"
          placeholder="Confirm Password"
          value={retryPassword}
          onChange={onRetryPasswordChange}
        />
      </div>
      {error && <p className="error-message">{error}</p>}
      <button className="register-submit">Register</button>
      <p className="login-link">
        Kembali ke <Link to="/">Login</Link>
      </p>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
