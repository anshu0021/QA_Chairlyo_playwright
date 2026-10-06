import { APIRequestContext } from '@playwright/test';

export class BranchService {
  private request: APIRequestContext;
  // Updated to match the real network path from your screenshot
  private baseUrl = 'https://qa03.stage.chairlyo.com/'; 

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  // Task 2: createBranch API endpoint operation
  async createBranch(token: string, payload: any) {
    return await this.request.post(`${this.baseUrl}/branches`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: payload
    });
  }

  // Task 2: getBranch API endpoint operation
  async getBranch(token: string, branchId: string) {
    return await this.request.get(`${this.baseUrl}/branches/${branchId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  }

  // Task 2: deleteBranch API endpoint operation
  async deleteBranch(token: string, branchId: string) {
    return await this.request.delete(`${this.baseUrl}/branches/${branchId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  }
}