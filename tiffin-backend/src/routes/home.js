import { Router } from "express";
import * as pincode from "../controllers/pincode.js";
import * as meal from "../controllers/meal.js";

const router = Router();

router.get("/", async (req, res) => {
    res.status(200).json({
        message: `Tiffin`,
    });
});

router.post("/weeks", async (req, res) => {
    function formatDateToYYYYMMDD(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

    const date = new Date(req.body.date);

    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const lastDateOfMonth = lastDayOfMonth.getDate();

    let weeks = [];

    let prev = new Date(date.getFullYear(), date.getMonth(), 1);
    while (prev <= lastDayOfMonth) {
        const startDate = formatDateToYYYYMMDD(prev);

        const day = 6 - prev.getDay();

        prev.setDate(Math.min(prev.getDate() + day, lastDateOfMonth));
        const endDate = formatDateToYYYYMMDD(prev);
        const d1 = startDate.split("-")[2];
        const d2 = endDate.split("-")[2];

        const week = {
            startDate: startDate,
            endDate: endDate,
        };
        if (d2 - d1 >= 6) {
            weeks.push(week);
        }

        prev.setDate(prev.getDate() + 1);
    }

    return res.status(200).json({ weeks });
});

router.post("/pincodes/check", pincode.checkPincode);

// router.post('/products', product.queryProductsByDate);

router.post("/meals", meal.queryMealByDate);

router.post("/meals/plan", meal.queryMealPlanByDate);

router.post("/meals/plan/combo", meal.queryMealPlanByComboAndDate);

router.get("/combos", meal.getCombos);

router.post("/combos", meal.getCombos);

router.get("/menus", meal.getMenus);

router.get("/food-options", meal.getFoodOptions);

export { router };
