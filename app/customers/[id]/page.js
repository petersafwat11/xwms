import Form from '@/ui/customers/form/Form';
import React from 'react'
import { fetchRecordById } from '@/lib/tablePagesHelperFunctions'
import { cookies } from 'next/headers'
const page = async ({params}) => {
    const cookieStore = await cookies()
    const user = JSON.parse(cookieStore.get('user')?.value)
    const { entity_code, company } = user
    const { id } = await params;

    // Pass them to fetchRecords for pagination
    let data=null; 
    if (id!="create") {
        data = await fetchRecordById('customer', id);
    }
  
    return (
        <div className="form_page">
            <Form id={id} fetchedData={data} company={company} entity_code={entity_code}/>
        </div>
    )
}

export default page