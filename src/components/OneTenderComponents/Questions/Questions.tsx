import { ExpandButton } from '@/components/ExpandButton/ExpandButton';
import { Accordion, AccordionItem } from '@nextui-org/react';
import { FC, useEffect, useState } from 'react';

interface Question {
  question: string;
  answer?: string;
}

interface QuestionsProps {
  isAuthor: boolean;
  questions: Question[];
}

export const Questions: FC<QuestionsProps> = ({ isAuthor, questions }) => {
  const itemClasses = {
    base: 'w-full relative bg-white rounded-[13px] shadow-md px-5 py-[20px] pt-[60px] min-h-[90px]',
    title: 'font-bold h-[30px] items-center text-[18px] top-[10px]',
    heading: 'h-full w-full absolute top-0 left-0 px-5 py-[30px]',
    indicator: `flex items-center justify-center h-[calc(100%+10px)] min-h-[50px] w-[50px] mt-[-10px] transition-transform bg-[#F4F7F9] rounded-[20px]`,
    trigger: 'p-0 h-full relative group justify-between items-start',
    content: 'p-0 mt-3 max-w-[900px] z-[5] realtive',
    titleWrapper: '',
  };

  const [selectedKeys, setSelectedKeys] = useState(new Set<string>([]));

  const [disabledKeys, setDisabledKeys] = useState<string[]>([]);

  useEffect(() => {
    if (isAuthor) {
      setDisabledKeys([]);
    } else {
      setDisabledKeys(
        questions
          .map((question, index) => {
            if (!question.answer && !isAuthor) {
              return String(index);
            }
          })
          .filter((e) => e !== undefined)
      );
    }
  }, [questions, isAuthor]);

  return (
    <div>
      {questions.length === 0 && (
        <h2 className="text-[24px] font-bold mt-[20px]">Пока что вопросов нет</h2>
      )}
      {questions.length > 0 && (
        <h2 className="text-[24px] font-bold mt-[20px]">Вопросы по тендеру</h2>
      )}
      <Accordion
        selectedKeys={selectedKeys}
        onSelectionChange={(keys) => {
          console.log(Array.from(selectedKeys.values()));
          setSelectedKeys(keys as Set<string>);
        }}
        className="mt-[30px]"
        disabledKeys={disabledKeys}
        itemClasses={itemClasses}
        selectionMode="multiple"
        variant="splitted"
      >
        {questions.map((question, index) => (
          <AccordionItem
            indicator={
              <ExpandButton
                isActive={Array.from(selectedKeys.values()).includes(index.toString())}
              />
            }
            key={index}
            textValue={question.question}
            title={
              <div className="flex gap-[15px]">
                <p>{question.question}</p>
                <p
                  className={`${
                    question.answer ? 'bg-accent text-white' : 'bg-[#F4F7F9]'
                  } px-2 py-1 text-[14px] rounded-lg`}
                >
                  {isAuthor
                    ? question.answer
                      ? 'Отправлен ответ'
                      : 'Не отпрален ответ'
                    : question.answer
                    ? 'Получен ответ'
                    : 'Отправлен'}
                </p>
              </div>
            }
          >
            <p className="text-[#595D73]">{question.answer}</p>
            {!question.answer && (
              <div className="mt-5 px-[10px] py-[10px] bg-light-gray rounded-[20px] flex flex-col gap-[10px] text-[16px]">
                <textarea
                  rows={2}
                  placeholder="Введите ваш вопрос..."
                  className="outline-none py-[10px] px-3 rounded-xl"
                  name="question"
                  id=""
                ></textarea>
                <button className="self-start px-2 py-1 bg-accent rounded-lg text-white text-[16px]">
                  Отправить
                </button>
              </div>
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
