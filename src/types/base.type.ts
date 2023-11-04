import { IUser } from "./user.type";

export interface IModel {
    id: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    deletedAt: Date | string | null;
  }
  
  export interface ApiResponse<T = any> {
    data: T;
    success: boolean;
    message: string;
    error: any;
  }
  
  export interface IPagination<T = any[]> {
    content: T;
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: Pageable;
    size: number;
    sort: Sort;
    totalElements: number;
    totalPages: number;
  }
  
  export interface Pageable {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: Sort;
    unpaged: boolean;
  }
  
  export interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  }
  
  export interface IPaginatedQuery {
    limit?: number;
    page?: number;
    sort?: string;
    filter?: string;
  }
  
  export interface IDepartment extends IModel {
    name: string;
    description: string;
    createdBy: IUser;
  }

export interface IDocument extends IModel {
  title: string
  description: string
  fileUrl: string
  category: string
  status: string
  referenceNumber: number
  createdBy: IUser
  department: IDepartment
}
export interface IDocumentReview extends IModel  {
  status: "PENDING" | "APPROVED" | "REJECTED";
  reviewers: IUser[]
  reviewDoc: IDocument
  comments: any[]
}

export interface INotification extends IModel {
  message: string
  read: boolean
  notId: string
}
export interface IComment extends IModel {
  content: string
  commentCreator: IUser
  documentReview: IDocumentReview
}