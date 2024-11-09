interface LazyLoadElementProps {
}
export default function lazyLoadElement(
  selectedClass: string,
  from: (element: HTMLElement) => void,
  to: (element: HTMLElement) => void,
  delay: number,
  threshold?: number
) {
  const elements: NodeListOf<HTMLElement> = document.querySelectorAll(selectedClass);
  elements.forEach((element: HTMLElement) => requestAnimationFrame(() => from(element)));
  const observer: IntersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting) {
        setTimeout(
          () => {
            requestAnimationFrame(() => to(entry.target));
          },
          delay);
        observer.unobserve(entry.target)
      }
    });
  }, {
    root: null,
    threshold: threshold || 0.1
  });
  elements.forEach((elm: HTMLElement) => observer.observe(elm));
}
