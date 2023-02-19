import React, { useState, createContext } from "react";
import { appContextType } from "./types";
import { pages } from "@/types/types";
import { createBrowserRouter } from "react-router-dom";
import { RocketLaunchIcon, WrenchIcon } from "@heroicons/react/20/solid";
import { SideBarItemProps } from "../../components/sidebar/types";

//importing routes
import Home from "../../routes/home";
import Settings from "../../routes/settings";
import { useEffect } from "react";

//create context for app of type
export const AppContext = createContext<appContextType>({
    currentPage: "Plotter",
    setCurrentPage: () => {},
    pages: [],
    appRouter: createBrowserRouter([]),
});


//context provider

type Props = {
    children: React.ReactNode;
};

export default function AppContextProvider({ children }: Props) {
    const [currentPage, setCurrentPage] = useState<pages>("Plotter");

    const pages: SideBarItemProps[] = [
        {
            label: "Plotter",
            icon: <RocketLaunchIcon />,
        },
        {
            label: "Settings",
            icon: <WrenchIcon />,
            bottom: true,
        },
    ];

    //TODO: make routeObject Array

    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
            children: [
                {
                    path: "/Plotter",
                    element: <Home />,
                },
            ],
        },
        {
            path: "/settings",
            element: <Settings />,
        },
    ]);

    useEffect(() => {
        //send the user to the current page
        appRouter.navigate(currentPage);
    }, [currentPage]);

    return (
        <AppContext.Provider
            value={{
                currentPage,
                setCurrentPage,
                pages,
                appRouter,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
