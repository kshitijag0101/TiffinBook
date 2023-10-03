// export const API_DOMAIN = "https://glamorous-ruby-dolphin.cyclic.cloud";
export const API_DOMAIN = "http://localhost:5000";
const BASE_USER_API = API_DOMAIN + "/user";
const BASE_ADMIN_API = API_DOMAIN + "/admin";

export const USER_URL = {
    signup: BASE_USER_API + "/signup",
    login: BASE_USER_API + "/login",
    checkpincode: API_DOMAIN + "/pincodes/check",
    menumeals: API_DOMAIN + "/menus",
    getdates: API_DOMAIN + "/weeks",
    selectmeal: API_DOMAIN + "/meals/plan/combo",
    createcart: BASE_USER_API + "/cart/create",
    addtocart: BASE_USER_API + "/cart/add",
    removefromcart: BASE_USER_API + "/cart/remove",
    getcart: BASE_USER_API + "/cart",
    getuser: BASE_USER_API,
    edituser: BASE_USER_API + "/edit",
    addproduct: BASE_ADMIN_API + "/products/add",
    getproducts: BASE_ADMIN_API + "/products",
    addmeal: BASE_ADMIN_API + "/meals/add",
    getmeals: BASE_ADMIN_API + "/meals",
    getcombos: API_DOMAIN + "/combos",
    getmealcounts: BASE_ADMIN_API + "/meal-counts",
    getfoodoptions: API_DOMAIN + "/food-options",
    addmenu: BASE_ADMIN_API + "/menus/add",
    addcombo: BASE_ADMIN_API + "/combos/add",
    addmealcount: BASE_ADMIN_API + "/meal-counts/add",
    addfoodoption: BASE_ADMIN_API + "/food-options/add",
    deleteproduct: BASE_ADMIN_API + "/products/remove",
    deletemeal: BASE_ADMIN_API + "/meals/remove",
    deletecombo: BASE_ADMIN_API + "/combos/remove",
    deletemealcount: BASE_ADMIN_API + "/meal-counts/remove",
    deletefoodoption: BASE_ADMIN_API + "/food-options/remove",
    deletemenu: BASE_ADMIN_API + "/menus/remove",
};
