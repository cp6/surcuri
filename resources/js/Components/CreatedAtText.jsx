import React from "react";
import {format} from "date-fns";

export default function CreatedAtText({created_at, string_format = 'hh:mma do LLL yyyy', pre_text = 'Created:'}) {

    let formatted_created_at_date = format(new Date(created_at), string_format);

    return (
        <p className="my-4 text-md leading-none text-gray-900 dark:text-white"><span
            className='font-light'>{pre_text}</span> {formatted_created_at_date}</p>
    );
}
