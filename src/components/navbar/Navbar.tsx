import React from 'react';
import SearchBar from '@/components/elements/SearchBar';
import MiniNavbar from '@/components/navbar/MiniNavbar';
import Login from '@/components/elements/Login';
import ShoppingCartPopup from './ShoppingCartPopup';
import Language from '@/components/elements/Language';
import Notification from '@/components/elements/Notification';
import Logo from '@/components/elements/Logo';
import { ProductCategoryMdl } from '@/models/products/category';
import Link from 'next/link';
import LinkItem from '../elements/LinkItem';

const Navbar = async () => {
  // TODO: will be handle in next sprint
  // const suggestionCategories = await getTopSellingProductCategories();
  const suggestionCategories: ProductCategoryMdl[] = [
    { id: '1', name: 'Coffee', iconUrl: '' },
    { id: '2', name: 'Yến', iconUrl: '' },
    { id: '3', name: 'Thực phẩm', iconUrl: '' },
    { id: '4', name: 'Trái cây', iconUrl: '' },
    { id: '5', name: 'Mặt nạ', iconUrl: '' },
    { id: '6', name: 'Rượu', iconUrl: '' },
    { id: '7', name: 'Dầu', iconUrl: '' },
  ];

  return (
    <header
      className={`stick z-50 block w-full bg-[rgba(255,255,255,0.9)] shadow-md`}
    >
      <MiniNavbar />
      <nav
        className={`] z-50 mx-auto flex h-28 w-full max-w-[2560px] flex-row gap-5 px-8`}
      >
        <div className="w-[20%]">
          <Logo />
        </div>
        <div className="flex w-[80%] flex-col">
          <div className="flex h-[65%] w-full flex-row items-center justify-between">
            <SearchBar />
            <div className="flex h-full w-[35%] flex-row items-center justify-end gap-8">
              <Notification>
                <Link href={''}>Mua coffee thành công</Link>
                <Link href={''}>Chuyển khoản thành công</Link>
                <Link href={''}>Đặt hàng thành công</Link>
              </Notification>
              <ShoppingCartPopup />
              <Login />
              <Language />
            </div>
          </div>
          <ul className="flex h-[35%] items-center justify-start gap-2">
            {suggestionCategories.map((category: ProductCategoryMdl) => (
              <li key={category.id} className="flex h-full items-center">
                <LinkItem href={category.id}>
                  <p className="font-medium">{category.name}</p>
                </LinkItem>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
