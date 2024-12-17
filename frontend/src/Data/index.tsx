import {useEffect, useState} from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import {MyData} from "../types";
import {getMyData} from "../fetchers/http";
import {Link} from "react-router";

const Data = () => {
  const [data, setData] = useState<MyData[]>([]);
  useEffect(() => {
    getMyData().then(data => setData(data));
  }, [])
  return (
    <>
      <Card sx={{maxWidth: 500, m: 3}}>
        <CardContent>
          <h2>Data Table</h2>
          {data.length ? data.map((item, index) => (
            <Box sx={{p: 2, m: 2}}>
              <h3>{item.name.toUpperCase()}</h3>
              <div>{item.value}</div>
            </Box>
          )) : (
            <div>No data yet</div>
          )}
        </CardContent>
      </Card>
      <div style={{marginTop: '3rem'}}>
        <Link to="/">Form</Link>&nbsp;&nbsp;
        <Link to="/admin">Admin</Link>
      </div>
    </>
  )
}

export default Data;
