import type { DBSchema } from 'idb';
import { openDB } from 'idb';

interface MyDB extends DBSchema {
  quizList: {
    key: string;
    value: Quiz;
  };
}

export const openDatabase = async () => {
  return openDB<MyDB>('my-database', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('quizList')) {
        db.createObjectStore('quizList', { keyPath: 'id' });
      }
    },
  });
};

export const saveQuizToDB = async (quiz: Quiz) => {
  const db = await openDatabase();
  const tx = db.transaction('quizList', 'readwrite');
  const store = tx.objectStore('quizList');
  await store.put(quiz);
  await tx.done;
};

export const getQuizFromDB = async (quizId?: string) => {
  const db = await openDatabase();
  const tx = db.transaction('quizList', 'readonly');
  const store = tx.objectStore('quizList');

  if (!quizId) {
    return store.getAll();
  }

  return store.get(quizId);
};
