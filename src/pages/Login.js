import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import Message from "../components/Message";

const Login = ({ history }) => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);

  const togglePassword = () => {
    setOpen(!open);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(login(email, password));
  };

  return (
    <div className="container mx-auto px-4 md:w-2/6 h-full">
      {error && <Message variant="bg-red-900">{error}</Message>}
      <div className="mt-16">
        <h3 className="text-center text-2xl font-bold mb-4 uppercase">login</h3>
        <form onSubmit={submitHandler}>
          <div className="mb-2">
            <label>Email</label>
            <div className="flex py-1 items-center border border-black">
              <i className="far fa-envelope px-1"></i>
              <input
                className="w-full px-2 border-l border-black outline-none"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="John@gmail.com"
                required
              />
            </div>
          </div>
          <div className="mb-2">
            <label>Password</label>
            <div className="flex py-1 items-center border border-black">
              <i className="fas fa-lock px-1"></i>
              <input
                className="w-full px-2 border-l border-black outline-none"
                type={open ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="******"
                minLength="5"
                required
              />
              <div className="px-2" onClick={togglePassword}>
                {open ? (
                  <i className="fas fa-eye-slash"></i>
                ) : (
                  <i className="fas fa-eye"></i>
                )}
              </div>
            </div>
          </div>
          <div className="mt-4">
            <button className="bg-blue-900 align-middle w-full text-white h-10 outline-none">
              {loading ? (
                <div className="spinner border-t-4 border-white"></div>
              ) : (
                "REGISTER"
              )}
            </button>
          </div>
        </form>
        <div className="text-center mt-4">No Account? Register <Link className="underline" to="/register">here</Link></div>
      </div>
    </div>
  );
};

export default Login;
