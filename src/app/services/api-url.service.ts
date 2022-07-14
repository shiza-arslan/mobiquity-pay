import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiUrlService {

  constructor() {
  }

  isEmailExist(type: string, val: string) {
    return `/mobiquitypay/v1/user-management/validate/uniqueness?uniqueIdType=${type}&uniqunessValue=${val}&workspaceId=SUBSCRIBER\\`;
  }

  uploadFileKYC(mobile: any, type: any, docType: any) {
    return `mobiquitypay/dms/v3/doc?uploadedBy=${mobile}&documentType=${type}&documentName=${docType}`
  }

  uploadFile( mobile: any, type: any) {

    return `mobiquitypay/dms/v3/doc?uploadedBy=${mobile}&documentType=${type}`
  }
}
