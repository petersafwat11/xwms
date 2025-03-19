import Wrapper from '@/ui/wrapper/Wrapper'
import React from 'react'
import { fetchRecords } from '@/lib/tablePagesHelperFunctions'
import { WarehouseRequiredFields } from '@/utils/tablesHeader'
import { cookies } from 'next/headers'

const page = async ({ searchParams }) => {
  const cookieStore = await cookies()
  const user = JSON.parse(cookieStore.get('user')?.value)
  const { entity_code, company } = user
  // Extract page and rows from searchParams
  const { page, rows } = await searchParams;
  // Pass them to fetchRecords for pagination
  const data = await fetchRecords('warehouse');
  
  return (
    <div>
      <Wrapper 
        data={data} 
        rowKey='warehouse_code'
        requiredFields={WarehouseRequiredFields} 
        sortableFields={[]} 
      />
    </div>
  )
}

export default page