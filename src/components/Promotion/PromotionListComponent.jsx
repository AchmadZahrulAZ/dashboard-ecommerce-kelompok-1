import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import DropdownIcon from '../../assets/icons/rating/DropdownBig.svg';
import FilterIcon from '../../assets/icons/rating/Filter.svg';
import PaginationChevronLeftIcon from '../../assets/icons/rating/PaginationChevronLeft.svg';
import PaginationChevronRightIcon from '../../assets/icons/rating/PaginationChevronRight.svg';
import DetailIcon from '../../assets/icons/product/SolidEye.svg';
import EditIcon from '../../assets/icons/product/SolidPencil.svg';
import DeleteIcon from '../../assets/icons/product/SolidTrash.svg';
import Swal from 'sweetalert2';

const PromotionListComponent = ({ promotions, setPromotions }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const totalPages = Math.ceil(promotions.length / itemsPerPage);

  const paginatedPromotions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage;
    return promotions.slice(startIndex, endIndex);
  }, [promotions, currentPage, itemsPerPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleSwitchChange = (promotionId, newPublishedValue) => {
    setPromotions(prevPromotions =>
      prevPromotions.map(p =>
        p.id === promotionId ? { ...p, published: newPublishedValue } : p
      )
    );

    if (!newPublishedValue) {
      Swal.fire({
        title: 'Confirmation',
        text: 'Are you sure want to unpublish this promotion?',
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
      }).then(result => {
        if (!result.isConfirmed) {
          // revert the published status back to true
          setPromotions(prevPromotions =>
            prevPromotions.map(p =>
              p.id === promotionId ? { ...p, published: true } : p
            )
          );
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
            <h2 className="font-lato font-bold text-[#030406] text-2xl">
              Promotion
            </h2>
            <div className="flex items-center text-sm font-lato text-[#DB4444] mt-2">
              <span>Home</span>
              <img
                src={PaginationChevronRightIcon}
                alt="Chevron"
                className="mx-2"
              />
              <span className="font-semibold">Promotion</span>
            </div>
          </div>
          <Link to="/promotion/add" className="py-2 btn btn-danger">
            Add New Promotion
          </Link>
        </div>

        {/* Filter (optional) */}
        <div className="flex items-center space-x-4 mt-6">
          <div className="flex items-center w-[250px] h-[40px] border rounded-md">
            <input
              type="text"
              placeholder="Select Filter"
              className="w-full px-4 text-sm outline-none"
            />
            <img src={DropdownIcon} alt="Dropdown" className="mr-4" />
          </div>
        </div>

        {/* Table */}
        <div className="mt-4 table-responsive">
          {/* Table Header */}
          <div className="grid grid-cols-[1.3fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] text-[#111111] font-lato font-bold text-sm py-2">
            <div className="flex items-center space-x-2 px-2">
              Promotion Name
              <img src={FilterIcon} alt="Filter" className="w-2 ml-2" />
            </div>
            <div className="flex items-center space-x-2 px-2">
              Product
              <img src={FilterIcon} alt="Filter" className="w-2 ml-2" />
            </div>
            <div className="flex items-center space-x-2 px-2">
              Start Date
              <img src={FilterIcon} alt="Filter" className="w-2 ml-2" />
            </div>
            <div className="flex items-center space-x-2 px-2">
              End Date
              <img src={FilterIcon} alt="Filter" className="w-2 ml-2" />
            </div>
            <div className="flex items-center space-x-2 px-2">
              Promotion Type
              <img src={FilterIcon} alt="Filter" className="w-2 ml-2" />
            </div>
            <div className="flex items-center space-x-2 px-2">
              Discount
              <img src={FilterIcon} alt="Filter" className="w-2 ml-2" />
            </div>
            <div className="flex items-center space-x-2 px-2">
              Status
              <img src={FilterIcon} alt="Filter" className="w-2 ml-2" />
            </div>
            <div className="flex items-center space-x-2 px-2">
              Action
            </div>
          </div>

          {/* Table Body */}
          {paginatedPromotions.map(promotion => (
            <div
              key={promotion.id}
              className="grid grid-cols-[1.3fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] items-center text-sm py-4 border-b border-[#DBDCDE]"
            >
              <div className="px-2">{promotion.promotionName}</div>
              <div className="px-2">{promotion.product}</div>
              <div className="px-2">{promotion.startDate}</div>
              <div className="px-2">{promotion.endDate}</div>
              <div className="px-2">{promotion.promotionType}</div>
              <div className="px-2">{promotion.discount}</div>

              {/* Status Button */}
              <div className="text-secondary px-2">
                <button
                  className={`btn btn-sm px-3 h-8 rounded-full text-white ${
                    promotion.status === 'Active'
                      ? 'bg-[#198754] hover:bg-[#198754]/90'
                      : promotion.status === 'Inactive'
                      ? 'bg-[#6C757D] hover:bg-[#6C757D]/90'
                      : ''
                  }`}
                >
                  {promotion.status}
                </button>
              </div>

              {/* Actions */}
              <div className="flex gap-2 px-2">
                <div className="form-check form-switch custom-switch form-switch-success">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    checked={promotion.published}
                    onChange={e =>
                      handleSwitchChange(promotion.id, e.target.checked)
                    }
                  />
                </div>
                <Link to={'/promotion/detail/' + promotion.id}>
                  <button>
                    <img src={DetailIcon} alt="Detail" />
                  </button>
                </Link>
                <Link to={'/promotion/edit/' + promotion.id}>
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
              {currentPage * itemsPerPage - (itemsPerPage - 1)}-
              {Math.min(currentPage * itemsPerPage, promotions.length)} of{' '}
              {promotions.length}
            </span>
          </div>

          {/* Right Section: Pagination controls and Rows per page */}
          <div className="flex items-center space-x-4">
            {/* Dropdown Rows per page */}
            <div className="flex items-center space-x-1">
              <span>Rows per page:</span>
              <select
                value={itemsPerPage}
                onChange={e => setItemsPerPage(Number(e.target.value))}
                className="w-[50px] text-center border border-[#3C4858] rounded-md"
              >
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
                className={`w-[24px] h-[24px] rounded-[6px] flex items-center justify-center border ${
                  currentPage === 1
                    ? 'border-[#3C4858] bg-[#F7F9FC] cursor-not-allowed'
                    : 'border-[#3C4858] bg-[#FFFFFF] hover:bg-[#EDEFF3]'
                }`}
              >
                <img
                  src={PaginationChevronLeftIcon}
                  alt="Previous"
                  className={
                    currentPage === 1 ? 'opacity-50' : 'opacity-100'
                  }
                />
              </button>

              {/* Current Page and Total Pages */}
              <span className="font-medium">
                {currentPage}/{totalPages}
              </span>

              {/* Next Page Button */}
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`w-[24px] h-[24px] rounded-[6px] flex items-center justify-center border ${
                  currentPage === totalPages
                    ? 'border-[#3C4858] bg-[#F7F9FC] cursor-not-allowed'
                    : 'border-[#3C4858] bg-[#FFFFFF] hover:bg-[#EDEFF3]'
                }`}
              >
                <img
                  src={PaginationChevronRightIcon}
                  alt="Next"
                  className={
                    currentPage === totalPages ? 'opacity-25' : 'opacity-50'
                  }
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionListComponent;
