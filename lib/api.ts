export async function fetchCategoriesAndSubcategories(){
    const res = await fetch("/api/getCategoriesAndSubcategories");
    if(!res.ok) throw new Error("Failed to fetch categories and subcategories");
    return res.json();
}

export async function fetchFacultyAndDepartments(){
    const res = await fetch("/api/getFacultyAndDepartment");
    if(!res.ok) throw new Error("Failed to fetch faculties and departments");
    return res.json();
}

export async function fetchMembersInfo(){
    const res = await fetch("/api/getMembers");
    if(!res.ok) throw new Error("Failed to fetch Members");
    return res.json();
}