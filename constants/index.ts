import {
  CalendarCheck,
  LayoutTemplateIcon,
  HomeIcon,
  UserCircle,
  Folders,
  Package,
  XCircle,
  PauseCircle,
} from "lucide-react";

import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
} from "@radix-ui/react-icons";
import { CheckCircle2, MinusCircle } from "lucide-react";
import { FaHeadset, FaUserClock, FaUserTie } from "react-icons/fa6";
import { MdPayments } from "react-icons/md";
import { RiDashboard2Line } from "react-icons/ri";
import { TbFingerprintScan } from "react-icons/tb";
import { FaFemale, FaGenderless, FaMale } from "react-icons/fa";
import {
  LiaFemaleSolid,
  LiaGenderlessSolid,
  LiaMaleSolid,
} from "react-icons/lia";

export const genders = [
  {
    value: "male",
    label: "Male",
    icon: LiaMaleSolid,
  },
  {
    value: "female",
    label: "Female",
    icon: LiaFemaleSolid,
  },
  {
    value: "other",
    label: "Other",
    icon: LiaGenderlessSolid,
  },
];

export const statuses = [
  {
    value: "active",
    label: "Active",
    icon: CheckCircle2,
  },
  {
    value: "inactive",
    label: "Inactive",
    icon: MinusCircle,
  },
];
export const candidateStatuses = [
  {
    value: "passed",
    label: "Passed",
    icon: CheckCircle2,
    className: "text-green-500",
  },
  {
    value: "failed",
    label: "Failed",
    icon: XCircle,
    className: "text-red-500",
  },
  {
    value: "waiting",
    label: "Waiting",
    icon: PauseCircle,
    className: "text-yellow-500",
  },
];

export const levels = [
  {
    label: "Junior",
    value: "Junior",
    icon: ArrowDownIcon,
  },
  {
    label: "Mid-Level",
    value: "Mid-Level",
    icon: ArrowRightIcon,
  },
  {
    label: "Senior",
    value: "Senior",
    icon: ArrowUpIcon,
  },
];

export const mainLinks = [
  {
    route: "/dashboard",
    label: "Dashboard",
    component: RiDashboard2Line,
  },
  {
    route: "/employee",
    label: "Employee",
    component: FaUserTie,
  },
  {
    route: "/candidate",
    label: "Candidate",
    component: FaUserClock,
  },
  {
    route: "/recruitment",
    label: "Recruitment",
    component: FaHeadset,
  },
  {
    route: "/payroll",
    label: "Payroll",
    component: MdPayments,
  },
];
export const otherLinks = [
  {
    route: "/attendance",
    label: "Attendance",
    component: TbFingerprintScan,
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

export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
