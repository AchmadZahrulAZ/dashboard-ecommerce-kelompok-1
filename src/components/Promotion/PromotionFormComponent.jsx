import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Right from '../../assets/icons/rating/Right.svg';
import LeftForm from '../../assets/icons/product/LeftForm.svg';
import DateIcon from '../../assets/icons/banner/Date.svg';
import Swal from 'sweetalert2';

const PromotionFormComponent = ({
  isEdit,
  isDetail,
  setPromotions,
  promotionData,
}) => {
  const navigate = useNavigate();

  // Promotion Type can be "Direct Discount" or "Voucher Code"
  const [promotionType, setPromotionType] = useState('');
  const [promotionName, setPromotionName] = useState('');
  const [voucherCode, setVoucherCode] = useState('');
  const [product, setProduct] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [discount, setDiscount] = useState('');
  const [usageLimit, setUsageLimit] = useState('');
  const [showVoucherOnCheckout, setShowVoucherOnCheckout] = useState(false);

  const [error, setError] = useState('');

  // Populate fields if we are in edit or detail mode
  useEffect(() => {
    if (promotionData) {
      setPromotionType(promotionData.promotionType || '');
      setPromotionName(promotionData.promotionName || '');
      setVoucherCode(promotionData.voucherCode || '');
      setProduct(promotionData.product || '');
      setStartDate(promotionData.startDate || '');
      setEndDate(promotionData.endDate || '');
      setDiscount(promotionData.discount || '');
      setUsageLimit(promotionData.usageLimit || '');
      setShowVoucherOnCheckout(promotionData.showVoucherOnCheckout || false);
    }
  }, [promotionData]);

  // Handlers for date fields
  const handleDateFocus = (e) => {
    e.target.type = 'date';
  };

  const handleDateBlur = (e) => {
    if (!e.target.value) {
      e.target.type = 'text';
    }
  };

  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value; // format: YYYY-MM-DD
    const formattedDate = formatDate(newStartDate); // convert to DD/MM/YYYY
    setStartDate(formattedDate);

    // If endDate is set and is before the new start date, adjust it
    if (
      endDate &&
      new Date(endDate.split('/').reverse().join('-')) <
        new Date(newStartDate)
    ) {
      setEndDate(formattedDate);
    }
  };

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value; // format: YYYY-MM-DD
    const formattedDate = formatDate(newEndDate); // convert to DD/MM/YYYY
    setEndDate(formattedDate);
  };

  // Utility function to convert YYYY-MM-DD -> DD/MM/YYYY
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!promotionType) {
      setError('Please select a Promotion Type.');
      return;
    }

    // For Direct Discount
    if (promotionType === 'Direct Discount') {
      if (!promotionName || !product || !startDate || !endDate || !discount || !usageLimit) {
        setError('Please fill all fields for Direct Discount.');
        return;
      }
    }

    // For Voucher Code
    if (promotionType === 'Voucher Code') {
      if (!voucherCode || !promotionName || !product || !startDate || !endDate || !discount || !usageLimit) {
        setError('Please fill all fields for Voucher Code.');
        return;
      }
    }

    setError('');

    if (isEdit && promotionData) {
      // Update existing promotion
      const updatedPromotion = {
        ...promotionData,
        promotionType,
        voucherCode,
        promotionName,
        product,
        startDate,
        endDate,
        discount,
        usageLimit,
        showVoucherOnCheckout,
      };

      setPromotions((prev) =>
        prev.map((p) => (p.id === promotionData.id ? updatedPromotion : p))
      );

      Swal.fire({
        title: 'This promotion was successfully updated',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        navigate('/promotion');
      });
    } else {
      // Add new promotion
      const newPromotion = {
        id: Date.now(),
        promotionType,
        voucherCode,
        promotionName,
        product,
        startDate,
        endDate,
        discount,
        usageLimit,
        showVoucherOnCheckout,
        // default values
        published: true,
        status: 'Active', // or Inactive, depending on your logic
      };

      setPromotions((prevPromotions) => [...prevPromotions, newPromotion]);

      Swal.fire({
        title: `This promotion was successfully added`,
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        navigate('/promotion');
      });
    }
  };

  return (
    <div className="container">
      <div className="p-10 card">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex gap-3">
              <img src={LeftForm} alt="left form icon" />
              <h2 className="font-lato font-bold text-[#030406] text-2xl">
                {isDetail
                  ? 'Detail Promotion'
                  : isEdit
                  ? 'Edit Promotion'
                  : 'Add Promotion'}
              </h2>
            </div>

            <div className="flex items-center text-sm font-lato text-[#DB4444] mt-2">
              <span>Home</span>
              <img src={Right} alt="Chevron" className="mx-2" />
              <span>Promotion</span>
              <img src={Right} alt="Chevron" className="mx-2" />
              <span className="font-semibold">
                {isDetail
                  ? 'Detail Promotion'
                  : isEdit
                  ? 'Edit Promotion'
                  : 'Add Promotion'}
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="my-4"
          style={{ height: '1px', backgroundColor: '#DBDCDE', width: '100%' }}
        ></div>

        {/* Form */}
        <form className="row g-3" onSubmit={handleSubmit}>
          {/* Promotion Type */}
          <div className="col-md-6">
            <label htmlFor="promotionType" className="form-label">
              Promotion Type
            </label>
            <select
              className="bg-gray-100 form-select"
              id="promotionType"
              name="promotionType"
              disabled={isDetail}
              value={promotionType}
              onChange={(e) => setPromotionType(e.target.value)}
            >
              <option value="">Select Promotion Type</option>
              <option value="Direct Discount">Direct Discount</option>
              <option value="Voucher Code">Voucher Code</option>
            </select>
          </div>

          {/* VOUCHER CODE (Only if promotionType = Voucher Code) */}
          {promotionType === 'Voucher Code' && (
            <div className="col-md-6">
              <label htmlFor="voucherCode" className="form-label">
                Voucher Code
              </label>
              <input
                type="text"
                placeholder="Enter Voucher Code"
                className="bg-gray-100 form-control"
                id="voucherCode"
                name="voucherCode"
                readOnly={isDetail}
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value)}
              />
            </div>
          )}

          {/* PROMOTION NAME (Both types) */}
          <div className="col-md-6">
            <label htmlFor="promotionName" className="form-label">
              Promotion Name
            </label>
            <input
              type="text"
              placeholder="Enter Promotion Name"
              className="bg-gray-100 form-control"
              id="promotionName"
              name="promotionName"
              readOnly={isDetail}
              value={promotionName}
              onChange={(e) => setPromotionName(e.target.value)}
            />
          </div>

          {/* PRODUCT (Both types) */}
          <div className="col-md-6">
            <label htmlFor="product" className="form-label">
              Product
            </label>
            <select
              className="bg-gray-100 form-select"
              id="product"
              name="product"
              disabled={isDetail}
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value="">Select Product</option>
              <option value="Product A">Product A</option>
              <option value="Product B">Product B</option>
              <option value="Product C">Product C</option>
            </select>
          </div>

          {/* START DATE */}
          <div className="col-md-6">
            <label htmlFor="startDate" className="form-label">
              Start Date
            </label>
            <div className="relative">
              <input
                type="text"
                id="startDate"
                name="startDate"
                className="bg-gray-100 form-control pr-10"
                placeholder="Select Start Date"
                value={startDate}
                onFocus={handleDateFocus}
                onBlur={handleDateBlur}
                onChange={handleStartDateChange}
                readOnly={isDetail}
              />
              <img
                src={DateIcon}
                alt="Date icon"
                className="w-5 h-5 absolute top-1/2 right-2 -translate-y-1/2 pointer-events-none"
              />
            </div>
          </div>

          {/* END DATE */}
          <div className="col-md-6">
            <label htmlFor="endDate" className="form-label">
              End Date
            </label>
            <div className="relative">
              <input
                type="text"
                id="endDate"
                name="endDate"
                className="bg-gray-100 form-control pr-10"
                placeholder="Select End Date"
                value={endDate}
                onFocus={handleDateFocus}
                onBlur={handleDateBlur}
                onChange={handleEndDateChange}
                readOnly={isDetail}
              />
              <img
                src={DateIcon}
                alt="Date icon"
                className="w-5 h-5 absolute top-1/2 right-2 -translate-y-1/2 pointer-events-none"
              />
            </div>
          </div>

          {/* DISCOUNT (Both types) */}
          <div className="col-md-6">
            <label htmlFor="discount" className="form-label">
              Discount
            </label>
            <select
              className="bg-gray-100 form-select"
              id="discount"
              name="discount"
              disabled={isDetail}
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            >
              <option value="">Select Discount</option>
              <option value="10%">10%</option>
              <option value="20%">20%</option>
              <option value="30%">30%</option>
              <option value="40%">40%</option>
              <option value="50%">50%</option>
            </select>
          </div>

          {/* PROMOTION USAGE LIMIT (Both types) */}
          <div className="col-md-6">
            <label htmlFor="usageLimit" className="form-label">
              Promotion Usage Limit
            </label>
            <input
              type="number"
              min="1"
              placeholder="e.g. 100"
              className="bg-gray-100 form-control"
              id="usageLimit"
              name="usageLimit"
              readOnly={isDetail}
              value={usageLimit}
              onChange={(e) => setUsageLimit(e.target.value)}
            />
          </div>

          {/* SHOW VOUCHER CODE ON CHECKOUT (Only if Voucher Code) */}
          {promotionType === 'Voucher Code' && (
            <div className="col-12">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="showVoucherOnCheckout"
                  disabled={isDetail}
                  checked={showVoucherOnCheckout}
                  onChange={(e) => setShowVoucherOnCheckout(e.target.checked)}
                />
                <label
                  className="form-check-label"
                  htmlFor="showVoucherOnCheckout"
                >
                  Show the voucher code on the checkout page
                </label>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="col-12">
              <div className="alert alert-danger text-sm" role="alert">
                {error}
              </div>
            </div>
          )}

          {/* Form Buttons */}
          <div className="flex flex-row-reverse gap-3 col-12">
            {isDetail ? (
              // DETAIL MODE: Only show the "Close" button
              <button
                type="button"
                className="w-32 btn"
                style={{ backgroundColor: '#89868D', color: '#FFFFFF' }}
                onClick={() => navigate('/promotion')}
              >
                Close
              </button>
            ) : (
              // ADD / EDIT MODE
              <>
                <button type="submit" className="w-32 btn btn-danger">
                  {isEdit ? 'Save' : 'Add Promotion'}
                </button>
                <button
                  type="button"
                  className="w-32 btn btn-outline-danger"
                  onClick={() => navigate('/promotion')}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PromotionFormComponent;
