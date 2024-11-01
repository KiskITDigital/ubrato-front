import { useTenderInfoStore } from '@/store/tenderStore';
import { useUserInfoStore } from '@/store/userInfoStore';
import { FC } from 'react';
import { Questions } from '../Questions/Questions';

const questions = [
  {
    question: 'Какие основные типы клининговых услуг существуют?',
    answer:
      'Основные типы клининговых услуг включают уборку жилых помещений, офисов, промышленных объектов, а также специальные услуги, такие как химчистка, мойка окон и чистка ковров.',
  },
  {
    question: 'Как часто рекомендуется проводить генеральную уборку?',
    answer:
      'Генеральную уборку рекомендуется проводить не реже одного раза в месяц, чтобы обеспечить полное удаление пыли, грязи и бактерий.',
  },
  {
    question: 'Какие средства и инструменты используются для профессиональной уборки?',
    answer:
      'Для профессиональной уборки используются специальные чистящие средства, пылесосы, швабры, мопы, губки, салфетки и другие инструменты, подходящие для различных поверхностей.',
  },
  {
    question: 'Как подготовить помещение к уборке профессиональными клинерами?',
  },
  {
    question: 'Какие факторы влияют на стоимость клининговых услуг?',
  },
];

export const QATab: FC = () => {
  const userInfoStore = useUserInfoStore();
  const tenderInfoState = useTenderInfoStore();

  return (
    <div className="max-w-[1024px] mx-auto mt-[20px]">
      {tenderInfoState.tenderInfo.user_id != userInfoStore.user.id && (
        <>
          <div className="flex gap-4 items-center">
            <img src="/info-blue-ic.svg" alt="info" />
            <p className="text-[16px] text-[#666]">
              Если есть вопросы к заказчику, вы можете написать и отправить его здесь. Когда придет
              ответ, вам придет уведомление
            </p>
          </div>
          <div className="mt-5 px-[10px] py-[10px] bg-light-gray rounded-[20px] flex flex-col gap-[10px] text-[16px]">
            <textarea
              rows={2}
              placeholder="Введите ваш вопрос..."
              className="outline-none py-[10px] px-3 rounded-xl text-[16px]"
              name="question"
              id=""
            ></textarea>
            <button className="self-start px-2 py-1 bg-accent rounded-lg text-white text-[16px]">
              Отправить
            </button>
          </div>
        </>
      )}
      <Questions
        questions={questions}
        isAuthor={
          tenderInfoState.tenderInfo.user_id === userInfoStore.user.id &&
          tenderInfoState.tenderInfo.user_id !== '' &&
          userInfoStore.user.id !== ''
        }
      />
    </div>
  );
};
