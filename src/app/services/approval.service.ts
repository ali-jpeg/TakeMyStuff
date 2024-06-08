import { Injectable } from '@angular/core';

interface ApprovalRequest {
  id: string;
  sender: string;
  senderName: string;
  whatsappNumber: string;
  recipient: string;
  content: string;
  timeSlot: string;
  approved: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ApprovalService {
  private requests: ApprovalRequest[] = [];

  addRequest(request: Omit<ApprovalRequest, 'id'>): void {
    const newRequest = { ...request, id: this.generateId() };
    this.requests.push(newRequest);
    this.saveRequestsToSessionStorage();
    console.log('Approval request added with ID:', newRequest.id, newRequest);
  }

  private generateId(): string {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  getRequestsForRecipient(recipient: string): ApprovalRequest[] {
    this.loadRequestsFromSessionStorage();
    const filteredRequests = this.requests.filter(request => request.recipient === recipient && !request.approved);
    console.log('Requests for recipient:', recipient, filteredRequests);
    return filteredRequests;
  }

  approveRequest(id: string): void {
    this.loadRequestsFromSessionStorage();
    const requestIndex = this.requests.findIndex(request => request.id === id);
    if (requestIndex !== -1) {
      this.requests[requestIndex].approved = true;
      this.saveRequestsToSessionStorage();
      console.log('Request approved with ID:', id, this.requests[requestIndex]);
    } else {
      console.log('Invalid ID for approval:', id);
    }
  }

  disapproveRequest(id: string): void {
    this.loadRequestsFromSessionStorage();
    const requestIndex = this.requests.findIndex(request => request.id === id);
    if (requestIndex !== -1) {
      const removedRequest = this.requests.splice(requestIndex, 1);
      this.saveRequestsToSessionStorage();
      console.log('Request disapproved and removed with ID:', id, removedRequest);
    } else {
      console.log('Invalid ID for disapproval:', id);
    }
  }

  getApprovedRequestsForSender(sender: string): ApprovalRequest[] {
    this.loadRequestsFromSessionStorage();
    const approvedRequests = this.requests.filter(request => request.sender === sender && request.approved);
    console.log('Approved requests for sender:', sender, approvedRequests);
    return approvedRequests;
  }

  private saveRequestsToSessionStorage(): void {
    console.log('Saving requests to session storage:', this.requests);
    sessionStorage.setItem('approvalRequests', JSON.stringify(this.requests));
  }

  private loadRequestsFromSessionStorage(): void {
    const storedRequests = sessionStorage.getItem('approvalRequests');
    if (storedRequests) {
      this.requests = JSON.parse(storedRequests);
      console.log('Loaded requests from session storage:', this.requests);
    } else {
      console.log('No requests found in session storage.');
    }
  }
}
