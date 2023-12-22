interface QuizItem {
  id: string;
  snippet: YoutubeSnippet;
}

// Quiz 인터페이스
interface Quiz {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  quizItems: QuizItem[];
}
