import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {ChangeEvent, useEffect, useState} from "react";

const Address = () => {
  useEffect(() => {
    const stateAddress = localStorage.getItem('address');
    if (stateAddress) {
      setAddress(stateAddress);
    }
  }, []);
  const [address, setAddress] = useState('');
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value)
    localStorage.setItem('address', e.target.value);
  }
  return (
    <Box
      component="form"
      sx={{marginBottom: 3}}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          label="Address"
          value={address}
          onChange={handleChange}
        />
      </div>
    </Box>
  )
}

export default Address;
