import { fetchRecordById } from '@/lib/tablePagesHelperFunctions'
import { fetchPartnerCodeOptions } from '@/lib/formPagesHelperFunctions'
import Form from '@/ui/commodity/form/Form'
import { cookies } from 'next/headers'
import React from 'react'
const page = async ({params}) => {
    const cookieStore = await cookies()
    const user = JSON.parse(cookieStore.get('user')?.value)
    const { entity_code, company } = user;
    const { id } = await params;
    let data=null; 
    let partner_codes=null;
    if (id!="create") {
        data = await fetchRecordById('commodity', id);
    }
    else{
        partner_codes = await fetchPartnerCodeOptions(company, entity_code);
    }
    return (
        <div className="form_page">
            <Form fetchedData={data} id={id} company={company} entity_code={entity_code} partner_codes={partner_codes}/>
        </div>
    )
}

export default page