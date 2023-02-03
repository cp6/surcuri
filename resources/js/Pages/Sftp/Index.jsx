import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, usePage} from '@inertiajs/inertia-react';
import React from "react";
import {Button, Card} from "flowbite-react";
import {HiKey, HiPlus} from "react-icons/hi";
import ResponseAlert from "@/Components/Alert";

export default function Index({auth, connections, alert_type, alert_message}) {

    const [hasAlert, setHasAlert] = React.useState(true);

    const user = usePage().props.auth.user;
    const main_title = 'SFTP connections';
    const title = 'SFTP connection';
    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2
                className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">{main_title}</h2>}>
            <Head title={main_title}/>
            <div className="py-8 px-1 mx-auto max-w-7xl lg:py-10">
                <div className="flex flex-wrap gap-2 mb-4">
                    <Button color={'info'} size="xs" href={route('sftp.create')}>
                        <HiPlus className="mr-2 h-5 w-5" />
                        Add {title}
                    </Button>
                </div>
                <ResponseAlert has_an_alert={hasAlert} alert_type={alert_type}
                               alert_message={alert_message}></ResponseAlert>
                <div className="grid gap-2 grid-cols-1 sm:grid-cols-4 sm:gap-4">
                    {connections.map(connections => <Card key={connections.id}
                                                          href={route('sftp.show', connections.id)} className={'dark:bg-gray-700 hover:dark:bg-gray-900'}>
                        <div className="flex justify-end px-1">
                                             <span
                                                 className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                                                 {
                                                     (() => {
                                                         if (typeof (connections.key_id) != "undefined" && connections.key_id !== null) {
                                                             return (
                                                                 "KEY"
                                                             )
                                                         } else {
                                                             return (
                                                                 "PASSWORD"
                                                             )
                                                         }
                                                     })()
                                                 }
                                             </span>
                            <span
                                className="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                                                 PORT {connections.port}
                                             </span>
                        </div>
                        <div className="flex flex-col justify-center items-center pb-3">
                            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                                {connections.username}
                            </h5>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
             {connections.server.hostname}
      </span>
                        </div>
                    </Card>)}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}