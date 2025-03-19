import Form from '@/ui/werehouse/form/Form'
import React from 'react'
import { fetchRecordById } from '@/lib/tablePagesHelperFunctions'
import { cookies } from 'next/headers'
const page = async ({params}) => {
    const cookieStore = await cookies()
    const user = JSON.parse(cookieStore.get('user')?.value)
    const { entity_code, company } = user;
    const { id } = await params;
    let data=null; 
    if (id!="create") {
        data = await fetchRecordById('warehouse', id);
    }

    return (
        <div className="form_page">
            <Form id={id} company={company} entity_code={entity_code} fetchedData={data}/>
        </div>
    )
}

export default page