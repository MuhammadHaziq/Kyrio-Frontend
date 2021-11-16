import React from "react";
import { useSelector } from "react-redux";
import { amountFormat } from "../../utils/helpers";

const Amount = ({ value }) => {
    const decimal = useSelector((state) => state.auth.user.decimal);
    return (
        amountFormat(value, parseInt(decimal))
    )
}
export default Amount;
