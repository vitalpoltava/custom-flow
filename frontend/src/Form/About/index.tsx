import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {ChangeEvent, useEffect, useState} from "react";

const About = () => {
  useEffect(() => {
    const stateAbout = localStorage.getItem('about');
    if (stateAbout) {
      setAbout(stateAbout);
    }
  }, []);
  const [about, setAbout] = useState('');
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAbout(e.target.value)
    localStorage.setItem('about', e.target.value);
  }
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{marginBottom: 3}}
    >
    <div>
      <TextField
        label="About Me"
        multiline
        maxRows={4}
        value={about}
        onChange={handleChange}
      />
    </div>
    </Box>
  )
}

export default About;
