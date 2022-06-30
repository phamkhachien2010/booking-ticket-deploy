import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { datGheaction, datVeAction, layChiTietPhongVeAction } from '../../redux/actions/QuanLyDatVeAction';
import checkOutStyle from './CheckOut.module.css'
import './CheckOut.css';
import { CHANGE_TAB_ACTIVE, CHUYEN_TAB_DAT_VE, DAT_GHE } from '../../redux/Types/CarouselConst';
import _ from 'lodash'
import { Dropdown, Menu, Tabs } from 'antd';
import { layThongTinTaiKhoan } from '../../redux/actions/QuanLyNguoiDungAction';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import { connection } from '../..';
import { history } from '../../App';
import { TOKEN, USER_LOGIN } from '../../util/setting/config';
import { LogoutOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;


function CheckOutChonGhe(props) {

  const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
  const { chiTietPhongVe, danhSachGheDangDat, danhSachGheKhachDangDat } = useSelector(state => state.QuanlyDatVeReducer)

  const dispatch = useDispatch()

  useEffect(() => {
    const { id } = props.match.params

    dispatch(layChiTietPhongVeAction(id));

    connection.on('datVeThanhCong', () => {
      dispatch(layChiTietPhongVeAction(id))
    })

    //Vừa vào trang load tất cả ghế người khác đang đặt
    connection.invoke("loadDanhSachGhe", id)

    //load danhSachGheDangDat Từ server
    connection.on("loadDanhSachGheDaDat", (dsGheKhachDat) => {
      //bước 1 loại mình ra khỏi dsGheKhachDat
      dsGheKhachDat = dsGheKhachDat.filter(item => item.taiKhoan !== userLogin.taiKhoan);

      //Bước 2 gộp dsSachGheKhachDat ở tất cả user thành 1 mảng chung
      let arrGheKhachDat = dsGheKhachDat.reduce((result, item, index) => {
        let arrGhe = JSON.parse(item.danhSachGheDangDat)

        return [...result, ...arrGhe]
      }, [])

      //Đưa dữ liệu khách đặt cập nhật lên reducer
      arrGheKhachDat = _.uniqBy(arrGheKhachDat, 'maGhe')

      dispatch({
        type: DAT_GHE,
        danhSachGheKhachDangDat: arrGheKhachDat
      })

    })

    //Cài đặt sự kiện reload trang
    window.addEventListener("beforeunload", clearGhe)

    return () => {
      clearGhe();
      window.removeEventListener('beforeunload', clearGhe)
    }
  }, [])

  const clearGhe = function (event) {
    connection.invoke("huyDat", userLogin.taiKhoan, props.match.params.id)
  }

  const { danhSachGhe, thongTinPhim } = chiTietPhongVe;

  const renderGhe = () => {
    return danhSachGhe.map((ghe, index) => {

      const classGheVip = ghe.loaiGhe === 'Vip' ? 'gheVip' : ''
      const classGheDaDat = ghe.daDat ? 'gheDaDat' : ''

      let classGheDangDat = ''
      let indexGheDangDat = danhSachGheDangDat.findIndex(gheDangDat => gheDangDat.maGhe === ghe.maGhe);
      if (indexGheDangDat !== -1) {
        classGheDangDat = 'gheDangDat'
      }

      let classGheUserDat = ghe.taiKhoanNguoiDat === userLogin.taiKhoan ? 'gheUser' : ''

      //kiểm tra từng ghế có phải là ghế người khác đang đặt hay ko
      let classGheKhachDat = ''
      let indexGheKhachDat = danhSachGheKhachDangDat.findIndex(gheKhachDat => gheKhachDat.maGhe === ghe.maGhe)
      if (indexGheKhachDat !== -1) {
        classGheKhachDat = 'gheKhachDat'
      }

      return <Fragment key={index}> <button onClick={() => {
        dispatch(datGheaction(ghe, props.match.params.id))
      }} disabled={ghe.daDat || classGheKhachDat !== ''} className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheUserDat} ${classGheKhachDat}`}>

        {ghe.daDat ? classGheUserDat !== '' ? <i className="fa fa-dragon"></i> : <i className="fa fa-check" /> : classGheKhachDat !== '' ? <i className="fa fa-smile-wink"></i> : ghe.tenGhe}

      </button>
        {(index + 1) % 16 === 0 ? <br /> : ''}
      </Fragment>
    })
  }

  return (
    <div className='container-fluid text-lg'>
      <div className='grid grid-cols-3'>
        <div className='col-span-2 container mt-5'>
          <div className='bg-black h-3 w-4/5 m-auto'></div>
          <div className={checkOutStyle.trapezoid} style={{ margin: 'auto' }}></div>
          <h3 className='text-center w-4/5 -mt-10 mx-auto'>Màn Hình</h3>

          <div className='mt-5 text-center'>
            {renderGhe()}
          </div>

          <div>
            <table className='w-full text-center mt-5'>
              <thead>
                <tr>
                  <th>Ghế chưa đặt</th>
                  <th>Ghế đã đặt</th>
                  <th>Ghế vip</th>
                  <th>Ghế bạn đang đặt</th>
                  <th>Ghế người khác đang đặt</th>
                  <th>Ghế bạn đã đặt</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><button className='ghe'><i className="fa fa-cross"></i></button></td>
                  <td><button className='ghe gheDaDat'><i className="fa fa-cross"></i></button></td>
                  <td><button className='ghe gheVip'><i className="fa fa-cross"></i></button></td>
                  <td><button className='ghe gheDangDat'><i className="fa fa-cross"></i></button></td>
                  <td><button className='ghe gheKhachDat'><i className="fa fa-cross"></i></button></td>
                  <td><button className='ghe gheUser'><i className="fa fa-cross"></i></button></td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>

        <div className='py-20 pr-5' style={{ overflow: 'auto' }}>
          <div>
            <h3 className='text-xl font-bold'>{thongTinPhim.tenPhim}</h3>
            <p>Địa Điểm: {thongTinPhim.diaChi} - {thongTinPhim.tenRap}</p>
            <p>Ngày chiếu: {thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu}</p>
            <hr />

            <table className='table w-full text-center'>
              <thead>
                <tr>
                  <th>Số thứ tự</th>
                  <th>Số ghế</th>
                  <th>Loại ghế</th>
                  <th>Giá vé</th>
                </tr>
              </thead>

              <tbody>

                {_.sortBy(danhSachGheDangDat, ['tenGhe']).map((gheDangDat, index) => {
                  return <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{gheDangDat.tenGhe}</td>
                    <td>{gheDangDat.loaiGhe}</td>
                    <td className='text-right'>{gheDangDat.giaVe.toLocaleString()} đ</td>
                  </tr>
                })}

              </tbody>
              <tfoot>
                <tr>
                  <th>Tổng cộng</th>
                  <th>{_.size(danhSachGheDangDat)}</th>
                  <th></th>
                  <th className='text-right text-green-600'>{danhSachGheDangDat.reduce((tongTien, ghe, index) => {
                    return tongTien += ghe.giaVe
                  }, 0).toLocaleString()} đ</th>
                </tr>
              </tfoot>
            </table>

            <hr />

            <div>
              <div>
                <p>Email: {userLogin.email}</p>

              </div>
              <div>
                <p>Điện thoại: {userLogin.soDT}</p>

              </div>
            </div>
            <hr />
          </div>
          <div className='mt-5 bg-blue-400 rounded py-3 text-center text-3xl cursor-pointer hover:text-white hover:bg-blue-600 transition duration-300' onClick={() => {
            const thongTinDatVe = {
              maLichChieu: props.match.params.id,
              danhSachVe: danhSachGheDangDat
            }
            dispatch(datVeAction(thongTinDatVe))
          }}>Đặt vé</div>
        </div>
      </div>

    </div>
  )
}

function KetQuaDatVe(props) {

  const { thongTinTaiKhoan } = useSelector(state => state.QuanLyNguoiDungReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(layThongTinTaiKhoan())

    return () => {

    }
  }, [])

  const { thongTinDatVe } = thongTinTaiKhoan

  const renderThongTinTaiKhoan = () => {
    return thongTinDatVe.map((taiKhoan, index) => {
      return <div className="p-4 lg:w-1/2" key={index}>
        <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
          <img src={taiKhoan.hinhAnh} className='w-32' alt="" />
          <div className="flex-grow sm:pl-8 text-left">
            <h2 className="title-font font-medium text-lg text-gray-900">{taiKhoan.tenPhim}</h2>
            <h3 className="text-gray-500 mb-3">Thời lượng phim: {taiKhoan.thoiLuongPhim} phút</h3>
            <h3 className="text-gray-500 mb-3">Giá vé: {taiKhoan.giaVe.toLocaleString()} đ</h3>

            <h3 className="text-gray-500 mb-3">Ghế: {_.sortBy(taiKhoan.danhSachGhe, ['tenGhe']).map((ghe, index) => {
              return <span key={index}>{ghe.tenGhe} </span>
            })}</h3>
            <h3 className="text-gray-500 mb-3">Tổng tiền: {(_.size(taiKhoan.danhSachGhe) * taiKhoan.giaVe).toLocaleString()} đ</h3>
            <h3 className="text-gray-500 mb-3">Địa điểm: {_.first(taiKhoan.danhSachGhe).tenHeThongRap} - {_.first(taiKhoan.danhSachGhe).tenCumRap}</h3>
            <h3 className="text-gray-500 mb-3">Thời gian đặt: {moment(taiKhoan.ngayDat).format('hh:mm - DD/MM/YY')}</h3>
            <span className="inline-flex">

            </span>
          </div>
        </div>
      </div>
    })
  }

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-5 mx-auto">
          <div className="flex flex-col text-center w-full mb-10">
            <h1 className="text-2xl font-bold title-font mb-2 text-gray-900 tracking-widest">LỊCH SỬ ĐẶT VÉ</h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-xl">Thông tin phim đã đặt</p>
          </div>
          <div className="flex flex-wrap -m-4">

            {renderThongTinTaiKhoan()}

          </div>
        </div>
      </section>

    </div>
  )
}


export default function CheckOut(props) {

  const { tabActive } = useSelector(state => state.QuanlyDatVeReducer);
  const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)
  const dispatch = useDispatch()

  const menu = (<Menu>
    < Menu.Item key='1'>
      <div className='grid grid-cols-4 grid-rows-3 grid-flow-col cursor-default'>
        <span className='text-black rounded-full px-3 py-2 bg-blue-500 row-span-2 flex justify-center items-center' style={{ width: '50px' }}><span className='text-black text-xl'>{_.first(userLogin?.hoTen)}</span></span>
        <span></span>
        <span className='col-span-3 ml-2 text-lg font-bold'>{userLogin.hoTen}</span>
        <span className='col-span-3 ml-2 text-lg'>{userLogin.taiKhoan}</span>
        <span className='col-span-3 ml-2 text-lg cursor-pointer text-blue-500'>
          <NavLink to='/profile'>Quản lý tài khoản</NavLink>
        </span>
      </div>
    </ Menu.Item>
    <Menu.Item key='2'>
      <div className='grid grid-cols-3 items-center text-lg'
        onClick={() => {
          localStorage.removeItem(USER_LOGIN);
          localStorage.removeItem(TOKEN);
          history.push('/');
          window.location.reload()
        }}><LogoutOutlined /><span>Đăng xuất</span></div>
    </Menu.Item>

  </Menu >
  );

  const operations = <Dropdown overlay={menu} placement="bottomLeft" arrow>
    <div className='mr-5'>
      <div className='text-white px-3 py-2 block bg-blue-500 rounded-full cursor-pointer'><span className='text-black text-xl' style={{ width: '50px', height: '50px' }}>{_.first(userLogin.hoTen)}</span></div>
    </div>
  </Dropdown>

  const handleChange = (key) => {
    dispatch({
      type: CHANGE_TAB_ACTIVE,
      tab: key
    })
  }

  return (
    <div>
      <Tabs activeKey={tabActive} onChange={handleChange} tabBarExtraContent={operations}>
        <TabPane tab="01 Chọn ghế - Thanh toán" key="1" >
          <CheckOutChonGhe {...props} />
        </TabPane>
        <TabPane tab="02 Kết quả đặt vé" key="2">
          <KetQuaDatVe {...props} />
        </TabPane>

      </Tabs>
      <div className="w-full p-3 mt-5 flex justify-center items-center space-x-3 text-[14px] font-medium text-[#666]">
        <div>
          <NavLink to="/" className="hover:underline underline-offset-1 text-black mx-2 cursor-pointer">Home</NavLink>
          <NavLink to="/" target="_blank" className="hover:underline underline-offset-1 text-black mx-2 cursor-pointer">Privacy</NavLink>
          <NavLink to="/" target="_blank" className="hover:underline underline-offset-1 text-black mx-2 cursor-pointer">Legal</NavLink>
          <NavLink to="/" target="_blank" className="hover:underline underline-offset-1 text-black mx-2 cursor-pointer">Policy </NavLink>
          <NavLink to="/" target="_blank" className="hover:underline underline-offset-1 text-black mx-2 cursor-pointer">Worldwide </NavLink>
        </div>

      </div>
    </div>
  )
};