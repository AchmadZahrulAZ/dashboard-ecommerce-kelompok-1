import React, { useState, useEffect } from 'react';
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

  // Fields
  const [promotionType, setPromotionType] = useState('');
  const [voucherCode, setVoucherCode] = useState('');
  const [promotionName, setPromotionName] = useState('');
  // Multi-select for products:
  const [product, setProduct] = useState([]); // store as an array
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [discount, setDiscount] = useState(''); // e.g., "Amount : 50.000" or "Percentage : 20%"
  const [usageLimit, setUsageLimit] = useState('');
  const [showVoucherOnCheckout, setShowVoucherOnCheckout] = useState(false);
  const [error, setError] = useState('');

  // Fill initial data if editing or detail
  useEffect(() => {
    if (promotionData) {
      setPromotionType(promotionData.promotionType || '');
      setVoucherCode(promotionData.voucherCode || '');
      setPromotionName(promotionData.promotionName || '');
      // If the product was stored as a string, split it, else keep array
      if (promotionData.product) {
        setProduct(
          Array.isArray(promotionData.product)
            ? promotionData.product
            : promotionData.product.split(', ')
        );
      }
      setStartDate(promotionData.startDate || '');
      setEndDate(promotionData.endDate || '');
      setDiscount(promotionData.discount || '');
      setUsageLimit(promotionData.usageLimit || '');
      setShowVoucherOnCheckout(promotionData.showVoucherOnCheckout || false);
    }
  }, [promotionData]);

  // ---- Handling date fields ----
  const handleDateFocus = (e) => {
    e.target.type = 'date';
  };
  const handleDateBlur = (e) => {
    if (!e.target.value) {
      e.target.type = 'text';
    }
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`; // from YYYY-MM-DD to DD/MM/YYYY
  };

  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    const formatted = formatDate(newStartDate);
    setStartDate(formatted);

    // Adjust end date if needed
    if (
      endDate &&
      new Date(endDate.split('/').reverse().join('-')) <
        new Date(newStartDate)
    ) {
      setEndDate(formatted);
    }
  };

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    const formatted = formatDate(newEndDate);
    setEndDate(formatted);
  };

  // ---- Handling multi-select for products ----
  const allProducts = [
    'Laptop Pavilion',
    'Laptop HP',
    'Monitor 24inch',
    'Keyboard Wireless',
  ];
  const toggleProductSelection = (prod) => {
    if (product.includes(prod)) {
      // remove
      setProduct(product.filter(p => p !== prod));
    } else {
      // add
      setProduct([...product, prod]);
    }
  };

  // ---- Submit ----
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!promotionType) {
      setError('Please select a Promotion Type.');
      return;
    }

    if (promotionType === 'Direct Discount') {
      if (!promotionName || !product.length || !startDate || !endDate || !discount || !usageLimit) {
        setError('Please fill all fields for Direct Discount.');
        return;
      }
    }

    if (promotionType === 'Voucher Code') {
      if (
        !voucherCode ||
        !promotionName ||
        !product.length ||
        !startDate ||
        !endDate ||
        !discount ||
        !usageLimit
      ) {
        setError('Please fill all fields for Voucher Code.');
        return;
      }
    }

    // Create/Update object
    const description =
      promotionType === 'Direct Discount'
        ? `Potongan ${discount} dengan pembelian di atas 200rb` // You can customize the text
        : `Potongan ${discount} dengan pembelian di atas 100rb`; 

    const newData = {
      // If editing, preserve the ID. If new, create an ID.
      id: promotionData?.id || Date.now(),
      promotionType,
      voucherCode: promotionType === 'Voucher Code' ? voucherCode : '',
      promotionName,
      product: product.join(', '), // store as string
      startDate,
      endDate,
      discount,
      usageLimit,
      showVoucherOnCheckout: promotionType === 'Voucher Code' ? showVoucherOnCheckout : false,
      description, // from your logic or a free text if you want
      status: promotionData?.status || 'Active', // or Inactive
      published: promotionData?.published !== undefined ? promotionData.published : true,
    };

    // If editing, replace. If adding, push new
    if (isEdit && promotionData) {
      setPromotions(prev =>
        prev.map(item => (item.id === promotionData.id ? newData : item))
      );
      Swal.fire({
        title: 'This promotion was successfully updated',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      }).then(() => navigate('/promotion'));
    } else {
      setPromotions(prev => [...prev, newData]);
      Swal.fire({
        title: 'This promotion was successfully added',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      }).then(() => navigate('/promotion'));
    }
  };

  return (
    <div className="container">
      <div className="p-10 card">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex gap-3">
              <button onClick={() => navigate('/banner')}>
                <img src={LeftForm} alt="Back" className="mr-2" />
              </button>
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
              <img src={Right} alt="chevron" className="mx-2" />
              <span>Promotion</span>
              <img src={Right} alt="chevron" className="mx-2" />
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
        <div className="my-4 w-full" style={{ height: '1px', backgroundColor: '#DBDCDE' }}></div>

        {/* Form */}
        <form className="row g-3" onSubmit={handleSubmit}>
          {/* Promotion Type */}
          <div className="col-md-6">
            <label className="form-label">Promotion Type</label>
            <select
              className="bg-gray-100 form-select"
              value={promotionType}
              onChange={e => setPromotionType(e.target.value)}
              disabled={isDetail}
            >
              <option value="">Select Promotion Type</option>
              <option value="Direct Discount">Direct Discount</option>
              <option value="Voucher Code">Voucher Code</option>
            </select>
          </div>

          {/* Voucher Code (only if promotionType = Voucher Code) */}
          {promotionType === 'Voucher Code' && (
            <div className="col-md-6">
              <label className="form-label">Voucher Code</label>
              <input
                type="text"
                className="bg-gray-100 form-control"
                placeholder="e.g. MERDEKA1"
                value={voucherCode}
                onChange={e => setVoucherCode(e.target.value)}
                readOnly={isDetail}
              />
            </div>
          )}

          {/* Promotion Name */}
          <div className="col-md-6">
            <label className="form-label">Promotion Name</label>
            <input
              type="text"
              className="bg-gray-100 form-control"
              placeholder="e.g. Spesial Kemerdekaan"
              value={promotionName}
              onChange={e => setPromotionName(e.target.value)}
              readOnly={isDetail}
            />
          </div>

          {/* Multi-select for Products */}
          <div className="col-md-6">
            <label className="form-label">Product</label>
            {!isDetail && (
              <div className="flex flex-wrap gap-2">
                {allProducts.map(prod => (
                  <label key={prod} className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      checked={product.includes(prod)}
                      onChange={() => toggleProductSelection(prod)}
                    />
                    <span>{prod}</span>
                  </label>
                ))}
              </div>
            )}
            {isDetail && <div>{product.join(', ')}</div>}
          </div>

          {/* Start Date */}
          <div className="col-md-6">
            <label className="form-label">Start Date</label>
            <div className="relative">
              <input
                type="text"
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
                alt="date"
                className="w-5 h-5 absolute top-1/2 right-2 -translate-y-1/2 pointer-events-none"
              />
            </div>
          </div>

          {/* End Date */}
          <div className="col-md-6">
            <label className="form-label">End Date</label>
            <div className="relative">
              <input
                type="text"
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
                alt="date"
                className="w-5 h-5 absolute top-1/2 right-2 -translate-y-1/2 pointer-events-none"
              />
            </div>
          </div>

          {/* Discount */}
          <div className="col-md-6">
            <label className="form-label">Discount</label>
            <select
              className="bg-gray-100 form-select"
              value={discount}
              onChange={e => setDiscount(e.target.value)}
              disabled={isDetail}
            >
              <option value="">Select Discount</option>
              <option value="Percentage : 5%">Percentage : 5%</option>
              <option value="Percentage : 10%">Percentage : 10%</option>
              <option value="Percentage : 15%">Percentage : 15%</option>
              <option value="Percentage : 20%">Percentage : 20%</option>
              <option value="Percentage : 25%">Percentage : 25%</option>
            </select>
          </div>

          {/* Promotion Usage Limit */}
          <div className="col-md-6">
            <label className="form-label">Promotion Usage Limit</label>
            <input
              type="number"
              className="bg-gray-100 form-control"
              placeholder="e.g. 20"
              value={usageLimit}
              onChange={e => setUsageLimit(e.target.value)}
              readOnly={isDetail}
            />
          </div>

          {/* Show voucher code on checkout (only if Voucher Code) */}
          {promotionType === 'Voucher Code' && (
            <div className="col-md-12">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showVoucherOnCheckout}
                  onChange={e => setShowVoucherOnCheckout(e.target.checked)}
                  disabled={isDetail}
                />
                <span>Show the voucher code on the checkout page</span>
              </label>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="col-12">
              <div className="alert alert-danger">{error}</div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-row-reverse gap-3 col-12">
            {isDetail ? (
              <button
                type="button"
                className="w-32 btn"
                style={{ backgroundColor: '#89868D', color: '#FFFFFF' }}
                onClick={() => navigate('/promotion')}
              >
                Close
              </button>
            ) : (
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
