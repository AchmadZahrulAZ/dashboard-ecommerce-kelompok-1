import React, { useState, useMemo } from 'react';
import CalendarIcon from '../../assets/icons/rating/Calendar.svg';
import DropdownIcon from '../../assets/icons/rating/DropdownBig.svg';
import SearchIcon from '../../assets/icons/rating/Search.svg';
import SortIcon from '../../assets/icons/product/SortIcon.svg';
import SortActiveIcon from '../../assets/icons/product/SortIconActive.svg';
import ChevronRightIcon from '../../assets/icons/rating/WhiteChevronRight.svg';
import ChevronDownIcon from '../../assets/icons/rating/WhiteChevronDown.svg';
import PaginationChevronLeftIcon from '../../assets/icons/rating/PaginationChevronLeft.svg';
import PaginationChevronRightIcon from '../../assets/icons/rating/PaginationChevronRight.svg';
import DummyImage1 from '../../assets/images/rating/RatingDummy1.png';
import DummyImage2 from '../../assets/images/rating/RatingDummy2.png';
import DummyImage3 from '../../assets/images/rating/RatingDummy3.png';
import DummyImage4 from '../../assets/images/rating/RatingDummy4.png';

const RatingListComponent = () => {
  // -------------------------------------------------------
  // Existing states
  // -------------------------------------------------------
  const [expandedRow, setExpandedRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // -------------------------------------------------------
  // NEW: states for date, dropdown filter, search, sorting
  // -------------------------------------------------------
  const [showDate, setShowDate] = useState(false); // calendar toggle
  const [filterOpen, setFilterOpen] = useState(false); // dropdown toggle
  const [selectedFilter, setSelectedFilter] = useState(''); // filter choice
  const [searchTerm, setSearchTerm] = useState(''); // search term
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' }); // sorting

  // -------------------------------------------------------
  // Sample Data
  // -------------------------------------------------------
  const data = [
    {
      id: 1,
      profilePicture: DummyImage1,
      username: 'philfoden',
      rating: '4/5',
      reviewDate: '09/11/2024',
      review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      fullReview:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco...',
    },
    {
      id: 2,
      profilePicture: DummyImage2,
      username: 'sarahmoraes',
      rating: '3/5',
      reviewDate: '09/11/2024',
      review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      fullReview:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco...',
    },
    {
      id: 3,
      profilePicture: DummyImage3,
      username: 'ashleycole',
      rating: '2/5',
      reviewDate: '09/11/2024',
      review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      fullReview:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco...',
    },
    {
      id: 4,
      profilePicture: DummyImage4,
      username: 'kevindebruyne',
      rating: '5/5',
      reviewDate: '09/11/2024',
      review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      fullReview:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco...',
    },
  ];

  // -------------------------------------------------------
  // Sorting logic
  // -------------------------------------------------------
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // UseMemo for efficient sorting
  const sortedData = useMemo(() => {
    const sortable = [...data];
    if (sortConfig.key) {
      sortable.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortable;
  }, [data, sortConfig]);

  // -------------------------------------------------------
  // Filter logic
  // -------------------------------------------------------
  const handleFilterSelect = (filterValue) => {
    setSelectedFilter(filterValue);
    setFilterOpen(false);
  };

  // Filter items by the selected rating (e.g., '1/5', '2/5', etc.)
  const filteredByDropdown = sortedData.filter((item) => {
    if (!selectedFilter) return true; // no filter selected
    // Compare the item's rating to the selected filter
    return item.rating === selectedFilter;
  });

  // -------------------------------------------------------
  // Search logic (by username)
  // -------------------------------------------------------
  const finalFilteredData = filteredByDropdown.filter((item) =>
    item.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // -------------------------------------------------------
  // Pagination logic
  // -------------------------------------------------------
  const totalPages = Math.ceil(finalFilteredData.length / itemsPerPage);
  const currentData = finalFilteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // -------------------------------------------------------
  // Handlers
  // -------------------------------------------------------
  const toggleRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // reset to the first page
  };

  return (
    <div className="container relative">
      <div className="p-10 card">
        {/* Title / Breadcrumb */}
        <div>
          <h2 className="font-lato font-bold text-[#030406] text-2xl">Rating</h2>
          <div className="flex items-center text-sm font-lato text-[#DB4444] mt-2">
            <span>Home</span>
            <img src={PaginationChevronRightIcon} alt="Chevron" className="mx-2" />
            <span className="font-semibold">Rating</span>
          </div>
        </div>

        {/* Top Controls (Calendar, Filter, Search) */}
        <div className="flex items-center space-x-4 mt-6 relative">
          {/* Calendar Button */}
          <button
            className="w-[48px] h-[40px] rounded-md border bg-white flex items-center justify-center"
            onClick={() => setShowDate((prev) => !prev)}
          >
            <img src={CalendarIcon} alt="Calendar" />
          </button>
          {showDate && (
            <div className="absolute top-[60px] left-0 bg-white border p-2 rounded-md shadow-md z-10">
              {new Date().toLocaleDateString()}
            </div>
          )}

          {/* Dropdown Filter */}
          <div className="flex items-center w-[250px] h-[40px] border rounded-md relative">
            <input
              type="text"
              placeholder="Select Filter (Rating)"
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
                  onClick={() => handleFilterSelect('1/5')}
                >
                  1/5
                </li>
                <li
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleFilterSelect('2/5')}
                >
                  2/5
                </li>
                <li
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleFilterSelect('3/5')}
                >
                  3/5
                </li>
                <li
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleFilterSelect('4/5')}
                >
                  4/5
                </li>
                <li
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleFilterSelect('5/5')}
                >
                  5/5
                </li>
              </ul>
            )}
          </div>

          {/* Search by username */}
          <div className="flex items-center w-[280px] h-[40px] border rounded-md">
            <img src={SearchIcon} alt="Search" className="ml-4" />
            <input
              type="text"
              placeholder="Search"
              className="w-full px-4 text-sm outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table Headers (with Sort) */}
        <div className="mt-6">
          <div className="grid grid-cols-[1fr_1fr_1fr_1fr_2fr_1fr] text-[#111111] font-lato font-bold text-sm py-2">
            {/* Profile Picture (no sort) */}
            <div className="px-2">Profile Picture</div>

            {/* Username (sortable) */}
            <div className="px-2 cursor-pointer flex items-center gap-1" onClick={() => handleSort('username')}>
              User Name
              <img
                src={
                  sortConfig.key === 'username' && sortConfig.direction === 'ascending'
                    ? SortActiveIcon
                    : SortIcon
                }
                alt="Sort"
              />
            </div>

            {/* Rating (sortable) */}
            <div className="px-2 cursor-pointer flex items-center gap-1" onClick={() => handleSort('rating')}>
              Rating
              <img
                src={
                  sortConfig.key === 'rating' && sortConfig.direction === 'ascending'
                    ? SortActiveIcon
                    : SortIcon
                }
                alt="Sort"
              />
            </div>

            {/* Review Date (sortable) */}
            <div className="px-2 cursor-pointer flex items-center gap-1" onClick={() => handleSort('reviewDate')}>
              Review Date
              <img
                src={
                  sortConfig.key === 'reviewDate' && sortConfig.direction === 'ascending'
                    ? SortActiveIcon
                    : SortIcon
                }
                alt="Sort"
              />
            </div>

            {/* Review (no sort) */}
            <div className="px-2">Review</div>

            {/* Action (no sort) */}
            <div className="px-2">Action</div>
          </div>

          {/* Table Rows */}
          {currentData.map((item, index) => (
            <div
              key={item.id}
              className="grid grid-cols-[1fr_1fr_1fr_1fr_2fr_1fr] items-center text-sm py-4 border-b border-[#DBDCDE]"
            >
              <div className="px-2">
                <img src={item.profilePicture} alt="Profile" className="w-[50px] h-[37.4px] rounded-sm" />
              </div>
              <div className="px-2">{item.username}</div>
              <div className="px-2">{item.rating}</div>
              <div className="px-2">{item.reviewDate}</div>
              <div className="px-2">
                {expandedRow === index ? item.fullReview : item.review}
              </div>
              <div className="px-2">
                <button
                  className="w-[28px] h-[28px] rounded-lg bg-[#111111] flex items-center justify-center"
                  onClick={() => toggleRow(index)}
                >
                  <img
                    src={expandedRow === index ? ChevronDownIcon : ChevronRightIcon}
                    alt="Toggle"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Section */}
        <div className="flex items-center justify-between mt-6 text-sm text-[#687182]">
          <div>
            <span>
              {currentPage * itemsPerPage - (itemsPerPage - 1)}-
              {Math.min(currentPage * itemsPerPage, finalFilteredData.length)} of {finalFilteredData.length}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <span>Rows per page:</span>
              <select
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="w-[50px] text-center border border-[#3C4858] rounded-md"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={`w-[24px] h-[20px] rounded-[6px] flex items-center justify-center border ${
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
              <span className="font-medium">
                {currentPage}/{totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`w-[24px] h-[20px] rounded-[6px] flex items-center justify-center border ${
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

export default RatingListComponent;
