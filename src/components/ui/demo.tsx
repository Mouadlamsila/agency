import { DashboardLayout } from "@/components/ui/dashboard-with-collapsible-sidebar";
import OverviewPage from "@/app/admin/page";

export default function DemoOne() {
    return (
        <DashboardLayout>
            <OverviewPage />
        </DashboardLayout>
    );
}
