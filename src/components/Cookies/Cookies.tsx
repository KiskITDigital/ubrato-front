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
      <div className="z-10 shadow-md fixed bottom-5 left-[calc(50vw-410px)] w-[820px] rounded-[10px] px-[15px] py-[20px] bg-white flex items-center">
        <div className="w-[670px]">
          <p className="text-[12px] text-[#666]">
            <Link className="text-accent underline" to="./">
              Ubrato
            </Link>{' '}
            использует cookie (файлы с данными о прошлых посещениях сайта, которые сохраняются через
            браузер на устройстве Пользователя) с целью персонализации сервисов, удобства
            пользования веб-сайтом и сбора статистики. Для получения дополнительной информации Вы
            можете ознакомиться с{' '}
            <Link target="_blank" className="text-accent underline" to="./rights?document=3">
              Политикой использования файлов Cookie
            </Link>{' '}
            . Обработка Ваших персональных данных осуществляется в соответствии с требованиями
            Федерального закона от 27.07.2006 № 152-Ф3 «О персональных данных» и Политикой в
            отношении обработки персональных данных. Вы можете запретить сохранение cookie в
            настройках своего браузера. Сайт использует файлы cookie. Продолжая использовать наш
            сайт, Вы даете согласие на обработку файлов соокіе, а также безоговорочно соглашаетесь с
            условиями . В случае несогласия с этими условиями просим Вас воздержаться от
            использования сайта.
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
