export async function fetchCategoriesAndSubcategories(){
    const res = await fetch("/api/getCategoriesAndSubcategories");
    if(!res.ok) throw new Error("Failed to fetch categories and subcategories");
    return res.json();
}