import React from "react";
import { CFooter, CLink } from "@coreui/react";

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <CLink href="#" target="_blank">
          Kyrio POS
        </CLink>
      </div>
      <div className="ml-auto">
        <span className="mr-1">by Kevin Doan</span>
      </div>
    </CFooter>
  );
};

export default React.memo(TheFooter);
