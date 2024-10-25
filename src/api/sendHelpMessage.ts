import { axiosInstanceFeedback } from '@/utils/baseHttp';

export const sendHelpMessage = async (
  name: string,
  phone: string,
  question: string,
  type: 'SURVEY_TYPE_REGISTRATION' | 'SURVEY_TYPE_VERIFICATION' | 'SURVEY_TYPE_FEEDBACK'
) => {
  await axiosInstanceFeedback.post('/v1/survey', {
    name: name,
    type: type,
    phone: phone.replace('(', '').replace(')', '').replaceAll('-', ''),
    question: question,
  });
};
