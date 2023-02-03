import React from "react";

export default function ServerCardSpecs({resource}) {
    return (
        <dl className="flex items-center space-x-6 mt-2">
            <div>
                <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Cores</dt>
                <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-300">{resource.cpu_cores ?? '-'}</dd>
            </div>
            <div>
                <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Ghz</dt>
                <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-300">{resource.cpu_freq ?? '-'}</dd>
            </div>
            <div>
                <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Disk
                    GB
                </dt>
                <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-300">{resource.disk_gb ?? '-'}</dd>
            </div>
            <div>
                <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">RAM
                    MB
                </dt>
                <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-300">{new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(resource.ram_mb)}</dd>
            </div>
        </dl>
    );
}
