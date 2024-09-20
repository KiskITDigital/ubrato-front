import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const Cookies: FC = () => {
  const [accepted, setAccepted] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem('cookies')) {
      setAccepted(false);
    }
  }, []);

  if (accepted) {
    return <></>;
  } else {
    return (
      <div className="shadow-md fixed bottom-5 left-[calc(50vw-410px)] w-[820px] rounded-[10px] px-[15px] py-[20px] bg-white flex items-center">
        <div className="w-[670px]">
          <h3 className="text-[14px]">Используем файлы cookie для улучшения работы сайта</h3>
          <p className="text-[12px] text-[#666]">
            Сайт{' '}
            <Link className="text-accent underline" to="./">
              ubrato.ru
            </Link>{' '}
            использует файлы cookie. Продолжая использовать наш сайт, Вы даете согласие на обработку
            файлов соокіе, а также безоговорочно соглашаетесь с условиями{' '}
            <Link target='_blank' className="text-accent underline" to="./rights?document=3">
              Соглашения на обработку данных
            </Link>{' '}
            . В случае несогласия с этими условиями просим Вас воздержаться от использования сайта.
          </p>
        </div>
        <button
          onClick={() => {
            localStorage.setItem('cookies', 'accept');
            setAccepted(true);
          }}
          className="bg-black text-white text-[14px] rounded-[8px] w-[100px] p-[10px] ml-[20px]"
        >
          Я согласен
        </button>
      </div>
    );
  }
};
