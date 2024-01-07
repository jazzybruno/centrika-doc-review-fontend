import { IComment, IDepartment, IDocument, IModel } from "./base.type";
import { IUser } from "./user.type";

export interface Reviewer extends IModel {
  user: IUser;
  documentReview: DocumentReview;
  status: "PENDING" | "REVIEWED";
  hasFinalReview: boolean;
}

export interface DocumentReview extends IModel {
  document: IDocument;
  department: IDepartment;
  sendingDepartment: IDepartment;
  createdBy: IUser;
  expectedCompleteTime: Date | string;
  deadline: Date | string;
}

export interface DocReviewAction extends IModel {
  action: "FORWARD" | "RETURN" | "APPROVE";
  documentReview: DocumentReview;
  reviewer: Reviewer;
  comment: IComment;
}
