import React, {useEffect, useState} from "react";
import axios from "axios";
import {FaCircle} from "react-icons/all";

export default function ServerStatusDot({resource}) {

    const [isUp, setIsUp] = useState(null);

    async function checkIsUp(resource) {
        const res = await axios.get(route('check-is-up', resource.id));
        return await res.data;
    }

    useEffect(() => {
        checkIsUp(resource).then((the_response) => {
            setIsUp(the_response.is_up);
        })
    }, []);

    return (
        <>
            <FaCircle
                className={
                    (() => {
                        if (isUp) {
                            return (
                                "md:ml-2 ml-1 h-3 w-3 text-green-300 dark:text-green-400 inline"
                            )
                        } else if (isUp === null) {
                            return (
                                "md:ml-2 ml-1 h-3 w-3 text-gray-300 dark:text-gray-500 inline"
                            )
                        } else {
                            return (
                                "md:ml-2 ml-1 h-3 w-3 text-red-300 dark:text-red-400 inline"
                            )
                        }
                    })()
                }
                title={(() => {
                    if (isUp) {
                        return (
                            "online"
                        )
                    } else if (isUp === null) {
                        return (
                            "unknown"
                        )
                    } else {
                        return (
                            "offline"
                        )
                    }
                })()}/>
        </>
    );
}
