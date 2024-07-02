// utils/useFirestoreStorage.js
import { useState, useEffect } from 'react';
import { db } from './firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export const useFirestoreStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(initialValue);

    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(db, 'settings', key);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setStoredValue(docSnap.data().value);
            } else {
                setStoredValue(initialValue);
            }
        };

        fetchData();
    }, [key, initialValue]);

    const setValue = async (value) => {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        const docRef = doc(db, 'settings', key);
        await setDoc(docRef, { value: valueToStore });
    };

    return [storedValue, setValue];
};