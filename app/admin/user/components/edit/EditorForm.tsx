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
import { IPermission } from "@/lib/types";

export default function EditForm({
    isAdmin,
    permission
}: {
    isAdmin: boolean;
    permission: IPermission
}){
    return(
        <Tabs defaultValue="basic"
        className="w-full space-y-6">
            <TabsList
            className={
                cn("grid w-full",
                    isAdmin ? "grid-cols-3": "grid-cols-1"
                )
            }>
                <TabsTrigger value="basic">
                    Basic
                </TabsTrigger>
                {isAdmin && (
                    <>
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="advance">Advanced</TabsTrigger>
                    </>
                )}
            </TabsList>

            <TabsContent value="basic">
                <BasicForm permission={permission}/>
            </TabsContent>
            {isAdmin && (
                <>
                <TabsContent value="account">
                    <AccountForm permission={permission}/>
                </TabsContent>
                <TabsContent value="advance">
                    <AdvancedForm permission={permission}/>
                </TabsContent>
                </>
            )}
        </Tabs>
    )
}