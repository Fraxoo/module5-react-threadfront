import { Outlet } from "react-router";
import NavBarComponent from "./NavBarComponent";

export default function AppLayout() {
    return (
        <>
            <Outlet />
            <NavBarComponent />
        </>
    )
}