import Home from "../../pages/Home";
import Login from "../../pages/Login";

export const userRoutes = [
    {
        path: "/",
        Element: Home,
        hasLayout: false,
        isPrivate: false,
    },
    {
        path: "/login",
        Element: Login,
        hasLayout: false,
        isPrivate: false,
    }
];