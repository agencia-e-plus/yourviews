export interface ReviewShelf {
  HasErrors: boolean;
  Element: ReviewShelfElement[];
  ErrorList: any[];
  Total: number;
  CurrentPage: number;
  Pagination: Pagination;
}

export interface ReviewShelfElement {
  ProductId: string;
  TotalRatings: number;
  Rating: number;
}

export interface FullReview {
  HasErrors: boolean;
  Element: Element;
  ErrorList: any[];
  Total: number;
  CurrentPage: number;
  Pagination: Pagination;
}

export interface Element {
  IdProduct: null;
  YourviewsIdProduct: number;
  Rating: number;
  TotalRatings: number;
  ReviewBattle: ReviewBattle;
  Filters: Filter[];
  Reviews: Review[];
  RatingHistogram: RatingHistogram;
  FieldSummary: FieldSummary;
  Recommend: Recommend;
  Keywords: Keywords;
}

export interface FieldSummary {
  FieldList: any[];
}

export interface Filter {
  Name: string;
  FilterId: number;
  FilterValues: FilterValue[];
}

export interface FilterValue {
  FilterValueId: number;
  Count: number;
  Name: string;
  ValueAsInt: number;
}

export interface Keywords {
  HasResults: boolean;
  KeywordList: KeywordList[];
}

export interface KeywordList {
  Keyword: string;
  Rating: number;
  Count: number;
}

export interface RatingHistogram {
  RatingList: RatingList[];
}

export interface RatingList {
  Rate: number;
  Total: number;
  TotalReviews: number;
  PercentRating: number;
}

export interface Recommend {
  TotalReviews: number;
  Recommend: number;
  DontRecommend: number;
  RecommendPercent: number;
}

export interface ReviewBattle {
  BestReview: null;
  WorstReview: null;
  HasResults: boolean;
}

export interface Review {
  ReviewId: number;
  Rating: number;
  Review: string;
  Date: string;
  Likes: number;
  Dislikes: number;
  CustomFields: CustomField[];
  User: User;
  Product: Product;
  ReferenceOrder: null;
  CustomerPhotos: null;
  ReviewTitle: null;
  BoughtProduct: boolean;
  Origin: null;
  StoreComments: any[];
  CustomerVideos: any[];
}

export interface CustomField {
  Name: string;
  Values: string[];
}

export interface Product {
  IdProductExternal: null;
  YourviewsProductId: number;
  ProductId: string;
  Name: string;
  Url: string;
  Image: string;
  IsActive: boolean;
  Value: number;
  Category: null;
  Brand: null;
  Sku: null;
  Courier: null;
  TrackingNumber: null;
  ProductDeliveryDate: string;
  IsProductDelivered: boolean;
  IsProductCancelled: boolean;
}

export interface User {
  YourviewsUserId: number;
  Name: string;
  Email: string;
  CPF: null;
  City: string;
  State: string;
  ZipCode: null;
  IPAddress: null;
  UserId: null | string;
  ExhibitionName: string;
  Avatar: null;
  Phone: null;
}

export interface Pagination {
  PageCount: number;
  TotalItemCount: number;
  PageNumber: number;
  PageSize: number;
  HasPreviousPage: boolean;
  HasNextPage: boolean;
  IsFirstPage: boolean;
  IsLastPage: boolean;
  FirstItemOnPage: number;
  LastItemOnPage: number;
}
