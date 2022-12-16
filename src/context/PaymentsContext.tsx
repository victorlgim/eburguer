import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { iDefaultPaymentsContext } from "../@types/@PaymentsTypes/types";
import { GlobalContext } from "./GlobalContext";
import { useContext, useState } from "react";

export const PaymentsContext = createContext({})


export const PaymentsProvider = ({ children }: iDefaultPaymentsContext) => {

   const navigate = useNavigate()
   const { setLoading } = useContext<any>(GlobalContext)
   const [ mobile, setMobile ] = useState<boolean>(false)
   const [ resMobile, setResMobile ] = useState<string>('')
   const [ empty, setEmpty ] = useState<boolean>(true)

   const changeResMobile = (event: React.ChangeEvent<HTMLInputElement>) => {
      setResMobile(event.target.value);
      resMobile.length === 0 ? setEmpty(false) : setEmpty(true);
    };
     
   const exitAccount: () => void = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      navigate("/"); 
      setLoading(false);
  };
     
   return (
     <PaymentsContext.Provider value={{ exitAccount, mobile, setMobile, resMobile, setResMobile, empty, changeResMobile }}>
        { children }
     </PaymentsContext.Provider>
   )
}