import { GROUPID } from "../util/setting/config"
import { baseService } from "./baseService"


export class QuanLyRapService extends baseService {
    constructor() {
        super()
    }

    layThongTinLichChieuHeThongRap = () => {
        return this.get(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUPID}`)
    }

    layThongTinHeThongRap = (ma) => {
        return this.get(`/api/QuanLyRap/LayThongTinHeThongRap?maHeThongRap=${ma}`)
    }

    layThongTinLichChieuPhim = (maPhim) => {
        return this.get(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`)
    }

    layThongTinCumRapTheoHeThong = (maHeThongRap)=>{
        return this.get(`/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`)
    }
    

}

export const quanLyRapService = new QuanLyRapService()