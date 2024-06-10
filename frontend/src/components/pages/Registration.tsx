import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../ui/styles';
import AuthContext from '../context/AuthContext';

interface RegistrationProps {
  email: string;
  password: string;
  password2: string;
  first_name: string;
  last_name: string;
  image_url: any;
}

const Registration: React.FC = () => {
  const [formData, setFormData] = useState<RegistrationProps>({
    email: '',
    password: '',
    password2: '',
    first_name: '',
    last_name: '',
    image_url: null,
  });

  const { email, password, password2, first_name, last_name } = formData;

  const authContext = useContext(AuthContext);


  if (!authContext) {
    return null;
  }

  const { registerUser, fieldErrors, setFieldErrors } = authContext;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === 'file' && e.target.files) {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== password2) {
      setFieldErrors({ password2: 'Passwords do not match' });
    } else {
      await registerUser(formData);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center p-1 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow-sm dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-4">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={onChange}
                  className={styles.input}
                  placeholder="name@company.com"
                  required
                />
                {fieldErrors.email && <p className="text-red-500 text-sm">{fieldErrors.email}</p>}
              </div>
              <div className="justify-between flex">
                <div>
                  <label
                    htmlFor="first_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    value={first_name}
                    onChange={onChange}
                    className={`${styles.input} w-full `}
                    required
                  />
                  {fieldErrors.first_name && <p className="text-red-500 text-sm">{fieldErrors.first_name}</p>}
                </div>
                <div>
                  <label
                    htmlFor="last_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    value={last_name}
                    onChange={onChange}
                    className={`${styles.input} w-full`}
                    required
                  />
                  {fieldErrors.last_name && <p className="text-red-500 text-sm">{fieldErrors.last_name}</p>}
                </div>
              </div>
              <div>
                <label
                  htmlFor="image_url"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Image
                </label>
                <input
                  type="file"
                  name="image_url"
                  id="image_url"
                  onChange={onChange}
                  className={styles.input}
                />
                {fieldErrors.image_url && <p className="text-red-500 text-sm">{fieldErrors.image_url}</p>}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={onChange}
                  placeholder="••••••••"
                  className={styles.input}
                />
                {fieldErrors.password && <p className="text-red-500 text-sm">{fieldErrors.password}</p>}
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="password2"
                  id="confirm-password"
                  value={password2}
                  onChange={onChange}
                  placeholder="••••••••"
                  className={styles.input}
                />
                {fieldErrors.password2 && <p className="text-red-500 text-sm">{fieldErrors.password2}</p>}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{' '}
                <Link
                  to={'/login'}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registration;
