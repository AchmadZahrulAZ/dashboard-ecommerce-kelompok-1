import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import DropdownIcon from '../../assets/icons/rating/DropdownBig.svg';
import SortIcon from '../../assets/icons/product/SortIcon.svg';
import SortActiveIcon from '../../assets/icons/product/SortIconActive.svg';
import PaginationChevronRightIcon from '../../assets/icons/rating/PaginationChevronRight.svg';
import DetailIcon from '../../assets/icons/product/SolidEye.svg';
import EditIcon from '../../assets/icons/product/SolidPencil.svg';
import DeleteIcon from '../../assets/icons/product/SolidTrash.svg';

const PromotionListComponent = ({ promotions, setPromotions }) => {
  // -----------------------------
  // 1) Pagination
  // -----------------------------
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const totalPages = Math.ceil(promotions.length / itemsPerPage);

  // -----------------------------
  // 2) Dropdown Filter by Promotion Type
  // -----------------------------
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('');

  const handleFilterSelect = (promoType) => {
    setSelectedFilter(promoType);
    setFilterOpen(false);
    setCurrentPage(1); // reset to first page after filtering
  };

  const filteredPromotions = useMemo(() => {
    if (!selectedFilter) return promotions;
    // Filter by exact match on "promotionType"
    return promotions.filter((p) => p.promotionType === selectedFilter);
  }, [promotions, selectedFilter]);

  // -----------------------------
  // 3) Sorting
  // -----------------------------
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedPromotions = useMemo(() => {
    const sorted = [...filteredPromotions];
    if (sortConfig.key) {
      sorted.sort((a, b) => {
        // For booleans (published), true > false by default in JS
        // For strings, it sorts lexicographically
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sorted;
  }, [filteredPromotions, sortConfig]);

  // -----------------------------
  // 4) Final Paginated Data
  // -----------------------------
  const paginatedPromotions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage;
    return sortedPromotions.slice(startIndex, endIndex);
  }, [sortedPromotions, currentPage, itemsPerPage]);

  // -----------------------------
  // Handlers
  // -----------------------------
  // Publish/Unpublish Toggle
  const handleSwitchChange = (promotionId, newPublishedValue) => {
    setPromotions((prevPromotions) =>
      prevPromotions.map((p) => (p.id === promotionId ? { ...p, published: newPublishedValue } : p))
    );

    if (!newPublishedValue) {
      Swal.fire({
        title: 'Confirmation',
        text: 'Are you sure you want to unpublish this promotion?',
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
          // Revert
          setPromotions((prevPromotions) =>
            prevPromotions.map((p) => (p.id === promotionId ? { ...p, published: true } : p))
          );
        } else {
          Swal.fire({
            title: 'This promotion was successfully unpublished',
            icon: 'success',
            customClass: { title: 'text-2xl font-bold' },
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    }
  };

  // Delete Promotion
  const handleDelete = (promotionId) => {
    Swal.fire({
      title: 'Delete Promotion?',
      text: 'Are you sure you want to delete this promotion?',
      icon: 'warning',
      iconHtml: `<i class="bi bi-trash"></i>`,
      customClass: {
        title: 'my-title-class',
        cancelButton: 'swal2-cancel-outline',
        confirmButton: 'swal2-confirm-no-outline',
      },
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        setPromotions((prevPromotions) => prevPromotions.filter((p) => p.id !== promotionId));

        Swal.fire({
          title: 'This promotion was successfully deleted',
          icon: 'success',
          customClass: { title: 'text-2xl font-bold' },
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  // Pagination
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="container">
      <div className="p-10 card">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-lato font-bold text-[#030406] text-2xl">Promotion</h2>
            <div className="flex items-center text-sm font-lato text-[#DB4444] mt-2">
              <span>Home</span>
              <img src={PaginationChevronRightIcon} alt="Chevron" className="mx-2" />
              <span className="font-semibold">Promotion</span>
            </div>
          </div>
          <Link to="/promotion/add" className="py-2 btn btn-danger">
            Add New Promotion
          </Link>
        </div>

        {/* Filter (Dropdown) */}
        <div className="flex items-center space-x-4 mt-6 w-[250px] relative">
          <div className="flex items-center w-full h-[40px] border rounded-md relative">
            <input
              type="text"
              placeholder="Select Filter (Type)"
              className="w-full px-4 text-sm outline-none"
              value={selectedFilter}
              readOnly
            />
            <img
              src={DropdownIcon}
              alt="Dropdown"
              className="mr-4 w-3 cursor-pointer"
              onClick={() => setFilterOpen((prev) => !prev)}
            />
            {filterOpen && (
              <ul className="absolute top-[42px] left-0 w-full bg-white border rounded-md z-10">
                <li
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleFilterSelect('Direct Discount')}
                >
                  Direct Discount
                </li>
                <li
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleFilterSelect('Voucher Code')}
                >
                  Voucher Code
                </li>
              </ul>
            )}
          </div>
        </div>

        {/* Table Headers (with sorting) */}
        <div className="mt-4 table-responsive">
          <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1.5fr_1fr_1fr_1fr] text-[#111111] font-lato font-bold text-sm py-2">
            {/* Promotion Name */}
            <div
              className="px-2 cursor-pointer flex items-center gap-1"
              onClick={() => handleSort('promotionName')}
            >
              Promotion Name
              <img
                src={
                  sortConfig.key === 'promotionName' && sortConfig.direction === 'ascending'
                    ? SortActiveIcon
                    : SortIcon
                }
                alt="Sort"
                className="w-4 h-4 ml-2"
              />
            </div>

            {/* Start Date */}
            <div
              className="px-2 cursor-pointer flex items-center gap-1"
              onClick={() => handleSort('startDate')}
            >
              Start Date
              <img
                src={
                  sortConfig.key === 'startDate' && sortConfig.direction === 'ascending'
                    ? SortActiveIcon
                    : SortIcon
                }
                alt="Sort"
                className="w-4 h-4 ml-2"
              />
            </div>

            {/* End Date */}
            <div
              className="px-2 cursor-pointer flex items-center gap-1"
              onClick={() => handleSort('endDate')}
            >
              End Date
              <img
                src={
                  sortConfig.key === 'endDate' && sortConfig.direction === 'ascending'
                    ? SortActiveIcon
                    : SortIcon
                }
                alt="Sort"
                className="w-4 h-4 ml-2"
              />
            </div>

            {/* Promotion Type */}
            <div
              className="px-2 cursor-pointer flex items-center gap-1"
              onClick={() => handleSort('promotionType')}
            >
              Promotion Type
              <img
                src={
                  sortConfig.key === 'promotionType' && sortConfig.direction === 'ascending'
                    ? SortActiveIcon
                    : SortIcon
                }
                alt="Sort"
                className="w-4 h-4 ml-2"
              />
            </div>

            {/* Description */}
            <div
              className="px-2 cursor-pointer flex items-center gap-1"
              onClick={() => handleSort('description')}
            >
              Description
              <img
                src={
                  sortConfig.key === 'description' && sortConfig.direction === 'ascending'
                    ? SortActiveIcon
                    : SortIcon
                }
                alt="Sort"
                className="w-4 h-4 ml-2"
              />
            </div>

            {/* Status */}
            <div
              className="px-2 cursor-pointer flex items-center gap-1"
              onClick={() => handleSort('status')}
            >
              Status
              <img
                src={
                  sortConfig.key === 'status' && sortConfig.direction === 'ascending'
                    ? SortActiveIcon
                    : SortIcon
                }
                alt="Sort"
                className="w-4 h-4 ml-2"
              />
            </div>

            {/* Published */}
            <div
              className="px-2 cursor-pointer flex items-center gap-1"
              onClick={() => handleSort('published')}
            >
              Published
              <img
                src={
                  sortConfig.key === 'published' && sortConfig.direction === 'ascending'
                    ? SortActiveIcon
                    : SortIcon
                }
                alt="Sort"
                className="w-4 h-4 ml-2"
              />
            </div>

            {/* Action (no sort) */}
            <div className="px-2">Action</div>
          </div>

          {/* Table Rows */}
          {paginatedPromotions.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1.5fr_1fr_1fr_1fr] items-center text-sm py-4 border-b border-[#DBDCDE]"
            >
              <div className="px-2">{item.promotionName}</div>
              <div className="px-2">{item.startDate}</div>
              <div className="px-2">{item.endDate}</div>
              <div className="px-2">{item.promotionType}</div>
              <div className="px-2">{item.description}</div>
              <div className="px-2">
                <button
                  className={`btn btn-sm px-3 h-8 rounded-full text-white ${
                    item.status === 'Active' ? 'bg-[#198754]' : 'bg-[#6C757D]'
                  }`}
                >
                  {item.status}
                </button>
              </div>
              <div className="px-2">
                <div className="form-check form-switch custom-switch form-switch-success">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    checked={item.published}
                    onChange={(e) => handleSwitchChange(item.id, e.target.checked)}
                  />
                </div>
              </div>
              <div className="px-2 flex gap-2">
                {/* View Detail */}
                <Link to={`/promotion/detail/${item.id}`}>
                  <button>
                    <img src={DetailIcon} alt="Detail" />
                  </button>
                </Link>
                {/* Edit */}
                <Link to={`/promotion/edit/${item.id}`}>
                  <button>
                    <img src={EditIcon} alt="Edit" />
                  </button>
                </Link>
                {/* Delete */}
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
              {currentPage * itemsPerPage - (itemsPerPage - 1)}-
              {Math.min(currentPage * itemsPerPage, sortedPromotions.length)} of{' '}
              {sortedPromotions.length}
            </span>
          </div>

          {/* Right Section: Pagination controls & Rows per page */}
          <div className="flex items-center space-x-4">
            {/* Rows per page */}
            <div className="flex items-center space-x-1">
              <span>Rows per page:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="w-[50px] text-center border border-[#3C4858] rounded-md"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>

            {/* Pagination Arrows */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={`w-[24px] h-[24px] rounded-[6px] flex items-center justify-center border ${
                  currentPage === 1
                    ? 'border-[#3C4858] bg-[#F7F9FC] cursor-not-allowed'
                    : 'border-[#3C4858] bg-[#FFFFFF] hover:bg-[#EDEFF3]'
                }`}
              >
                <span className="text-xs">{'<'}</span>
              </button>
              <span className="font-medium">
                {currentPage}/{totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`w-[24px] h-[24px] rounded-[6px] flex items-center justify-center border ${
                  currentPage === totalPages
                    ? 'border-[#3C4858] bg-[#F7F9FC] cursor-not-allowed'
                    : 'border-[#3C4858] bg-[#FFFFFF] hover:bg-[#EDEFF3]'
                }`}
              >
                <span className="text-xs">{'>'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionListComponent;
