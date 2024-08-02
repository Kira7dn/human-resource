import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";
import { CheckCircle2, CircleSlash, MinusCircle } from "lucide-react";

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const statuses = [
  {
    value: "Active",
    label: "Active",
    icon: CheckCircle2,
  },
  {
    value: "Inactive",
    label: "Inactive",
    icon: MinusCircle,
  },
  {
    value: "On Leave",
    label: "On Leave",
    icon: CircleSlash,
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
