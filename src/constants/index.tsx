import {
  ChartColumn,
  Home,
  NotepadText,
  // Package,
  // CalendarDays,
  //PackagePlus,
  Settings,
  // ShoppingBag,
  //  UserCheck,
  UserPlus,
  Users,
  NotebookText,
  MessageCircleQuestion,
} from "lucide-react";
import type { FieldConfig } from "../components/ui/FormRenderer";

export const data = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 4000 },
];

//company
export const companyLinks = (companyId: string) => [
  {
    title: "Dashboard",
    links: [
      { label: "Dashboard", icon: Home, path: `/company/${companyId}` },
      {
        label: "Analytics",
        icon: ChartColumn,
        path: `/company/${companyId}/analytics`,
      },
      {
        label: "Reports",
        icon: NotepadText,
        path: `/company/${companyId}/reports`,
      },
    ],
  },
  {
    title: "Questions",
    links: [
      {
        label: "View Questions",
        icon: NotebookText,
        path: `/company/${companyId}/view-interview-question`,
      },
      {
        label: "Add Questions",
        icon: MessageCircleQuestion,
        path: `/company/${companyId}/add-interview-question`,
      },
    ],
  },

  {
    title: "Customers",
    links: [
      {
        label: "Customers",
        icon: Users,
        path: `/company/${companyId}/view-users`,
      },
      {
        label: "Manage Users",
        icon: UserPlus,
        path: `/company/${companyId}/manage-users`,
      },
    ],
  },

  {
    title: "Settings",
    links: [
      {
        label: "Settings",
        icon: Settings,
        path: `/company/${companyId}/settings`,
      },
    ],
  },
];

//admin
export const navbarLinks = [
  {
    title: "Dashboard",
    links: [
      {
        label: "Dashboard",
        icon: Home,
        path: "/admin",
      },
      {
        label: "Analytics",
        icon: ChartColumn,
        path: "/admin/analytics",
      },
      {
        label: "Reports",
        icon: NotepadText,
        path: "/admin/reports",
      },
    ],
  },
  {
    title: "Questions",
    links: [
      {
        label: "View Questions",
        icon: NotebookText,
        path: "/admin/view-interview-question",
      },
      {
        label: "Add Questions",
        icon: MessageCircleQuestion,
        path: "/admin/add-interview-question",
      },

      // {
      //     label: "Bookings",
      //     icon: Package,
      //     path: "/admin/view/bookings",
      // },
    ],
  },
  {
    title: "Customers",
    links: [
      {
        label: "Customers",
        icon: Users,
        path: "/admin/view-users",
      },
      {
        label: "Manage Users",
        icon: UserPlus,
        path: "/admin/manage-users",
      },
    ],
  },

  {
    title: "Settings",
    links: [
      {
        label: "Settings",
        icon: Settings,
        path: "/admin/settings",
      },
    ],
  },
];

//forms
export const personalFormFields: FieldConfig[] = [
  {
    component: "Input",
    name: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "John",
  },
  {
    component: "Input",
    name: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Doe",
  },
   {
        component: "CompanyNameSearch",
        name: "companyName",
        label: "Company Name",
      },
  { component: "PhoneInput" },
  {
    component: "Input",
    label: "Email Address",
    name: "email",
    type: "email",
    placeholder: "abc@example.com",
    onBlur: "handleEmailBlur",
  },
  {
    component: "Input",
    label: "Password",
    name: "password",
    type: "password",
    placeholder: "N4&vQ2!p",
  },
  {
    component: "Input",
    label: "Confirm Password",
    name: "confirmPassword",
    type: "password",
    placeholder: "N4&vQ2!p",
  },
];

export const companyFormFields=(isJoiningCompany: boolean): FieldConfig[] => [
  {
    component: "Input",
    name: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "John",
  },
  {
    component: "Input",
    name: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Doe",
  },  
  isJoiningCompany
    ? {
        component: "CompanyNameSearch",
        name: "companyName",
        label: "Company Name",
      }
    : {
        component: "Input",
        name: "companyName",
        label: "Company Name",
        type: "text",
        placeholder: "Enter new company name",
        onBlur: "handleCompanyNameBlur",
      },
  {
    component: "PhoneInput",
  },
  {
    component: "Input",
    label: "Company Email",
    name: "companyEmail",
    type: "email",
    placeholder: "abc@company.com",
    onBlur: "handleCompanyEmailBlur",
  },
  {
    component: "Input",
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "N4&vQ2!p",
  },
  {
    component: "Input",
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    placeholder: "N4&vQ2!p",
  },
];

export const signInFormFields: FieldConfig[] = [
  {
    component: "Input",
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "abc@example.com",
    onBlur: "handleBlur",
  },
  {
    component: "Input",
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    onBlur: "handleBlur",
  },
  {
    component: "Checkbox",
    name: "rememberMe",
    label: "Remember Me",
  },
];

export const publicEmailDomains = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "icloud.com",
  "aol.com",
  "live.com",
  "msn.com",
  "protonmail.com",
  "zoho.com",
  "mail.com",
  "gmx.com",
  "yandex.com",
  "me.com",
  "inbox.com",
  "fastmail.com",
  "tutanota.com",
  "rocketmail.com", // Old Yahoo domain
  "ymail.com", // Another Yahoo domain
  "mail.ru", // Popular in Russia
  "qq.com", // Popular in China
  "naver.com", // Popular in South Korea
  "daum.net", // South Korea
  "rediffmail.com", // Popular in India
  "email.com",
];
