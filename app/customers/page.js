import Wrapper from '@/ui/wrapper/Wrapper'
import React from 'react'
import { fetchRecords } from '@/lib/tablePagesHelperFunctions'
import { PartnerrequiredFields, PartnerSortableFields } from '@/utils/tablesHeader'
import { cookies } from 'next/headers'

const page = async ({ searchParams }) => {
  const cookieStore = await cookies()
  const user = JSON.parse(cookieStore.get('user')?.value)
  const { entity_code, company } = user
  // Extract page and rows from searchParams
  const page = searchParams?.page || 1;
  const rows = searchParams?.rows || 10;
  console.log("user", user)
  // Pass them to fetchRecords for pagination
  const data = await fetchRecords('customer');
  
  return (
    <div>
      <Wrapper 
        data={data} 
        requiredFields={PartnerrequiredFields} 
        sortableFields={PartnerSortableFields} 
      />
    </div>
  )
}

export default page