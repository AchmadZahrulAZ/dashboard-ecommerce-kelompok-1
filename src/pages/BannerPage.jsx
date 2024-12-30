import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import BannerListComponent from "../components/Banner/BannerListComponent";
import BannerFormComponent from "../components/Banner/BannerFormComponent";
import DummyBanner from "../assets/images/banner/DummyBanner.png";

const BannerPage = () => {
  const location = useLocation();
  const { id } = useParams();  // <-- extract the id

  const isAdd = location.pathname.includes("/add");
  const isEdit = location.pathname.includes("/edit");
  const isDetail = location.pathname.includes("/detail");

  // State to manage the banners list
  const [banners, setBanners] = useState([
    {
      id: 1,
      bannerPhoto: DummyBanner,
      bannerName: 'Promosi Akhir Tahun',
      targetURL: 'www.e-commerce.com',
      releaseDate: '09/11/2024',
      endDate: '12/11/2024',
      bannerType: 'main', 
      published: true,
    },
    {
      id: 2,
      bannerPhoto: DummyBanner,
      bannerName: 'Produk Baru',
      targetURL: 'www.e-commerce.com',
      releaseDate: '08/11/2024',
      endDate: '11/11/2024',
      bannerType: 'main', 
      published: false,
    },
    {
      id: 3,
      bannerPhoto: DummyBanner,
      bannerName: 'Diskon 30%',
      targetURL: 'www.e-commerce.com',
      releaseDate: '07/11/2024',
      endDate: '10/11/2024',
      bannerType: 'main', 
      published: false,
    },
    {
      id: 4,
      bannerPhoto: DummyBanner,
      bannerName: 'Giveaway',
      targetURL: 'www.e-commerce.com',
      releaseDate: '03/11/2024',
      endDate: '09/11/2024',
      bannerType: 'main', 
      published: false,
    },
  ]);

    // If we are editing or viewing details, find the banner by ID
    let selectedBanner = null;
    if (isEdit || isDetail) {
      selectedBanner = banners.find((banner) => banner.id === Number(id));
    }

  return (
    <>
      {!isAdd && !isEdit && !isDetail && (
        <BannerListComponent 
        banners={banners}
        setBanners={setBanners}
        />
      )}
      {(isAdd || isEdit || isDetail) && (
        <BannerFormComponent
          isEdit={isEdit}
          isDetail={isDetail}
          setBanners={setBanners} // Pass the setBanners function
          // banners={banners} // Optional, pass banners for editing or details
          bannerData={selectedBanner}
        />
      )}
    </>
  );
};

export default BannerPage;
