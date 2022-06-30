import { createBrowserHistory } from "history";
import { Route, Router, Switch } from "react-router-dom";
import Loading from "./Component/Loading/Loading";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import Addnew from "./pages/Admin/Films/Addnew/Addnew";
import Edit from "./pages/Admin/Films/Edit/Edit";
import Films from "./pages/Admin/Films/Films";
import QuanLyNguoiDung from "./pages/Admin/QuanLyNguoiDung/QuanLyNguoiDung";
import SuaNguoiDung from "./pages/Admin/QuanLyNguoiDung/SuaNguoiDung/SuaNguoiDung";
import ThemNguoiDung from "./pages/Admin/QuanLyNguoiDung/ThemNguoiDung/ThemNguoiDung";
import ShowTime from "./pages/Admin/ShowTime/ShowTime";
import CheckOut from "./pages/Checkout/CheckOut";
import Contact from "./pages/Contact/Contact";
import Detail from "./pages/Detail/Detail";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import News from "./pages/News/News";
import Profile from "./pages/profile/Profile";
import Register from "./pages/Register/Register";
import StartSignUp from "./pages/Register/StartSignUp";
import { AdminTemplate } from "./templates/AdminTemplate/AdminTemplate";
import { CheckOutTemplate } from "./templates/CheckOutTemplate/CheckOutTemplate";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import { UserTemplate } from "./templates/UserTemlate/UserTemplate";

export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Loading />
      <Switch>
        <HomeTemplate path="/home" exact Component={Home} />
        <HomeTemplate path="/contact" exact Component={Contact} />
        <HomeTemplate path="/news" exact Component={News} />
        <HomeTemplate path="/detail/:id" exact Component={Detail} />

        <CheckOutTemplate path='/checkOut/:id' exact Component={CheckOut} />

        <UserTemplate path="/login" exact Component={Login} />
        <UserTemplate path="/register" exact Component={Register} />
        <UserTemplate path="/signUp" exact Component={StartSignUp} />

        <HomeTemplate path='/profile' exact Component={Profile} />

        <AdminTemplate path='/admin' exact Component={QuanLyNguoiDung} />
        <AdminTemplate path='/admin/films' exact Component={Films} />
        <AdminTemplate path='/admin/films/addnew' exact Component={Addnew} />
        <AdminTemplate path='/admin/films/edit/:id' exact Component={Edit} />
        <AdminTemplate path='/admin/films/showtime/:id/:tenPhim' exact Component={ShowTime} />
        <AdminTemplate path='/admin/user' exact Component={Dashboard} />
        <AdminTemplate path='/admin/quanLyUser' exact Component={QuanLyNguoiDung} />
        <AdminTemplate path='/admin/quanLyUser/editUser/addUser' exact Component={ThemNguoiDung} />
        <AdminTemplate path='/admin/quanLyUser/editUser/:id' exact Component={SuaNguoiDung} />

        <HomeTemplate path="/" exact Component={Home} />
      </Switch>
    </Router>

    // <div className="App">

    // </div>
  );
}

export default App;
