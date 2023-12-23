import type { IDBPDatabase, IDBPObjectStore } from 'idb';
import { openDB } from 'idb';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import toast from 'react-hot-toast';

interface MyDB {
  quizList: Record<string, QuizData>;
}

interface IQuizDatabaseContext {
  data: QuizData[] | undefined;
  refetch: () => Promise<void>;
  isLoading: boolean;
  isError: boolean;
  saveQuiz: (quiz: QuizData) => Promise<void>;
  updateQuiz: (quiz: Pick<QuizData, 'id'> & Partial<QuizData>) => Promise<void>;
  deleteAllQuizzes: () => Promise<void>;
  deleteQuiz: (quizId: string) => Promise<void>;
}

const QuizDatabaseContext = createContext<IQuizDatabaseContext | undefined>(
  undefined
);

export const useQuizDatabase = () => {
  const context = useContext(QuizDatabaseContext);
  if (!context) {
    throw new Error(
      'QuizDatabaseContext must be used within QuizDatabaseProvider'
    );
  }
  return context;
};

interface IQuizDatabaseProviderProps {
  children: React.ReactNode;
}

const QuizDatabaseProvider: React.FC<IQuizDatabaseProviderProps> = ({
  children,
}) => {
  const [quizDB, setQuizDB] = useState<IDBPDatabase<MyDB>>();
  const [data, setData] = useState<QuizData[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const withTransaction = async (
    mode: IDBTransactionMode,
    callback: (
      store: IDBPObjectStore<
        MyDB,
        ['quizList'],
        'quizList',
        'readonly' | 'readwrite' | 'versionchange'
      >
    ) => Promise<void>
  ) => {
    if (quizDB) {
      setIsLoading(true);
      setIsError(false);

      try {
        const tx = quizDB.transaction('quizList', mode);
        const store = tx.objectStore('quizList');
        await callback(store);
        await tx.done;
      } catch (error) {
        toast.error('🐦 Database transaction error');
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const refetch = async () => {
    await withTransaction('readonly', async (store) => {
      const quizzes = await store.getAll();
      setData([...quizzes]);
    });
  };

  const saveQuiz = async (quiz: QuizData) => {
    await withTransaction('readwrite', async (store) => {
      await store.put!(quiz);
      toast.success(`🐦 ${quiz.name} 퀴즈 저장 성공`);
    });
    await refetch();
  };

  const updateQuiz = async (quiz: Pick<QuizData, 'id'> & Partial<QuizData>) => {
    await withTransaction('readwrite', async (store) => {
      //  1. get quiz
      const oldQuiz = await store.get(quiz.id);
      if (!oldQuiz) {
        throw new Error(`Quiz with id ${quiz.id} not found`);
      }
      //  2. update quiz
      const updatedQuiz = {
        ...oldQuiz,
        ...quiz,
        updatedAt: new Date().toISOString(),
      };
      //  3. put quiz
      await store.put!(updatedQuiz);
      toast.success(`🐦 ${quiz.name} 퀴즈 업데이트 완료
        퀴즈보러가기: /quiz/${quiz.id}
      `);
    });
    await refetch();
  };

  const deleteAllQuizzes = async () => {
    await withTransaction('readwrite', async (store) => {
      await store.clear!();
      toast.success('🐦 퀴즈 전체 삭제 완료');
    });
    await refetch();
  };

  const deleteQuiz = async (quizId: string) => {
    await withTransaction('readwrite', async (store) => {
      await store.delete!(quizId);
      toast.success('🐦 퀴즈 삭제 완료');
    });
    await refetch();
  };

  useEffect(() => {
    setIsLoading(true);
    const openDatabase = async () => {
      try {
        const database = await openDB<MyDB>('songbird', 1.1, {
          upgrade(db) {
            if (!db.objectStoreNames.contains('quizList')) {
              db.createObjectStore('quizList', { keyPath: 'id' });
            }
          },
        });
        setQuizDB(database);
      } catch (error) {
        setIsError(true);
        toast.error('🐦 Database 로드 실패');
      } finally {
        setIsLoading(false);
      }
    };

    openDatabase();
  }, []);

  // event handlers
  const handleVersionChange = () => {
    toast.success('🐦 Database version changed');
  };

  const handleAbort = () => {
    toast.error('🐦 Database transaction aborted');
  };

  const handleError = () => {
    // eslint-disable-next-line no-alert
    toast.error('🐦 Database error');
  };

  useEffect(() => {
    if (quizDB) {
      const registerDatabaseChangeListener = () => {
        quizDB.addEventListener('versionchange', handleVersionChange);
        quizDB.addEventListener('abort', handleAbort);
        quizDB.addEventListener('error', handleError);
      };

      registerDatabaseChangeListener();
    }
    // cleanup
    return () => {
      if (quizDB) {
        quizDB.removeEventListener('versionchange', handleVersionChange);
        quizDB.removeEventListener('abort', handleAbort);
        quizDB.removeEventListener('error', handleError);
      }
    };
  }, [quizDB]);

  useEffect(() => {
    if (quizDB) {
      refetch();
    }
  }, [quizDB]);

  const contextValue: IQuizDatabaseContext = useMemo(() => {
    return {
      data,
      refetch,
      isLoading,
      isError,
      saveQuiz,
      updateQuiz,
      deleteAllQuizzes,
      deleteQuiz,
    };
  }, [data, isLoading, isError]);

  return (
    <QuizDatabaseContext.Provider value={contextValue}>
      {children}
    </QuizDatabaseContext.Provider>
  );
};

export default QuizDatabaseProvider;
