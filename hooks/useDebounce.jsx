import React, { useEffect, useState } from 'react'

const useDebounce = (input, delay) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setValue(input);
    }, delay);

    return () => clearTimeout(handler)
  }, [input, delay]);

  return value;
}

export default useDebounce;
