  // let csvStores = [];
  // store.stores_list.map((item) => {
  //   return csvStores.push(
  //     {
  //       label: `Available for sale [${item.title}]`,
  //       key: `available_for_sale${item.title}`,
  //     },
  //     { label: `Price [${item.title}]`, key: `price${item.title}` },
  //     { label: `In stock [${item.title}]`, key: `in_stock${item.title}` },
  //     { label: `Low stock [${item.title}]`, key: `low_stock${item.title}` }
  //   );
  // });
  // let modifierCsv = [];
  // modifire.modifiers_list.map((item) => {
  //   return modifierCsv.push({
  //     label: `Modifier-${item.title}`,
  //     key: `modifier${item.title}`,
  //   });
  // });
  // const headers = [
  //   { label: "Handle", key: "handle" },
  //   { label: "SKU", key: "sku" },
  //   { label: "Name", key: "name" },
  //   { label: "Category", key: "category" },
  //   { label: "Sold by weight", key: "sold_by_weight" },
  //   { label: "Option 1 name", key: "varient_1_name" },
  //   { label: "Option 1 value", key: "varient_1_value" },
  //   { label: "Option 2 name", key: "varient_2_name" },
  //   { label: "Option 2 value", key: "varient_2_value" },
  //   { label: "Option 3 name", key: "varient_3_name" },
  //   { label: "Option 3 value", key: "varient_3_value" },
  //   { label: "Default price", key: "price" },
  //   { label: "Cost", key: "cost" },
  //   { label: "Barcode", key: "barcode" },
  //   { label: "SKU of included item", key: "sku_of_included_item" },
  //   { label: "Quantity of included item", key: "quantity_of_included_item" },
  //   { label: "Track stock", key: "track_stock" },
  //   ...csvStores,
  //   ...modifierCsv,
  // ];
  /* Export Csv Data*/
  // let csvDownloadData = [];
  // var maxLength = 0;
  // var arrayIndex = 0;
  // item.item_list.map((item, index) => {
  //   let varient = [];
  //   var selectedStores = [];
  //   var lengthOptionOne =
  //     item.varients !== null && item.varients !== undefined
  //       ? item.varients[0] !== undefined
  //         ? item.varients[0]["optionValue"] !== undefined
  //           ? item.varients[0]["optionValue"].length
  //           : 0
  //         : 0
  //       : 0;
  //   var lengthOptionTwo =
  //     item.varients !== null && item.varients !== undefined
  //       ? item.varients[1] !== undefined
  //         ? item.varients[1]["optionValue"] !== undefined
  //           ? item.varients[1]["optionValue"].length
  //           : 0
  //         : 0
  //       : 0;
  //   var lengthOptionThree =
  //     item.varients !== null && item.varients !== undefined
  //       ? item.varients[2] !== undefined
  //         ? item.varients[2]["optionValue"] !== undefined
  //           ? item.varients[2]["optionValue"].length
  //           : 0
  //         : 0
  //       : 0;

  //   var maxValue = Math.max(
  //     lengthOptionOne,
  //     lengthOptionTwo,
  //     lengthOptionThree
  //   );
  //   maxLength = Math.max(maxLength, maxValue);
  //   csvDownloadData.push({
  //     handle:
  //       item.title !== null && item.title !== undefined
  //         ? item.title.trim().replace(/\s+/g, "-").toLowerCase()
  //         : "",
  //     name:
  //       item.title !== null && item.title !== undefined ? item.title.trim() : "",
  //     category:
  //       item.category !== null && item.category !== undefined
  //         ? item.category["name"]
  //         : "",
  //     sold_by_weight: item.soldByType == "Weight/Volume" ? "Y" : "N",
  //     sku: item.sku !== null && item.sku !== undefined ? item.sku : "",
  //     varient_1_name:
  //       item.varients !== null && item.varients !== undefined
  //         ? item.varients[0] !== null && item.varients[0] !== undefined
  //           ? item.varients[0]["optionName"]
  //           : ""
  //         : "",
  //     varient_1_value:
  //       item.varients !== null &&
  //         item.varients !== undefined &&
  //         item.varients.length > 0
  //         ? item.varients[0] !== null && item.varients[0] !== undefined
  //           ? item.varients[0]["optionValue"] !== undefined &&
  //             item.varients[0]["optionValue"].length > 0
  //             ? item.varients[0]["optionValue"][0]["variantName"] !== undefined
  //               ? item.varients[0]["optionValue"][0]["variantName"]
  //               : ""
  //             : ""
  //           : ""
  //         : "",
  //     varient_2_name:
  //       item.varients !== null &&
  //         item.varients !== undefined &&
  //         item.varients.length > 0
  //         ? item.varients[1] !== null && item.varients[1] !== undefined
  //           ? item.varients[1]["optionName"]
  //           : ""
  //         : "",
  //     varient_2_value:
  //       item.varients !== null &&
  //         item.varients !== undefined &&
  //         item.varients.length > 0
  //         ? item.varients[1] !== null && item.varients[1] !== undefined
  //           ? item.varients[1]["optionValue"] !== undefined &&
  //             item.varients[1]["optionValue"].length > 0
  //             ? item.varients[1]["optionValue"][0]["variantName"] !== undefined
  //               ? item.varients[1]["optionValue"][0]["variantName"]
  //               : ""
  //             : ""
  //           : ""
  //         : "",
  //     varient_3_name:
  //       item.varients !== null &&
  //         item.varients !== undefined &&
  //         item.varients.length > 0
  //         ? item.varients[2] !== null && item.varients[2] !== undefined
  //           ? item.varients[2]["optionName"]
  //           : ""
  //         : "",
  //     varient_3_value:
  //       item.varients !== null &&
  //         item.varients !== undefined &&
  //         item.varients.length > 0
  //         ? item.varients[2] !== null && item.varients[2] !== undefined
  //           ? item.varients[2]["optionValue"] !== undefined &&
  //             item.varients[2]["optionValue"].length > 0
  //             ? item.varients[2]["optionValue"][0]["variantName"] !== undefined
  //               ? item.varients[2]["optionValue"][0]["variantName"]
  //               : ""
  //             : ""
  //           : ""
  //         : "",
  //     price:
  //       item.varients !== null &&
  //         item.varients !== undefined &&
  //         item.varients.length > 0
  //         ? item.varients[0] !== null && item.varients[0] !== undefined
  //           ? item.varients[0]["optionValue"] !== undefined
  //             ? item.varients[0]["optionValue"][0]["price"]
  //             : ""
  //           : ""
  //         : item.price,
  //     cost:
  //       item.varients !== null &&
  //         item.varients !== undefined &&
  //         item.varients.length > 0
  //         ? item.varients[0] !== null && item.varients[0] !== undefined
  //           ? item.varients[0]["optionValue"] !== undefined
  //             ? item.varients[0]["optionValue"][0]["cost"]
  //             : ""
  //           : ""
  //         : item.cost,
  //     barcode:
  //       item.varients !== null &&
  //         item.varients !== undefined &&
  //         item.varients.length > 0
  //         ? item.varients[0] !== null && item.varients[0] !== undefined
  //           ? item.varients[0]["optionValue"] !== undefined
  //             ? item.varients[0]["optionValue"][0]["barcode"]
  //             : ""
  //           : ""
  //         : item.barcode,
  //     sku_of_included_item: "",
  //     quantity_of_included_item: "",
  //     track_stock: item.trackStock == true ? "Y" : "N",
  //   });
  //   var exportStores =
  //     item.stores !== null && item.stores !== undefined
  //       ? (item.stores || []).map((stor) => {
  //         (store.stores_list || []).map((stoor, storIndex) => {
  //           if (stoor._id == stor.id) {
  //             csvDownloadData = csvDownloadData.map((it, ky) => {
  //               if (arrayIndex == ky) {
  //                 return {
  //                   ...it,
  //                   [`available_for_sale${stor.title}`]: "Y",
  //                   [`in_stock${stor.title}`]: stor.inStock,
  //                   [`low_stock${stor.title}`]: stor.lowStock,
  //                 };
  //               }
  //               return it;
  //             });
  //           } else {
  //             csvDownloadData = csvDownloadData.map((it, ky) => {
  //               if (arrayIndex == ky) {
  //                 return {
  //                   ...it,
  //                   [`available_for_sale${stor.title}`]: "N",
  //                   [`in_stock${stor.title}`]: stor.inStock,
  //                   [`low_stock${stor.title}`]: stor.lowStock,
  //                 };
  //               }
  //               return it;
  //             });
  //           }
  //         });
  //       })
  //       : [];
  //   var exportModifier = (modifire.modifiers_list || []).map(
  //     (modi, modIndex) => {
  //       (item.modifiers || []).map((itModi, itModIndex) => {
  //         if (itModi.id == modi._id) {
  //           csvDownloadData = csvDownloadData.map((it, ky) => {
  //             if (arrayIndex == ky) {
  //               return {
  //                 ...it,
  //                 [`modifier${modi.title}`]: "Y",
  //               };
  //             }
  //             return it;
  //           });
  //         } else {
  //           csvDownloadData = csvDownloadData.map((it, ky) => {
  //             if (arrayIndex == ky) {
  //               return {
  //                 ...it,
  //                 [`modifier${modi.title}`]: "N",
  //               };
  //             }
  //             return it;
  //           });
  //         }
  //       });
  //     }
  //   );
  //   if (item.varients !== null && item.varients !== undefined) {
  //     for (var j = 1; j < maxLength; j++) {
  //       csvDownloadData.push({
  //         handle: item.title.trim().replace(/\s+/g, "-").toLowerCase(),
  //         sku:
  //           item.varients[0] !== null && item.varients[0] !== undefined
  //             ? item.varients[0]["optionValue"] !== undefined
  //               ? item.varients[0]["optionValue"][j] !== undefined
  //                 ? item.varients[0]["optionValue"][j]["sku"] !== undefined
  //                   ? item.varients[0]["optionValue"][j]["sku"]
  //                   : ""
  //                 : ""
  //               : ""
  //             : "",
  //         varient_1_value:
  //           item.varients[0] !== null && item.varients[0] !== undefined
  //             ? item.varients[0]["optionValue"] !== undefined
  //               ? item.varients[0]["optionValue"][j] !== undefined
  //                 ? item.varients[0]["optionValue"][j]["variantName"] !==
  //                   undefined
  //                   ? item.varients[0]["optionValue"][j]["variantName"]
  //                   : ""
  //                 : ""
  //               : ""
  //             : "",
  //         varient_2_value:
  //           item.varients[1] !== null && item.varients[1] !== undefined
  //             ? item.varients[1]["optionValue"] !== undefined
  //               ? item.varients[1]["optionValue"][j] !== undefined
  //                 ? item.varients[1]["optionValue"][j]["variantName"] !==
  //                   undefined
  //                   ? item.varients[1]["optionValue"][j]["variantName"]
  //                   : ""
  //                 : ""
  //               : ""
  //             : "",
  //         varient_3_value:
  //           item.varients[2] !== null && item.varients[2] !== undefined
  //             ? item.varients[2]["optionValue"] !== undefined
  //               ? item.varients[2]["optionValue"][j] !== undefined
  //                 ? item.varients[2]["optionValue"][j] !== undefined
  //                   ? item.varients[2]["optionValue"][j]["variantName"] !==
  //                     undefined
  //                     ? item.varients[2]["optionValue"][j]["variantName"]
  //                     : ""
  //                   : ""
  //                 : ""
  //               : ""
  //             : "",
  //         price:
  //           item.varients[0] !== null && item.varients[0] !== undefined
  //             ? item.varients[0]["optionValue"] !== undefined
  //               ? item.varients[0]["optionValue"][j] !== undefined
  //                 ? item.varients[0]["optionValue"][j]["price"] !== undefined
  //                   ? item.varients[0]["optionValue"][j]["price"]
  //                   : ""
  //                 : ""
  //               : ""
  //             : "",
  //         cost:
  //           item.varients[0] !== null && item.varients[0] !== undefined
  //             ? item.varients[0]["optionValue"] !== undefined
  //               ? item.varients[0]["optionValue"][j] !== undefined
  //                 ? item.varients[0]["optionValue"][j]["cost"] !== undefined
  //                   ? item.varients[0]["optionValue"][j]["cost"]
  //                   : ""
  //                 : ""
  //               : ""
  //             : "",
  //         barcode:
  //           item.varients[0] !== null && item.varients[0] !== undefined
  //             ? item.varients[0]["optionValue"] !== undefined
  //               ? item.varients[0]["optionValue"][j] !== undefined
  //                 ? item.varients[0]["optionValue"][j]["barcode"] !== undefined
  //                   ? item.varients[0]["optionValue"][j]["barcode"]
  //                   : ""
  //                 : ""
  //               : ""
  //             : "",
  //       });
  //       arrayIndex++;
  //     }
  //   }
  //   arrayIndex = arrayIndex + 1;

  //   return csvDownloadData;
  // });
  /* End Export Csv Data*/