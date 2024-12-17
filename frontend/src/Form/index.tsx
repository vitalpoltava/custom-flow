import {lazy, useState} from "react";
import Login from "./Login";
import Page2 from "./Page2";
import Page3 from "./Page3";
import {Config} from "../types";
import {saveMyData} from "../fetchers/http";

const Form = () => {
  const [page, setPage] = useState(1);
  const [config, setConfig] = useState<Config[]>([])

  const factory = {
    'about': () => lazy(() => import('./About')),
    'address': () => lazy(() => import('./Address')),
    'birthdate': () => lazy(() => import('./Birthdate')),
  }

  const saveData = () => {
    const data = [
      {name: 'about', value: localStorage.getItem('about') || ''},
      {name: 'address', value: localStorage.getItem('address') || ''},
      {name: 'birthdate', value: localStorage.getItem('birthdate') || ''},
    ];

    saveMyData(data).then(() => {
      // Clean Up
      localStorage.removeItem('about');
      localStorage.removeItem('address');
      localStorage.removeItem('birthdate');

      // To start
      setPage(1);
    })
  }


  return (
    <div>
      <h2>Page: {page}</h2>
      {page === 1 && (<Login setPage={setPage} setConfig={setConfig} />)}
      {page === 2 && (<Page2 setPage={setPage} config={config} factory={factory} />)}
      {page === 3 && (<Page3 setPage={setPage} config={config} factory={factory} saveData={saveData} />)}
    </div>
  )
}

export default Form
