import React from "react";
import { CDataTable } from "@coreui/react";
import Amount from "../../components/utils/Amount";
import _ from "lodash";

const SalesPaymentTypeDatatableNew = (props) => {
  return (
    <>
      <CDataTable
        itemsPerPageSelect
        items={props.sales_by_paymentType_detail.report}
        fields={[
          { key: "PaymentType", label: "Payment type", filter: true },
          {
            key: "paymentTransactions",
            label: "Payment transactions",
            filter: true,
          },
          { key: "paymentAmount", label: "Payment amount", filter: true },
          {
            key: "refundTransactions",
            label: "Refund transactions",
            filter: true,
          },
          { key: "refundAmount", label: "Refund amount", filter: true },
          { key: "netAmount", label: "Net amount", filter: true },
        ]}
        itemsPerPage={10}
        columnFilter
        sorter
        hover
        pagination
        underTableSlot={
          <div
            className="position-relative table-responsive "
            style={{ overflow: "auto" }}
          >
            <table className="table table-hover" style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <td style={{ width: "16.6%" }}>
                    <strong>Total</strong>
                  </td>
                  <td style={{ width: "16.6%" }}>
                    <strong>
                      {
                        <Amount
                          value={props.sales_by_paymentType_detail?.total?.totalPaymentTransactions ? props.sales_by_paymentType_detail?.total?.totalPaymentTransactions : 0}
                        />
                      }
                    </strong>
                  </td>
                  <td style={{ width: "16.6%" }}>
                    <strong>
                      {
                        <Amount
                          value={props.sales_by_paymentType_detail?.total?.totalPaymentAmount ? props.sales_by_paymentType_detail?.total?.totalPaymentAmount : 0}
                        />
                      }
                    </strong>
                  </td>
                  <td style={{ width: "16.6%" }}>
                    <strong>
                      {
                        <Amount
                          value={props.sales_by_paymentType_detail?.total?.totalRefundTransactions ? props.sales_by_paymentType_detail?.total?.totalRefundTransactions : 0}
                        />
                      }
                    </strong>
                  </td>
                  <td style={{ width: "16.6%" }}>
                    <strong>
                      {
                        <Amount
                          value={props.sales_by_paymentType_detail?.total?.totalRefundAmount ? props.sales_by_paymentType_detail?.total?.totalRefundAmount : 0}
                        />
                      }
                    </strong>
                  </td>
                  <td style={{ width: "16.6%" }}>
                    <strong>
                      {
                        <Amount
                          value={props.sales_by_paymentType_detail?.total?.totalNetAmount ? props.sales_by_paymentType_detail?.total?.totalNetAmount : 0}
                        />
                      }
                    </strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        }
        scopedSlots={{
          GrossSales: (item) => {
            return (
              <td>
                {typeof item.GrossSales !== "undefined" &&
                item.GrossSales !== null ? (
                  <Amount value={item.GrossSales} />
                ) : (
                  <Amount value={0} />
                )}
              </td>
            );
          },
          Refunds: (item) => {
            return (
              <td>
                {typeof item.Refunds !== "undefined" &&
                item.Refunds !== null ? (
                  <Amount value={item.Refunds} />
                ) : (
                  <Amount value={0} />
                )}
              </td>
            );
          },
          NetSales: (item) => {
            return (
              <td>
                {typeof item.NetSales !== "undefined" &&
                item.NetSales !== null ? (
                  <Amount value={item.NetSales} />
                ) : (
                  <Amount value={0} />
                )}
              </td>
            );
          },
        }}
      />
    </>
  );
};

export default SalesPaymentTypeDatatableNew;
