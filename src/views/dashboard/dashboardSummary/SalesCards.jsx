import React from "react";
import { CProgress } from "@coreui/react";
import Amount from "../../../components/utils/Amount";

const SalesCards = ({
  title,
  value,
  salesFilter,
  color,
  handleOnChangeSales,
}) => {
  return (
    <div
      md
      sm="4"
      className="mb-sm-2 mb-0 salescard"
      onClick={handleOnChangeSales}
    >
      <div className={salesFilter === title ? "text-" + color : "text-muted"}>
        {title}
      </div>
      <strong>
        <h2>{<Amount value={value} />}</h2>
      </strong>
      {/* <p>{<Amount value={0} />} (0%)</p> */}
      {salesFilter === title ? (
        <CProgress
          className="progress-xs mt-2"
          precision={1}
          color={color}
          value={salesFilter === title ? 100 : 0}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default SalesCards;
