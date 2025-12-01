import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    // SIGNUP
    async createAccount({ email, password, name }) {
        try {
            const user = await this.account.createEmailPassword(
                email,
                password,
                name
            );

            if (user) {
                return this.login({ email, password });
            }
            return user;
        } catch (error) {
            throw error;
        }
    }

    // LOGIN
    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    // CURRENT USER
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }
        return null;
    }

    // LOGOUT
    async logout() {
        try {
            return await this.account.deleteSession("current");
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService;
