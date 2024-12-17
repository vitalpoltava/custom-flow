import { Suspense } from 'react';
import {Config} from "../../types";
import Button from '@mui/material/Button';

type Props = {
  config: Config[]
  factory: {[key: string]: any};
  setPage: Function
}

const Page2 = ({config, factory, setPage}: Props) => {
  const page2ComponentNames = config.reduce((acc: string[], config: Config) => {
    if (config.page === 2) {
      acc.push(config.component.name)
    }
    return acc;
  }, []);

  const factories = page2ComponentNames.map((name) => factory[name]());
  const goNextPage = () => {
    setPage(3);
  }

  return (
    <>
      <Suspense fallback={<div>Loading components...</div>}>
        {factories.map((Component: any) => (
          <div><Component /></div>
        ))}
      </Suspense>
      <Button onClick={goNextPage}>Next</Button>
    </>
  )
}

export default Page2;
