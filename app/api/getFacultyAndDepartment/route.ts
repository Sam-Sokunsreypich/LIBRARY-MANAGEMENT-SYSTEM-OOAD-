import { getFacultyAndDepartment } from "@/app/admin/user/actions/getFacultyAndDepartment";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        const {faculties, departments} = await getFacultyAndDepartment();
        return NextResponse.json({faculties,departments});
    }catch(error: any){
        console.error(error);
        return NextResponse.json({error: error.message}, {status: 500});
    }
}