import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Download from '../../assets/icons/product/Download.svg';
import BannerPhotoIcon from '../../assets/icons/banner/BannerPhoto.svg';
import BannerTrashIcon from '../../assets/icons/banner/BannerTrash.svg';
import Right from '../../assets/icons/rating/Right.svg';
import LeftForm from '../../assets/icons/product/LeftForm.svg';
import DateIcon from '../../assets/icons/banner/Date.svg';
import './BannerFormComponent.css';
import Swal from 'sweetalert2';

const BannerFormComponent = ({ isEdit, isDetail, setBanners, bannerData }) => {
  const navigate = useNavigate();

  // 1. Local state
  const [bannerName, setBannerName] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [targetURL, setTargetURL] = useState('');
  const [bannerType, setBannerType] = useState('');
  const [bannerPhoto, setBannerPhoto] = useState(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  // 2. useEffect to initialize states if we have a bannerData object
  React.useEffect(() => {
    if (bannerData) {
      setBannerName(bannerData.bannerName || '');
      setReleaseDate(bannerData.releaseDate || '');
      setEndDate(bannerData.endDate || '');
      setTargetURL(bannerData.targetURL || '');
      setBannerType(bannerData.bannerType || '');
      // If bannerPhoto is a URL or a file
      setBannerPhoto(bannerData.bannerPhoto || null);
    }
  }, [bannerData]);

  // Handlers for date fields
  const handleDateFocus = (e) => {
    e.target.type = 'date';
  };

  const handleDateBlur = (e) => {
    if (!e.target.value) {
      e.target.type = 'text';
    }
  };

  const handleReleaseDateChange = (e) => {
    const newReleaseDate = e.target.value; // Original format: YYYY-MM-DD
    const formattedDate = formatDate(newReleaseDate); // Convert to DD/MM/YYYY
    setReleaseDate(formattedDate);

    // Adjust end date if needed
    if (endDate && new Date(endDate.split('/').reverse().join('-')) < new Date(newReleaseDate)) {
      setEndDate(formattedDate);
    }
  };

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value; // Original format: YYYY-MM-DD
    const formattedDate = formatDate(newEndDate); // Convert to DD/MM/YYYY
    setEndDate(formattedDate);
  };

  // Utility function to reformat date
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`; // Convert to DD/MM/YYYY
  };

  // // Handlers for uploading banner photo
  // const handleFileUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     if (file.size > 500000) {
  //       // Example: Max file size is 500KB
  //       setError('File size exceeds the limit of 500KB.');
  //       return;
  //     }
  //     if (!['image/png', 'image/jpeg', 'image/svg+xml'].includes(file.type)) {
  //       setError('Invalid file type. Only PNG, JPG, and SVG are allowed.');
  //       return;
  //     }
  //     setError('');
  //     setBannerPhoto(file);
  //   }
  // };

  // Handle deleting the banner photo
  const handleDeletePhoto = () => {
    setBannerPhoto(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear the file input value
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!bannerName || !releaseDate || !endDate || !targetURL || !bannerType || !bannerPhoto) {
      setError('Please fill all fields.');
      return;
    }

    if (isEdit && bannerData) {
      // 1) Create an updated banner object
      const updatedBanner = {
        ...bannerData,
        bannerName,
        releaseDate,
        endDate,
        targetURL,
        bannerType,
        bannerPhoto:
          typeof bannerPhoto === 'string'
            ? bannerPhoto // If it's already a string (existing URL)
            : URL.createObjectURL(bannerPhoto), // If it's a new file
      };

      // 2) Update the state
      setBanners((prev) => prev.map((b) => (b.id === bannerData.id ? updatedBanner : b)));

      // 3) Show success alert
      Swal.fire({
        title: 'This banner was successfully updated',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        navigate('/banner'); // go back to list
      });
    } else {
      // isAdd flow
      const newBanner = {
        id: Date.now(),
        bannerName,
        releaseDate,
        endDate,
        targetURL,
        bannerType,
        bannerPhoto: URL.createObjectURL(bannerPhoto),
        published: true,
      };

      setBanners((prevBanners) => [...prevBanners, newBanner]);
      Swal.fire({
        title: `This banner was successfully added`,
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        navigate('/banner');
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
              <button onClick={() => navigate('/banner')}>
                <img src={LeftForm} alt="Back" className="mr-2" />
              </button>
              <h2 className="font-lato font-bold text-[#030406] text-2xl">{isDetail ? 'Detail Banner' : isEdit ? 'Edit Banner' : 'Add Banner'}</h2>
            </div>

            <div className="flex items-center text-sm font-lato text-[#DB4444] mt-2">
              <span>Home</span>
              <img src={Right} alt="Chevron" className="mx-2" />
              <span>Banner Management</span>
              <img src={Right} alt="Chevron" className="mx-2" />
              <span className="font-semibold">{isDetail ? 'Detail Banner' : isEdit ? 'Edit Banner' : 'Add Banner'}</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-4" style={{ height: '1px', backgroundColor: '#DBDCDE', width: '100%' }}></div>

        {/* Form */}
        <form className="row g-3" onSubmit={handleSubmit}>
          {/* Banner Name */}
          <div className="col-md-6">
            <label htmlFor="name" className="form-label">
              Banner Name
            </label>
            <input type="text" placeholder="Enter Banner Name" className="bg-gray-100 form-control" id="name" name="name" readOnly={isDetail} value={bannerName} onChange={(e) => setBannerName(e.target.value)} />
          </div>

          {/* Release Date */}
          <div className="col-md-6">
            <label htmlFor="releaseDate" className="form-label">
              Release Date
            </label>
            <div className="relative">
              <input
                type="text"
                id="releaseDate"
                name="releaseDate"
                className="bg-gray-100 form-control pr-10"
                placeholder="Select Release Date"
                value={releaseDate} // Reformatted value
                onFocus={handleDateFocus}
                onBlur={handleDateBlur}
                onChange={handleReleaseDateChange}
                readOnly={isDetail}
              />
              <img src={DateIcon} alt="Date icon" className="w-5 h-5 absolute top-1/2 right-2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* End Date */}
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
                value={endDate} // Reformatted value
                onFocus={handleDateFocus}
                onBlur={handleDateBlur}
                onChange={handleEndDateChange}
                readOnly={isDetail}
              />
              <img src={DateIcon} alt="Date icon" className="w-5 h-5 absolute top-1/2 right-2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Target URL */}
          <div className="col-md-6">
            <label htmlFor="targetUrl" className="form-label">
              Target URL
            </label>
            <input type="text" placeholder="Enter Target URL" className="bg-gray-100 form-control" id="targetUrl" name="targetUrl" readOnly={isDetail} value={targetURL} onChange={(e) => setTargetURL(e.target.value)} />
          </div>

          {/* Banner Type */}
          <div className="col-md-6">
            <label htmlFor="bannerType" className="form-label">
              Banner Type
            </label>
            <select className="bg-gray-100 form-select" id="bannerType" name="bannerType" disabled={isDetail} value={bannerType} onChange={(e) => setBannerType(e.target.value)}>
              <option value="">Select Banner Type</option>
              <option value="main">Main Banner</option>
              <option value="promo">Promo Banner</option>
              <option value="secondary">Secondary Banner</option>
            </select>
          </div>

          {/* Banner Photo */}
          <div className="col-md-6">
            <label className="form-label">Banner Photo</label>
            <div className="p-4 bg-gray-100 card">
              <label htmlFor="upload" className="flex flex-col items-center justify-center max-w-full py-3 text-base font-semibold text-gray-500 bg-gray-100 border-dashed rounded cursor-pointer border-3 border-primarycstm">
                <img src={Download} alt="upload image" />
                <div className="flex">
                  <p>
                    <span className="text-primarycstm">Click to upload</span> or drag and drop
                  </p>
                </div>
                <input
                  type="file"
                  id="upload"
                  name="upload"
                  className="hidden"
                  ref={fileInputRef} // Attach the reference to the file input
                  onChange={(e) => setBannerPhoto(e.target.files[0])}
                  readOnly={isDetail}
                />
                <p>SVG, PNG, JPG</p>
                <p className="text-gray-400">(max, 800x400px)</p>
              </label>

              {/* Display preview if banner photo is uploaded */}
              {bannerPhoto && (
                <div
                  className="mt-3 flex items-center justify-between border rounded-md px-4 py-2"
                  style={{
                    border: '1px solid #DB4444',
                    color: '#DB4444',
                  }}
                >
                  {/* Left: Photo Icon and File Name */}
                  <div className="flex items-center">
                    <img src={BannerPhotoIcon} alt="Banner Icon" className="mr-3" />
                    <span
                      style={{
                        fontFamily: 'Poppins',
                        fontWeight: 400,
                      }}
                    >
                      {bannerPhoto.name}
                    </span>
                  </div>

                  {/* Right: Delete Button */}
                  <button type="button" onClick={handleDeletePhoto} className="p-1">
                    <img src={BannerTrashIcon} alt="Delete Banner" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-row-reverse gap-3 col-12">
            {isDetail ? (
              // -- DETAIL MODE: Only show the "Close" button.
              <button type="button" className="w-32 btn" style={{ backgroundColor: '#89868D', color: '#FFFFFF' }} onClick={() => navigate('/banner')}>
                Close
              </button>
            ) : (
              // -- ADD / EDIT MODE: Show "Save"/"Add" and "Cancel".
              <>
                <button
                  type="submit"
                  className="w-32 btn btn-danger"
                  // if you want to re-disable the button based on fields:
                  // disabled={!bannerName || !releaseDate || !endDate || !targetURL || !bannerType || !bannerPhoto}
                >
                  {isEdit ? 'Save' : 'Add Banner'}
                </button>
                <button type="button" className="w-32 btn btn-outline-danger" onClick={() => navigate('/banner')}>
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

export default BannerFormComponent;

