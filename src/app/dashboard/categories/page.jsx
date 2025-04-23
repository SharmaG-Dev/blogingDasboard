"use client"
import CategoryForm from '@/components/categories/CategoryForm';
import DeleteConfirmation from '@/components/globals/DeleteConfirmations';
import Modal from '@/components/globals/Modal';
import PageLayout from '@/components/layout/PageLayout';
import { PenIcon, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

const CategoryDashboard = () => {
    const [categories, setCategories] = useState([
        {
            id: 1,
            name: 'Electronics',
            description: 'Electronic devices and accessories',
            items: 45,
            image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 2,
            name: 'Clothing',
            description: 'Apparel and fashion items',
            items: 32,
            image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        }
    ]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', description: '', image: '' });
    const [deleteId, setDeleteId] = useState(null);

    const openCreate = () => {
        setFormData({ name: '', description: '', image: '' });
        setSelectedCategory(null);
        setIsModalOpen(true);
    };

    const openEdit = (cat) => {
        setSelectedCategory(cat);
        setFormData({ name: cat.name, description: cat.description, image: cat.image });
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedCategory) {
            setCategories(categories.map(c => c.id === selectedCategory.id ? { ...c, ...formData } : c));
        } else {
            const newCategory = { ...formData, id: Date.now(), items: 0 };
            setCategories([...categories, newCategory]);
        }
        setIsModalOpen(false);
        setSelectedCategory(null);
    };

    const handleDelete = () => {
        setCategories(categories.filter(c => c.id !== deleteId));
        setDeleteId(null);
    };


    return (
        <PageLayout>
            <div className="min-h-screen p-4">
                {/* Header */}
                <div className="max-w-7xl mx-auto mb-8">
                    <div className="flex justify-between items-center p-3">
                        <h1 className="text-xl font-bold text-primary">Category Manager</h1>
                        <button
                            onClick={openCreate}
                            className="bg-primary text-light px-4 py-2 rounded-lg hover:bg-primary transition-colors flex items-center gap-2"
                        >
                            <Plus />
                            Add Category
                        </button>
                    </div>
                </div>

                {/* Categories Grid */}
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map(category => (
                        <div key={category.id} className="bg-light rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="aspect-video rounded-t-xl overflow-hidden">
                                <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2 text-gray-800">{category.name}</h3>
                                <p className="text-secondary mb-4">{category.description}</p>
                                <div className="flex justify-between items-center">
                                    <span className="inline-block bg-primary-lightest text-primary px-3 py-1 rounded-full text-sm">
                                        {category.items} items
                                    </span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => openEdit(category)}
                                            className="p-2 hover:bg-secondary-lightest rounded-lg text-secondary hover:text-primary"
                                        >
                                            <PenIcon className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={() => setDeleteId(category.id)}
                                            className="p-2 hover:bg-secondary-lightest rounded-lg text-secondary hover:text-red-600"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <Modal
                    isOpen={isModalOpen}
                    title={selectedCategory ? 'Edit Category' : 'Create New Category'}
                    onClose={() => { setIsModalOpen(false); setSelectedCategory(null); }}
                >
                    <CategoryForm
                        formData={formData}
                        onChange={setFormData}
                        onSubmit={handleSubmit}
                        onCancel={() => setIsModalOpen(false)}
                        isEditing={Boolean(selectedCategory)}
                    />
                </Modal>

                <DeleteConfirmation
                    isOpen={Boolean(deleteId)}
                    onCancel={() => setDeleteId(null)}
                    onConfirm={handleDelete}
                />
            </div>
        </PageLayout>
    );
};

export default CategoryDashboard;