import * as React from 'react';

interface Props {
    orderId: number;
    totalAmount: number;
    paymentUrl: string;
}

export const PayOrder: React.FC<Readonly<Props>> = ({
                                                                          orderId,
                                                                          totalAmount,
                                                                          paymentUrl
                                                                      }) => (
    <div>
        <h1>Замовлення №{orderId}</h1>
        <p>
            Оплатіть замовлення на суму {totalAmount} ₴. Перейдіть <a href={paymentUrl}>за цим посиланням</a> для оплати
            замовлення.
        </p>
    </div>
);
