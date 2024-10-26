import conf from "../config/config";
import { Client, Account, ID } from "appwrite";

class AuthService {
    client = new Client();
    account;
    constructor() {
        this.client = new Client()
            .setEndpoint(conf.appwriteURL) // Your API Endpoint
            .setProject(conf.appwriteProjectId); // Your project ID

        this.account = new Account(this.client);
    }

    async createAccount(email : string , name : string , password : string){
        try {
            const result = await this.account.create(
                ID.unique(), // userId
                email, // email
                password, // password
                name // name (optional)
            );
            if(!result) throw Error("error in creating account");
            return this.login(email , password);
        } catch (error) {
            console.error('Appwrite :: createAccount :: Error :: '+ error);
            throw error
        }
    }

    async login (email : string, password : string){
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.error('Appwrite :: login :: Error :: '+ error);
            throw error
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.error('Appwrite :: getCurrentUser :: Error :: '+ error);
            throw error
        }
    }

    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.error('Appwrite :: logout :: Error :: '+ error);
            throw error
        }
    }
}

const authService = new AuthService();

export default authService;