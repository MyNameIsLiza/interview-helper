import axios from "axios";

export async function addCategory(category) {
    console.log('ADD', category)
    const response = await axios.post("https://interview-helper-api.herokuapp.com/api/categories/add", {
        "title": category.title
    });
    return response.data;
}

export async function editCategory(category) {
    const response = await axios.patch("https://interview-helper-api.herokuapp.com/api/categories/edit", {
        "id": category.id,
        "title": category.title
    });
    return response.data;
}

export async function deleteCategory(id) {
    const response = await axios.delete(`https://interview-helper-api.herokuapp.com/api/categories/${id}`);
    return response.data;
}

export async function getAllCategories() {
    const response = await axios.get("https://interview-helper-api.herokuapp.com/api/categories");
    return response.data;
}
