import React from "react";
import { useInterpret } from "@xstate/react";
import { authMachine, MachineInterpreter } from "./authMachine";
import { useState, useCallback } from "react";

interface AuthContext {
  authService: MachineInterpreter;
  worldMapView: boolean;
  setWorldMapView: (_is: boolean) => void;
}

export const Context = React.createContext<AuthContext>({} as AuthContext);

export const Provider: React.FC = ({ children }) => {
  const authService = useInterpret(authMachine) as MachineInterpreter;

  const [worldMapView, setWorldMapView] = useState(false);

  return (
    <Context.Provider value={{ authService, worldMapView, setWorldMapView }}>
      {children}
    </Context.Provider>
  );
};
