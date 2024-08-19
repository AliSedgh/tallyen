import React, { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import formatDate from "@/lib/formatDate";
import formatNumberWithCommas from "@/lib/formatPriceWithCommas";
import TableInfo from "../TableInfo";
import { useSortedOrders } from "@/hooks/useSortOrders";
import { calculateTotalPrice } from "@/lib/calculateTotalPrice";

function HistoryTable() {
  const orders = useSortedOrders();
  const totalPrice = useMemo(() => calculateTotalPrice(orders), [orders]);

  const renderOrderRow = (order: (typeof orders)[0], index: number) => (
    <TableRow key={index}>
      <TableCell className="font-medium text-center">{index + 1}</TableCell>
      <TableCell className="font-medium text-center">
        {formatDate(order.createAt.toString())}
      </TableCell>
      <TableCell className="font-medium text-center">
        {order.amount} گرم
      </TableCell>
      <TableCell className="font-medium text-center">
        {formatNumberWithCommas(+order.unitPrice)} ریال
      </TableCell>
      <TableCell className="font-medium text-center">
        {formatNumberWithCommas(+order.totalPrice)} ریال
      </TableCell>
    </TableRow>
  );

  return (
    <div className="overflow-y-auto">
      <TableInfo />
      <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">ردیف</TableHead>
            <TableHead className="text-center">تاریخ</TableHead>
            <TableHead className="text-center">وزن</TableHead>
            <TableHead className="text-center">قیمت واحد</TableHead>
            <TableHead className="text-center">مبلغ پرداختی</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="max-h-[200px]">
          {orders.length ? (
            orders.map(renderOrderRow)
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center font-bold">
                هیچ سفارشی یافت نشد
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        {orders.length > 0 && (
          <TableFooter className="px-14">
            <TableRow className="px-14">
              <TableCell colSpan={3} className="md:pr-12 pr-8">
                جمع کل
              </TableCell>
              <TableCell colSpan={9} className="text-left md:pl-[78px] pr-7">
                {totalPrice} ریال
              </TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </div>
  );
}

export default HistoryTable;
