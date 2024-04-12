import React from 'react';

function usePrevious(value: number): number {
  const ref = React.useRef<number>(value);

  React.useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

export default usePrevious;
