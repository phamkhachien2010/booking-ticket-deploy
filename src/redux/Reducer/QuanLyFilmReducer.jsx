import { LAY_THONG_TIN_PHIM, SET_CHI_TIET_PHIM, SET_FILM_DANG_CHIEU, SET_FILM_SAP_CHIEU, SET_LIST_FILM } from "../Types/CarouselConst"

const initialState = {
    arrFilm: [
        {
            "maPhim": 9590,
            "tenPhim": "Guardians of the Galaxy 1",
            "biDanh": "guardians-of-the-galaxy-1",
            "trailer": "https://www.youtube.com/embed/2LIQ2-PZBC8",
            "hinhAnh": "http://movieapi.cyberlearn.vn/hinhanh/guardians-of-the-galaxy-1-2014-_gp00.jpg",
            "moTa": "Năm 1980, sau khi mẹ qua đời, Peter Quill bị bắt khỏi Tr&aacute;i đất bởi Tộc Yondu Ravager, từ đ&oacute; anh trở th&agrave;nh đạo ch&iacute;ch với biệt danh Star-Lord. Quill t&igrave;m được một quả cầu, b&ecirc;n trong l&agrave; Vi&ecirc;n đ&aacute; Sức mạnh, nhưng rồi anh lại bị bắt ở h&agrave;nh tinh Xandar của Nova Corps. Tại đ&oacute; Quill gặp Gamora, Rocket Racoon, Groot, Drax v&agrave; c&ugrave;ng tho&aacute;t ra. Họ c&ugrave;ng nhau ngăn cản &acirc;m mưu của t&ecirc;n chiến binh Kree l&agrave; Ronan, kẻ muốn d&ugrave;ng quả cầu để hủy diệt Xandar.",
            "maNhom": "GP00",
            "ngayKhoiChieu": "2022-03-24T00:00:00",
            "danhGia": 6,
            "hot": true,
            "dangChieu": true,
            "sapChieu": true
        }
    ],
    arrFilmDefault: [],
    dangChieu: true,
    sapChieu: true,
    phimDetail: {},

    thongTinFilm: {}
}

export const QuanLyFilmReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_LIST_FILM: {
            state.arrFilm = action.arrFilm;
            state.arrFilmDefault = state.arrFilm
            return { ...state }
        }

        case SET_FILM_DANG_CHIEU: {
            if (state.dangChieu) {
                state.sapChieu = true
                state.arrFilm = state.arrFilmDefault.filter(film => film.dangChieu)
            } else {
                state.arrFilm = state.arrFilmDefault
            }
            state.dangChieu = !state.dangChieu

            return { ...state }
        }

        case SET_FILM_SAP_CHIEU: {
            if (state.sapChieu) {
                state.dangChieu = true
                state.arrFilm = state.arrFilmDefault.filter(film => film.sapChieu)
            } else {
                state.arrFilm = state.arrFilmDefault
            }
            state.sapChieu = !state.sapChieu
            return { ...state }
        }

        case SET_CHI_TIET_PHIM: {
            return { ...state, phimDetail: action.phimDetail }
        }

        case LAY_THONG_TIN_PHIM: {
            return { ...state, thongTinFilm: action.thongTinFilm }
        }

        default:
            return { ...state }
    }
}
