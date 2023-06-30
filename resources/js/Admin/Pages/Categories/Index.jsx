import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

import AuthenticatedLayout from '@/Admin/Layouts/AuthenticatedLayout';
import PrimaryButtonWithButtonType from '@/Admin/Components/PrimaryButtonWithButtonType';
import DangerButton from '@/Admin/Components/DangerButton';
import BlueButton from '@/Admin/Components/BlueButton';
import SuccessButton from '@/Admin/Components/SuccessButton';

export default function Index({ auth, categories }) {
    const [filter, setFilter] = useState('');
    const [search, setSearch] = useState('');

    const handleFilter = (e) => {
        setFilter(e.target.value);
        const url = route('categories.index', { category_id: e.target.value });
        window.location.href = url;
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
        const url = route('categories.index', { search: e.target.value });
        window.location.href = url;
    };

    const handleCreate = () => {
        const url = route('categories.create');
        window.location.href = url;
    };

    const handleOnDelete = (id) => {
        if (confirm('Are you sure you want to delete this category?')) {
            Inertia.delete(route('categories.destroy', {id}));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Categories</h2>}
        >
            <Head title="Categories Listing" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <section className="">
                            <header className="">
                                <h2 className="text-lg font-medium text-gray-900">Categories Listing</h2>
                                <div className="flex flex-row-reverse">
                                    {/* <SearchFilter /> */}
                                    <Link
                                    className=""
                                    href={route('categories.create')}
                                    >
                                        <PrimaryButtonWithButtonType>
                                            Create Organization
                                        </PrimaryButtonWithButtonType>
                                    </Link>
                                </div>
                            </header>
                            <div>
                                <div className="overflow-x-auto bg-white rounded shadow">
                                    <table className="w-full whitespace-nowrap table-auto">
                                        <thead>
                                            <tr className="font-bold text-left">
                                                <th className="px-6 pt-5 pb-4">Name</th>
                                                <th className="px-6 pt-5 pb-4">Description</th>
                                                <th className="px-6 pt-5 pb-4">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {categories.data.map(({ id, name, description }) => {
                                            return (
                                                <tr
                                                key={id}
                                                className="hover:bg-gray-100 focus-within:bg-gray-100"
                                                >
                                                    <td className="border-t">
                                                        <Link
                                                        href={route('categories.edit', id)}
                                                        className="flex items-center px-6 py-4 focus:text-indigo-700 focus:outline-none"
                                                        >
                                                        {name}
                                                        </Link>
                                                    </td>
                                                    <td className="border-t">
                                                        <Link
                                                        tabIndex="-1"
                                                        href={route('categories.edit', id)}
                                                        className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                                                        >
                                                        {description}
                                                        </Link>
                                                    </td>
                                                    <td className="border-t flex py-4 space-x-2">
                                                        <Link href={route('categories.show', id)}>
                                                            <BlueButton>
                                                                View
                                                            </BlueButton>
                                                        </Link>
                                                        <Link href={route('categories.edit', id)}>
                                                            <SuccessButton>
                                                                Edit
                                                            </SuccessButton>
                                                        </Link>
                                                        <DangerButton
                                                            onClick={(id) => {handleOnDelete(id)}}
                                                            type="button">
                                                            Delete
                                                        </DangerButton>
                                                    </td>
                                                </tr>
                                            );
                                            })}
                                            {categories.data.length === 0 && (
                                            <tr>
                                                <td className="px-6 py-4 border-t" colSpan="4">
                                                No categories found.
                                                </td>
                                            </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                {/* <Pagination links={links} /> */}
                            </div>
                    </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
