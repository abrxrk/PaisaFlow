// FILE: src/appwriteConfig.js

import { Client, Databases, Account, ID, Permission } from 'appwrite';

const client = new Client();
client
    .setEndpoint(import.meta.env.VITE_APPWRITE_URL)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);

export const dbId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
export const transactionsCollectionId = import.meta.env.VITE_APPWRITE_TRANSACTIONS_ID;
export const budgetsCollectionId = import.meta.env.VITE_APPWRITE_BUDGETS_ID;
export const goalsCollectionId = import.meta.env.VITE_APPWRITE_GOALS_ID;

export { ID, Permission }; // <-- This line is crucial