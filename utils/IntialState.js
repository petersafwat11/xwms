export const commodityInitialState = {
    company: '',
    entity_code: '',
    partner_code: '',
    commodity: '',
}

export const warehouseInitialState = {
    company: '',
    entity_code: '',
    warehouse_order: "",
    warehouse_code: '',
    warehouse_name: '',
    warehouse_address: '',
    warehouse_country: '',
    warehouse_postcode: '',
    warehouse_telephone: '',
    warehouse_contact: '',
    warehouse_email: '',
    warehouse_active: '',
}
// Columns:
//   - company (character varying, max length: 20) NOT NULL      
//   - entity_code (character varying, max length: 20) NOT NULL  
//   - warehouse_order (integer) NULL
//   - warehouse_code (character varying, max length: 20) NOT NULL
//   - warehouse_name (character varying, max length: 100) NOT NULL
//   - warehouse_address (character varying, max length: 300) NOT NULL
//   - warehouse_country (character varying, max length: 50) NULL
//   - warehouse_postcode (character varying, max length: 10) NULL
//   - warehouse_telephone (character varying, max length: 20) NULL
//   - warehouse_contact (character varying, max length: 50) NULL
//   - warehouse_email (character varying, max length: 200) NULL 
//   - warehouse_active (character, max length: 1) NOT NULL      

export const customerIntialState={
    partner_code: "",
    partner_active: "",
    partner_ref: "",
    partner_name: "",
    partner_address1: "",
    partner_address2: "",
    partner_address3: "",
    partner_city: "",
    partner_state: "",
    partner_country: "",
    partner_country_iso: "",
    partner_postcode: "",
    partner_tel_1: "",
    partner_tel_2: "",
    partner_tel_3: "",
    partner_fax_1: "",
    partner_telex: "",
    partner_contact_1: "",
    partner_contact_2: "",
    partner_sales_person: "",
    partner_cs_person: "",
    partner_email_1: "",
    partner_website: "",
    partner_gst_reg: "",
    partner_group: "",
    partner_terms: "",
    partner_currency: "",
    sales_type: "",
    partner_name_zh: "",
    partner_address_zh: "",
    khmer_name: "",
    khmer_address: "",
    partner_crno: "",
    partner_name_khmer: "",
    partner_address_khmer: "",
    partner_name_vn: "",
    partner_address_vn: "",
    partner_name_th: "",
    partner_address_th: "",
    partner_name_mm: "",
    partner_address_mm: "",
    partner_name_tw: "",
    partner_address_tw: "",
    partner_iso_code: "",
    partner_iata_code: "",
    partner_iata_account: "",
    partner_scac_code: "",
    partner_whatsapp: "",
    partner_wechat: "",
    partner_facebook: "",
    partner_line_id: "",
    partner_instagram: "",
    partner_class: "",
    wca_no: "",
    lognet_no: "",
    gaa_no: "",
    egln_no: "",
    partner_uen: "",
    partner_iec_code: "",
    partner_usci_code: "",
    partner_raca_code: "",
    iec_code: "",
    usci_code: "",
    raca_code: "",
    partner_status: 'N',
    partner_network: "",
    partner_category: "",
    partner_logo: "",
    partner_type: "",
    partner_roles: "",
    partner_term: 0,
    choose_sel: "N",
    partner_source: "",
    peppol_id: "",
    api_user: "",
    api_password: "",
    api_key: "",
    partner_label_file: "",
    role_wms: "N",
    role_lastmile: "N",
    role_contractor: "N",
    company: "",
    entity_code: ""
};


// Table: partner
// Columns:
//   - partner_code (character varying, max length: 20) NOT NULL 
//   - partner_active (character, max length: 1) NOT NULL        
//   - partner_ref (character varying, max length: 50) NOT NULL  
//   - partner_name (character varying, max length: 150) NOT NULL
//   - partner_address1 (character varying, max length: 100) NOT NULL
//   - partner_address2 (character varying, max length: 100) NULL
//   - partner_address3 (character varying, max length: 100) NULL
//   - partner_city (character varying, max length: 20) NULL     
//   - partner_state (character varying, max length: 20) NULL    
//   - partner_country (character varying, max length: 100) NULL 
//   - partner_country_iso (character, max length: 3) NULL       
//   - partner_postcode (character varying, max length: 10) NULL 
//   - partner_tel_1 (character varying, max length: 30) NULL    
//   - partner_tel_2 (character varying, max length: 30) NULL    
//   - partner_tel_3 (character varying, max length: 30) NULL    
//   - partner_fax_1 (character varying, max length: 30) NULL    
//   - partner_telex (character varying, max length: 30) NULL    
//   - partner_contact_1 (character varying, max length: 50) NULL
//   - partner_contact_2 (character varying, max length: 50) NULL
//   - partner_sales_person (character varying, max length: 10) NOT NULL
//   - partner_cs_person (character varying, max length: 10) NULL
//   - partner_email_1 (character varying, max length: 50) NULL  
//   - partner_website (character varying, max length: 50) NULL  
//   - partner_gst_reg (character varying, max length: 30) NULL  
//   - create_user (character varying, max length: 10) NOT NULL  
//   - create_date (date) NOT NULL
//   - update_user (character varying, max length: 10) NOT NULL  
//   - update_date (date) NOT NULL
//   - partner_group (character, max length: 1) NULL
//   - partner_terms (character varying, max length: 20) NULL    
//   - partner_currency (character, max length: 3) NULL
//   - sales_type (character, max length: 1) NULL
//   - partner_name_zh (character varying, max length: 100) NULL 
//   - partner_address_zh (character varying, max length: 500) NULL
//   - khmer_name (character varying, max length: 100) NULL      
//   - khmer_address (character varying, max length: 300) NULL   
//   - partner_crno (character varying, max length: 20) NULL     
//   - partner_name_khmer (character varying, max length: 100) NULL
//   - partner_address_khmer (character varying, max length: 500) NULL
//   - partner_name_vn (character varying, max length: 100) NULL 
//   - partner_address_vn (character varying, max length: 500) NULL
//   - partner_name_th (character varying, max length: 100) NULL 
//   - partner_address_th (character varying, max length: 500) NULL
//   - partner_name_mm (character varying, max length: 100) NULL 
//   - partner_address_mm (character varying, max length: 500) NULL
//   - partner_name_tw (character varying, max length: 100) NULL 
//   - partner_address_tw (character varying, max length: 500) NULL
//   - partner_iso_code (character varying, max length: 20) NULL 
//   - partner_iata_code (character varying, max length: 20) NULL
//   - partner_iata_account (character varying, max length: 20) NULL
//   - partner_scac_code (character varying, max length: 20) NULL
//   - partner_whatsapp (character varying, max length: 20) NULL 
//   - partner_wechat (character varying, max length: 20) NULL   
//   - partner_facebook (character varying, max length: 200) NULL
//   - partner_line_id (character varying, max length: 20) NULL  
//   - partner_instagram (character varying, max length: 100) NULL
//   - partner_class (character, max length: 1) NOT NULL
//   - wca_no (character varying, max length: 20) NULL
//   - lognet_no (character varying, max length: 20) NULL        
//   - gaa_no (character varying, max length: 20) NULL
//   - egln_no (character varying, max length: 20) NULL
//   - partner_uen (character varying, max length: 20) NULL      
//   - partner_iec_code (character varying, max length: 20) NULL 
//   - partner_usci_code (character varying, max length: 20) NULL
//   - partner_raca_code (character varying, max length: 20) NULL
//   - iec_code (character varying, max length: 20) NULL
//   - usci_code (character varying, max length: 20) NULL        
//   - raca_code (character varying, max length: 20) NULL        
//   - partner_status (character, max length: 1) NOT NULL        
//   - partner_network (character varying, max length: 200) NULL 
//   - partner_category (character, max length: 3) NULL
//   - partner_logo (character varying, max length: 200) NULL    
//   - company (character varying, max length: 20) NOT NULL      
//   - entity_code (character varying, max length: 20) NOT NULL  
//   - partner_type (character, max length: 1) NOT NULL
//   - partner_roles (character varying, max length: 200) NULL   
//   - partner_term (smallint) NOT NULL
//   - choose_sel (character, max length: 1) NOT NULL
//   - partner_source (character varying, max length: 30) NOT NULL
//   - peppol_id (character varying, max length: 30) NULL        
//   - api_user (character varying, max length: 20) NULL
//   - api_password (character varying, max length: 20) NULL     
//   - api_key (character varying, max length: 100) NULL
//   - partner_label_file (character varying, max length: 300) NULL
//   - role_wms (character, max length: 1) NOT NULL
//   - role_lastmile (character, max length: 1) NOT NULL
//   - role_contractor (character, max length: 1) NOT NULL       

