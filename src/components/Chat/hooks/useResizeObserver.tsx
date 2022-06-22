import React, {useState, useEffect} from 'react';

type TDimension = {
  width: number,
  height: number
}

export const useResizeObserver = (target: React.RefObject<HTMLElement>) => {
  const [dimension, setDimension] = useState<TDimension>({
    height: 0,
    width: 0
  });

  useEffect(() => {

    const observer = new window.ResizeObserver((items) => {
      setDimension({
        height: items[0].contentRect.height,
        width: items[0].contentRect.width
      })
    });

    if (target.current) {
      observer.observe(target.current)
    }

    return () => {
      observer.disconnect()
    }

  }, [target.current])

  return dimension
}