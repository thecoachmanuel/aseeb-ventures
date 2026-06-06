export interface IService {
  _id?: string;
  name: string;
  slug: string;
  category: "laboratory" | "advisory" | "agtech" | "i-want-to";
  shortDescription: string;
  description: string;
  icon?: string;
  image?: string;
  price?: string;
  turnaroundTime?: string;
  accreditation?: string[];
  isActive: boolean;
  order: number;
  metadata?: {
    title?: string;
    description?: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IBlogPost {
  _id?: string;
  title: string;
  slug: string;
  author: string;
  publishedAt: Date;
  excerpt: string;
  content: string;
  featuredImage?: string;
  categories: string[];
  tags: string[];
  isPublished: boolean;
  seoMetadata?: {
    title?: string;
    description?: string;
    ogImage?: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  image?: string;
  role: "admin" | "client" | "viewer";
  company?: string;
  phone?: string;
  emailVerified?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IContactSubmission {
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  service?: string;
  status: "new" | "read" | "replied";
  createdAt?: Date;
}

export interface INewsletterSubscriber {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  isActive: boolean;
  subscribedAt?: Date;
}

export interface ITestimonial {
  _id?: string;
  name: string;
  company: string;
  role?: string;
  quote: string;
  rating?: number;
  avatar?: string;
  image?: string;
  videoUrl?: string;
  isPublished: boolean;
  order: number;
  createdAt?: Date;
}

export interface ITeamMember {
  _id?: string;
  name: string;
  role: string;
  bio?: string;
  photo?: string;
  linkedin?: string;
  order: number;
  createdAt?: Date;
}

export interface IFAQ {
  _id?: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  isPublished: boolean;
}

export interface ILocation {
  _id?: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  isMainOffice: boolean;
  order: number;
}

export interface IResource {
  _id?: string;
  title: string;
  description?: string;
  fileUrl: string;
  fileType: "pdf" | "image" | "video" | "link";
  category?: string;
  isPublished: boolean;
  order: number;
  createdAt?: Date;
}

export interface IPage {
  _id?: string;
  title: string;
  slug: string;
  content: string;
  metaDescription?: string;
  isPublished: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISuccessStory {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  farmerName?: string;
  location?: string;
  crop?: string;
  image: string;
  videoUrl?: string;
  isPublished: boolean;
  createdAt?: Date;
}
