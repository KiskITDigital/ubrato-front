import { FC, useEffect } from 'react';

export const Help: FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <h2>Помощь</h2>
    </div>
  );
};
