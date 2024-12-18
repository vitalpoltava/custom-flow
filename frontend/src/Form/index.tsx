import React, {lazy, useState} from "react";
import { Link } from "react-router";
import Login from "./Login";
import Page2 from "./Page2";
import Page3 from "./Page3";
import {Config} from "../types";
import {saveMyData} from "../fetchers/http";
import {Snackbar} from "@mui/material";

const Form = () => {
  const [page, setPage] = useState(1);
  const [config, setConfig] = useState<Config[]>([]);
  const [open, setOpen] = React.useState(false);

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

      // Go to form start
      setPage(1);

      // Show save message
      setOpen(true);
    })
  }


  return (
    <div>
      <h2>Page: {page}</h2>
      {page === 1 && (<Login setPage={setPage} setConfig={setConfig} />)}
      {page === 2 && (<Page2 setPage={setPage} config={config} factory={factory} />)}
      {page === 3 && (<Page3 setPage={setPage} config={config} factory={factory} saveData={saveData} />)}
      <div style={{marginTop: '3rem'}}>
        <Link to="/admin">Admin</Link>&nbsp;&nbsp;
        <Link to="/data">Data Table</Link>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        message="Data saved"
        onClose={() => setOpen(false)}
      />
    </div>
  )
}

export default Form
