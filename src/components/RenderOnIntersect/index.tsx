import React, { useEffect, useRef, useState } from 'react'

const RenderOnIntersect = (props: object) => {
  const [isVisible, setVisibility] = useState<boolean>(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const parentRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (parentRef.current == null) return;
    observer.current = new IntersectionObserver((entries) => entries
      .forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibility(true);
          observer.current?.unobserve(entry.target);
        }
      }), {
      root: null,
      threshold: 0.1
    });
    observer.current.observe(parentRef.current);
  }, [isVisible])
  return (
    <div {...props} ref={parentRef} >
      {isVisible && props?.children}
    </div>
  );
}

export default RenderOnIntersect;
