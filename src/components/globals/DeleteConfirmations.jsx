export default function DeleteConfirmation({ title = "Delete Category", subtitle = " Are you sure you want to delete this category? This action cannot be undone.", isOpen, onCancel, onConfirm }) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full">
                <h3 className="text-xl font-semibold mb-4">{title}</h3>
                <p className="text-gray-600 mb-6">
                    {subtitle}
                </p>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                        Confirm Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
