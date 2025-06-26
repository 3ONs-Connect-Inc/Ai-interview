// Base interface for common properties
export interface BaseUser {
  id: string;
  companyName?: string;
  normalizedCompanyName?: string;
  companyContact: string;
  phoneNumber: string;
  email?: string;
  password: string;
  confirmPassword: string;
  contactInfo?: string;
  role: "User" | "Company" | "Admin";
  timestamp: any;
  emailVerified: boolean;
}

// Interface for the User role (if different from the base, extend and add properties)
export interface User extends BaseUser {
  firstName: string;
  lastName: string;
  companyEmail?: string;
  companyId?: string;
}

// Type for form errors
export type FormErrors = Partial<Record<keyof User | keyof BaseUser, string>>;

export interface Country {
  code: string;
  name: string;
}

export type Role = "Admin" | "Company" | "User";

export const roleRoutes = {
  Admin: () => "/admin",
  Company: (companyId: string) => `/company/${companyId}`,
  User: () => "/",
};







