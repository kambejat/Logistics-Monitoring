import React, { createContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";

interface UserProps {
  username: string;
  email: string;
  user_id: number;
  first_name: string;
  last_name: string;
  role: string;
  image_url: string;
}

interface AuthContextProps {
  user: UserProps | null;
  token: string | null;
  loginUser: (loginData: LoginDataProps,  rememberMe: any) => Promise<void>;
  logoutUser: any;
  registerUser: (registerData: RegisterDataProps) => Promise<void>;
  fieldErrors: Record<string, string>;
  setFieldErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  isServerError: string | boolean;
  setIsServerError: React.Dispatch<React.SetStateAction<string | boolean>>;
}

interface RegisterDataProps {
  email: string;
  password: string;
  password2: string;
  first_name: string;
  last_name: string;
  image_url: File | string;
}

interface LoginDataProps {
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export default AuthContext;

function setUserObject(user: UserProps | null): UserProps | null {
  if (!user) {
    return null;
  }
  return {
    username: user.username,
    email: user.email,
    user_id: user.user_id,
    first_name: user.first_name,
    last_name: user.last_name,
    role: user.role,
    image_url: user.image_url,
  };
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => {
    const storedToken = localStorage.getItem("token");
    return storedToken ? JSON.parse(storedToken) : null;
  });

  const [user, setUser] = useState<UserProps | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isServerError, setIsServerError] = useState<string | boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken: any = localStorage.getItem("token");
    if (storedToken) {
      const parsedToken = JSON.parse(storedToken);
      setToken(parsedToken);
      const decodedToken: any = jwtDecode(parsedToken);
      setUser(setUserObject(decodedToken));
    }
    setIsLoading(false);
  }, []);

  const registerUser = async (registerData: RegisterDataProps) => {
    const formData = new FormData();
    formData.append("email", registerData.email);
    formData.append("password", registerData.password);
    formData.append("password2", registerData.password2);
    formData.append("first_name", registerData.first_name);
    formData.append("last_name", registerData.last_name);

    // Conditionally append image_url only if it exists
    if (registerData.image_url) {
      formData.append("image_url", registerData.image_url);
    }

    try {
      const response = await axios.post(`/api/v1/register/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        toast.success("Successful registration! You can now login.");
        setFieldErrors({});
        setIsServerError(false);
        navigate("/login");
      } else {
        navigate("/register");
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        setFieldErrors(error.response.data);
        setIsServerError(error.response.data);
      } else {
        setFieldErrors({ general: "An unexpected error occurred" });
      }
    }
  };

  const loginUser = async (loginData: LoginDataProps,  rememberMe: any) => {
    try {
      const response = await axios.post(`/api/v1/login/`, loginData);
      if (response.status === 200) {
        if (rememberMe) {
          localStorage.setItem("token", JSON.stringify(response.data.access));
        } else {
          sessionStorage.setItem("token", JSON.stringify(response.data.access));
        }
        localStorage.setItem("token", JSON.stringify(response.data.access));
        setToken(response.data.access);
        const loggedInUser: UserProps = jwtDecode(response.data.access);
        setUser(setUserObject(loggedInUser));
        setFieldErrors({});
        toast.success(`Welcome back ${loginData.email}`);
        navigate(`/dashboard/${1}/${1}`);
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        const errors = error.response.data;
        const fieldErrors: any = {};
  
        if (errors.email) {
          fieldErrors.email = errors.email;
        }
        if (errors.password) {
          fieldErrors.password = errors.password;
        }
        if (errors.detail) {
          setIsServerError(errors.detail);
        } else {
          setIsServerError("An unexpected error occurred. Please try again.");
        }
  
        setFieldErrors(fieldErrors);
      } else {
        setFieldErrors({ general: 'An unexpected error occurred' });
        setIsServerError('An unexpected error occurred');
      }
      navigate("/login");
    }
  };

  const logoutUser = () => {
    if (user) {
      localStorage.removeItem("token");
      setUser(null);
      setToken(null);
      navigate("/login");
      window.location.reload();
    }
  };

  const contextData: AuthContextProps = {
    user,
    token,
    loginUser,
    logoutUser,
    registerUser,
    fieldErrors,
    setFieldErrors,
    isServerError,
    setIsServerError
  };

  return (
    <AuthContext.Provider value={contextData}>
      {!isLoading && children}
      <ToastContainer />
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
