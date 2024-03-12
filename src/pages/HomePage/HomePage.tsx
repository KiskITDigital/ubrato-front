import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../store/store';
import { MainBanner } from '../../components/MainBanner/MainBanner';
import { ExecutorsCatalog } from '../../components/ExecutorsCatalog/ExecutorsCatalog';

export const HomePage: FC = () => {
  const store = useStore((state) => state);

  return (
    <div>
      <MainBanner/>
      <ExecutorsCatalog/>
      <div>
        <p>{store.count}</p>
        <button onClick={store.increase}>+</button>
        <button onClick={store.decrease}>-</button> 
      </div>
      <Link to="/tenders">Tenders</Link>
    </div>
  );
};
//код со счётчико пример использования хранилища дальше я это уберу
