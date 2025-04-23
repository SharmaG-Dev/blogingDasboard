import React from 'react';

export default function CategoryForm({ formData, onChange, onSubmit, onCancel, isEditing }) {
    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.name}
                    onChange={e => onChange({ ...formData, name: e.target.value })}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    rows="3"
                    value={formData.description}
                    onChange={e => onChange({ ...formData, description: e.target.value })}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.image}
                    onChange={e => onChange({ ...formData, image: e.target.value })}
                />
            </div>
            {formData.image && (
                <div className="aspect-video rounded-lg border overflow-hidden">
                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                </div>
            )}
            <div className="flex justify-end gap-3 pt-6">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                    {isEditing ? 'Save Changes' : 'Create Category'}
                </button>
            </div>
        </form>
    );
}