import React from "react";
import { useSelector } from "react-redux";
import { amountFormat } from "../../utils/helpers";

const DateTimeFormat = ({ value, sign = "" }) => {
    const decimal = useSelector((state) => state.auth.user.decimal);
    return (
        amountFormat(value, parseInt(decimal)) + sign
    )
}
export default DateTimeFormat;