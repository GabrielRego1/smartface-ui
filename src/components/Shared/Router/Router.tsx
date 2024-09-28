import { Route, Routes } from "react-router-dom";
import Login from "../../Login/Login";
import CartList from "../../Cart/CartList/CartList";


const Router = () => {
    return (
        <Routes>
            <Route Component={Login} path="/" />
            <Route Component={CartList} path="/carts" />
        </Routes>
    );
}

export default Router;