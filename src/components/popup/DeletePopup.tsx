import React from 'react';
import Image from 'next/image';

interface PopupProps {
    show: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const Popup: React.FC<PopupProps> = ({ show, onClose, onConfirm }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md shadow-md text-center">
                <p className="mb-4">Bạn có muốn xóa sản phẩm này không?</p>
                <Image src="/icons/delete.svg" alt="delete-icon" width={70} height={70} className="mx-auto mb-4" />
                <div className="flex justify-center mt-4">
                    <button onClick={onConfirm} className="w-1/3 mr-2 border border-green-800 text-green-800 rounded-md px-4 py-2">Có</button>
                    <button onClick={onClose} className="w-1/3 ml-2 bg-green-600 text-white rounded-md px-4 py-2">Không</button>
                </div>
            </div>
        </div>
    );
};

export default Popup;
