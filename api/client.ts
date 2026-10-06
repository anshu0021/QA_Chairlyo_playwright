import { APIRequestContext,APIResponse } from "@playwright/test";
 export class ApiClient {
    private authToken: string | null = null;
     constructor(private readonly context: APIRequestContext) {}

     setAuthToken(token: string) {
         this.authToken = token;
     }

     private get AuthHeaders(): Record<string, string> {
        return this.authToken ? { Authorization: `Bearer ${this.authToken}` } : {};
    }
    get(path: string, params?: Record<string, string | number>): Promise<APIResponse> {
        return this.context.get(path, { headers: this.AuthHeaders, params });
    }
    post(path:string,data:unknown):Promise<APIResponse>{
        return this.context.post(path,{headers:this.AuthHeaders,data});
    }
    put(path:string,data:unknown):Promise<APIResponse>{
        return this.context.put(path,{headers:this.AuthHeaders,data});
    }
    patch(path:string,data:unknown):Promise<APIResponse>{
        return this.context.patch(path,{headers:this.AuthHeaders,data});
    }
    delete(path:string):Promise<APIResponse>{
        return this.context.delete(path,{headers:this.AuthHeaders});
    }
}