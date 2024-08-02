import exp from "constants";
import {
  CalendarCheck,
  Folders,
  UserCircle,
  Package,
  LayoutTemplateIcon,
  HomeIcon,
  UsersRound,
  Wallet,
  Contact,
} from "lucide-react";

export const mainLinks = [
  {
    route: "/dashboard",
    label: "Dashboard",
    component: LayoutTemplateIcon,
  },
  {
    route: "/employee",
    label: "Employee",
    component: Contact,
  },
  {
    route: "/candidate",
    label: "Candidate",
    component: Contact,
  },
  {
    route: "/recruitment",
    label: "Recruitment",
    component: UsersRound,
  },
  {
    route: "/events",
    label: "Payroll",
    component: Wallet,
  },
];
export const otherLinks = [
  {
    route: "/profile",
    label: "Profile",
    component: UserCircle,
  },
  {
    route: "/events",
    label: "Events",
    component: CalendarCheck,
  },
];
export const preferenceLinks = [
  {
    route: "/",
    label: "Home",
    component: HomeIcon,
  },
  {
    route: "/sađá",
    label: "Dashboard",
    component: LayoutTemplateIcon,
  },
];

export const workSpaces = [
  {
    members: [
      "user_2Yl8bchWR5bC5zNg48zFKdb4GLN",
      "user_2XUFi9BAk2TTwfJRU80Nol1SWCO",
      "user_2XUFgnHNddc2JV10ZTuEMFBRoEd",
      "user_2XUFfXNxzkVMrLUAgDwcDDUTk71",
      "user_2XUElXi15hZBWqNE5vvu0d0hLAU",
    ],
    icon: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1hscMT.img?w=1920&h=1080&q=60&m=2&f=jpg",
    cover:
      "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1hp7Ej.img?w=768&h=484&m=6&x=120&y=120&s=280&d=280",
    name: "Discover Network",
    title: "UI/UXDesigner",
    deadline: "Fri,Sept 23",
    task: [
      {
        name: "Design a new logo",
        from: new Date(2024, 1, 10),
        deadline: new Date(2024, 1, 20),
        group: "System Design",
        progress: 0.5,
        assignTo: [
          "user_2XUFgnHNddc2JV10ZTuEMFBRoEd",
          "user_2XUFgnHNddc2JV10ZTuEMFBRoEd",
        ],
        assignBy: "user_2XUFi9BAk2TTwfJRU80Nol1SWCO",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget nulla eget risus varius gravida. Nulla facilisi. Sed sit amet libero ut lacus lacinia ultrices. Praesent euismod, nisl eu facilisis consectetur, neque nunc lacinia eros, vitae finibus nisl sem eget arcu. Sed eget nisl sit amet sapien placerat hendrerit. Sed euismod, nisl eu facilisis consectetur, neque nunc lacinia eros, vitae finibus nisl sem eget arcu. Sed eget nisl sit amet sapien placerat hendrerit.",
        comments: [
          {
            user: "user_2XUFgnHNddc2JV10ZTuEMFBRoEd",
            comment:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget nulla eget risus varius gravida. Nulla facilisi. Sed sit amet libero ut lacus lacinia ultrices. Praesent euismod, nisl eu facilisis consectetur, neque nunc lacinia eros, vitae finibus nisl sem eget arcu. Sed eget nisl sit amet sapien placerat hendrerit. Sed euismod, nisl eu facilisis consectetur, neque nunc lacinia eros, vitae finibus nisl sem eget arcu. Sed eget nisl sit amet sapien placerat hendrerit.",
            date: new Date(2024, 0, 30),
          },
          {
            user: "user_2XUFgnHNddc2JV10ZTuEMFBRoEd",
            comment:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget nulla eget risus varius gravida. Nulla facilisi. Sed sit amet libero ut lacus lacinia ultrices. Praesent euismod, nisl eu facilisis consectetur, neque nunc lacinia eros, vitae finibus nisl sem eget arcu. Sed eget nisl sit amet sapien placerat hendrerit. Sed euismod, nisl eu facilisis consectetur, neque nunc lacinia eros, vitae finibus nisl sem eget arcu. Sed eget nisl sit amet sapien placerat hendrerit.",
            date: new Date(2024, 0, 30),
          },
        ],
      },
      {
        name: "Design a new logo",
        from: new Date(2024, 0, 30),
        deadline: new Date(2024, 1, 8),
        group: "System Design",
        progress: 0.5,
        assignTo: [
          "user_2XUFgnHNddc2JV10ZTuEMFBRoEd",
          "user_2XUFgnHNddc2JV10ZTuEMFBRoEd",
        ],
        assignBy: "user_2XUFi9BAk2TTwfJRU80Nol1SWCO",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget nulla eget risus varius gravida. Nulla facilisi. Sed sit amet libero ut lacus lacinia ultrices. Praesent euismod, nisl eu facilisis consectetur, neque nunc lacinia eros, vitae finibus nisl sem eget arcu. Sed eget nisl sit amet sapien placerat hendrerit. Sed euismod, nisl eu facilisis consectetur, neque nunc lacinia eros, vitae finibus nisl sem eget arcu. Sed eget nisl sit amet sapien placerat hendrerit.",
        comments: [
          {
            user: "user_2XUFgnHNddc2JV10ZTuEMFBRoEd",
            comment:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget nulla eget risus varius gravida. Nulla facilisi. Sed sit amet libero ut lacus lacinia ultrices. Praesent euismod, nisl eu facilisis consectetur, neque nunc lacinia eros, vitae finibus nisl sem eget arcu. Sed eget nisl sit amet sapien placerat hendrerit. Sed euismod, nisl eu facilisis consectetur, neque nunc lacinia eros, vitae finibus nisl sem eget arcu. Sed eget nisl sit amet sapien placerat hendrerit.",
            date: new Date(2024, 0, 30),
          },
          {
            user: "user_2XUFgnHNddc2JV10ZTuEMFBRoEd",
            comment:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget nulla eget risus varius gravida. Nulla facilisi. Sed sit amet libero ut lacus lacinia ultrices",
            date: new Date(2024, 0, 30),
          },
        ],
      },
    ],
  },
];

export const projecLinks = [
  { icon: HomeIcon, route: "/" },
  {
    icon: LayoutTemplateIcon,
    route: "/dashboard",
  },
  {
    icon: UserCircle,
    route: "/profile",
  },
  {
    icon: Folders,
    route: "/workspaces",
  },
  {
    icon: CalendarCheck,
    route: "/events",
  },
  {
    icon: Package,
    route: "/workspaces",
  },
];

export const department = [
  "Engineering",
  "Product",
  "Design",
  "Data",
  "Operations",
  "Management",
  "Development",
  "Security",
  "Mobile",
];
export const level = ["Junior", "Mid-Level", "Senior"];
export const status = ["Active", "Inactive", "On Leave"];
export const gender = ["Male", "Female", "Other"];
