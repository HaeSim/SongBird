import type { IDBPDatabase, IDBPObjectStore } from 'idb';
import { openDB } from 'idb';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

interface MyDB {
  quizList: Record<string, QuizData>;
}

interface IQuizDatabaseContext {
  data: QuizData[] | undefined;
  refetch: () => Promise<void>;
  isLoading: boolean;
  isError: boolean;
  saveQuizzes: (quizzes: QuizData[]) => Promise<void>;
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
        // eslint-disable-next-line no-console
        console.error('Transaction error:', error);
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

  const saveQuizzes = async (quizzes: QuizData[]) => {
    await withTransaction('readwrite', async (store) => {
      await Promise.all(quizzes.map((quiz) => store.put!(quiz)));
    });
    await refetch();
  };

  const deleteAllQuizzes = async () => {
    await withTransaction('readwrite', async (store) => {
      await store.clear!();
    });
    await refetch();
  };

  const deleteQuiz = async (quizId: string) => {
    await withTransaction('readwrite', async (store) => {
      await store.delete!(quizId);
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
      } finally {
        setIsLoading(false);
      }
    };

    openDatabase();
  }, []);

  // event handlers
  const handleVersionChange = () => {
    // eslint-disable-next-line no-console
    console.log('Database version changed');
  };

  const handleAbort = () => {
    // eslint-disable-next-line no-alert
    alert('Database transaction aborted');
  };

  const handleError = () => {
    // eslint-disable-next-line no-alert
    alert('Database error');
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
      saveQuizzes,
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
