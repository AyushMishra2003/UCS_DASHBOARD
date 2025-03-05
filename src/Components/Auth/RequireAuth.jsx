import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { validUser } from "../../Redux/Slices/LoginSlice";

const RequireAuth = () => {
    const dispatch = useDispatch();
    const location = useLocation(); // ✅ Track Route Change
    const { isLoggedIn, role } = useSelector((state) => state?.auth1);
    const [isLoading, setIsLoading] = useState(true);
    
    const mainPath = location.pathname.split("/")[1];
    const modifiedUrl = mainPath.replace(/-/g, " ");  // e.g., "cab booking"

    console.log("main path is", modifiedUrl);
    console.log("role is", role);

    useEffect(() => {
        const handleUser = async () => {
            try {
                await dispatch(validUser()).unwrap();
            } catch (error) {
                console.error("Error in user validation:", error);
            } finally {
                setIsLoading(false);
            }
        };

        handleUser();
    }, [dispatch, location.pathname]); // ✅ Ensure API runs on route change

    console.log("Auth Status:", { isLoggedIn, isLoading });

    if (isLoading) return <div>Loading...</div>; // Prevent premature redirection

    // ✅ If user is NOT logged in, redirect to login
    if (!isLoggedIn) return <Navigate to="/login" state={{ from: location }} replace />;

    // ✅ If role does not have permission for the modified URL, show 501 Unauthorized
    const hasAccess = modifiedUrl === "" || role.some((item) => item.title.toLowerCase() === modifiedUrl.toLowerCase());
    if (!hasAccess) return <div style={{ textAlign: "center", marginTop: "20px", color: "red", fontSize: "20px" }}>501 Unauthorized</div>;

    // ✅ If user is logged in and has access, show the requested page
    return <Outlet />;
};

export default RequireAuth;
