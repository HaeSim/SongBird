/**
 * 퀴즈 관련 명칭
 * 퀴즈 목록 : Quizzes = Quiz[]
 * 퀴즈 : Quiz
 * 퀴즈 문제 : QuizItem
 */

/**
 * QuizItem 인터페이스
 * @interface QuizItem
 * @property {string} id - 퀴즈 아이템 아이디
 */
interface QuizItemData {
  id: string;
  image: YoutubeThumbnail;
  answer: string;
  hint?: string;
  startTime: number;
  highlightTime: number;
  endTime?: number;
}

/**
 * Quiz 인터페이스
 * @interface Quiz
 * @property {string} id - 퀴즈 아이디
 * @property {string} 제목 - 퀴즈 제목
 * @property {string} description - 퀴즈 소개
 * @property {string} thumbnail - 퀴즈 썸네일
 * @property {string} quizItems - 퀴즈 아이템
 */
interface QuizData {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  quizItems: QuizItemData[];
  createdAt: string;
  updatedAt: string;
}
