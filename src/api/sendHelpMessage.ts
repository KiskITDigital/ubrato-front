import { axiosInstanceFeedback } from '@/utils/baseHttp';

export const sendHelpMessage = async (
  name: string,
  phone: string,
  question: string,
  type: 'registration' | 'verification' | 'feedback'
) => {
  await axiosInstanceFeedback.post('/v1/survey', {
    name: name,
    type: type,
    phone: phone.replace('(', '').replace(')', '').replaceAll('-', ''),
    question: question,
  });
};
