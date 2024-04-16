import { Client, Account, Databases, Teams,Storage } from 'appwrite';
import { environment } from '../environment/environment';

export const client = new Client();


client
    .setEndpoint(environment.appwrite.endpoint)
    .setProject(environment.appwrite.projectId); // Replace with your project ID

export const DB_ID = environment.appwrite.dbId
export const db = new Databases(client)
export const teams = new Teams(client);
export const storage = new Storage(client);
export const account = new Account(client);
export { ID } from 'appwrite';
