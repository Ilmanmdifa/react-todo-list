import PropTypes from "prop-types";
import LoginInput from "../components/LoginInput";
import { login } from "../utils/network-data";

function LoginPage({ loginSuccess }) {
  async function onLogin({ email, password }) {
    const result = await login({ email, password });

    if (!result.error) {
      loginSuccess(result.data);
    }
    return result;
  }

  return (
    <div className="login-form-container">
      <LoginInput login={onLogin} />
    </div>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};
export default LoginPage;
