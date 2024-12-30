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

const BannerListComponent = ({ banners, setBanners }) => {
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
    // 1) Immediately update the published state
    setBanners((prevBanners) =>
      prevBanners.map((banner) =>
        banner.id === bannerId ? { ...banner, published: newPublishedValue } : banner
      )
    );
  
    // 2) If user just switched to UNPUBLISHED
    if (!newPublishedValue) {
      Swal.fire({
        title: 'Confirmation',
        text: 'Are you sure want to unpublish this banner?',
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
        // 2a) If user clicked "No" => revert back to "published: true"
        if (!result.isConfirmed) {
          setBanners((prevBanners) =>
            prevBanners.map((banner) =>
              banner.id === bannerId ? { ...banner, published: true } : banner
            )
          );
        } else {
          // 2b) If user clicked "Yes" => show success alert
          Swal.fire({
            title: 'This banner was successfully unpublished',
            icon: 'success',
            customClass: {
              title: 'text-2xl font-bold',
            },
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    }
  };
  

  const handleDelete = (bannerId) => {
    Swal.fire({
      title: "Delete Banner?",
      text: "Are you sure want to delete this banner?",
      icon: "warning",
      iconHtml: `<i class="bi bi-trash"></i>`,
      customClass: {
        title: "my-title-class",
        cancelButton: "swal2-cancel-outline",
        confirmButton: "swal2-confirm-no-outline",
      },
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonText: "No",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        setBanners((prevBanners) => prevBanners.filter((b) => b.id !== bannerId));
        Swal.fire({
          title: "This banner was successfully deleted",
          icon: "success",
          customClass: {
            title: "text-2xl font-bold",
          },
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
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
                <img src={item.bannerPhoto || DummyBanner} alt="Profile" className="w-[50px] h-[37.4px] rounded-sm" />
              </div>
              <div className="px-2">{item.bannerName}</div>
              <div className="px-2">{item.targetURL}</div>
              <div className="px-2">{item.releaseDate}</div>
              <div className="px-2">{item.endDate}</div>
              <div className="form-check form-switch custom-switch form-switch-success">
                <input className="form-check-input" type="checkbox" role="switch" checked={item.published} onChange={(e) => handleSwitchChange(item.id, e.target.checked)} />
              </div>
              <div className="flex gap-2">
                <Link to={"/banner/detail/" + item.id}>
                  <button>
                    <img src={DetailIcon} alt="Detail" />
                  </button>
                </Link>
                <Link to={"/banner/edit/" + item.id}>
                  <button>
                    <img src={EditIcon} alt="Edit" />
                  </button>
                </Link>
                <button onClick={() => handleDelete(item.id)}>
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

