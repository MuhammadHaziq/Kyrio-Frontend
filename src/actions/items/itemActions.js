import {
  REDIRECT_BACK_ITEMS,
  GET_ITEM_LIST,
  GET_ITEM_STOCK,
  GET_ITEM_STORES,
  GET_ITEMS_TAXES,
  ITEM_SAVE,
  TOGGLE_ITEM_DELETE_SELECT,
  TOGGLE_ALL_ITEM_DELETE_SELECT,
  DELETE_ITEM_LIST,
  MESSAGE,
  ERROR_MESSAGE,
  TOGGLE_SELECT_ALL_ITEM_STORES,
  TOGGLE_SELECT_SINGLE_ITEM_STORES,
  SET_ITEM_STORE_PRICE,
  SAVE_ITEM_VARIANTS,
  UPDATE_VARIANT_PRICE,
  UPDATE_VARIANT_COST,
  UPDATE_VARIANT_SKU,
  UPDATE_VARIANT_BARCODE,
  DELETE_ITEM_VARIANTS_OPTION,
  DELETE_ITEM_VARIANTS,
  TOGGLE_ITEM_STOCK,
  SET_ITEM_STORE_IN_STOCK,
  SET_ITEM_STORE_LOW_STOCK,
  UPDATE_ITEM_ROW_DATA,
  REMOVE_ROW_DATA,
  UPDATE_ITEM_RECORD,
  ITEM_IMPORT_ERRORS,
  REDIRECT_CONFIRM_UPLOAD,
} from "../../constants/ActionTypes";
import authAxios from "../../constants/authAxios";

export const redirect_back_items = (status) => {
  return (dispatch) => {
    dispatch({
      type: REDIRECT_BACK_ITEMS,
      response: status,
    });
  };
};

export const get_items_list_server_side = (data) => {
  return (dispatch) => {
    // const url = `items/serverSide`;
    // $("#itemListServerDatatable").DataTable().destroy().clear();
    // $("#itemListServerDatatable").DataTable({
    //   oLanguage: {
    //     sInfo: "Total Items: _TOTAL_",
    //   },
    //   //"aaSorting": [[11,'desc'],[10,'desc']],
    //   //"order": [[ 10, "desc"  ]],
    //   oSearch: { sSearch: data.searchItem },
    //   fixedHeader: true,
    //   scrollX: true,
    //   paging: true,
    //   iDisplayLength: 20,
    //   aLengthMenu: [
    //     [20, 50, 100, 200, 500],
    //     [20, 50, 100, 200, 500],
    //   ],
    //   lengthChange: true,
    //   // searching: true,
    //   ordering: false,
    //   info: true,
    //   // dom:
    //   //   "<'row'<'col-sm-3'i><'col-sm-2'l><'col-sm-3'f><'col-sm-4'p>>" +
    //   //   "<'row'<'col-sm-12'tr>>",
    //   dom: '<"top"ifl<"clear">>rt<"bottom"p<"clear">>',
    //   bProcessing: true,
    //   bRetrieve: true,
    //   bDestroy: true,
    //   serverSide: true,
    //   bAutoWidth: true,
    //   ajax: {
    //     url: url, // json datasource
    //     headers: {
    //
    //     },
    //     // type: 'post', // method  , by default get
    //     dataType: "json",
    //     data: data,
    //   },
    //   deferRender: true,
    // }); // End of DataTable
    // $("#itemListServerDatatable").removeClass("hide");
  };
};

// export const get_items_list = (data) => {
//   return (dispatch) => {
//     // const data = { page: 1, limit: 100, storeId: "adfaa0fs0dfa9dsf" };
//     $("#itemListServerDatatable").DataTable().clear().destroy();
//     try {
//       axios({
//         method: "get",
//         url: `items`,
//         params: data,
//         headers: {
//
//         },
//       })
//         .then((response) => {
//           dispatch({ type: GET_ITEM_LIST, response: response.data });
//           $("#itemListServerDatatable").dataTable({
//             dom: '<"top"i>rt<"bottom"flp><"clear">',
//             paging: true,
//             ordering: true,
//             info: true,
//             searching: false,
//             scrollX: true,
//             scrollY: "50vh",
//             scrollCollapse: true,
//           });
//         })
//         .catch((error) => {
//           console.log("err", error.response);
//           let msg = {
//             open: true,
//             message:
//               typeof error.response != "undefined"
//                 ? error.response.status === 404
//                   ? error.response.statusText
//                   : error.response.data.message
//                 : ERROR_MESSAGE,
//             object: error,
//             error: true,
//           };
//           dispatch({ type: MESSAGE, data: msg });
//         });
//     } catch (error) {
//       console.log("err catch", error);
//       let msg = {
//         open: true,
//         message:
//           typeof error.response != "undefined"
//             ? error.response.status === 404
//               ? error.response.statusText
//               : error.response.data.message
//             : ERROR_MESSAGE,
//         object: error,
//         error: true,
//       };
//       dispatch({ type: MESSAGE, data: msg });
//     }
//   };
// };

export const get_items_stock = () => {
  return (dispatch) => {
    try {
      authAxios({
        method: "get",
        url: `items/stock`,
      })
        .then((response) => {
          dispatch({ type: GET_ITEM_STOCK, response: response.data });
        })
        .catch((error) => {
          console.log("err", error.response);
          let msg = {
            open: true,
            message:
              typeof error.response != "undefined"
                ? error.response.status === 404
                  ? error.response.statusText
                  : error.response.data.message
                : ERROR_MESSAGE,
            object:
              typeof error.response != "undefined"
                ? error.response.data || {}
                : {},
            error: true,
          };
          dispatch({ type: MESSAGE, data: msg });
        });
    } catch (error) {
      console.log("err catch", error);
      let msg = {
        open: true,
        message:
          typeof error.response != "undefined"
            ? error.response.status === 404
              ? error.response.statusText
              : error.response.data.message
            : ERROR_MESSAGE,
        object: error,
        error: true,
      };
      dispatch({ type: MESSAGE, data: msg });
    }
  };
};

export const search_item_list = (data) => {
  return (dispatch) => {
    try {
      authAxios({
        method: "get",
        url: `items/search`,
        params: data,
      })
        .then((response) => {
          dispatch({
            type: GET_ITEM_LIST,
            response: response.data.data,
            pages: response.data.pages,
          });
        })
        .catch((error) => {
          console.log("err", error.response);
          let msg = {
            open: true,
            message:
              typeof error.response != "undefined"
                ? error.response.status === 404
                  ? error.response.statusText
                  : error.response.data.message
                : ERROR_MESSAGE,
            object: error,
            error: true,
          };
          dispatch({ type: MESSAGE, data: msg });
        });
    } catch (error) {
      console.log("err catch", error);
      let msg = {
        open: true,
        message:
          typeof error.response != "undefined"
            ? error.response.status === 404
              ? error.response.statusText
              : error.response.data.message
            : ERROR_MESSAGE,
        object: error,
        error: true,
      };
      dispatch({ type: MESSAGE, data: msg });
    }
  };
};

export const get_items_store = () => {
  return (dispatch) => {
    try {
      authAxios({
        method: "get",
        url: `items/get_item_stores`,
      })
        .then((response) => {
          dispatch({ type: GET_ITEM_STORES, response: response.data.stores });
        })
        .catch((error) => {
          console.log("err", error.response);
          let msg = {
            open: true,
            message:
              typeof error.response != "undefined"
                ? error.response.status === 404
                  ? error.response.statusText
                  : error.response.data.message
                : ERROR_MESSAGE,
            object: error,
            error: true,
          };
          dispatch({ type: MESSAGE, data: msg });
        });
    } catch (error) {
      console.log("err catch", error);
      let msg = {
        open: true,
        message:
          typeof error.response != "undefined"
            ? error.response.status === 404
              ? error.response.statusText
              : error.response.data.message
            : ERROR_MESSAGE,
        object: error,
        error: true,
      };
      dispatch({ type: MESSAGE, data: msg });
    }
  };
};

export const get_item_taxe = () => {
  return (dispatch) => {
    try {
      authAxios({
        method: "get",
        url: `items/get_item_taxes`,
      })
        .then((response) => {
          dispatch({ type: GET_ITEMS_TAXES, response: response.data.taxes });
        })
        .catch((error) => {
          console.log("err", error.response);
          let msg = {
            open: true,
            message:
              typeof error.response != "undefined"
                ? error.response.status === 404
                  ? error.response.statusText
                  : error.response.data.message
                : ERROR_MESSAGE,
            object: error,
            error: true,
          };
          dispatch({ type: MESSAGE, data: msg });
        });
    } catch (error) {
      console.log("err catch", error);
      let msg = {
        open: true,
        message:
          typeof error.response != "undefined"
            ? error.response.status === 404
              ? error.response.statusText
              : error.response.data.message
            : ERROR_MESSAGE,
        object: error,
        error: true,
      };
      dispatch({ type: MESSAGE, data: msg });
    }
  };
};

export const save_item = (data) => {
  return (dispatch) => {
    try {
      authAxios({
        method: "post",
        url: `items/`,
        data: data,
      })
        .then((response) => {
          dispatch({
            type: ITEM_SAVE,
            response: response.data,
          });
          let msg = {
            open: true,
            message: "Item Saved Successfully",
            object: {},
            error: false,
          };
          dispatch({ type: MESSAGE, data: msg });
        })
        .catch((error) => {
          console.log("err", error.response);
          let msg = {
            open: true,
            message:
              typeof error.response != "undefined"
                ? error.response.status === 404
                  ? error.response.statusText
                  : error.response.data.message
                : ERROR_MESSAGE,
            object: error,
            error: true,
          };
          dispatch({ type: MESSAGE, data: msg });
        });
    } catch (error) {
      console.log("err catch", error);
      let msg = {
        open: true,
        message:
          typeof error.response != "undefined"
            ? error.response.status === 404
              ? error.response.statusText
              : error.response.data.message
            : ERROR_MESSAGE,
        object: error,
        error: true,
      };
      dispatch({ type: MESSAGE, data: msg });
    }
  };
};

export const update_item_record = (data) => {
  return (dispatch) => {
    try {
      authAxios({
        method: "PATCH",
        url: `items/`,
        data: data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => {
          dispatch({
            type: UPDATE_ITEM_RECORD,
            response: response.data,
            id: data.item_id,
          });
          let msg = {
            open: true,
            message: "Item Update Successfully",
            object: {},
            error: false,
          };
          dispatch({ type: MESSAGE, data: msg });
        })
        .catch((error) => {
          console.log("err", error.response);
          let msg = {
            open: true,
            message:
              typeof error.response != "undefined"
                ? error.response.status === 404
                  ? error.response.statusText
                  : error.response.data.message
                : ERROR_MESSAGE,
            object: error,
            error: true,
          };
          dispatch({ type: MESSAGE, data: msg });
        });
    } catch (error) {
      console.log("err catch", error);
      let msg = {
        open: true,
        message:
          typeof error.response != "undefined"
            ? error.response.status === 404
              ? error.response.statusText
              : error.response.data.message
            : ERROR_MESSAGE,
        object: error,
        error: true,
      };
      dispatch({ type: MESSAGE, data: msg });
    }
  };
};

export const toggle_item_single_select = (data) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_ITEM_DELETE_SELECT,
      response: data,
    });
  };
};

export const toggle_item_all_select = (status) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_ALL_ITEM_DELETE_SELECT,
      response: status,
    });
  };
};

export const delete_item_list = (id) => {
  return (dispatch) => {
    try {
      authAxios({
        method: "post",
        url: `items/delete`,
        data: { ids: id },
      })
        .then((response) => {
          // console.log(response);
          dispatch({ type: DELETE_ITEM_LIST, response: id });
          let msg = {
            open: true,
            message: "Item Deleted Successfully",
            object: {},
            error: false,
          };
          dispatch({ type: MESSAGE, data: msg });
        })
        .catch((error) => {
          console.log("err", error.response);
          let msg = {
            open: true,
            message:
              typeof error.response != "undefined"
                ? error.response.status === 404
                  ? error.response.statusText
                  : error.response.data.message
                : ERROR_MESSAGE,
            object:
              typeof error.response != "undefined"
                ? error.response.data || {}
                : {},
            error: true,
          };
          dispatch({ type: MESSAGE, data: msg });
        });
    } catch (error) {
      console.log("err catch", error);
      let msg = {
        open: true,
        message:
          typeof error.response != "undefined"
            ? error.response.status === 404
              ? error.response.statusText
              : error.response.data.message
            : ERROR_MESSAGE,
        object: {},
        error: true,
      };
      dispatch({ type: MESSAGE, data: msg });
    }
  };
};

export const validate_csv = (data) => {
  return (dispatch) => {
    dispatch({
      type: ITEM_IMPORT_ERRORS,
      response: [],
      status: false,
      import_loading: true,
    });
    try {
      authAxios({
        method: "POST",
        url: `items/validatewaresfile`,
        data: data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => {
          if (response.data.success === true) {
            dispatch({
              type: REDIRECT_CONFIRM_UPLOAD,
              response: true,
              conifrm_message: response.data.message,
            });
            let msg = {
              open: true,
              message: "Confirm To Upload Items",
              object: {},
              error: false,
            };
            dispatch({ type: MESSAGE, data: msg });
          }
        })
        .catch((error) => {
          console.log("err", error.response);
          dispatch({
            type: ITEM_IMPORT_ERRORS,
            response:
              typeof error.response != "undefined" &&
              typeof error.response.data != "undefined"
                ? error.response.data
                : [],
            status: true,
            import_loading: false,
          });
        });
    } catch (error) {
      console.log("err catch", error);
      let msg = {
        open: true,
        message:
          typeof error.response != "undefined"
            ? error.response.status === 404
              ? error.response.statusText
              : error.response.data.message
            : ERROR_MESSAGE,
        object: error,
        error: true,
      };
      dispatch({ type: MESSAGE, data: msg });
    }
  };
};

export const save_csv = (data) => {
  return (dispatch) => {
    dispatch({
      type: ITEM_IMPORT_ERRORS,
      response: [],
      status: false,
      import_loading: true,
    });
    try {
      authAxios({
        method: "POST",
        url: `items/save_csv`,
        data: data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        // onUploadProgress: function (progressEvent) {
        //   const { loaded, total } = progressEvent;
        //   let percent = Math.floor((loaded * 100) / total);
        //   console.log(`${loaded}kb of ${total}kb | ${percent}%`);
        // },
      })
        .then((response) => {
          // console.log(response);
          dispatch({
            type: REDIRECT_BACK_ITEMS,
            response: true,
          });
          dispatch(get_items_store());
          let msg = {
            open: true,
            message: "Item Update Successfully",
            object: {},
            error: false,
          };
          dispatch({ type: MESSAGE, data: msg });
        })
        .catch((error) => {
          console.log("err", error.response);
          dispatch({
            type: ITEM_IMPORT_ERRORS,
            response:
              typeof error.response != "undefined" &&
              typeof error.response.data != "undefined"
                ? error.response.data
                : [],
            status: true,
            import_loading: false,
          });
          // let msg = {
          //   open: true,
          //   message:
          //     typeof error.response != "undefined"
          //       ? error.response.status === 404
          //         ? error.response.statusText
          //         : error.response.data.message
          //       : ERROR_MESSAGE,
          //   object: error,
          //   error: true,
          // };
          // dispatch({ type: MESSAGE, data: msg });
        });
    } catch (error) {
      console.log("err catch", error);
      let msg = {
        open: true,
        message:
          typeof error.response != "undefined"
            ? error.response.status === 404
              ? error.response.statusText
              : error.response.data.message
            : ERROR_MESSAGE,
        object: error,
        error: true,
      };

      dispatch({ type: MESSAGE, data: msg });
    }
  };
};

export const toggle_select_all_item_stores = (status) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_SELECT_ALL_ITEM_STORES,
      response: status,
    });
  };
};

export const toggle_select_single_item_store = (id) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_SELECT_SINGLE_ITEM_STORES,
      response: id,
    });
  };
};

export const set_item_store_values = (name, id, value) => {
  return (dispatch) => {
    if (name === "Price") {
      dispatch({
        type: SET_ITEM_STORE_PRICE,
        value: value,
        id: id,
      });
    } else if (name === "InStock") {
      dispatch({
        type: SET_ITEM_STORE_IN_STOCK,
        value: value,
        id: id,
      });
    } else if (name === "LowStock") {
      dispatch({
        type: SET_ITEM_STORE_LOW_STOCK,
        value: value,
        id: id,
      });
    }
  };
};

export const toggle_item_stock = (status) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_ITEM_STOCK,
      response: status,
    });
  };
};

export const save_item_variants = (data) => {
  return (dispatch) => {
    dispatch({
      type: SAVE_ITEM_VARIANTS,
      response: data,
    });
  };
};

export const update_variants_table_values = (data) => {
  return (dispatch) => {
    if (data.name === "Price") {
      dispatch({
        type: UPDATE_VARIANT_PRICE,
        value: data.value,
        index: data.index,
        optionId: data.optionId,
      });
    } else if (data.name === "Cost") {
      dispatch({
        type: UPDATE_VARIANT_COST,
        value: data.value,
        index: data.index,
        optionId: data.optionId,
      });
    } else if (data.name === "SKU") {
      dispatch({
        type: UPDATE_VARIANT_SKU,
        value: data.value,
        index: data.index,
        optionId: data.optionId,
      });
    } else if (data.name === "Barcode") {
      dispatch({
        type: UPDATE_VARIANT_BARCODE,
        value: data.value,
        index: data.index,
        optionId: data.optionId,
      });
    }
  };
};

export const delete_item_varient_option = (idx) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_ITEM_VARIANTS_OPTION,
      idx: idx,
    });
  };
};

export const delete_item_varient = (data) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_ITEM_VARIANTS,
      response: data,
    });
  };
};

export const update_row_data = (row) => {
  return (dispatch) => {
    try {
      authAxios({
        method: "get",
        url: `items/row/${row._id}`,
      })
        .then((response) => {
          if (typeof response.data.message !== "undefined") {
            let msg = {
              open: true,
              message: response.data.message,
              object: {},
              error: false,
            };
            dispatch({ type: MESSAGE, data: msg });
          } else {
            dispatch({
              type: UPDATE_ITEM_ROW_DATA,
              response: response.data,
            });
          }
        })
        .catch((error) => {
          console.log("err", error.message);
          let msg = {
            open: true,
            message:
              typeof error.response != "undefined"
                ? error.response.status === 404
                  ? error.response.statusText
                  : error.response.data.message
                : ERROR_MESSAGE,
            object: error,
            error: true,
          };
          dispatch({ type: MESSAGE, data: msg });
        });
    } catch (error) {
      console.log("err catch", error);
      let msg = {
        open: true,
        message:
          typeof error.response != "undefined"
            ? error.response.status === 404
              ? error.response.statusText
              : error.response.data.message
            : ERROR_MESSAGE,
        object: error,
        error: true,
      };
      dispatch({ type: MESSAGE, data: msg });
    }
  };
};

export const remove_row_data = (row) => {
  return (dispatch) => {
    dispatch({
      type: REMOVE_ROW_DATA,
      response: {},
    });
  };
};
