import { useState } from 'react'
import { Button } from './Button';

export default function App() {
  const [count, setCount] = useState(0)

  function handleCount(){
    setCount(count + 1);
  }

  return (
    <>
      <Button 
        count={count}
        text="Click aqui"
        handleCount={handleCount}
      />
      <Button 
        count={count}
        text="Click aqui 2"
        handleCount={handleCount}
      />
      <Button 
        count={count}
        text="Click aqui 3"
        handleCount={handleCount}
      />
      <Button 
        count={count}
        text="Click aqui 4"
        handleCount={handleCount}
      />
    </>
  )
}
