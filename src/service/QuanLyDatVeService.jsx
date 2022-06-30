import { ThongTinDatVe } from "../_cores/models/ThongTinDatVe";
import { baseService } from "./baseService";

export class QuanLyDatVeService extends baseService {
    constructor() {
        super()
    }

    layChiTietPhongve = (maLichChieu) => {
        return this.get(`/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`)
    }

    datVe = (thongTinDatVe = new ThongTinDatVe()) => {
        return this.post(`/api/QuanLyDatVe/DatVe`, thongTinDatVe)
    }

    taoLichChieu = (thongTinLichChieu) => {
        return this.post('/api/QuanLyDatVe/TaoLichChieu', thongTinLichChieu)
    }

}

export const quanLyDatVeService = new QuanLyDatVeService()