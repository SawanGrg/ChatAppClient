import React, { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserWrapper from './user/userWrapper';
import allChatRoutes from './allChatRoutes';

const UserRouteWrapper = ({ route, children }) => {
    const AppLayoutWrapper = Fragment;
    const PrivateLayoutWrapper = route.isPrivate ? UserWrapper : Fragment;

    return (
        <PrivateLayoutWrapper>
            <AppLayoutWrapper>
                {children}
            </AppLayoutWrapper>
        </PrivateLayoutWrapper>
    );
};

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                {allChatRoutes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        element={
                            <UserRouteWrapper route={route}>
                                <route.Element />
                            </UserRouteWrapper>
                        }
                    />
                ))}
            </Routes>
        </BrowserRouter>
    );
}
