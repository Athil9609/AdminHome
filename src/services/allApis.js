import baseUrl from "./baseUrl";
import commonApi from "./commonApi";

export const addCategories=async(data,header)=>{
    return await commonApi(`${baseUrl}/vendors/categories/`,'POST',header,data)
}
export const getCategories=async(header)=>{
    return await commonApi(`${baseUrl}/vendors/categories/`,'GET',header," ")
}
export const getSpecificCategory=async(id,header)=>{
    return await commonApi(`${baseUrl}/vendors/categories/${id}/`,'GET',header," ")
}
export const updateCategory=async(id,data,header)=>{
    return await commonApi(`${baseUrl}/vendors/categories/${id}/`,'PUT',header,data)
}
export const deleteCategory=async(id,header)=>{
    return await commonApi(`${baseUrl}/vendors/categories/${id}/`,'DELETE',header," ")
}

export const getSubCategories=async(header)=>{
    return await commonApi(`${baseUrl}/vendors/admin/subcategories/`,'GET',header," ")
}
export const addSubCategory=async(header,data)=>{
        return await commonApi(`${baseUrl}/vendors/admin/subcategories/create/`,'POST',header,data)

}
export const updateSubCategory=async(id,data,header)=>{
    return await commonApi(`${baseUrl}vendors/admin/subcategories/${id}/`,'PUT',header,data)
}
export const deleteSubCategory=async(id,header)=>{
    return await commonApi(`${baseUrl}vendors/admin/subcategories/${id}/`,'DELETE',header," ")
}