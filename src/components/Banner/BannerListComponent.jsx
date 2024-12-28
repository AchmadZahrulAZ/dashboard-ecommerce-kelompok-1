import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DropdownIcon from '../../assets/icons/rating/DropdownBig.svg';
import FilterIcon from '../../assets/icons/rating/Filter.svg';
import Right from '../../assets/icons/rating/Right.svg';
import PaginationChevronDownIcon from '../../assets/icons/rating/PaginationChevronDown.svg';
import PaginationChevronLeftIcon from '../../assets/icons/rating/PaginationChevronLeft.svg';
import PaginationChevronRightIcon from '../../assets/icons/rating/PaginationChevronRight.svg';
import DummyBanner from '../../assets/images/banner/DummyBanner.png';
import DetailIcon from '../../assets/icons/product/SolidEye.svg';
import EditIcon from '../../assets/icons/product/SolidPencil.svg';
import DeleteIcon from '../../assets/icons/product/SolidTrash.svg';
import Swal from 'sweetalert2';

const BannerListComponent = () => {
  const [banners, setBanners] = useState([
    {
      id: 1,
      bannerPicture: DummyBanner,
      bannerName: 'Promosi Akhir Tahun',
      targetURL: 'www.e-commerce.com',
      releaseDate: '09/11/2024',
      endDate: '12/11/2024',
      published: true,
    },
    {
      id: 2,
      bannerPicture: DummyBanner,
      bannerName: 'Produk Baru',
      targetURL: 'www.e-commerce.com',
      releaseDate: '08/11/2024',
      endDate: '11/11/2024',
      published: false,
    },
    {
      id: 3,
      bannerPicture: DummyBanner,
      bannerName: 'Diskon 30%',
      targetURL: 'www.e-commerce.com',
      releaseDate: '07/11/2024',
      endDate: '10/11/2024',
      published: false,
    },
    {
      id: 4,
      bannerPicture: DummyBanner,
      bannerName: 'Giveaway',
      targetURL: 'www.e-commerce.com',
      releaseDate: '03/11/2024',
      endDate: '09/11/2024',
      published: false,
    },
  ]);

  const handleSwitchChange = (bannerId, newPublishedValue) => {
    setBanners((prevBanners) => prevBanners.map((banner) => (banner.id === bannerId ? { ...banner, published: newPublishedValue } : banner)));

    // confirmation alert
    if (!newPublishedValue) {
      Swal.fire({
        title: 'Confirmation',
        text: 'Are you sure want to unpublish this banner? ',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Yes',
        customClass: {
          title: 'my-title-class',
          cancelButton: 'swal2-cancel-outline',
          confirmButton: 'swal2-confirm-no-outline',
        },
      }).then((result) => {
        if (!result.isConfirmed) {
          setBanners((prevBanners) => prevBanners.map((banner) => (banner.id === bannerId ? { ...banner, published: true } : banner)));
        }
      });
    }
  };

  return (
    <div className="container">
      <div className="p-10 card">
        {/* Title Section */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-lato font-bold text-[#030406] text-2xl">Banner Management</h2>
            <div className="flex items-center text-sm font-lato text-[#DB4444] mt-2">
              <span>Home</span>
              <img src={PaginationChevronRightIcon} alt="Chevron" className="mx-2" />
              <span className="font-semibold">Banner Management</span>
            </div>
          </div>
          <Link to="/banner/add" className="py-2 btn btn-danger">
            Add New Banner
          </Link>
        </div>

        {/* Second Row */}
        <div className="flex items-center space-x-4 mt-6">
          <div className="flex items-center w-[250px] h-[40px] border rounded-md">
            <input type="text" placeholder="Select Filter" className="w-full px-4 text-sm outline-none" />
            <img src={DropdownIcon} alt="Dropdown" className="mr-4" />
          </div>
        </div>

        {/* Third Row: Titles and Data */}
        <div className="mt-4 table-responsive">
          {/* Title Row */}
          <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr] text-[#111111] font-lato font-bold text-sm py-2">
            <div className="flex items-center space-x-2 px-2">
              Banner Picture
              <img src={FilterIcon} alt="Filter" className="w-2 ml-2" />
            </div>
            <div className="flex items-center space-x-2 px-2">
              Banner Name
              <img src={FilterIcon} alt="Filter" className="w-2 ml-2" />
            </div>
            <div className="flex items-center space-x-2 px-2">
              Target URL
              <img src={FilterIcon} alt="Filter" className="w-2 ml-2" />
            </div>
            <div className="flex items-center space-x-2 px-2">
              Release Date
              <img src={FilterIcon} alt="Filter" className="w-2 ml-2" />
            </div>
            <div className="flex items-center space-x-2 px-2">
              End Date
              <img src={FilterIcon} alt="Filter" className="w-2 ml-2" />
            </div>
            <div className="flex items-center space-x-2 px-2">
              Published
              <img src={FilterIcon} alt="Filter" className="w-2 ml-2" />
            </div>
            <div className="flex items-center space-x-2 px-2">Action</div>
          </div>

          {/* Data Rows */}
          {banners.map((item) => (
            <div key={item.id} className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr] items-center text-sm py-4 border-b border-[#DBDCDE]">
              <div className="px-2">
                <img src={item.bannerPicture} alt="Profile" className="w-[50px] h-[37.4px] rounded-sm" />
              </div>
              <div className="px-2">{item.bannerName}</div>
              <div className="px-2">{item.targetURL}</div>
              <div className="px-2">{item.releaseDate}</div>
              <div className="px-2">{item.endDate}</div>
              <td>
                <div className=" form-check form-switch custom-switch form-switch-success">
                  <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked={banners.published} onChange={(e) => handleSwitchChange(banners.id, e.target.checked)} />
                </div>
              </td>
              <td>
                <div className="flex gap-2">
                  {/* Detail Button */}
                  <Link to="/banner/detail/:id">
                    <button>
                      <img src={DetailIcon} alt="Detail" />
                    </button>
                  </Link>

                  {/* Edit Button */}
                  <Link to="/banner/edit/:id">
                    <button>
                      <img src={EditIcon} alt="Edit" />
                    </button>
                  </Link>

                  {/* Delete Button */}
                  <button>
                    <img src={DeleteIcon} alt="Delete" />
                  </button>
                </div>
              </td>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6 text-sm text-[#687182]">
          <span>1-20 of 27</span>
          <div className="flex items-center space-x-4">
            <span>Rows per page: 20</span>
            <img src={PaginationChevronDownIcon} alt="Dropdown" />
            <div className="flex items-center space-x-1">
              <button className="w-[24px] h-[20px] rounded-md bg-white flex items-center justify-center">
                <img src={PaginationChevronLeftIcon} alt="Previous" />
              </button>
              <span className="text-[#687182]">1/2</span>
              <button className="w-[24px] h-[20px] rounded-md bg-white flex items-center justify-center">
                <img src={PaginationChevronRightIcon} alt="Next" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerListComponent;

