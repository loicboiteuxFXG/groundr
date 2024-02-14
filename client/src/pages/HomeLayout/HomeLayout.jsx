import {Link, Outlet, Route, Routes} from "react-router-dom";

const HomeLayout = () => {
    return (
        <>
            <h1>Page principale</h1>
            <Outlet/>
        </>
    )
        ;
}

export default HomeLayout;