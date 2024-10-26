import conf from "../config/config";
import { Client, Databases, ID, Query, Storage } from "appwrite";

class PostService {
    client = new Client();
    database;
    bucket;

    
    constructor() {
        this.client = new Client()
            .setEndpoint(conf.appwriteURL) // Your API Endpoint
            .setProject(conf.appwriteProjectId); // Your project ID
        
        this.database = new Databases( this.client );
        this.bucket = new Storage( this.client );
    }

    async createPost({title, slug, content, featuredImage, status, userId}: {title: string, slug: string, content: string, featuredImage: string, status: string, userId: string}){
        try {
            const result = await this.database.createDocument(
                conf.appwriteDatabaseId, 
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    slug,
                    content,
                    status,
                    userId,
                    featuredImage
                }
            );
            if(!result) throw Error("error in creating post");
            return result;
        } catch (error) {
            console.error('Appwrite :: createPost :: Error :: '+ error);
            throw error
        }
    }

    async updatePost(slug: string, {title,  content, featuredImage, status}: {title: string,  content: string, featuredImage: string, status: string, userId: string}){
        try {
            return await this.database.updateDocument(
                conf.appwriteDatabaseId, 
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    status,
                    featuredImage
                }
            )
        } catch (error) {
            console.error('Appwrite :: updatePost :: Error :: '+ error);
            throw error
        }
    }

    async deletePost(slug: string){
        try {
            await this.database.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            console.error('Appwrite :: deletePost :: Error :: '+ error);
            return false;           
        }
    }

    async getPost(slug: string){
        try {
           return await this.database.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
            ); 
        } catch (error) {
            console.error('Appwrite :: getPost :: Error :: '+ error);
            throw error
        }
    }

    async getPosts(quires = [Query.equal('status' , 'active')]){
        try {
            return await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                quires
            )
        } catch (error) {
            console.error('Appwrite :: getPosts :: Error :: '+ error);
            throw error
        }
    }

    // file upload
    async uploadFile(file: File){
        try {
            return this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.error('Appwrite :: uploadFile :: Error :: '+ error);
            throw error
        }
    }

    async deleteFile(fileId : string){
        try {
            return this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.error('Appwrite :: deleteFile :: Error ::' + error);
            throw error
        }
    }

    getFilePreview(fileId : string){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}

export default PostService;