import { ApplicationStatus } from "@/types/application";

const styles: Record<ApplicationStatus, string> = {
  applied: "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
  interview: "bg-blue-200 text-blue-800 dark:bg-blue-700 dark:text-blue-200",
  offer: "bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-200",
  rejected: "bg-red-200 text-red-800 dark:bg-red-700 dark:text-red-200",
};

export function StatusBadge({ status }: { status: ApplicationStatus }) {
  return (
    <span className={`rounded-full px-3 py-1 text-sm ${styles[status]}`}>
      {status}
    </span>
  );
}


