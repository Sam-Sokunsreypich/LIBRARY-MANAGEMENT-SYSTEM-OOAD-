export type Faculty = {
    faculty_id : string;
    faculty_name : string;
}

export type Department = {
    department_id : string;
    department_name :string;
    faculty_id: string;
}