import Form from '@/ui/commodity/form/Form'
import React from 'react'
const page = async ({params}) => {

    const { id } = await params;
    return (
        <div className="form_page">
            <Form id={id} />
        </div>
    )
}

export default page