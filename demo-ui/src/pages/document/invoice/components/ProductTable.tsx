import React, { ReactNode } from 'react';
import { Button, Form, FormListFieldData, Input } from 'antd';
import styles from './ProductTable.module.scss';

export type Product = {
  name: string;
  unitName: string;
  price: number;
  amount: number;
};

export const ProductTable: React.FC = () => {
  const renderTable = (
    fields: FormListFieldData[],
    add: (defaultValue?: Product, index?: number) => void,
    remove: (index: number) => void,
  ): ReactNode => {
    return (
      <div className={styles.table}>
        <div className={styles.tableRow}>
          <div>Наименование работ, услуг</div>
          <div>Количество</div>
          <div>Единицы</div>
          <div>Цена</div>
        </div>
        <div>
          {fields.map((field, index) => {
            return (
              <div key={field.key} className={styles.tableRow}>
                <Form.Item name={[field.name, 'name']}>
                  <Input />
                </Form.Item>
                <Form.Item name={[field.name, 'amount']}>
                  <Input />
                </Form.Item>
                <Form.Item name={[field.name, 'unitName']}>
                  <Input />
                </Form.Item>
                <Form.Item name={[field.name, 'price']}>
                  <Input />
                </Form.Item>
                <Form.Item>
                  {fields.length === 1 ? null : (
                    <Button type="reset" onClick={() => remove(index)}>
                      Удалить
                    </Button>
                  )}
                </Form.Item>
              </div>
            );
          })}
        </div>
        <Form.Item>
          <Button
            type="primary"
            onClick={() =>
              add({
                name: '',
                unitName: 'шт.',
                price: 0,
                amount: 0,
              })
            }
          >
            Добавить
          </Button>
        </Form.Item>
      </div>
    );
  };

  return (
    <div className={styles.table}>
      <Form.List name="productItems">{(fields, { add, remove }) => renderTable(fields, add, remove)}</Form.List>
    </div>
  );
};
