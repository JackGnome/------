import React, { useMemo, useState } from 'react';
// import { Button, DatePicker, Form, Input, InputNumber, Radio } from 'antd';
// import { Store } from 'redux';
// import { Rule } from 'rc-field-form/es/interface';
// import dayjs from 'dayjs';
// import { Company, InvoiceType } from '@/store/document/types';
// import * as api from '@/services/api/ApiService';
// import { ProductTable } from '@/pages/document/invoice/components/ProductTable';
import 'antd/dist/reset.css';
import styles from './index.module.scss';
// import 'dayjs/locale/ru';

const InvoicePage: React.FC = () => {
    return <div />;
    // const [form] = Form.useForm();
    // const [invoiceLink, setInvoiceLink] = useState<null | string>(null);
    // const [isLoading, setIsLoading] = useState(false);
    //
    // const initData = useMemo(() => {
    //     return {
    //         type: InvoiceType.TOCHKA,
    //         date: dayjs(),
    //     };
    // }, []);
    //
    // const createInvoice = (values: Store): void => {
    //     setIsLoading(true);
    //     const { date, id, type, companyName, inn, ogrn, address, raschetniySchet, korSchet, bik, kpp, productItems } =
    //         values;
    //
    //     const company: Company = {
    //         name: companyName,
    //         inn,
    //         kpp,
    //         ogrn,
    //         address,
    //         raschetniySchet,
    //         korSchet,
    //         bik,
    //     };
    //
    //     api.createInvoice({ company, date, type, id, order: { productItems } }).then((r) => {
    //         setIsLoading(false);
    //         if (r.data.id) setInvoiceLink(r.data.link);
    //     });
    // };
    //
    // const requiredFieldRule: Rule = { required: true, message: 'Обязательное поле' };
    //
    // return (
    //     <div className={styles.rootWrapper}>
    //         <h1 className={styles.pageTitle}>Создать счёт</h1>
    //
    //         <Form
    //             form={form}
    //             onFinish={createInvoice}
    //             autoComplete="off"
    //             className={styles.formWrapper}
    //             initialValues={initData}
    //         >
    //             <div className={styles.companyInfoWrapper}>
    //                 <div className={styles.title}>Реквизиты организации</div>
    //                 <Form.Item label="Номер документа" name="id" rules={[requiredFieldRule]}>
    //                     <InputNumber controls={false} stringMode />
    //                 </Form.Item>
    //                 <Form.Item label="Дата" name="date" rules={[requiredFieldRule]}>
    //                     <DatePicker format="DD MMM YYYY" />
    //                 </Form.Item>
    //                 <Form.Item label="Наименование организации" name="companyName" rules={[requiredFieldRule]}>
    //                     <Input />
    //                 </Form.Item>
    //                 <Form.Item label="ИНН" name="inn" rules={[requiredFieldRule]}>
    //                     <Input />
    //                 </Form.Item>
    //                 <Form.Item label="КПП" name="kpp" rules={[requiredFieldRule]}>
    //                     <Input />
    //                 </Form.Item>
    //                 <Form.Item label="ОГРН" name="ogrn" rules={[requiredFieldRule]}>
    //                     <Input />
    //                 </Form.Item>
    //                 <Form.Item colon label="Юридический адрес" name="address" rules={[requiredFieldRule]}>
    //                     <Input />
    //                 </Form.Item>
    //                 <Form.Item label="Рассчетный счет" name="raschetniySchet" rules={[requiredFieldRule]}>
    //                     <Input />
    //                 </Form.Item>
    //                 <Form.Item label="Корреспондентский счет" name="korSchet" rules={[requiredFieldRule]}>
    //                     <Input />
    //                 </Form.Item>
    //                 <Form.Item label="БИК" name="bik" rules={[requiredFieldRule]}>
    //                     <Input />
    //                 </Form.Item>
    //             </div>
    //             <div className={styles.productTableWrapper}>
    //                 <div className={styles.productTableTitle}>Заказ</div>
    //                 <ProductTable />
    //             </div>
    //             <div className={styles.invoiceTypeWrapper}>
    //                 <Form.Item label="Банк" name="type" rules={[requiredFieldRule]}>
    //                     <Radio.Group
    //                         options={[
    //                             { label: 'Райфайзен', value: InvoiceType.RAFI },
    //                             { label: 'Точка', value: InvoiceType.TOCHKA },
    //                         ]}
    //                         optionType="button"
    //                         buttonStyle="solid"
    //                     />
    //                 </Form.Item>
    //             </div>
    //
    //             <Button htmlType="submit" type="primary" rules={[requiredFieldRule]} loading={isLoading}>
    //                 Создать
    //             </Button>
    //             {invoiceLink !== null ? (
    //                 <a className={styles.invoiceLink} href={invoiceLink}>
    //                     Скачать счёт
    //                 </a>
    //             ) : null}
    //         </Form>
    //     </div>
    // );
};

export default InvoicePage;
