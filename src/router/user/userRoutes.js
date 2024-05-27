import Home from "../../pages/Home";
import Login from "../../pages/Login";
import PrivateChat from "../../pages/PrivateChat";

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
    },
    {
        path: "/privateChat/:receiverId",
        Element: PrivateChat,
        hasLayout: true,
        isPrivate: false,
    }
];