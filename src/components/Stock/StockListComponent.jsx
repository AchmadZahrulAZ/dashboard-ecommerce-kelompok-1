import React, { useState, useEffect } from 'react';
import CalendarIcon from '../../assets/icons/rating/Calendar.svg';
import DropdownIcon from '../../assets/icons/rating/DropdownBig.svg';
import SearchIcon from '../../assets/icons/rating/Search.svg';
import Sort from '../../assets/icons/product/SortIcon.svg';
import SortActive from '../../assets/icons/product/SortIconActive.svg';
import EditIcon from '../../assets/icons/product/SolidPencil.svg';
import DetailIcon from '../../assets/icons/product/SolidEye.svg';
import DeleteIcon from '../../assets/icons/product/SolidTrash.svg';
import Right from '../../assets/icons/rating/Right.svg';
import PaginationChevronDownIcon from '../../assets/icons/rating/PaginationChevronDown.svg';
import PaginationChevronLeftIcon from '../../assets/icons/rating/PaginationChevronLeft.svg';
import PaginationChevronRightIcon from '../../assets/icons/rating/PaginationChevronRight.svg';
import { Link } from 'react-router-dom';
import '../Product/ProductStyles.css';

const StockListComponent = () => {
  {
    /* Product Dummy */
  }
  const [stocks, setStocks] = useState([
    {
      id: 'STK-001',
      varian: 'Warna - Hitam',
      name: 'Laptop HP',
      quantity: 3,
    },
    {
      id: 'STK-002',
      varian: 'Warna - Silver',
      name: 'Laptop Lenovo',
      quantity: 2,
    },
    {
      id: 'STK-003',
      varian: 'Warna - Merah',
      name: 'Mouse Logitech',
      quantity: 4,
    },
    {
      id: 'STK-004',
      varian: 'Warna - Hijau',
      name: 'Keyboard Razer',
      quantity: 1,
    },
  ]);

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending',
  });

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedStocks = React.useMemo(() => {
    let sortableStocks = [...stocks];
    if (sortConfig.key !== null) {
      sortableStocks.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableStocks;
  }, [stocks, sortConfig]);

  return (
    <div className="container">
      {/* Tittle Section */}
      <div className="p-10 card">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-lato font-bold text-[#030406] text-2xl">Stock</h2>
            <div className="flex items-center text-sm font-lato text-[#DB4444] mt-2">
              <span>Home</span>
              <img src={Right} alt="Chevron" className="mx-2" />
              <span className="font-semibold">Stock</span>
            </div>
          </div>
          <div>
            <Link to={'/stock/add'} className="py-2 btn btn-danger">
              Add New Stock
            </Link>
          </div>
        </div>

        {/* Second Row */}
        <div className="flex items-center justify-between mt-6">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
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

          {/* Right Section */}
          <div className="w-[93px] h-[44px] bg-[#EEE4FF] flex flex-col items-end justify-center rounded-md pr-2 py-7" style={{ backgroundColor: '#EEE4FF' }}>
            <p className="font-lato font-bold text-[#DB4444] text-lg">120</p>
            <p className="font-lato font-normal text-[#DB4444] text-sm">Total Stock</p>
          </div>
        </div>

        {/* Table Section */}
        <div className="mt-4 table-responsive">
          <table className="table tableCstm">
            <thead>
              <tr>
                <th scope="col" onClick={() => requestSort('name')}>
                  <div className="items-center gap-1 pb-2 d-flex">
                    <p>Product Name</p>
                    <img src={sortConfig.key === 'name' && (sortConfig.direction === 'ascending' || sortConfig.direction === 'descending') ? SortActive : Sort} alt="Icon Sort" />
                  </div>
                </th>
                <th scope="col" onClick={() => requestSort('sku')}>
                  <div className="items-center gap-1 pb-2 d-flex">
                    <p>Varian Product</p>
                    <img src={sortConfig.key === 'sku' && (sortConfig.direction === 'ascending' || sortConfig.direction === 'descending') ? SortActive : Sort} alt="Icon Sort" />
                  </div>
                </th>
                <th scope="col" onClick={() => requestSort('stock')}>
                  <div className="items-center gap-1 pb-2 d-flex">
                    <p>Quantity</p>
                    <img src={sortConfig.key === 'stock' && (sortConfig.direction === 'ascending' || sortConfig.direction === 'descending') ? SortActive : Sort} alt="Icon Sort" />
                  </div>
                </th>
                <th scope="col " className="items-center gap-1 pb-2 d-flex">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedStocks.map((stock) => (
                <tr key={stock.id}>
                  <td className="text-secondary">{stock.name}</td>
                  <td className="text-secondary">{stock.varian}</td>
                  <td className="text-secondary">{stock.quantity}</td>
                  <td>
                    <div className="gap-2 d-flex align-content-center align-items-center">
                      <Link to={'/stock/detail/' + stock.id}>
                        <img src={DetailIcon} alt="Detail Button" className="transition-transform hover:scale-110" />
                      </Link>
                      <Link to={'/stock/edit/' + stock.id}>
                        <img src={EditIcon} alt="Edit Button" className="transition-transform hover:scale-110" />
                      </Link>
                      <Link to={'/stock/delete/' + stock.id}>
                        <img src={DeleteIcon} alt="Delete Button" className="transition-transform hover:scale-110" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Section */}
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
    </div>
  );
};

export default StockListComponent;

