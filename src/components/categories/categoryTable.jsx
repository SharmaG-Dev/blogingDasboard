"use client"

import { Table } from "../globals"
import { useState } from "react"

export default function CategoryTable() {
  const [selectedRows, setSelectedRows] = useState([])

  const categoryData = [
    {
      id: 1,
      name: 'Electronics',
      image: '/images/categories/electronics.png',
      description: 'Devices and gadgets including smartphones, laptops, and accessories.',
    },
    {
      id: 2,
      name: 'Clothing',
      image: '/images/categories/clothing.png',
      description: 'Apparel for men, women, and children across all styles.',
    },
    {
      id: 3,
      name: 'Home & Kitchen',
      image: '/images/categories/home_kitchen.png',
      description: 'Essentials and décor for living spaces and cooking.',
    },
    {
      id: 4,
      name: 'Books',
      image: '/images/categories/books.png',
      description: 'Fiction, non-fiction, textbooks, and more across genres.',
    },
    {
      id: 5,
      name: 'Toys',
      image: '/images/categories/toys.png',
      description: 'Fun and educational toys for kids of all ages.',
    },
  ]

  const columns = [
    {
      key: 'name',
      header: 'Category Name',
      headerClassName: 'text-start',
      renderCell: (category) => <span className='font-medium text-sm'>{category.name}</span>,
    },
    {
      key: 'image',
      header: 'Image',
      headerClassName: 'text-start',
      renderCell: (category) => (
        <img
          src={category.image}
          alt={category.name}
          className='h-10 w-10 rounded-md object-cover'
        />
      ),
    },
    {
      key: 'description',
      header: 'Description',
      headerClassName: 'text-start',
      renderCell: (category) => (
        <span className='text-sm text-gray-600'>{category.description}</span>
      ),
    },
  ]

  return (
    <Table
      data={categoryData}
      enableRowSelection
      selectedRows={selectedRows}
      onSelectedRowsChange={setSelectedRows}
      rowKey='id'
      headerRowClassName='bg-indigo-100'
      bodyRowClassName='border-b border-gray-200 hover:bg-gray-100 cursor-pointer'
      columns={columns}
      isPaginationEnabled={true}
      pageSize={5}
      renderEmpty={() => (
        <div className='text-center py-8'>No categories found</div>
      )}
      tableClassName='striped-table'
    />
  )
}
