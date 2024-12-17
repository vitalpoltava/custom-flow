import { Suspense } from 'react';
import {Config} from "../../types";
import Button from '@mui/material/Button';

type Props = {
  config: Config[]
  factory: {[key: string]: any};
  setPage: Function;
  saveData: Function;
}

const Page3 = ({config, factory, setPage, saveData}: Props) => {
  const page3ComponentNames = config.reduce((acc: string[], config: Config) => {
    if (config.page === 3) {
      acc.push(config.component.name)
    }
    return acc;
  }, []);

  const factories = page3ComponentNames.map((name) => factory[name]());
  const goPrevPage = () => setPage(2);
  const saveChanges = () => saveData()


  return (
    <>
      <Suspense fallback={<div>Loading components...</div>}>
        {factories.map((Component: any, index) => (
          <div><Component /></div>
        ))}
      </Suspense>
      <Button onClick={goPrevPage}>Previous</Button>
      <Button variant={'contained'} onClick={saveChanges}>Save</Button>
    </>
  )
}

export default Page3;
