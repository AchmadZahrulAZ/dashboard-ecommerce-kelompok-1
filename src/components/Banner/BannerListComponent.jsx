import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import DropdownIcon from '../../assets/icons/rating/DropdownBig.svg';
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
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // NEW: dropdown filter states
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('');

  // NEW: sorting states
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  // ------------------------------------------------------
  // Filter logic: filter by Release Date or End Date year
  // ------------------------------------------------------
  const handleFilterSelect = (year) => {
    setSelectedFilter(year);
    setFilterOpen(false);
    setCurrentPage(1); // reset to the first page after filtering
  };

  const filteredBanners = useMemo(() => {
    if (!selectedFilter) return banners;
    // Filter if "releaseDate" or "endDate" includes the chosen year (e.g., "2024").
    return banners.filter((banner) => {
      const hasReleaseYear = banner.releaseDate?.includes(selectedFilter);
      const hasEndYear = banner.endDate?.includes(selectedFilter);
      return hasReleaseYear || hasEndYear;
    });
  }, [banners, selectedFilter]);

  // ------------------------------------------------------
  // Sorting logic
  // ------------------------------------------------------
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedBanners = useMemo(() => {
    const sorted = [...filteredBanners];
    if (sortConfig.key) {
      sorted.sort((a, b) => {
        // For booleans (published), JS coerces true > false, which works:
        // false < true => -1, false > true => 1
        // For strings, it does normal alphabetical.
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
  }, [filteredBanners, sortConfig]);

  // ------------------------------------------------------
  // Pagination logic
  // ------------------------------------------------------
  const totalPages = Math.ceil(sortedBanners.length / itemsPerPage);

  const paginatedBanners = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage;
    return sortedBanners.slice(startIndex, endIndex);
  }, [sortedBanners, currentPage, itemsPerPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  // ------------------------------------------------------
  // Switch & Delete Handlers (Existing)
  // ------------------------------------------------------
  const handleSwitchChange = (bannerId, newPublishedValue) => {
    setBanners((prevBanners) =>
      prevBanners.map((banner) =>
        banner.id === bannerId ? { ...banner, published: newPublishedValue } : banner
      )
    );

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
        if (!result.isConfirmed) {
          setBanners((prevBanners) =>
            prevBanners.map((banner) =>
              banner.id === bannerId ? { ...banner, published: true } : banner
            )
          );
        } else {
          Swal.fire({
            title: 'This banner was successfully unpublished',
            icon: 'success',
            customClass: { title: 'text-2xl font-bold' },
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    }
  };

  const handleDelete = (bannerId) => {
    Swal.fire({
      title: 'Delete Banner?',
      text: 'Are you sure want to delete this banner?',
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
        setBanners((prevBanners) => prevBanners.filter((b) => b.id !== bannerId));
        Swal.fire({
          title: 'This banner was successfully deleted',
          icon: 'success',
          customClass: { title: 'text-2xl font-bold' },
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  // ------------------------------------------------------
  // Render
  // ------------------------------------------------------
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

        {/* Filter (Dropdown Year) */}
        <div className="flex items-center space-x-4 mt-6 relative">
          {/* Year Filter */}
          <div className="flex items-center w-[250px] h-[40px] border rounded-md relative">
            <input
              type="text"
              placeholder="Select Filter (Year)"
              className="w-full px-4 text-sm outline-none"
              value={selectedFilter}
              readOnly
            />
            <img
              src={DropdownIcon}
              alt="Dropdown"
              className="mr-4 cursor-pointer"
              onClick={() => setFilterOpen((prev) => !prev)}
            />
            {filterOpen && (
              <ul className="absolute top-[42px] left-0 w-full bg-white border rounded-md z-10">
                <li
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleFilterSelect('2024')}
                >
                  2024
                </li>
                <li
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleFilterSelect('2025')}
                >
                  2025
                </li>
              </ul>
            )}
          </div>
        </div>

        {/* Table Headers (with sorting) */}
        <div className="mt-4 table-responsive">
          <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr] text-[#111111] font-lato font-bold text-sm py-2">
            {/* Banner Picture */}
            <div
              className="flex items-center space-x-2 px-2 cursor-pointer"
              onClick={() => handleSort('bannerPhoto')}
            >
              <span>Banner Picture</span>
              <img
                src={
                  sortConfig.key === 'bannerPhoto' && sortConfig.direction === 'ascending'
                    ? SortActiveIcon
                    : SortIcon
                }
                alt="Sort"
                className="w-4 h-4 ml-2"
              />
            </div>

            {/* Banner Name */}
            <div
              className="flex items-center space-x-2 px-2 cursor-pointer"
              onClick={() => handleSort('bannerName')}
            >
              <span>Banner Name</span>
              <img
                src={
                  sortConfig.key === 'bannerName' && sortConfig.direction === 'ascending'
                    ? SortActiveIcon
                    : SortIcon
                }
                alt="Sort"
                className="w-4 h-4 ml-2"
              />
            </div>

            {/* Target URL */}
            <div
              className="flex items-center space-x-2 px-2 cursor-pointer"
              onClick={() => handleSort('targetURL')}
            >
              <span>Target URL</span>
              <img
                src={
                  sortConfig.key === 'targetURL' && sortConfig.direction === 'ascending'
                    ? SortActiveIcon
                    : SortIcon
                }
                alt="Sort"
                className="w-4 h-4 ml-2"
              />
            </div>

            {/* Release Date */}
            <div
              className="flex items-center space-x-2 px-2 cursor-pointer"
              onClick={() => handleSort('releaseDate')}
            >
              <span>Release Date</span>
              <img
                src={
                  sortConfig.key === 'releaseDate' && sortConfig.direction === 'ascending'
                    ? SortActiveIcon
                    : SortIcon
                }
                alt="Sort"
                className="w-4 h-4 ml-2"
              />
            </div>

            {/* End Date */}
            <div
              className="flex items-center space-x-2 px-2 cursor-pointer"
              onClick={() => handleSort('endDate')}
            >
              <span>End Date</span>
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

            {/* Published (boolean) */}
            <div
              className="flex items-center space-x-2 px-2 cursor-pointer"
              onClick={() => handleSort('published')}
            >
              <span>Published</span>
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
            <div className="flex items-center space-x-2 px-2">Action</div>
          </div>

          {/* Table Rows */}
          {paginatedBanners.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr] items-center text-sm py-4 border-b border-[#DBDCDE]"
            >
              {/* Banner Picture */}
              <div className="px-2">
                <img
                  src={item.bannerPhoto || DummyBanner}
                  alt="Profile"
                  className="w-[50px] h-[37.4px] rounded-sm"
                />
              </div>

              {/* Banner Name */}
              <div className="px-2">{item.bannerName}</div>

              {/* Target URL */}
              <div className="px-2">{item.targetURL}</div>

              {/* Release Date */}
              <div className="px-2">{item.releaseDate}</div>

              {/* End Date */}
              <div className="px-2">{item.endDate}</div>

              {/* Published switch */}
              <div className="form-check form-switch custom-switch form-switch-success px-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  checked={item.published}
                  onChange={(e) => handleSwitchChange(item.id, e.target.checked)}
                />
              </div>

              {/* Action buttons */}
              <div className="flex gap-2 px-2">
                <Link to={'/banner/detail/' + item.id}>
                  <button>
                    <img src={DetailIcon} alt="Detail" />
                  </button>
                </Link>
                <Link to={'/banner/edit/' + item.id}>
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
              {currentPage * itemsPerPage - (itemsPerPage - 1)}-
              {Math.min(currentPage * itemsPerPage, sortedBanners.length)} of{' '}
              {sortedBanners.length}
            </span>
          </div>

          {/* Right Section: Pagination controls and Rows per page */}
          <div className="flex items-center space-x-4">
            {/* Dropdown Rows per page */}
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
                  className={currentPage === 1 ? 'opacity-50' : 'opacity-100'}
                />
              </button>

              {/* Current Page / Total Pages */}
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
                  className={currentPage === totalPages ? 'opacity-25' : 'opacity-50'}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerListComponent;
