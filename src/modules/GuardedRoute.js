import { Outlet, Navigate } from "react-router-dom";

const GuardedRoute = (isAutheticated) => {
    const isAuth = isAutheticated.isAutheticated;
    return isAuth != null ? <Outlet /> : <Navigate to="/" />;
}

export default GuardedRoute;