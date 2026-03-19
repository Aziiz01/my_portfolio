import { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const [interactive, setInteractive] = useState(false);
  const [inSection, setInSection] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!finePointer) return undefined;

    let frameId;

    const animate = () => {
      ring.current.x += (target.current.x - ring.current.x) * 0.2;
      ring.current.y += (target.current.y - ring.current.y) * 0.2;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.current.x}px, ${target.current.y}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`;
      }
      frameId = window.requestAnimationFrame(animate);
    };

    const onMove = (event) => {
      target.current.x = event.clientX;
      target.current.y = event.clientY;
      setVisible(true);

      const isInteractive = Boolean(
        event.target.closest('a,button,input,textarea,select,[role="button"],.cursor-hover')
      );
      setInteractive(isInteractive);
      setInSection(Boolean(event.target.closest('section')));
    };

    const onLeaveWindow = () => setVisible(false);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseout', onLeaveWindow);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseout', onLeaveWindow);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className={
          'custom-cursor custom-cursor-ring' +
          (interactive ? ' is-interactive' : '') +
          (inSection ? ' is-in-section' : '') +
          (pressed ? ' is-pressed' : '') +
          (visible ? ' is-visible' : '')
        }
      />
      <div
        ref={dotRef}
        className={
          'custom-cursor custom-cursor-dot' +
          (interactive ? ' is-interactive' : '') +
          (pressed ? ' is-pressed' : '') +
          (visible ? ' is-visible' : '')
        }
      />
    </>
  );
};

export default CustomCursor;
