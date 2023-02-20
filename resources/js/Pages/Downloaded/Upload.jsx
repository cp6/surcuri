import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm} from '@inertiajs/inertia-react';
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import {Select} from "flowbite-react";
import React from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import ResponseAlert from "@/Components/Alert";
import BackButton from "@/Components/BackButton";

export default function Upload({auth, resource, connections, alert_type, alert_message}) {

    const {data, setData, post, processing, reset, errors} = useForm({
        connection_id: '',
        save_as: resource.saved_as
    });

    const [hasAlert, setHasAlert] = React.useState(true);

    const submit = (e) => {
        e.preventDefault();

        post(route('downloaded.upload', resource.id));
        navigate(route('downloaded.show', resource.id));
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Upload {resource.saved_as} to SFTP</h2>}
        >
            <Head title={"Upload " + resource.saved_as}/>
            <div className="py-8 px-2 mx-auto max-w-7xl lg:py-10">
                <div className="flex flex-wrap gap-2 mb-4">
                    <BackButton href={route('downloaded.index')}>Back to downloaded files</BackButton>
                </div>
                <ResponseAlert has_an_alert={hasAlert} alert_type={alert_type}
                               alert_message={alert_message}></ResponseAlert>
                <div className="bg-white dark:bg-gray-700 overflow-hidden shadow-sm sm:rounded-lg p-2 sm:p-6">
                    <form onSubmit={submit}>
                        <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-6 sm:gap-4">

                            <div className="sm:col-span-2 col-span-4">
                                <div className="mb-2 block">
                                    <InputLabel forInput="connection_id" value="SFTP connection"/>
                                </div>
                                <Select onChange={(e) => setData('connection_id', e.target.value)}
                                        name="connection_id"
                                        required={true}
                                        value={data.connection_id}
                                        handleChange={(e) => setData('connection_id', e.target.value)}
                                >
                                    <option value=''>Choose</option>
                                    {connections.map(conn => <option key={conn.id}
                                                                    value={conn.id}>{conn.username}@{conn.server.hostname} ({conn.server.title})</option>)}
                                </Select>
                            </div>

                            <div className="sm:col-span-4 col-span-4">
                                <InputLabel forInput="save_as" value="Save as"/>
                                <TextInput
                                    name="save_as"
                                    className="mt-1 block w-full"
                                    autoComplete="save_as"
                                    value={data.save_as}
                                    handleChange={(e) => setData('save_as', e.target.value)}
                                    maxLength={125}
                                    required={true}
                                />
                                <InputError message={errors.save_as} className="mt-2"/>
                            </div>
                        </div>
                        <PrimaryButton
                            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                            processing={processing}>
                           Upload
                        </PrimaryButton>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}