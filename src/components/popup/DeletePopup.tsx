import React from 'react';
import Image from 'next/image';
import Button from '../elements/Button';

interface DeletePopupProps {
  show: boolean;
  title?: string;
  onClose: (e: React.MouseEvent) => void;
  onConfirm: (e: React.MouseEvent) => void;
}

const DeletePopup: React.FC<DeletePopupProps> = ({
  show,
  title,
  onClose,
  onConfirm,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900 bg-opacity-40">
      <div className="h-64 w-96 rounded-md bg-white p-6 text-center shadow-2xl">
        <p className="mb-4 text-lg font-semibold text-primary">
          {title || 'Bạn có muốn xóa sản phẩm này không?'}
        </p>
        <Image
          src="/images/recycle-delete.png"
          alt="recycle-delete"
          width={70}
          height={70}
          className="mx-auto mb-4"
        />
        <div className="mt-4 flex justify-center font-medium">
          <Button
            onClick={onConfirm}
            className="mr-2 w-1/3 rounded-md border border-primary px-4 py-2 text-primary"
          >
            Có
          </Button>
          <Button
            onClick={onClose}
            className="ml-2 w-1/3 rounded-md bg-primary px-4 py-2 text-white"
          >
            Không
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
