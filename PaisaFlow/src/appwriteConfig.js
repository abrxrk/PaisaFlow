// FILE: PaisaFlow/src/appwriteConfig.js

import { Client, Databases, ID , Account } from 'appwrite';

// Initialize Appwrite Client
const client = new Client();
client
    .setEndpoint(import.meta.env.VITE_APPWRITE_URL) // Your API Endpoint
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // Your project ID

// Initialize Services
export const account = new Account(client);
export const databases = new Databases(client);
export const dbId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
export const transactionsCollectionId = import.meta.env.VITE_APPWRITE_TRANSACTIONS_ID;
export const budgetsCollectionId = import.meta.env.VITE_APPWRITE_BUDGETS_ID;
export const goalsCollectionId = import.meta.env.VITE_APPWRITE_GOALS_ID;
export { ID }; 