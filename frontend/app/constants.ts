import {
  Banknote,
  Bot,
  Building2,
  Coins,
  List,
  SquareTerminal,
  User,
  Users,
} from "lucide-react";

export const cuisineTypes = [
  {
    value: "sri-lankan",
    label: "Sri Lankan",
  },
  {
    value: "indian",
    label: "Indian",
  },
  {
    value: "chinese",
    label: "Chinese",
  },
  {
    value: "italian",
    label: "Italian",
  },
  {
    value: "thai",
    label: "Thai",
  },
  {
    value: "japanese",
    label: "Japanese",
  },
  {
    value: "middle-eastern",
    label: "Middle Eastern",
  },
  {
    value: "american",
    label: "American",
  },
  {
    value: "mexican",
    label: "Mexican",
  },
  {
    value: "fusion",
    label: "Fusion",
  },
];

export const acceptedFileExts: string[] = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "application/pdf",
];

export const passwordRules: string[] = [
  "8–32 characters long",
  "At least one lowercase letter (a–z)",
  "At least one uppercase letter (A–Z)",
  "At least one number (0–9)",
  "At least one special character (@, #, $, %, &, *, !, etc.)",
  "No spaces allowed",
];

export const adminMenu = {
  user: {
    name: "admin user",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "admin/",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Restaurants",
      url: "#",
      icon: Building2,
      items: [
        {
          title: "All restaurants",
          url: "#",
        },
        {
          title: "Create restaurant",
          url: "#",
        },
        {
          title: "Pending restaurant requests",
          url: "#",
        },
      ],
    },
    {
      title: "Users",
      url: "#",
      icon: Users,
      items: [
        {
          title: "All users",
          url: "#",
        },
        {
          title: "Create user",
          url: "#",
        },
        {
          title: "Pending user requests",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [],
  projects: [],
};

export const merchantMenu = {
  user: {
    name: "Merchant User",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "admin/",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Orders",
      url: "#",
      icon: Building2,
      items: [
        {
          title: "All Orders",
          url: "#",
        },
        {
          title: "Pending orders",
          url: "#",
        },
        {
          title: "Rejected orders",
          url: "#",
        },
        {
          title: "User cancelled orders",
          url: "#",
        },
      ],
    },
    {
      title: "Menu",
      url: "#",
      icon: List,
    },
    {
      title: "Restraunt Details",
      url: "#",
      icon: Building2,
    },
    {
      title: "Customers",
      url: "#",
      icon: Users,
      items: [
        {
          title: "All users",
          url: "#",
        },
        {
          title: "Create user",
          url: "#",
        },
        {
          title: "Pending user requests",
          url: "#",
        },
      ],
    },
    {
      title: "Payouts",
      url: "#",
      icon: Banknote,
      items: [
        {
          title: "Payouts",
          url: "#",
        },
        {
          title: "Bank Details",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [],
  projects: [],
};
