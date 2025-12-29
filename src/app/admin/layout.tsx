import { DashboardLayout } from "@/components/ui/dashboard-with-collapsible-sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return <DashboardLayout>{children}</DashboardLayout>;
}
