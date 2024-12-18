import React, {useEffect, useState} from "react";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

import {getAdminData, saveConfigs} from "../fetchers/http";
import {AdminComponent} from "../types";
import {Link} from "react-router";
import {Snackbar} from "@mui/material";

function Admin() {
  const [page2, setPage2] = useState<AdminComponent[]>([]);
  const [page3, setPage3] = useState<AdminComponent[]>([]);
  const [freeComponents, setFreeComponents] = useState<AdminComponent[]>([]);
  const [open, setOpen] = React.useState(false);
  const [isInitialState, setIsInitialState] = useState(true);

  useEffect(() => {
    getAdminData().then((data) => {
      setPage2(data.components.filter(component => {
        const found = data.configs.find((config) => config.componentId === component.id && config.page === 2)
        return found !== undefined;
      }))

      setPage3(data.components.filter(component => {
        const found = data.configs.find((config) => config.componentId === component.id && config.page === 3)
        return found !== undefined;
      }))

      setFreeComponents(data.components.filter(component => {
        const found = data.configs.find((config) => config.componentId === component.id)
        return found === undefined;
      }))
    })
  }, []);

  useEffect(() => {
    if (page2.length && page3.length && !isInitialState) {
      saveChanges().then(() => {
        setOpen(true);
      })
    }
  }, [page2.length, page3.length])

  const saveChanges = () => {
    const configsPage2 = page2.map((component) => ({componentId: component.id, page: 2}));
    const configsPage3 = page3.map((component) => ({componentId: component.id, page: 3}));
    const configs = [...configsPage2, ...configsPage3];
    return saveConfigs(configs);
  }

  const moveToPage2 = (component: AdminComponent) => {
    setPage2((prevState) => [...prevState, component]);
    setFreeComponents((prevState) => [...prevState.filter((item) => item.id !== component.id)]);
    setIsInitialState(false)
  }

  const moveToPage3 = (component: AdminComponent) => {
    setPage3((prevState) => [...prevState, component]);
    setFreeComponents((prevState) => [...prevState.filter((item) => item.id !== component.id)]);
    setIsInitialState(false)
  }

  const releaseFromPage2 = (component: AdminComponent) => {
    setFreeComponents((prevState) => [...prevState, component]);
    setPage2((prevState) => [...prevState.filter((item) => item.id !== component.id)]);
    setIsInitialState(false)
  }

  const releaseFromPage3 = (component: AdminComponent) => {
    setFreeComponents((prevState) => [...prevState, component]);
    setPage3((prevState) => [...prevState.filter((item) => item.id !== component.id)]);
    setIsInitialState(false)
  }

  return (
    <>
      <h3>Admin Panel</h3>
      <h5>Select components appearance per page (changes autosaved)</h5>

      <Grid container spacing={2}>
        <Grid size={4}>
          <Box>
            <Card variant="outlined" sx={{padding: 2}}>
              <h4>Free Components</h4>
              {freeComponents && freeComponents.map((component) => (
                <Box>
                  <Card variant="elevation" sx={{padding: 1, margin: 1}}>
                    {component.name}
                    <ButtonGroup sx={{float: 'right'}}>
                      <Button onClick={() => moveToPage2(component)} size={'small'}>Page 2</Button>
                      <Button onClick={() => moveToPage3(component)} size={'small'}>Page 3</Button>
                    </ButtonGroup>
                  </Card>
                </Box>
              ))}
            </Card>
          </Box>
        </Grid>
        <Grid size={4}>
          <Box>
            <Card variant="outlined" sx={{padding: 2}}>
              <h4>Page 2</h4>
              {page2 && page2.map((component) => (
                <Box>
                  <Card variant="elevation" sx={{padding: 1, margin: 1}}>
                    {component.name}
                    <Button disabled={page2.length < 2} sx={{float: 'right'}} variant={'text'}
                            onClick={() => releaseFromPage2(component)} size={'small'}>Release</Button>
                  </Card>
                </Box>
              ))}
            </Card>
          </Box>
        </Grid>
        <Grid size={4}>
          <Box>
            <Card variant="outlined" sx={{padding: 2}}>
              <h4>Page 3</h4>
              {page3 && page3.map((component) => (
                <Box>
                  <Card variant="elevation" sx={{padding: 1, margin: 1}}>
                    {component.name}
                    <Button disabled={page3.length < 2} sx={{float: 'right'}} variant={'text'}
                            onClick={() => releaseFromPage3(component)} size={'small'}>Release</Button>
                  </Card>
                </Box>
              ))}
            </Card>
          </Box>
        </Grid>
      </Grid>
      <div style={{marginTop: '3rem'}}>
        <Link to="/">Form</Link>&nbsp;&nbsp;
        <Link to="/data">Data Table</Link>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        message="Configs updated"
        onClose={() => setOpen(false)}
      />
    </>
  )
}

export default Admin;
