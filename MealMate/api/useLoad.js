import { useState, useEffect } from "react";
import API from "./apiRequest.js";

export default function useLoad(endpoint) {

    
  // State ---------------------------------------
  // UseLoad -------------------------------------
  const [records, setRecords] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState('Loading records ...');

  // Context -------------------------------------
  // Methods -------------------------------------
  //Uses endpoint to load in all records and set state.
  const loadRecords = async (endpoint) => {  
  const response = await API.get(endpoint);
  response.isSuccess
    ? setRecords(response.result)
    : setLoadingMessage(response.message) 
      
  }

  useEffect(() => { loadRecords(endpoint) }, []);

  //Return

  return [records, setRecords, loadingMessage, loadRecords]

}