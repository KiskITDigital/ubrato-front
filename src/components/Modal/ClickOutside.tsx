import { FC, PropsWithChildren, useEffect, useRef } from 'react';

export const ClickOutside: FC<PropsWithChildren<{ clickFn: () => void }>> = ({
  clickFn,
  children,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOtside = (e: MouseEvent) => {
      if (e.target) {
        if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
          clickFn();
        }
      }
    };
    if (wrapperRef.current !== null) {
      document.body.addEventListener('mousedown', handleClickOtside);
    }

    return () => {
      document.body.removeEventListener('mousedown', handleClickOtside);
    };
  }, [clickFn]);

  return <div ref={wrapperRef}>{children}</div>;
};
