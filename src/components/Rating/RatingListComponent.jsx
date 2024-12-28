import React, { useState } from 'react';
import CalendarIcon from '../../assets/icons/rating/Calendar.svg';
import DropdownIcon from '../../assets/icons/rating/DropdownBig.svg';
import SearchIcon from '../../assets/icons/rating/Search.svg';
import FilterIcon from '../../assets/icons/rating/Filter.svg';
import Right from '../../assets/icons/rating/Right.svg';
import ChevronRightIcon from '../../assets/icons/rating/WhiteChevronRight.svg';
import ChevronDownIcon from '../../assets/icons/rating/WhiteChevronDown.svg';
import PaginationChevronLeftIcon from '../../assets/icons/rating/PaginationChevronLeft.svg';
import PaginationChevronRightIcon from '../../assets/icons/rating/PaginationChevronRight.svg';
import DummyImage1 from '../../assets/images/rating/RatingDummy1.png';
import DummyImage2 from '../../assets/images/rating/RatingDummy2.png';
import DummyImage3 from '../../assets/images/rating/RatingDummy3.png';
import DummyImage4 from '../../assets/images/rating/RatingDummy4.png';

const RatingListComponent = () => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const data = [
    {
      id: 1,
      profilePicture: DummyImage1,
      username: 'philfoden',
      rating: '4/5',
      reviewDate: '09/11/2024',
      review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      fullReview: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      id: 2,
      profilePicture: DummyImage2,
      username: 'sarahmoraes',
      rating: '3/5',
      reviewDate: '09/11/2024',
      review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      fullReview: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      id: 3,
      profilePicture: DummyImage3,
      username: 'ashleycole',
      rating: '2/5',
      reviewDate: '09/11/2024',
      review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      fullReview: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      id: 4,
      profilePicture: DummyImage4,
      username: 'kevindebruyne',
      rating: '5/5',
      reviewDate: '09/11/2024',
      review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      fullReview: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
  ];

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
    setCurrentPage(1); // Reset to the first page
  };

  return (
    <div className="container">
      <div className="p-10 card">
        {/* Title Section */}
        <div>
          <h2 className="font-lato font-bold text-[#030406] text-2xl">Rating</h2>
          <div className="flex items-center text-sm font-lato text-[#DB4444] mt-2">
            <span>Home</span>
            <img src={Right} alt="Chevron" className="mx-2" />
            <span className="font-semibold">Rating</span>
          </div>
        </div>

        {/* Second Row */}
        <div className="flex items-center space-x-4 mt-6">
          <button className="w-[48px] h-[40px] rounded-md border bg-white flex items-center justify-center">
            <img src={CalendarIcon} alt="Calendar" />
          </button>
          <div className="flex items-center w-[250px] h-[40px] border rounded-md">
            <input type="text" placeholder="Select Filter" className="w-full px-4 text-sm outline-none" />
            <img src={DropdownIcon} alt="Dropdown" className="mr-4" />
          </div>
          <div className="flex items-center w-[280px] h-[40px] border rounded-md">
            <img src={SearchIcon} alt="Search" className="ml-4" />
            <input type="text" placeholder="Search" className="w-full px-4 text-sm outline-none" />
          </div>
        </div>

        {/* Third Row: Titles and Data */}
        <div className="mt-6">
          {/* Title Row */}
          <div className="grid grid-cols-[1fr_1fr_1fr_1fr_2fr_1fr] text-[#111111] font-lato font-bold text-sm py-2">
            <div className="flex items-center space-x-2 px-2">
              Profile Picture
              <img src={FilterIcon} alt="Filter" className="w-2 ml-2" />
            </div>
            <div className="flex items-center space-x-2 px-2">
              User Name
              <img src={FilterIcon} alt="Filter" className="w-2 ml-2" />
            </div>
            <div className="flex items-center space-x-2 px-2">
              Rating
              <img src={FilterIcon} alt="Filter" className="w-2 ml-2" />
            </div>
            <div className="flex items-center space-x-2 px-2">
              Review Date
              <img src={FilterIcon} alt="Filter" className="w-2 ml-2" />
            </div>
            <div className="flex items-center space-x-2 px-2">
              Review
              <img src={FilterIcon} alt="Filter" className="w-2 ml-2" />
            </div>
            <div className="flex items-center space-x-2 px-2">Action</div>
          </div>

          {/* Data Rows */}
          {currentData.map((item, index) => (
            <div key={item.id} className="grid grid-cols-[1fr_1fr_1fr_1fr_2fr_1fr] items-center text-sm py-4 border-b border-[#DBDCDE]">
              <div className="px-2">
                <img src={item.profilePicture} alt="Profile" className="w-[50px] h-[37.4px] rounded-sm" />
              </div>
              <div className="px-2">{item.username}</div>
              <div className="px-2">{item.rating}</div>
              <div className="px-2">{item.reviewDate}</div>
              <div className="px-2">{expandedRow === index ? item.fullReview : item.review}</div>
              <div className="px-2">
                <button
                  className="w-[28px] h-[28px] rounded-lg bg-[#111111] flex items-center justify-center"
                  onClick={() => toggleRow(index)}
                >
                  <img src={expandedRow === index ? ChevronDownIcon : ChevronRightIcon} alt="Toggle" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6 text-sm text-[#687182]">
          <span>
            {currentPage}-{Math.min(currentPage * itemsPerPage, data.length)} of {data.length}
          </span>
          <div className="flex items-center space-x-1">
            <span>Rows per page:</span>
            <select value={itemsPerPage} onChange={handleItemsPerPageChange} className="w-[40px] text-center border rounded-md">
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
            <button onClick={handlePreviousPage} disabled={currentPage === 1} className={`w-[24px] h-[20px] rounded-md bg-white ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}>
              <img src={PaginationChevronLeftIcon} alt="Previous" />
            </button>
            <span>
              {currentPage}/{totalPages}
            </span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages} className={`w-[24px] h-[20px] rounded-md bg-white ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}>
              <img src={PaginationChevronRightIcon} alt="Next" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingListComponent;
