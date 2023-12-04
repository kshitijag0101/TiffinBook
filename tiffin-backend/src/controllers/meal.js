import mongoose from "mongoose";
import Meal from "../models/meal.js";
import Combo from "../models/combo.js";
import MealCount from "../models/mealCount.js";
import Menu from "../models/menu.js";
import FoodOption from "../models/foodOption.js";

function getMenuPipeline(menuId){
    const matchMenuId = (menuId) => {
        const matchObject = {};
        if (menuId){
            matchObject._id = new mongoose.Types.ObjectId(menuId);
        }

        return {
            $match: matchObject
        };
    }

    const lookupWeek = (week) => {
        return {
            $lookup: {
                from: 'meals',
                localField: `${week}`,
                foreignField: '_id',
                as: `${week}Temp`
            }
        };
    }

    const productLookupStage = (week, type) => {
        return {
            $lookup: {
                from: 'products',
                localField: `${week}Temp.${type}`,
                foreignField: '_id',
                as: `${week}Temp.${type}`
            }
        };
    }

    const pipeline = [
        // match stage for the menu, if 'menuId' is null returns all
        matchMenuId(menuId),


        // transform 'oddWeek'
        // populate odd week into 'oddWeekTemp'
        lookupWeek('oddWeek'),

        // unwind the 'oddWeekTemp' array
        {
            $unwind: '$oddWeekTemp'
        },
        
        productLookupStage('oddWeek', 'products'),      // populate 'oddWeek.products'

        productLookupStage('oddWeek', 'substitutes'),   // populate 'oddWeek.substitutes'

        productLookupStage('oddWeek', 'addons'),        // populate 'oddWeek.addons'

        // group/wind the 'oddWeekTemp' array based on '_id', retain required properties
        {
            $group: {
                _id: "$_id",
                name: { $first: "$name" },
                description: { $first: "$description" },
                __v: { $first: "$__v" },
                evenWeek: { $first: "$evenWeek"},
                oddWeek: { $first: "$oddWeek"},
                oddWeekTemp: { $push: "$oddWeekTemp" }
            }
        },
        
        // merge back 'oddWeekTemp' into 'oddWeek', this ensures that order is preserved
        {
            $addFields: {
                oddWeek: {
                    $map: {
                        input: "$oddWeek",
                        as: "oddWeekId",
                        in: {
                            $arrayElemAt: [
                                "$oddWeekTemp",
                                { $indexOfArray: ["$oddWeekTemp._id", "$$oddWeekId"] }
                            ]
                        }
                    }
                }
            }
        },


        // transform 'evenWeek'
        // populate even week into 'evenWeekTemp'
        lookupWeek('evenWeek'),

        // unwind the 'evenWeekTemp' array
        {
            $unwind: '$evenWeekTemp'
        },

        productLookupStage('evenWeek', 'products'),      // populate 'evenWeek.products'

        productLookupStage('evenWeek', 'substitutes'),   // populate 'evenWeek.substitutes'

        productLookupStage('evenWeek', 'addons'),        // populate 'evenWeekTemp.addons'

        // group/wind the 'evenWeekTemp' array based on '_id', retain required properties
        {
            $group: {
                _id: "$_id",
                name: { $first: "$name" },
                description: { $first: "$description" },
                __v: { $first: "$__v" },
                oddWeek: { $first: "$oddWeek"},
                evenWeek: { $first: "$evenWeek"},
                evenWeekTemp: { $push: "$evenWeekTemp" }
            }
        },

        // merge back 'evenWeekTemp' into 'evenWeek', this ensures that order is preserved
        {
            $addFields: {
                evenWeek: {
                    $map: {
                        input: "$evenWeek",
                        as: "evenWeekId",
                        in: {
                            $arrayElemAt: [
                                "$evenWeekTemp",
                                { $indexOfArray: ["$evenWeekTemp._id", "$$evenWeekId"] }
                            ]
                        }
                    }
                }
            }
        },

        // discard the 'temp', 'oddWeekTemp', and 'evenWeekTemp' properties
        {
            $project: {
                oddWeekTemp: 0,
                evenWeekTemp: 0
            }
        }
    ];

    return pipeline;
}

async function getMenus(req, res){
    try {
        const pipeline = getMenuPipeline(null);

        const menus = await Menu.aggregate(pipeline);

        return res.status(200).json({ menus });
    } catch (err){
        console.log(err);
    }
}

async function addMenu(req, res){
    try {
        const { name, description, oddWeek, evenWeek } = req.body;

        const menu = new Menu({
            name: name,
            description: description,
            oddWeek: oddWeek,
            evenWeek: evenWeek
        });
        await menu.save();

        return res.status(201).json({
            message: `menu added successfully`,
            menu: menu
        });
    }
    catch (err){
        console.log(err);
    }
}

async function removeMenu(req, res){
    try {
        const menuId = req.body.menuId;

        const menu = await Menu.findByIdAndRemove(menuId);

        return res.status(200).json({
            message: `menu remove successfully`,
            menu: menu
        });
    }
    catch (err){
        console.log(err);
    }
}

async function replaceMealInMenu(req, res){
    try {
        // week: { 0: evenWeek, 1: oddWeek}
        // day: { 0: monday, 1: tuesday, 2: wednesday,..., 5: saturday}
        const { menuId, week, day, mealId } = req.body;

        const menu = await Menu.findById(menuId);

        if (week){
            menu.oddWeek[day] = mealId;
        }
        else {
            menu.evenWeek[day] = mealId;
        }
        await menu.save();

        return res.status(200).json({
            message: `meal replaced in menu successfully`,
            menu: menu
        });
    }
    catch (err){
        console.log(err);
    }
}

async function getMeals(req, res){
    try {
        const meals = await Meal.find({})
            .populate("products")
            .populate("substitutes")
            .populate("addons");

        return res.status(200).json({ meals });
    }
    catch (err){
        console.log(err);
    }
}

async function addMeal(req, res) {
    try {
        if (!req.body.name) {
            return res.staus(400).json({ error: `name missing` });
        }
        if (!req.body.products) {
            return res.status(400).json({ error: `no products specified` });
        }

        const {
            name,
            products,
            substitutes,
            addons,
            price,
        } = req.body;

        const meal = new Meal({
            name: name,
            products: products,
            substitutes: substitutes,
            addons: addons,
            price: price
        });
        await meal.save();

        return res.status(201).json({
            message: `meal added successfully`,
            meal: meal,
        });
    } catch (err) {
        console.log(err);
    }
}

async function removeMeal(req, res) {
    try {
        if (!req.body.mealId) {
            return res.status(400).json({ error: `no meal id specified` });
        }
        const mealId = req.body.mealId;

        const meal = await Meal.findByIdAndRemove(mealId);

        return res.status(200).json({
            message: `meal removed successfully`,
            meal: meal,
        });
    } catch (err) {
        console.log(err);
    }
}

async function queryMealByDate(req, res) {
    try {
        const date = new Date(req.body.date);
        const menuId = req.body.menuId;

        const meal = await queryMealByDateUtil(date, menuId, false);
        if (!meal) {
            return res.status(404).json({ error: `no meal found` });
        }

        return res.status(200).json({
            date: req.body.date,
            meal: meal,
        });
    } catch (err) {
        return res
            .status(err.statusCode)
            .json({ error: err.message, data: err.data });
    }
}

async function queryMealByDateUtil(date, menuId, isDates) {
    try {
        const pipeline = getMenuPipeline(menuId);
        let menu = await Menu.aggregate(pipeline);
        menu = menu[0];

        if (!isDates){
            const day = date.getDay();
            const week = getWeekOfMonth(date) % 2;

            if (week == 1){
                return menu.oddWeek[day - 1];
            }
            else {
                return menu.evenWeek[day - 1];
            }
        }

        let meals = [];
        for (let i = 0; i < date.length; i++){
            const d = new Date(date[i]);

            const day = d.getDay();
            const week = getWeekOfMonth(d) % 2;

            if (week == 1){
                meals.push(menu.oddWeek[day - 1]);
            }
            else {
                meals.push(menu.evenWeek[day - 1]);
            }
        }

        return meals;

    } catch (err) {
        console.log(err);
    }
}

function getWeekOfMonth(date) {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    let firstDayOfWeek = firstDayOfMonth.getDay();

    const dayOfMonth = date.getDate();
    const lastDateOfFirstWeek = 1 + (6 - firstDayOfWeek);
    const firstDateOfFirstWeek = 1;

    if (
        dayOfMonth >= firstDateOfFirstWeek &&
        dayOfMonth <= lastDateOfFirstWeek
    ) {
        return 1;
    }

    let adjustedDate = dayOfMonth - lastDateOfFirstWeek;
    return 1 + Math.ceil(adjustedDate / 7);
}

async function queryMealPlanByDate(req, res) {
    try {
        const startDate = new Date(req.body.startDate);
        const endDate = new Date(req.body.endDate);
        const menuId = req.body.menuId;

        let mealPlan = [];

        for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
            let meal = await queryMealByDateUtil(d, menuId, false);

            mealPlan.push(meal);
        }

        return res.status(200).json({
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            mealPlan: mealPlan,
        });
    } catch (err) {
        return res
            .status(err.statusCode)
            .json({ error: err.message, data: err.data });
    }
}

function getMealComboPrice(combo, mealCountId){
    for (let i = 0; i < combo.mealCounts.length; i++){
        if (combo.mealCounts[i].mealCount == mealCountId){
            return combo.mealCounts[i].price;
        }
    }
    return -1;
}

async function queryMealPlanByComboAndDate(req, res) {
    try {
        const comboId = req.body.comboId;
        const mealCountId = req.body.mealCountId;
        const dates = req.body.dates;
        const menuId = req.body.menuId;

        const combo = await Combo.findById(comboId);
        if (!combo){
            return res.status(404).json({ error: `combo missing` });
        }

        let meals = await queryMealByDateUtil(dates, menuId, true);
        let mealPlan = [];

        for (let i = 0; i < meals.length; i++) {
            mealPlan.push({
                date: dates[i],
                meal: meals[i],
            });
        }

        const price = getMealComboPrice(combo, mealCountId);
        if (price == -1){
            return res.status(404).json({ error: `meal count missing`} );
        }

        return res.status(200).json({ price, mealPlan });
    } catch (err) {
        console.log(err);
        return res
            .status(err.statusCode)
            .json({ error: err.message, data: err.data });
    }
}

async function getCombos(req, res){
    try {
        if (req.body.comboId){
            const combo = await Combo.findById(req.body.comboId).populate('mealCounts.mealCount');

            return res.status(200).json({ combo });
        }

        const combos = await Combo.find({}).populate('mealCounts.mealCount');

        return res.status(200).json({ combos });
    }
    catch (err){
        console.log(err);
    }
}

async function addCombo(req, res){
    try {
        const { name, description, mealCounts } = req.body;

        const comboImage = req.file.path.replace("\\" ,"/");

        const combo = new Combo({
            name: name,
            description: description,
            mealCounts: mealCounts,
            comboImage: comboImage
        });
        await combo.save();

        return res.status(201).json({
            message: `combo added successfully`,
            combo: combo
        });
    }
    catch (err){
        console.log(err);
    }
}

async function removeCombo(req, res){
    try {
        if (!req.body.comboId) {
            return res.status(400).json({ error: `no combo id specified` });
        }
        const comboId = req.body.comboId;

        const combo = await Combo.findByIdAndRemove(comboId);

        return res.status(200).json({
            message: `combo removed successfully`,
            combo: combo,
        });
    }
    catch (err){
        console.log(err);
    }
}

async function addMealCountToCombo(req, res){
    try {
        const { mealCountId, comboId, price } = req.body

        const combo = await Combo.findById(comboId);
        if (!combo){
            return res.status(404).json({ error: `combo missing` });
        }

        combo.mealCounts.push({
            mealCount: mealCountId,
            price: price
        });
        await combo.save();

        return res.status(200).json({
            message: `meal count added to combo successfully`,
            combo: combo
        });
    }
    catch (err){

    }
}

async function removeMealCountFromCombo(req, res){
    try {
        const { mealCountId, comboId } = req.body;

        const combo = await Combo.findById(comboId).populate('mealCounts.mealCount');
        if (!combo){
            return res.status(404).json({ error: `combo missing` });
        }

        let removedMealCount = null;
        combo.mealCounts = combo.mealCounts.filter( (mc) => {
            if (mc.mealCount._id == mealCountId){
                removedMealCount = mc.mealCount;
                return false;
            }
            return true;
        });
        await combo.save();

        return res.status(200).json({
            message: `meal count remove from combo successfully`,
            mealCount: removedMealCount
        });
    }
    catch (err){
        console.log(err);
    }
}

async function getMealCounts(req, res){
    try {
        const mealCounts = await MealCount.find({});

        return res.status(200).json({ mealCounts });
    }
    catch (err){
        console.log(err);
    }
}

async function addMealCount(req, res){
    try {
        const count = parseInt(req.body.count);

        const mealCount = new MealCount({
            count: count
        });
        await mealCount.save();
        
        return res.status(201).json({
            message: `meal count added successfully`,
            mealCount: mealCount
        });
    }
    catch (err){
        console.log(err);
    }
}

async function removeMealCount(req, res){
    try {
        if (!req.body.mealCountId) {
            return res.status(400).json({ error: `no mealCount id specified` });
        }
        const mealCountId = req.body.mealCountId;

        const mealCount = await MealCount.findByIdAndRemove(mealCountId);

        return res.status(200).json({
            message: `mealCount removed successfully`,
            mealCount: mealCount,
        });
    }
    catch (err){
        console.log(err);
    }
}

async function getFoodOptions(req, res){
    try {
        const foodOptions = await FoodOption.find({});

        return res.status(200).json({ foodOptions });
    }
    catch (err){
        console.log(err);
    }
}

async function addFoodOption(req, res){
    try {
        const type = req.body.type;

        const foodOption = new FoodOption({
            type: type
        });
        await foodOption.save();

        return res.status(201).json({
            message: 'food option added successfully',
            foodOption: foodOption
        });
    }
    catch (err){
        console.log(err);
    }
}

async function removeFoodOption(req, res){
    try {
        const foodOptionId = req.body.foodOptionId;

        const foodOption = await FoodOption.findByIdAndRemove(foodOptionId);

        return res.status(200).json({
            message: `food option remove successfully`,
            foodOption: foodOption
        });
    }
    catch (err){
        console.log(err);
    }
}

export {
    getMenus,
    addMenu,
    removeMenu,
    replaceMealInMenu,
    getMeals,
    addMeal,
    removeMeal,
    queryMealByDate,
    queryMealPlanByDate,
    queryMealPlanByComboAndDate,
    getCombos,
    addCombo,
    removeCombo,
    addMealCountToCombo,
    removeMealCountFromCombo,
    getMealCounts,
    addMealCount,
    removeMealCount,
    getFoodOptions,
    addFoodOption,
    removeFoodOption
};
