import React from 'react';
import { Provider } from 'react-redux';
import store from '@/store/store'; // Adjust the import path as necessary
import LoginForm from "./login/page";
import SignupForm from "./signup/page";

export default function Home() {
  return (
    <Provider store={store}>
      <main className="">
        <SignupForm />
        {/* <LoginForm/> */}
        {/* <Dashboard/> */}
      </main>
    </Provider>
  );
}
