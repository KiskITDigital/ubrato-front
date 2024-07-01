import { OneTenderHeader } from '@/components/OneTenderComponents/OneTenderHeader/OneTenderHeader';
import { Switchero } from '@/components/OneTenderComponents/OneTenderSwitcher/OneTenderSwitcher';
import { OneTenderInfoViewExecutor } from '@/components/OneTenderComponentsWrappedVIew/OneTenderInfoViewExecutor/OneTenderInfoViewExecutor';
import { FC, ReactNode, useEffect, useState, } from 'react';
import { useSwitchStore } from '@/store/switchStore';
import { OneTenderAdd } from '@/components/OneTenderComponentsWrappedVIew/OneTenderAdd/OneTenderAdd';
import { fetchProduct } from '@/api/getTender';
import { Params, useParams } from 'react-router-dom';
import { isResponded } from '@/api/isResponded';


export interface dataObjectTypes {
  id: number,
  name: string,
  active: boolean,
  price: number,
  object_types: Array<string>,
  objects_types: Array<string>,
  location: string,
  floor_space: number,
  services_types: Array<string>,
  description: string,
  wishes: string,
  attachments: Array<string>,
  reception_start: string,
  reception_end: string,
  work_start: string,
  work_end: string,
  created_at: string,
  is_nds_price: boolean,
  is_contract_price: boolean,
}


export const OneTenderPageExecutor: FC = () => {
  const { id }: Readonly<Params<string>> = useParams()
  const { activeIndex } = useSwitchStore();
  const [response, setResponse] = useState(false)
  const [dataState, setData] = useState<dataObjectTypes>({
    id: 0,
    name: '',
    active: false,
    price: 0,
    object_types: [],
    objects_types: [],
    location: '',
    floor_space: 0,
    services_types: [],
    description: '',
    wishes: '',
    attachments: [],
    reception_start: '',
    reception_end: '',
    work_start: '',
    work_end: '',
    created_at: '',
    is_nds_price: false,
    is_contract_price: false
  })
  const [loading, setLoading] = useState(true);

  let stack: ReactNode;

  switch (activeIndex) {
    case 0:
      stack = <OneTenderInfoViewExecutor dataQ={dataState} />;
      break;
    case 1:
      stack = <div>tt</div>;
      break;
    case 2:
      stack = <div>ee</div>;
      break;
    case 3:
      stack = 
      // <OneTenderAdd
      // ></OneTenderAdd>
      <div>пусто</div>;
      break;
    default:
      stack = <div>No stack component found</div>;
  }

  useEffect(() => {
    (async () => {

      const token = localStorage.getItem('token');
      const responded = await isResponded(token, id)
      const data = await fetchProduct(id);
      if (data) {
        setResponse(responded.status)
        setData(data)
        setLoading(false)
        console.log(responded);
        console.log(data);

      } else {
        console.log('proizoshla oshibka');
      }
    })();
  }, [id])

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!dataState) {
    return <div>Failed to load data</div>;
  }

  const changeResponseStatus = () => {
    setResponse(true)
  }

  return (
    <div>
      <OneTenderHeader
        status={dataState.active}
        id={dataState.id}
        name={dataState.name}
      ></OneTenderHeader>
      <Switchero
        setResponse={() => changeResponseStatus()}
        response={response}
        tenderId={id}
        options={['Тендер', 'Отклики', 'Вопросы и ответы', 'Доп. информация']}
        noticeKnocks={2}
        button_text={'Откликнуться на тендер'}
        price={dataState.price}
      ></Switchero>
      {stack}
    </div>
  );
};
