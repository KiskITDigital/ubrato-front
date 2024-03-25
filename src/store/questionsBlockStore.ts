/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";
import { QuestionT } from "../types/app";
// import { executorQustions, generalQuestions, ordererQustions } from "../textData/questionsData";

interface QuestionState {
    //   isOrderer: boolean;
    //   handleState: () => void;
    qusetionNumber: string
    pageNumber: string
    qustionsArr: QuestionT[]
    handlePageNumber: (newPageNumber: string) => void
    handleQuestionNumber: (newQuestionNumber: string) => void
    handleQuestionsArr: (newQuestionsArr: QuestionT[]) => void
}

export const useQuestionBlock = create<QuestionState>()((set) => ({
    qusetionNumber: '1',
    pageNumber: '1',
    qustionsArr: [],

    handlePageNumber: (newPageNumber: string) => { set(state => ({ pageNumber: newPageNumber })) },
    handleQuestionNumber: (newQuestionNumber: string) => { set(state => ({ qusetionNumber: newQuestionNumber })) },
    handleQuestionsArr: (newQuestionsArr: QuestionT[]) => { set(state => ({ qustionsArr: newQuestionsArr })) },
}));
