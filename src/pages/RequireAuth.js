import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({allowedRoles}) => {
    const { auth } = useAuth();
    const location = useLocation();
    // const result = auth?.roles?.cache.find(role => allowedRoles?.includes(role));
    // console.log(result);

    return (
        // auth?.roles?.find(role => allowedRoles?.includes(role))
        (auth?.roles===allowedRoles?.find(role => role===auth?.roles))
            ? <Outlet />
            : auth?.email
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/loginadm" state={{ from: location }} replace />
    );
}

export default RequireAuth;