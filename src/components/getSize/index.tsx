import { useEffect, useState } from "react";

export interface Size {
  width: number;
  height: number;
};
export function getElementSize(element: HTMLElement): Size {
  const [size, setSize] = useState<Size>({ width: element.offsetWidth, height: element.offsetHeight });
  useEffect(() => {
    const handleResize = () => {
      setSize({ width: element.offsetWidth, height: element.offsetHeight });
    }
    element.addEventListener<'resize'>('resize', handleResize);
    return () => element.removeEventListener<'resize'>('resize', handleResize);
  }, []);
  return size;
}

export function getWindowSize(): Size {
  const [size, setSize] = useState<Size>({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener<'resize'>('resize', handleResize);
    return () => window.removeEventListener<'resize'>('resize', handleResize);
  }, []);

  return size;
}
