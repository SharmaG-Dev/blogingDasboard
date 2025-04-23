import { useState, useEffect, useMemo, useCallback } from 'react'

const Table = ({
    data = [],
    columns,
    headerRowClassName = 'bg-gray-200',
    bodyRowClassName = '',
    headerShow = true,
    isPaginationEnabled = false,
    pageSize = 10,
    currentPage: propCurrentPage,
    onPageChange,
    renderPagination,
    tableClassName = 'w-full',
    renderHeader,
    renderBody,
    footerContent,
    isLoading = false,
    renderLoading = () => <div>Loading...</div>,
    renderEmpty = () => <div>No data available</div>,
    enableRowSelection = false,
    selectedRows: propSelectedRows,
    onSelectedRowsChange,
    rowKey = 'id',
    selectionHeaderClassName = '',
    selectionCellClassName = '',
}) => {
    const [internalCurrentPage, setInternalCurrentPage] = useState(1)
    const [internalSelectedRows, setInternalSelectedRows] = useState([])

    const currentPage =
        propCurrentPage !== undefined ? propCurrentPage : internalCurrentPage
    const selectedRows =
        propSelectedRows !== undefined ? propSelectedRows : internalSelectedRows

    const getRowKey = useCallback(
        (item) => {
            if (typeof rowKey === 'function') return rowKey(item)
            return item[rowKey]
        },
        [rowKey],
    )

    const handleSelectedRowsChange = useCallback(
        (newSelectedRows) => {
            if (onSelectedRowsChange) {
                onSelectedRowsChange(newSelectedRows)
            } else {
                setInternalSelectedRows(newSelectedRows)
            }
        },
        [onSelectedRowsChange],
    )

    useEffect(() => {
        if (propCurrentPage === undefined) {
            setInternalCurrentPage(1)
        }
    }, [data.length, propCurrentPage])

    const totalItems = data.length
    const totalPages = Math.ceil(totalItems / pageSize)
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedData = isPaginationEnabled
        ? data.slice(startIndex, endIndex)
        : data

    const paginatedRowKeys = useMemo(
        () => paginatedData.map((item) => getRowKey(item)),
        [paginatedData, getRowKey],
    )

    const areAllSelected =
        paginatedRowKeys.length > 0 &&
        paginatedRowKeys.every((key) => selectedRows.includes(key))

    const handleSelectAll = useCallback(() => {
        const newSelectedRows = new Set(selectedRows)

        if (areAllSelected) {
            paginatedRowKeys.forEach((key) => newSelectedRows.delete(key))
        } else {
            paginatedRowKeys.forEach((key) => newSelectedRows.add(key))
        }

        handleSelectedRowsChange([...newSelectedRows])
    }, [areAllSelected, paginatedRowKeys, selectedRows, handleSelectedRowsChange])

    const toggleRowSelection = useCallback(
        (key) => {
            const newSelectedRows = selectedRows.includes(key)
                ? selectedRows.filter((k) => k !== key)
                : [...selectedRows, key]
            handleSelectedRowsChange(newSelectedRows)
        },
        [selectedRows, handleSelectedRowsChange],
    )

    const internalColumns = useMemo(() => {
        if (!enableRowSelection) return columns

        const selectionColumn = {
            key: '__selection__',
            header: (
                <input
                    type='checkbox'
                    checked={areAllSelected}
                    onChange={handleSelectAll}
                    aria-label='Select all rows'
                    className={selectionHeaderClassName}
                />
            ),
            renderCell: (item) => {
                const key = getRowKey(item)
                return (
                    <input
                        type='checkbox'
                        checked={selectedRows.includes(key)}
                        onChange={() => toggleRowSelection(key)}
                        aria-label='Select row'
                        className={selectionCellClassName}
                    />
                )
            },
            headerClassName: selectionHeaderClassName,
            cellClassName: selectionCellClassName,
        }

        return [selectionColumn, ...columns]
    }, [
        enableRowSelection,
        columns,
        areAllSelected,
        handleSelectAll,
        getRowKey,
        selectedRows,
        toggleRowSelection,
        selectionHeaderClassName,
        selectionCellClassName,
    ])

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return
        if (onPageChange) {
            onPageChange(newPage)
        } else if (propCurrentPage === undefined) {
            setInternalCurrentPage(newPage)
        }
    }

    if (isLoading) {
        return renderLoading()
    }

    if (data.length === 0) {
        return renderEmpty()
    }

    return (
        <div className='card-table-container w-full'>
            <table className={`${tableClassName} w-full`}>
                {headerShow &&
                    (renderHeader ? (
                        renderHeader(internalColumns)
                    ) : (
                        <thead>
                            <tr className={headerRowClassName}>
                                {internalColumns.map((column, index) => (
                                    <th
                                        key={column.key}
                                        className={`p-3 px-5 text-sm ${index === 0 ? 'rounded-l-md' : ''
                                            } ${index === internalColumns.length - 1 ? 'rounded-r-md' : ''
                                            } ${column.headerClassName || ''}`}
                                    >
                                        {column.header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                    ))}

                {renderBody ? (
                    renderBody(paginatedData)
                ) : (
                    <tbody>
                        {paginatedData.map((item, rowIndex) => (
                            <tr key={rowIndex} className={bodyRowClassName}>
                                {internalColumns.map((column) => (
                                    <td
                                        key={column.key}
                                        className={`py-3 px-5 text-sm ${column.cellClassName || ''}`}
                                    >
                                        {column.renderCell
                                            ? column.renderCell(item)
                                            : item[column.key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                )}
                {footerContent && <tfoot>{footerContent}</tfoot>}
            </table>

            {isPaginationEnabled &&
                totalPages > 1 &&
                (renderPagination ? (
                    renderPagination({
                        currentPage,
                        totalPages,
                        handlePrevious: () => handlePageChange(currentPage - 1),
                        handleNext: () => handlePageChange(currentPage + 1),
                        gotoPage: handlePageChange,
                    })
                ) : (
                    <div className='pagination-controls flex justify-end items-center gap-4 p-4'>
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className='px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition-colors'
                        >
                            Previous
                        </button>
                        <span className='text-sm'>
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className='px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition-colors'
                        >
                            Next
                        </button>
                    </div>
                ))}
        </div>
    )
}

export default Table
