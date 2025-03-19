'use client';

import React, { useState } from 'react';
import Checkbox from './Checkbox';
import DeletePopup from '../popup/DeletePopup';
import Button from './Button';
import { GoTrash } from 'react-icons/go';
import { ICartPayload } from '@/lib/types';
import { useAppDispatch } from '@/hooks/redux';
import { addCartItem, removeCartItem } from '@/lib/features/checkout/cartSlice';
import NumberInput from './NumberInput';
import Image from 'next/image';
import { formatCurrency } from '@/utils/core';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import { InventoryMdl } from '@/models/products/inventory';
import clsx from 'clsx';
import { BiCheckCircle, BiChevronDown } from 'react-icons/bi';

type ShoppingCartItemProps = {
  cartPayload: ICartPayload;
  item: 'shopping-cart' | 'icon';
  isSelect?: boolean;
  onSelect?: (val: boolean) => void;
  onChangeInventory?: (val: InventoryMdl | undefined) => void;
};

const ShoppingCartItem = ({
  cartPayload,
  item,
  isSelect,
  onSelect,
  onChangeInventory,
}: ShoppingCartItemProps) => {
  const [showDeletePop, setShowDeletePop] = useState(false);

  const dispatch = useAppDispatch();

  const [selectedType, setSelectedType] = useState<InventoryMdl | string>(
    cartPayload.itemMdl.inventories[0]?.variantName || 'Loại'
  );

  const onConfirmDelete = () => {
    dispatch(removeCartItem({ ...cartPayload, quantity: -1 }));

    setShowDeletePop(false);
  };

  const handleCartItemValChange = (val: number, cartPayload: ICartPayload) => {
    if (!val) {
      return;
    }

    const changedNum = val - cartPayload.quantity;

    if (changedNum > 0) {
      dispatch(addCartItem({ ...cartPayload, quantity: changedNum }));
    } else if (changedNum < 0) {
      dispatch(
        removeCartItem({ ...cartPayload, quantity: Math.abs(changedNum) })
      );
    }
  };

  const handleChangeInventory = (val: InventoryMdl) => {
    if (!onChangeInventory) return;

    if (!val) return onChangeInventory(undefined);

    setSelectedType(val);
    onChangeInventory(val);
  };

  return item === 'shopping-cart' ? (
    <div key={cartPayload.itemMdl.id} className="grid grid-cols-12 gap-3 py-4">
      <div className="col-span-6 flex max-h-20 gap-4">
        <Checkbox
          id={cartPayload.itemMdl.id}
          value={isSelect}
          onCheck={onSelect}
        >
          <Checkbox.Indicator />
        </Checkbox>
        <div className="flex gap-3">
          <Image
            src={cartPayload.itemMdl.imageUrl}
            alt={'Brand Name'}
            width={70}
            height={50}
            className="block rounded-md border-[0.5px] border-informal"
          />
          <div className="flex flex-col justify-between">
            <h2 className="text-base font-normal">
              {cartPayload.itemMdl.name}
            </h2>
            <Listbox value={selectedType} onChange={handleChangeInventory}>
              <ListboxButton
                aria-placeholder="Product Characteristic"
                className={clsx(
                  'relative flex w-28 items-center justify-between rounded-md border-[0.5px] border-informal bg-white px-2 py-1.5 text-left text-sm/6',
                  'focus:outline-none'
                )}
              >
                <span className="block text-sm">
                  {(typeof selectedType !== 'string' &&
                    selectedType?.variantValue) ||
                    selectedType.toString()}
                </span>
                <BiChevronDown
                  className="pointer-events-none size-4 fill-slate-800"
                  aria-hidden="true"
                />
              </ListboxButton>
              <ListboxOptions
                anchor={{ to: 'bottom start', gap: 2 }}
                transition
                className={clsx(
                  'flex w-36 flex-col gap-1 rounded-md border border-informal bg-white py-1 shadow-inner focus:outline-none',
                  'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
                )}
              >
                {cartPayload.itemMdl.inventories.map((inventory, index) => (
                  <ListboxOption
                    key={index}
                    value={inventory}
                    className="group flex select-none items-center justify-between gap-2 px-2 py-1 text-sm hover:cursor-pointer hover:bg-green-50 data-[selected]:text-primary"
                  >
                    <div className="flex items-center gap-2">
                      <span className="invisible block h-5 border-l border-l-informal group-data-[focus]:visible"></span>
                      <span>{inventory.variantValue}</span>
                    </div>
                    <BiCheckCircle className="invisible size-4 fill-black group-data-[selected]:visible group-data-[selected]:fill-primary" />
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Listbox>
          </div>
        </div>
      </div>
      <div className="col-span-6 grid grid-cols-12 items-center justify-items-center gap-1">
        <span className="col-span-3 block text-base">
          {formatCurrency(
            (typeof selectedType !== 'string' && selectedType?.price) ||
              cartPayload.itemMdl.price
          )}{' '}
          <u>đ</u>
        </span>
        <div className="col-span-5">
          <NumberInput
            value={cartPayload.quantity}
            size="small"
            onValChange={(val) => {
              handleCartItemValChange(val, cartPayload);
            }}
          />
        </div>
        <span className="col-span-3 block text-base text-discount">
          {formatCurrency(
            (typeof selectedType !== 'string'
              ? selectedType.price
              : cartPayload.itemMdl.price) * cartPayload.quantity
          )}{' '}
          <u>đ</u>
        </span>
        <div className="col-span-1 justify-self-end">
          <Button
            onClick={() => setShowDeletePop(true)}
            className="group rounded-md border bg-[#ebf1f5] p-1 hover:border-primary"
          >
            <GoTrash className="size-4 text-informal group-hover:text-primary" />
          </Button>
        </div>
        <DeletePopup
          show={showDeletePop}
          onClose={() => setShowDeletePop(false)}
          onConfirm={onConfirmDelete}
        />
      </div>
    </div>
  ) : (
    <div className="mx-4 flex gap-3 overflow-hidden py-2">
      <div className="relative w-1/5">
        <Image
          src={cartPayload.itemMdl.imageUrl}
          alt={cartPayload.itemMdl.name}
          fill={true}
          className="rounded-md"
        />
      </div>
      <div className="flex w-4/5 flex-col">
        <h3 className="text-base font-medium">{cartPayload.itemMdl.name}</h3>
        {/* TODO: [EW-101] enhance later */}
        <div>
          <span className="text-sm text-discount">
            {formatCurrency(cartPayload.itemMdl.price)} đ
          </span>
        </div>
        {/* {cartPayload.itemMdl.discount ? (
          <div className="flex text-sm gap-2 items-center">
            <span className="text-discount">
              {formatCurrency(cartPayload.itemMdl.discount.discountPrice)} đ
            </span>
            <span className="line-through text-xs text-informal">
              {formatCurrency(cartPayload.itemMdl.price)} đ
            </span>
          </div>
        ) : (
          <div>
            <span className="text-default">
              {formatCurrency(cartPayload.itemMdl.price)} đ
            </span>
          </div>
        )} */}
        <div className="flex justify-between">
          <div className="flex h-full w-full flex-row items-center justify-start gap-2">
            <NumberInput
              size="small"
              value={cartPayload.quantity}
              onValChange={(val) => {
                handleCartItemValChange(val, cartPayload);
              }}
            />
          </div>
          <Button
            onClick={() => setShowDeletePop(true)}
            className="flex h-7 min-h-5 w-8 min-w-7 items-center justify-center rounded bg-slate-100 shadow-inner data-[hover]:bg-slate-200 data-[hover]:text-green-900"
          >
            <GoTrash />
          </Button>
          <DeletePopup
            show={showDeletePop}
            onClose={() => setShowDeletePop(false)}
            onConfirm={onConfirmDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartItem;
