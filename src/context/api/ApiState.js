import React, { useState } from "react";
import APIContext from "./apiContext";
import axios from "axios";

const ApiState = ({ children }) => {
  const [peopleInfo, setPeopleInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const api = axios.create({ baseURL: `http://localhost:5000/api` });

  const updatePersonInfo = async (
    arrayPatch,
    id,
    changeName,
    changeSurname
  ) => {
    setIsLoading(true);
    await api.patch(`/people/${id}`, arrayPatch);
    const resultado = peopleInfo.find((peopleArray) => peopleArray.id === id);
    resultado.name = changeName;
    resultado.surname = changeSurname;
    setIsLoading(false);
  };

  const getAllData = async () => {
    setIsLoading(true);
    let response = await api.get("/people");
    if (response.data.length > 0) {
      setPeopleInfo(response.data);
    }
    setIsLoading(false);
  };

  const deletePerson = async (id) => {
    setIsLoading(true);
    await api.delete(`/people/${id}`);
    setPeopleInfo(peopleInfo.filter((person) => person.id !== id));
    setIsLoading(false);
  };

  const addPerson = async (name, surname, platform) => {
    setIsLoading(true);
    let response = await api.post("/people", {
      name,
      surname,
      platform,
    });
    setPeopleInfo([...peopleInfo, response.data]);
    setIsLoading(false);
  };

  return (
    <APIContext.Provider
      value={{
        peopleInfo,
        isLoading,
        getAllData,
        deletePerson,
        addPerson,
        updatePersonInfo,
      }}
    >
      {children}
    </APIContext.Provider>
  );
};

export default ApiState;
