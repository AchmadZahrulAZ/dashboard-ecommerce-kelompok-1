import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import PromotionListComponent from '../components/Promotion/PromotionListComponent';
import PromotionFormComponent from '../components/Promotion/PromotionFormComponent';

const PromotionPage = () => {
  const location = useLocation();
  const { id } = useParams();

  const isAdd = location.pathname.includes('/add');
  const isEdit = location.pathname.includes('/edit');
  const isDetail = location.pathname.includes('/detail');

  // State to manage the promotions list
  const [promotions, setPromotions] = useState([
    {
      id: 1,
      promotionType: 'Direct Discount',
      promotionName: 'Promosi Akhir Tahun',
      product: 'Laptop Pavilion',
      startDate: '02/11/2024',
      endDate: '11/11/2024',
      discount: '20%',
      usageLimit: '100',
      description: 'Potongan 10% dengan pembelian di atas 100rb',
      showVoucherOnCheckout: false, // only relevant if Voucher Code
      status: 'Active',
      published: true,
    },
    {
      id: 2,
      promotionType: 'Voucher Code',
      voucherCode: 'CUCIGUDANG30',
      promotionName: 'Cuci Gudang',
      product: 'Laptop HP',
      startDate: '01/11/2024',
      endDate: '10/11/2024',
      discount: '30%',
      usageLimit: '50',
      description: 'Potongan 10% dengan pembelian di atas 100rb',
      showVoucherOnCheckout: true,
      status: 'Active',
      published: false,
    },
    {
      id: 3,
      promotionType: 'Direct Discount',
      promotionName: 'Spesial Kemerdekaan',
      product: 'Monitor 24inch',
      startDate: '29/10/2024',
      endDate: '09/11/2024',
      discount: '10%',
      usageLimit: '150',
      description: 'Potongan 10% dengan pembelian di atas 100rb',
      showVoucherOnCheckout: false,
      status: 'Inactive',
      published: false,
    },
    {
      id: 4,
      promotionType: 'Direct Discount',
      promotionName: 'Hari Kartini',
      product: 'Keyboard Wireless',
      startDate: '21/10/2024',
      endDate: '30/10/2024',
      discount: '15%',
      usageLimit: '100',
      description: 'Potongan 10% dengan pembelian di atas 100rb',
      showVoucherOnCheckout: false,
      status: 'Inactive',
      published: false,
    },
  ]);

  // If we are editing or viewing details, find the promotion by ID
  let selectedPromotion = null;
  if (isEdit || isDetail) {
    selectedPromotion = promotions.find(
      (promotion) => promotion.id === Number(id)
    );
  }

  return (
    <>
      {/* List Mode */}
      {!isAdd && !isEdit && !isDetail && (
        <PromotionListComponent
          promotions={promotions}
          setPromotions={setPromotions}
        />
      )}

      {/* Form (Add/Edit/Detail) */}
      {(isAdd || isEdit || isDetail) && (
        <PromotionFormComponent
          isEdit={isEdit}
          isDetail={isDetail}
          setPromotions={setPromotions}
          promotionData={selectedPromotion}
        />
      )}
    </>
  );
};

export default PromotionPage;
