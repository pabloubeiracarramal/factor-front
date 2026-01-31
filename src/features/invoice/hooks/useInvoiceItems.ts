import { useState, useEffect, useMemo } from 'react';
import type { CreateInvoiceItemDto } from '../../../types';

interface InvoiceFormItem extends CreateInvoiceItemDto {
    id: string;
}

interface UseInvoiceItemsProps {
    initialItems?: CreateInvoiceItemDto[];
}

export const useInvoiceItems = ({ initialItems }: UseInvoiceItemsProps = {}) => {
    const [items, setItems] = useState<InvoiceFormItem[]>([
        { id: crypto.randomUUID(), description: '', quantity: 1, price: 0 }
    ]);

    useEffect(() => {
        if (initialItems && initialItems.length > 0) {
            setItems(initialItems.map(item => ({
                id: crypto.randomUUID(),
                description: item.description,
                quantity: item.quantity,
                price: typeof item.price === 'string' ? parseFloat(item.price) : item.price,
            })));
        }
    }, [initialItems]);

    const addItem = () => {
        setItems([...items, {
            id: crypto.randomUUID(),
            description: '',
            quantity: 1,
            price: 0
        }]);
    };

    const removeItem = (id: string) => {
        if (items.length > 1) {
            setItems(items.filter(item => item.id !== id));
        }
    };

    const updateItem = (id: string, field: keyof CreateInvoiceItemDto, value: string | number) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    const total = useMemo(() => {
        return items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    }, [items]);

    const validateItems = () => {
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (!item.description.trim()) {
                return false;
            }
            if (item.quantity < 1) {
                return false;
            }
            if (item.price < 0) {
                return false;
            }
        }
        return true;
    };

    const getValidatedItems = (): CreateInvoiceItemDto[] | false => {
        if (validateItems()) {
            return items.map(({ id, ...item }) => item);
        }
        return false;
    };

    return {
        items,
        total,
        addItem,
        removeItem,
        updateItem,
        validateItems,
        getValidatedItems
    };
};
