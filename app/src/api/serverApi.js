import httpClient from "./httpClient";
// import { AsyncStorage } from 'react-native'

export const createAccount = async (name, email, password) => {
  const body = {
    name,
    email,
    password
  };
  try {
    const response = await httpClient.post("user/create", body);
    console.log("TCL: createAccount -> response", response);
    return response;
  } catch (error) {
    console.log("TCL: createAccount -> error", error);
    return error.response;
  }
};

export const login = async (email, password) => {
  const body = {
    email,
    password
  };
  try {
    const response = await httpClient.post("user/login", body);
    console.log("TCL: login -> response", response);
    return response;
  } catch (error) {
    return error.response;
  }
};
