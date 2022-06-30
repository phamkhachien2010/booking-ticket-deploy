import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { HomeCarouselReducer } from './Reducer/HomeCarouselReducer'
import { LoadingReducer } from "./Reducer/LoadingReducer";
import { QuanlyDatVeReducer } from "./Reducer/QuanLyDatVeReducer";
import { QuanLyFilmReducer } from "./Reducer/QuanLyFilmReducer";
import { QuanLyNguoiDungReducer } from "./Reducer/QuanLyNguoiDungReducer";
import { QuanLyRapReducer } from "./Reducer/QuanLyRapReducer";

const rootReducer = combineReducers({
    HomeCarouselReducer,
    QuanLyFilmReducer,
    QuanLyRapReducer,
    QuanLyNguoiDungReducer,
    QuanlyDatVeReducer,
    LoadingReducer
})


const store = createStore(rootReducer, applyMiddleware(thunk));

export default store