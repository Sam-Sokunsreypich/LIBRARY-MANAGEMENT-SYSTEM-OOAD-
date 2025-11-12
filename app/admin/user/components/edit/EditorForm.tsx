import { 
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs";
import BasicForm from "./BasicForm";
import AccountForm from "./AccountForm";
import AdvancedForm from "./AdvancedForm";
import { cn } from "@/lib/utils";
import { Permission } from "@/lib/types";
import { Member } from "@/lib/types";

export default function EditForm({
    isAdmin,
    member,
    permission,
}: {
    isAdmin?: boolean;
    member: Member;
    permission?: Permission;
}) {
    return (
        <Tabs defaultValue="basic" className="w-full space-y-6">
            <TabsList
                className={cn(
                    "grid w-full",
                    isAdmin ? "grid-cols-3" : "grid-cols-1"
                )}
            >
                <TabsTrigger value="basic">Basic</TabsTrigger>
                {isAdmin && (
                    <>
                        <TabsTrigger value="account">Account</TabsTrigger>
                        <TabsTrigger value="advance">Advanced</TabsTrigger>
                    </>
                )}
            </TabsList>

            {/* Basic Tab */}
            <TabsContent value="basic">
                <BasicForm member={member} />
            </TabsContent>

            {/* Admin Tabs */}
            {isAdmin && permission && (
                <>
                    <TabsContent value="account">
                        <AccountForm member={member} />
                    </TabsContent>
                    <TabsContent value="advance">
                        <AdvancedForm permission={permission} />
                    </TabsContent>
                </>
            )}
        </Tabs>
    );
}
