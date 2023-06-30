import { Head, Link } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import AuthenticatedLayout from '@/Admin/Layouts/AuthenticatedLayout';
import InputLabel from '@/Admin/Components/InputLabel';
import TextInput from '@/Admin/Components/TextInput';
import FileInput from '@/Admin/Components/FileInput';
import TextArea from '@/Admin/Components/TextArea';
import InputError from '@/Admin/Components/InputError';
import PrimaryButton from '@/Admin/Components/PrimaryButton';
import PrimaryButtonWithButtonType from '@/Admin/Components/PrimaryButtonWithButtonType';

export default function Create({ auth, mustVerifyEmail, status }) {
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        name: '',
        image: '',
        description: '',
    });
    const submit = (e) => {
        e.preventDefault();

        post(route('categories.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Categories</h2>}
        >
            <Head title="Create Category" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <section className="">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900">Create Category</h2>

                                <p className="mt-1 text-sm text-gray-600">
                                    Add below details for create category.
                                </p>
                            </header>

                            <form onSubmit={submit} className="mt-6 space-y-6" noValidate>
                                <div>
                                    <InputLabel htmlFor="name" value="Name" />

                                    <TextInput
                                        id="name"
                                        className="mt-1 block w-full"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                        isFocused
                                        autoComplete="name"
                                    />

                                    <InputError className="mt-2" message={errors.name} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="image" value="Image" />

                                    <FileInput
                                        id="image"
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('image', e.target.files[0])}
                                        required
                                        autoComplete="image"
                                    />

                                    <InputError className="mt-2" message={errors.image} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="description" value="Description" />

                                    <TextArea
                                        id="description"
                                        className="mt-1 block w-full"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        required
                                        autoComplete="description"
                                    />

                                    <InputError className="mt-2" message={errors.description} />
                                </div>

                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={processing}>Save</PrimaryButton>
                                    <Link
                                        className=""
                                        href={route('categories.index')}
                                        >
                                            <PrimaryButtonWithButtonType>Cancel</PrimaryButtonWithButtonType>
                                    </Link>
                                    <Transition
                                        show={recentlySuccessful}
                                        enterFrom="opacity-0"
                                        leaveTo="opacity-0"
                                        className="transition ease-in-out"
                                    >
                                        <p className="text-sm text-gray-600">Saved.</p>
                                    </Transition>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
