import axios from "axios";
import { showToast } from "../utils/showToast";
import { USER_URL } from "../constants";
import { auth, googleProvider, facebookProvider } from "../config/firebase";
import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signInWithEmailAndPassword,
    signInWithPopup,
    RecaptchaVerifier,
    signInWithPhoneNumber,
} from "firebase/auth";

export const checkPincode = async (pincode, router) => {
    showToast("Please wait", "info");
    try {
        const response = await axios.post(USER_URL.checkpincode, {
            pincode: `${pincode}`,
        });
        if (response.status === 200) {
            showToast("We deliver at your location", "success");
            router.push("/Menu");
        } else {
            showToast(response.data.error, "fail");
        }
    } catch (err) {
        showToast("Error checking pincode", "fail");
    }
};

export const HandleMenu = async (currentDate) => {
    try {
        const response = await axios.get(USER_URL.menumeals, {});
        console.log(response.data);
        return response.data;
    } catch (err) {
        showToast("Cannot fetch item at the moment", "fail");
    }
};

export const HandleRegister = async (
    name,
    email,
    password,
    contact,
    router,
    setShowSignUp,
    setShowLogin
) => {
    showToast("Please wait", "info");
    try {
        const userCredentials = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        const requestObject = {
            name: `${name}`,
            email: `${email}`,
            phone: `${contact}`,
            firebaseId: userCredentials.user.uid,
            cartId: localStorage.getItem("cartId"),
        };
        const response = await axios.post(USER_URL.signup, requestObject);
        if (response.status === 201) {
            await sendEmailVerification(userCredentials.user);

            showToast("User created successfully", "success");
            setTimeout(() => {
                setShowSignUp(false);
                setShowLogin(true);
            }, 1000);
        }
    } catch (err) {
        console.log(typeof err.code, err.code);
        showToast("Cannot create user", "fail");
    }
};

export const HandleLogin = async (
    email,
    password,
    router,
    setIsLoggedIn,
    setShowLogin
) => {
    showToast("Please wait", "info");
    try {
        const userCredentials = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        if (userCredentials) {
            localStorage.setItem("userId", userCredentials.user.uid);
            setIsLoggedIn(true);
            setShowLogin(false);
            setTimeout(() => {
                router.push("/");
            }, 1000);
            showToast("Login successfull!", "success");
        }
    } catch (err) {
        console.log(typeof err.code, err.code);
        showToast("Something went wrong!", "fail");
    }
};

export const HandleGoogleLogin = async (
    router,
    setIsLoggedIn,
    setShowLogin
) => {
    showToast("Please wait", "info");
    try {
        const userCredentials = await signInWithPopup(auth, googleProvider);

        const requestObject = {
            name: userCredentials.user.displayName,
            email: userCredentials.user.email,
            firebaseId: userCredentials.user.uid,
            cartId: localStorage.getItem("cartId"),
        };
        const response = await axios.post(USER_URL.googlelogin, requestObject);
        if (response.status === 200 || response.status === 201) {
            localStorage.setItem("userId", userCredentials.user.uid);
            setIsLoggedIn(true);
            setShowLogin(false);
            setTimeout(() => {
                router.push("/");
            }, 1000);
            showToast("Login successfull!", "success");
        }
    } catch (err) {
        console.log(typeof err.code, err.code);
        showToast("Something went wrong!", "fail");
    }
};

export const HandleFacebookLogin = async (
    router,
    setIsLoggedIn,
    setShowLogin
) => {
    showToast("Please wait", "info");
    try {
        const userCredentials = await signInWithPopup(auth, facebookProvider);

        const requestObject = {
            name: userCredentials.user.displayName,
            email: userCredentials.user.email,
            firebaseId: userCredentials.user.uid,
            cartId: localStorage.getItem("cartId"),
        };
        const response = await axios.post(
            USER_URL.facebooklogin,
            requestObject
        );
        if (response.status === 200 || response.status === 201) {
            localStorage.setItem("userId", userCredentials.user.uid);
            setIsLoggedIn(true);
            setShowLogin(false);
            setTimeout(() => {
                router.push("/");
            }, 1000);
            showToast("Login successfull!", "success");
        }
    } catch (err) {
        console.log(typeof err.code, err.code);
        showToast("Something went wrong!", "fail");
    }
};

async function setupRecaptcha(phoneno) {
    try {
        const recaptchaVerifier = new RecaptchaVerifier(
            auth,
            "recaptcha-verifier",
            {}
        );
        await recaptchaVerifier.render();
        const response = await signInWithPhoneNumber(
            auth,
            phoneno,
            recaptchaVerifier
        );
        return response;
    } catch (err) {
        console.log(typeof err.code, err.code);
        showToast("Something went wrong!", "fail");
    }
}

export const HandleSendOtp = async (phoneno, setConfirmObj, setOtpFlag) => {
    showToast("Please verify captcha", "info");
    try {
        const response = await setupRecaptcha(phoneno);

        if (response) {
            setConfirmObj(response);
            setOtpFlag(true);
            showToast("Otp sent!", "success");
        }
    } catch (err) {
        console.log(typeof err.code, err.code);
        showToast("Something went wrong!", "fail");
    }
};

export const HandleSubmitOtp = async (
    confirmObj,
    otp,
    router,
    setIsLoggedIn,
    setShowLogin
) => {
    showToast("Please wait", "info");
    try {
        const userCredentials = await confirmObj.confirm(otp);

        const requestObject = {
            phone: userCredentials.user.phoneNumber,
            firebaseId: userCredentials.user.uid,
            cartId: localStorage.getItem("cartId"),
        };
        const response = await axios.post(USER_URL.phonelogin, requestObject);
        if (response.status === 200 || response.status === 201) {
            localStorage.setItem("userId", userCredentials.user.uid);
            setIsLoggedIn(true);
            setShowLogin(false);
            setTimeout(() => {
                router.push("/");
            }, 1000);
            showToast("Login successfull!", "success");
        }
    } catch (err) {
        console.log(typeof err.code, err.code);
        showToast("Something went wrong!", "fail");
    }
};

export const HandleGetUser = async (userId) => {
    try {
        const response = await axios.post(USER_URL.getuser, {
            userId: userId,
        });
        return response.data;
    } catch (err) {
        showToast("User Not found", "fail");
    }
};

export const HandleEditUser = async (name, email, phone, deliveryAddress) => {
    let token = null;
    if (auth.currentUser) {
        token = await auth.currentUser.getIdToken();
    }
    try {
        const response = await axios.post(
            USER_URL.edituser,
            {
                name: name,
                email: email,
                phone: phone,
                deliveryAddress: deliveryAddress,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(response);
        return response.data;
    } catch (err) {
        showToast("User Not found", "fail");
    }
};

export const HandleDate = async (date) => {
    try {
        const response = await axios.post(USER_URL.getdates, {
            date: date,
        });
        return response.data;
    } catch (err) {
        showToast("Cannot fetch item at the moment", "fail");
    }
};

export const HandleMealSelected = async (
    mealId,
    selectedMealPlan,
    selectedDates,
    selectedCombo,
    selectedFood
) => {
    try {
        const dates = selectedDates.map((dateString) => {
            const parts = dateString.split("/");
            const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
            return formattedDate;
        });
        const response = await axios.post(USER_URL.selectmeal, {
            menuId: mealId,
            comboId: selectedCombo,
            mealCountId: selectedMealPlan,
            dates: selectedDates,
            foodOption: selectedFood,
        });
        return response.data;
    } catch (err) {
        showToast("Cannot add meal at the moment", "fail");
    }
};

export const HandleCreateCart = async () => {
    try {
        const response = await axios.get(USER_URL.createcart, {});
        return response.data;
    } catch (err) {
        showToast("Cannot create cart", "fail");
    }
};

export const HandleCart = async (
    cartId,
    cartItems,
    userId,
    selectedCombo,
    selectedFood,
    newPrice
) => {
    try {
        const response = await axios.post(USER_URL.addtocart, {
            cartId: cartId,
            meals: cartItems,
            userId: userId,
            comboId: selectedCombo,
            foodOptionId: selectedFood,
            price: newPrice,
        });
        return response.data;
    } catch (err) {
        showToast("Cannot add meal to cart", "fail");
    }
};

export const HandleGetCart = async (userId, cartId) => {
    try {
        let token = null;
        if (auth.currentUser) {
            token = await auth.currentUser.getIdToken();
        }
        let response;
        if (userId) {
            response = await axios.get(USER_URL.getcart, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } else {
            response = await axios.post(USER_URL.getcart, {
                cartId: cartId,
            });
        }
        console.log(response);
        return response.data;
    } catch (err) {
        showToast("Cannot fetch cart at the moment", "fail");
    }
};

export const HandleDeleteFromCart = async (cartId, userId, mealPlanId) => {
    try {
        const response = await axios.post(USER_URL.removefromcart, {
            cartId: cartId,
            userId: userId,
            mealPlanId: mealPlanId,
        });
        return response.data;
    } catch (err) {
        showToast("Cannot delete meal from cart", "fail");
    }
};

export const HandleAddProduct = async (
    name,
    price,
    isVegetarian,
    setUpdateProductUI
) => {
    try {
        const response = await axios.post(USER_URL.addproduct, {
            name: name,
            price: price,
            isVegetarian: isVegetarian,
            isAvailable: true,
        });
        showToast("Product added succesfully!", "success");
        setUpdateProductUI(true);
        setTimeout(() => {
            setUpdateProductUI(false);
        }, 1000);
        return response.data;
    } catch (err) {
        showToast("Product cannot be added", "fail");
    }
};

export const HandleGetProducts = async () => {
    try {
        const response = await axios.get(USER_URL.getproducts, {});
        return response.data;
    } catch (err) {
        showToast("Server Error!", "fail");
    }
};

export const HandleGetMeals = async () => {
    try {
        const response = await axios.get(USER_URL.getmeals, {});
        return response.data;
    } catch (err) {
        showToast("Server Error!", "fail");
    }
};

export const HandleAddMeal = async (
    name,
    price,
    products,
    substitutes,
    addons,
    setUpdateMealUI
) => {
    try {
        const response = await axios.post(USER_URL.addmeal, {
            name: name,
            price: price,
            products: products,
            substitutes: substitutes,
            addons: addons,
        });
        showToast("Meal added succesfully!", "success");
        setUpdateMealUI(true);
        setTimeout(() => {
            setUpdateMealUI(false);
        }, 1000);
        return response.data;
    } catch (err) {
        showToast("Meal cannot be added", "fail");
    }
};

export const HandleGetCombos = async () => {
    try {
        const response = await axios.get(USER_URL.getcombos, {});
        return response.data;
    } catch (err) {
        showToast("Server Error!", "fail");
    }
};

export const HandleGetMealCounts = async () => {
    try {
        const response = await axios.get(USER_URL.getmealcounts, {});
        return response.data;
    } catch (err) {
        showToast("Server Error!", "fail");
    }
};

export const HandleGetFoodOptions = async () => {
    try {
        const response = await axios.get(USER_URL.getfoodoptions, {});
        return response.data;
    } catch (err) {
        showToast("Server Error!", "fail");
    }
};

export const HandleGetComboById = async (comboId) => {
    try {
        const response = await axios.post(USER_URL.getcombos, {
            comboId: comboId,
        });
        return response.data;
    } catch (err) {
        showToast("Server Error!", "fail");
    }
};

export const HandleAddMenu = async (
    menuName,
    evenWeekMenu,
    oddWeekMenu,
    setUpdateMenuUI
) => {
    try {
        const response = await axios.post(USER_URL.addmenu, {
            name: menuName,
            evenWeek: evenWeekMenu,
            oddWeek: oddWeekMenu,
        });
        showToast("Menu added succesfully!", "success");
        setUpdateMenuUI(true);
        setTimeout(() => {
            setUpdateMenuUI(false);
        }, 1000);
        return response.data;
    } catch (err) {
        showToast("Menu cannot be added", "fail");
    }
};

export const HandleAddCombo = async (
    comboName,
    comboDescription,
    mealCounts,
    setUpdateComboUI,
    selectedImage
) => {
    try {
        const response = await axios.post(USER_URL.addcombo, {
            name: comboName,
            price: comboDescription,
            mealCounts: mealCounts,
            comboImage: selectedImage,
        });
        showToast("Combo added succesfully!", "success");
        setUpdateComboUI(true);
        setTimeout(() => {
            setUpdateComboUI(false);
        }, 1000);
        return response.data;
    } catch (err) {
        showToast("Combo cannot be added", "fail");
    }
};

export const HandleAddMealCount = async (count) => {
    try {
        const response = await axios.post(USER_URL.addmealcount, {
            count: count,
        });
        showToast("Meal Count added succesfully!", "success");
        setUpdateMealCountUI(true);
        setTimeout(() => {
            setUpdateMealCountUI(false);
        }, 1000);
        return response.data;
    } catch (err) {
        showToast("Meal Count cannot be added", "fail");
    }
};

export const HandleAddFoodOptions = async (type, setUpdateMealCountUI) => {
    try {
        const response = await axios.post(USER_URL.addfoodoption, {
            type: type,
        });
        showToast("Food Option added succesfully!", "success");
        setUpdateMealCountUI(true);
        setTimeout(() => {
            setUpdateMealCountUI(false);
        }, 1000);
        return response.data;
    } catch (err) {
        showToast("Food Option cannot be added", "fail");
    }
};

export const HandleDeleteProduct = async (
    productId,
    setShowUI,
    setUpdateProductUI
) => {
    try {
        const response = await axios.post(USER_URL.deleteproduct, {
            productId: productId,
        });
        if (response.status === 200) {
            showToast("Product deleted succesfully!", "success");
            setShowUI("");
            setShowUI("showproduct");
            setUpdateProductUI(true);
            setTimeout(() => {
                setUpdateProductUI(false);
            }, 1000);
        }
    } catch (err) {
        showToast("Product cannot be deleted", "fail");
    }
};

export const HandleDeleteMeal = async (mealId, setShowUI, setUpdateMealUI) => {
    try {
        const response = await axios.post(USER_URL.deletemeal, {
            mealId: mealId,
        });
        if (response.status === 200) {
            showToast("Meal deleted succesfully!", "success");
            setShowUI("showmeal");
            setUpdateMealUI(true);
            setTimeout(() => {
                setUpdateMealUI(false);
            }, 1000);
        }
    } catch (err) {
        showToast("Meal cannot be deleted", "fail");
    }
};

export const HandleDeleteCombo = async (
    comboId,
    setShowUI,
    setUpdateComboUI
) => {
    try {
        const response = await axios.post(USER_URL.deletecombo, {
            comboId: comboId,
        });
        if (response.status === 200) {
            showToast("Combo deleted succesfully!", "success");
            setShowUI("showcombo");
            setUpdateComboUI(true);
            setTimeout(() => {
                setUpdateComboUI(false);
            }, 1000);
        }
    } catch (err) {
        showToast("Combo cannot be deleted", "fail");
    }
};

export const HandleDeleteMealCount = async (
    mealCountId,
    setShowUI,
    setUpdateMealCountUI
) => {
    try {
        const response = await axios.post(USER_URL.deletemealcount, {
            mealCountId: mealCountId,
        });
        if (response.status === 200) {
            showToast("Meal Count deleted succesfully!", "success");
            setShowUI("showmealcount");
            setUpdateMealCountUI(true);
            setTimeout(() => {
                setUpdateMealCountUI(false);
            }, 1000);
        }
    } catch (err) {
        showToast("Meal Count cannot be deleted", "fail");
    }
};

export const HandleDeleteFoodOption = async (
    foodOptionId,
    setShowUI,
    setUpdateMealCountUI
) => {
    try {
        const response = await axios.post(USER_URL.deletefoodoption, {
            foodOptionId: foodOptionId,
        });
        if (response.status === 200) {
            showToast("Food Option deleted succesfully!", "success");
            setShowUI("showmealcount");
            setUpdateMealCountUI(true);
            setTimeout(() => {
                setUpdateMealCountUI(false);
            }, 1000);
        }
    } catch (err) {
        showToast("Food Option cannot be deleted", "fail");
    }
};

export const HandleDeleteMenu = async (menuId, setShowUI, setUpdateMenuUI) => {
    try {
        const response = await axios.post(USER_URL.deletemenu, {
            menuId: menuId,
        });
        if (response.status === 200) {
            showToast("Menu deleted succesfully!", "success");
            setShowUI("showmenu");
            setUpdateMenuUI(true);
            setTimeout(() => {
                setUpdateMenuUI(false);
            }, 1000);
        }
    } catch (err) {
        showToast("Menu cannot be deleted", "fail");
    }
};

export const HandleGetUsers = async () => {
    try {
        const response = await axios.get(USER_URL.getusers, {});
        return response.data;
    } catch (err) {
        showToast("Server Error!", "fail");
    }
};

export const HandleGrantRole = async (
    userId,
    role,
    setShowUI,
    setUpdateUserInfo
) => {
    try {
        const response = await axios.post(USER_URL.grantrole, {
            userId: userId,
            role: role,
        });
        if (response.status === 200) {
            showToast("Role Updated", "success");
            setShowUI("usersinfo");
            setUpdateUserInfo(true);
            setTimeout(() => {
                setUpdateUserInfo(false);
            }, 1000);
        }
        return response.data;
    } catch (err) {
        showToast("Server Error!", "fail");
    }
};

export const HandleRevokeRole = async (
    userId,
    setShowUI,
    setUpdateUserInfo
) => {
    try {
        const response = await axios.post(USER_URL.revokerole, {
            userId: userId,
        });
        if (response.status === 200) {
            showToast("Role Updated", "success");
            setShowUI("adminsinfo");
            setUpdateUserInfo(true);
            setTimeout(() => {
                setUpdateUserInfo(false);
            }, 1000);
        }
        return response.data;
    } catch (err) {
        showToast("Server Error!", "fail");
    }
};
