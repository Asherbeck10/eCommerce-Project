import styles from './style.module.css';
import { useState } from 'react';
import { UserErrors } from '../../models/errors';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpWithEmailAndPassword } from './Firebase';

export default function Register() {
  // const [username, setUsername] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  //===============
  //Form Validation
  //================

  // Yup schema for validation
  const schema = yup.object().shape({
    firstName: yup.string().required(' First name Is Required'),
    lastName: yup.string().required('Last name Is Required'),
    email: yup.string().email().required(),
    password: yup.string().required().min(5).max(20),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords Must Match')
      .required(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  //handleRegister function
  const handleRegister = async () => {
    try {
      await axios.post('/user/register', {
        firstName,
        lastName,
        password,
        email,
      });
      await signUpWithEmailAndPassword(email, password);
      alert('Registration Completed Please Login!');
      reset();
    } catch (err) {
      if (err?.response.data?.type === UserErrors.USER_ALREADY_EXISTS) {
        alert('Error:User Already Exists');
      } else if (err?.response.data?.type === UserErrors.EMAIL_ALREADY_EXISTS) {
        alert('Error:Email Already Exists');
      } else {
        alert('Error:Something went wrong');
      }
    }
  };

  return (
    <div className={styles.auth_container_register}>
      <form onSubmit={handleSubmit(handleRegister)}>
        <h2>Register</h2>
        <div className={styles.form_group}>
          <label htmlFor="registerFirstName">First Name</label>
          <input
            type="text"
            id="registerFirstName"
            {...register('firstName')}
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
          />
          <p>{errors.firstName?.message}</p>
        </div>
        <div className={styles.form_group}>
          <label htmlFor="registerLastName">Last Name</label>
          <input
            type="text"
            id="registerLastName"
            {...register('lastName')}
            onChange={(event) => {
              setLastName(event.target.value);
            }}
          />
          <p>{errors.lastName?.message}</p>
        </div>
        <div className={styles.form_group}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register('email')}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <p>{errors.email?.message}</p>
        </div>
        <div className={styles.form_group}>
          <label htmlFor="registerPassword">Password</label>
          <input
            type="password"
            id="registerPassword"
            {...register('password')}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <p>{errors.password?.message}</p>
        </div>
        <div className={styles.form_group}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            {...register('confirmPassword')}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <p>{errors.confirmPassword?.message}</p>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
