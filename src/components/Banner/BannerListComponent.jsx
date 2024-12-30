import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import DropdownIcon from '../../assets/icons/rating/DropdownBig.svg';
import FilterIcon from '../../assets/icons/rating/Filter.svg';
import SortIcon from '../../assets/icons/product/SortIcon.svg';
import SortActiveIcon from '../../assets/icons/product/SortIconActive.svg';
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

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const totalPages = Math.ceil(banners.length / itemsPerPage);

  const paginatedBanners = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage;
    return banners.slice(startIndex, endIndex);
  }, [banners, currentPage, itemsPerPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleSwitchChange = (bannerId, newPublishedValue) => {
    setBanners((prevBanners) => prevBanners.map((banner) => (banner.id === bannerId ? { ...banner, published: newPublishedValue } : banner)));

    if (!newPublishedValue) {
      Swal.fire({
        title: 'Confirmation',
        text: 'Are you sure want to unpublish this banner?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Yes',
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
        {/* Header */}
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

        {/* Filter */}
        <div className="flex items-center space-x-4 mt-6">
          <div className="flex items-center w-[250px] h-[40px] border rounded-md">
            <input type="text" placeholder="Select Filter" className="w-full px-4 text-sm outline-none" />
            <img src={DropdownIcon} alt="Dropdown" className="mr-4" />
          </div>
        </div>

        {/* Table */}
        <div className="mt-4 table-responsive">
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

          {paginatedBanners.map((item) => (
            <div key={item.id} className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr] items-center text-sm py-4 border-b border-[#DBDCDE]">
              <div className="px-2">
                <img src={item.bannerPicture} alt="Profile" className="w-[50px] h-[37.4px] rounded-sm" />
              </div>
              <div className="px-2">{item.bannerName}</div>
              <div className="px-2">{item.targetURL}</div>
              <div className="px-2">{item.releaseDate}</div>
              <div className="px-2">{item.endDate}</div>
              <div className="form-check form-switch custom-switch form-switch-success">
                <input className="form-check-input" type="checkbox" role="switch" checked={item.published} onChange={(e) => handleSwitchChange(item.id, e.target.checked)} />
              </div>
              <div className="flex gap-2">
                <Link to="/banner/detail/:id">
                  <button>
                    <img src={DetailIcon} alt="Detail" />
                  </button>
                </Link>
                <Link to="/banner/edit/:id">
                  <button>
                    <img src={EditIcon} alt="Edit" />
                  </button>
                </Link>
                <button>
                  <img src={DeleteIcon} alt="Delete" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-between mt-6 text-sm text-[#687182]">
          {/* Left Section: Displaying data range */}
          <div>
            <span>
              {currentPage * itemsPerPage - (itemsPerPage - 1)}-{Math.min(currentPage * itemsPerPage, banners.length)} of {banners.length}
            </span>
          </div>

          {/* Right Section: Pagination controls and Rows per page */}
          <div className="flex items-center space-x-4">
            {/* Dropdown Rows per page */}
            <div className="flex items-center space-x-1">
              <span>Rows per page:</span>
              <select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))} className="w-[50px] text-center border border-[#3C4858] rounded-md">
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center space-x-2">
              {/* Previous Page Button */}
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={`w-[24px] h-[24px] rounded-[6px] flex items-center justify-center border ${currentPage === 1 ? 'border-[#3C4858] bg-[#F7F9FC] cursor-not-allowed' : 'border-[#3C4858] bg-[#FFFFFF] hover:bg-[#EDEFF3]'}`}
              >
                <img src={PaginationChevronLeftIcon} alt="Previous" className={currentPage === 1 ? 'opacity-50' : 'opacity-100'} />
              </button>

              {/* Current Page and Total Pages */}
              <span className="font-medium">
                {currentPage}/{totalPages}
              </span>

              {/* Next Page Button */}
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`w-[24px] h-[24px] rounded-[6px] flex items-center justify-center border ${currentPage === totalPages ? 'border-[#3C4858] bg-[#F7F9FC] cursor-not-allowed' : 'border-[#3C4858] bg-[#FFFFFF] hover:bg-[#EDEFF3]'}`}
              >
                <img src={PaginationChevronRightIcon} alt="Next" className={currentPage === totalPages ? 'opacity-25' : 'opacity-50'} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerListComponent;

