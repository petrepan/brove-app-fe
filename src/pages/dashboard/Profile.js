import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserOverview,
  updateUserProfile,
  updateUserPassword,
} from "../../actions/userActions";
import DashboardMenu from "../../components/DashboardMenu";
import DashboardContent from "../../components/DashboardContent";
import Message from "../../components/Message";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [tab, setTab] = useState("account");

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);

  const { user, loading, error } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);

  const {
    user: updateUser,
    loading: updateLoading,
    error: updateError,
  } = userUpdate;

  useEffect(() => {
    dispatch(getUserOverview());
  }, [dispatch]);

  useEffect(() => {
    if (user && user.data) {
      setEmail(user.data.email);
      setName(user.data.name);
    }
  }, [user]);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(name, email));
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    dispatch(updateUserPassword(oldPassword, newPassword));
  };

  const togglePassword = () => {
    setOpen(!open);
  };

  const switchTab = (e) => {
    setTab(e.target.ariaLabel);
  };

  return (
    <div>
      <DashboardMenu />
      <DashboardContent>
        {updateUser && (
          <Message variant="bg-green-900">{updateUser.message}</Message>
        )}
        {updateError && <Message variant="bg-red-900">{updateError}</Message>}
        {loading ? (
          <div className="h-full flex justify-center items-center">
            <div className="spinner border-t-4 border-black"></div>
          </div>
        ) : error ? (
          <Message variant="bg-red-900">{error}</Message>
        ) : (
          <div>
            {user && user.data && (
              <div>
                <h3 className="text-2xl uppercase font-bold mb-3 text-center md:text-left">
                  Profile
                </h3>
                <div className="border-b">
                  <button
                    className={`${
                      tab === "account" ? "font-bold border-b" : ""
                    } focus:outline-none mr-7`}
                    aria-label="account"
                    onClick={switchTab}>
                    Account
                  </button>
                  <button
                    className={`${
                      tab === "account" ? "" : "font-bold border-b"
                    } focus:outline-none`}
                    onClick={switchTab}
                    aria-label="security">
                    Security
                  </button>
                </div>

                <div className="w-full md:w-3/6">
                  <form
                    onSubmit={handleProfileUpdate}
                    className={`${
                      tab === "account" ? "block" : "hidden"
                    } mb-4`}>
                    <div className="mb-2">
                      <label>Email</label>
                      <div className="flex py-1 items-center border border-black">
                        <i className="far fa-envelope px-1"></i>
                        <input
                          className="w-full px-2 border-l border-black outline-none"
                          type="email"
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="John@gmail.com"
                          value={email}
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-2">
                      <label>Name</label>
                      <div className="flex py-1 items-center border border-black">
                        <i className="far fa-user px-1"></i>
                        <input
                          className="w-full px-2 border-l border-black outline-none"
                          type="text"
                          onChange={(e) => setName(e.target.value)}
                          placeholder="John"
                          value={name}
                          required
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <button className="bg-blue-900 align-middle w-full text-white h-10 outline-none">
                        {updateLoading ? (
                          <div className="spinner border-t-4 border-white"></div>
                        ) : (
                          "SAVE CHANGES"
                        )}
                      </button>
                    </div>
                  </form>
                  <form
                    onSubmit={handlePasswordUpdate}
                    className={`${
                      tab === "account" ? "hidden" : "block"
                    } mb-4`}>
                    <div className="mb-2">
                      <label>Old Password</label>
                      <div className="flex py-1 items-center border border-black">
                        <i className="fas fa-lock px-1"></i>
                        <input
                          className="w-full px-2 border-l border-black outline-none"
                          type={open ? "text" : "password"}
                          onChange={(e) => setOldPassword(e.target.value)}
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
                    <div className="mb-2">
                      <label>New Password</label>
                      <div className="flex py-1 items-center border border-black">
                        <i className="fas fa-lock px-1"></i>
                        <input
                          className="w-full px-2 border-l border-black outline-none"
                          type={open ? "text" : "password"}
                          onChange={(e) => setNewPassword(e.target.value)}
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
                        {updateLoading ? (
                          <div className="spinner border-t-4 border-white"></div>
                        ) : (
                          "UPDATE PASSWORD"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </DashboardContent>
    </div>
  );
};

export default Profile;
