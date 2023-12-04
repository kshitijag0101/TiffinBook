import { Router } from 'express';
import * as admin from '../controllers/admin.js';
import * as product from '../controllers/product.js';
import * as meal from "../controllers/meal.js";
import * as pincode from "../controllers/pincode.js";
import upload from "../../config/imageUpload.js";

const router = Router();

router.get("/pincodes", pincode.getPincodes);

router.post("/pincodes/add", pincode.addPincode);

router.post("/pincodes/remove", pincode.removePincode);

router.post("/pinocdes/enable", pincode.enablePincode);

router.post("/pincodes/disable", pincode.disablePincode);

router.post("/orders", admin.getOrders);

router.post("/orders/export", admin.exportOrders);

router.get("/products", product.getProducts);

router.post("/products/add", product.addProduct);

router.post("/products/remove", product.removeProduct);

router.get("/meals", meal.getMeals);

router.post("/meals/add", meal.addMeal);

router.post("/meals/remove", meal.removeMeal);

router.get("/meal-counts", meal.getMealCounts);

router.post("/meal-counts/add", meal.addMealCount);

router.post("/meal-counts/remove", meal.removeMealCount);

router.post("/combos/add", upload.single('comboImage'), meal.addCombo);

router.post("/combos/remove", meal.removeCombo);

router.post("/combos/meal-counts/add", meal.addMealCountToCombo);

router.post("/combos/meal-counts/remove", meal.removeMealCountFromCombo);

router.post("/menus/add", meal.addMenu);

router.post("/menus/remove", meal.removeMenu);

router.post("/menus/meals/replace", meal.replaceMealInMenu);

router.post("/food-options/add", meal.addFoodOption);

router.post("/food-options/remove", meal.removeFoodOption);

router.get("/users", admin.fetchUsers);

router.post("/users/grant", admin.grantRole);

router.post("/users/revoke", admin.revokeRole);

export {
    router
};