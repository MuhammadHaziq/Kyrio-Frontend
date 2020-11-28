import React, { useState, useEffect } from "react";
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import dateformat from "dateformat";
import MainChartExample from "../charts/MainChartExample.js";
import FilterComponent from "./FilterComponent";
import { unmount_filter } from "../../actions/dashboard/filterComponentActions";
import { useSelector, useDispatch } from "react-redux";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [month, setMonth] = useState(dateformat(new Date(), "m"));
  const [year, setYear] = useState(dateformat(new Date(), "yyyy"));

  const getDaysInMonth = (month, year) =>
    new Array(31)
      .fill("")
      .map((v, i) => new Date(year, month - 1, i + 1))
      .filter((v) => v.getMonth() === month - 1)
      .map((itm) => dateformat(itm, "mmm dd"));

  const [Days, setDays] = useState(getDaysInMonth(month, year));
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [salesFilter, setSalesFilter] = useState("Gross Sales");

  // Sales by Day full month
  const [sales, setSales] = useState({
    grossSales: {
      data: [
        1,
        2,
        3,
        4,
        5,
        62,
        21,
        142,
        43,
        1,
        123,
        123,
        123,
        14,
        213,
        3,
        421,
        123,
        124,
        123,
        123,
        412,
        2312,
        1412,
        132,
        24,
        3435,
        23,
        12433,
        123,
        53,
      ],
      data2: [
        1,
        344,
        3,
        6757,
        5,
        62,
        21,
        142,
        43,
        1,
        123,
        123,
        23,
        14,
        4545,
        3,
        131,
        643,
        124,
        123,
        12351,
        843,
        786,
        1412,
        132,
        24,
        511,
        23,
        9867,
        123,
        42,
      ],
      data3: [
        1,
        32,
        3141,
        57,
        55,
        6241,
        4123,
        0,
        85,
        1,
        767,
        3453,
        23,
        341,
        4545,
        453,
        2234,
        453,
        9866,
        876,
        542,
        24,
        23,
        14243,
        2435,
        3454,
        764,
        456,
        4,
        234,
        87,
      ],
      data4: [
        1,
        344,
        3,
        67,
        5213,
        5223,
        211,
        200,
        67,
        34,
        1256,
        634,
        23,
        598,
        235,
        0,
        4223,
        3456,
        123,
        345,
        875,
        56,
        45,
        2356,
        234,
        634,
        4562,
        4563,
        0,
        653,
        234,
      ],
      data5: [
        1,
        344,
        3,
        757,
        534,
        4242,
        2126,
        0,
        5844,
        56,
        12433,
        1223,
        23,
        675,
        7674,
        234,
        2368,
        2346,
        345,
        123,
        3466,
        45,
        56,
        23624,
        345,
        234,
        2432,
        4325,
        234,
        546,
        345,
      ],
      labels: Days,
    },
  });

  useEffect(() => {
    return () => {
      dispatch(unmount_filter());
    };
  }, []);

  useEffect(() => {
    if (sales.grossSales) {
      setLoading(true);
    }
  }, [sales.grossSales]);

  const changeFilter = (v) => {
    if (v === "Hours") {
      setFilter("Hours");
    } else if (v === "Days") {
      setFilter("Days");
      setLoading(false);
      var today = new Date();
      let last30days = [];
      for (let i = 0; i < 30; i++) {
        let date = dateformat(
          new Date(new Date().setDate(today.getDate() - i)),
          "mmm dd"
        );
        last30days.push(date);
      }
      setDays(last30days);
      setSales({
        grossSales: {
          data: [
            1,
            2,
            3,
            4,
            5,
            62,
            21,
            142,
            43,
            1,
            123,
            123,
            123,
            14,
            213,
            3,
            421,
            123,
            124,
            123,
            123,
            412,
            2312,
            1412,
            132,
            24,
            3435,
            23,
            12433,
            123,
            53,
          ],
          data2: [
            3453,
            344,
            3,
            6757,
            5,
            62,
            21,
            142,
            43,
            1,
            123,
            123,
            23,
            14,
            4545,
            3,
            131,
            643,
            124,
            123,
            12351,
            843,
            786,
            1412,
            132,
            24,
            511,
            23,
            9867,
            123,
            42,
          ],
          data3: [
            5000,
            32,
            3141,
            57,
            55,
            6241,
            4123,
            0,
            85,
            1,
            767,
            3453,
            23,
            341,
            4545,
            453,
            2234,
            453,
            9866,
            876,
            542,
            24,
            23,
            14243,
            2435,
            3454,
            764,
            456,
            4,
            234,
            87,
          ],
          data4: [
            12312,
            344,
            3,
            67,
            5213,
            5223,
            211,
            200,
            67,
            34,
            12563,
            634,
            23,
            598,
            235,
            0,
            4223,
            3456,
            123,
            345,
            875,
            56,
            45,
            2356,
            234,
            634,
            4562,
            4563,
            0,
            653,
            234,
          ],
          data5: [
            2342,
            344,
            3,
            757,
            534,
            4242,
            2126,
            0,
            5844,
            56,
            12433,
            1223,
            23,
            675,
            7674,
            234,
            2368,
            2346,
            345,
            123,
            3466,
            45,
            56,
            23624,
            345,
            234,
            2432,
            4325,
            234,
            546,
            345,
          ],
          labels: Days,
        },
      });
      setLoading(true);
    }
  };

  const handleOnChangeSales = (e) => {
    setSalesFilter(e.trim());
  };

  console.log(salesFilter);
  return (
    <>
      <FilterComponent />

      <CCard>
        <CCardHeader>
          <CRow className="text-center">
            <CCol
              md
              sm="12"
              className="mb-sm-2 mb-0"
              onClick={() => handleOnChangeSales("Gross Sales")}
            >
              <div className="text-muted">Gross Sales</div>
              <strong>+29.703 (40%)</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="success"
                value={40}
              />
            </CCol>
            <CCol
              md
              sm="12"
              className="mb-sm-2 mb-0 d-md-down-none"
              onClick={() => handleOnChangeSales("Refunds")}
            >
              <div className="text-muted">Refunds</div>
              <strong>+24.093 (20%)</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="danger"
                value={40}
              />
            </CCol>
            <CCol
              md
              sm="12"
              className="mb-sm-2 mb-0"
              onClick={() => handleOnChangeSales("Discount")}
            >
              <div className="text-muted">Discounts</div>
              <strong>+78.706 (60%)</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="warning"
                value={40}
              />
            </CCol>
            <CCol
              md
              sm="12"
              className="mb-sm-2 mb-0"
              onClick={() => handleOnChangeSales("Net Sales")}
            >
              <div className="text-muted">Net Sales</div>
              <strong>+22.123 (80%)</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="info"
                value={40}
              />
            </CCol>
            <CCol
              md
              sm="12"
              className="mb-sm-2 mb-0 d-md-down-none"
              onClick={() => handleOnChangeSales("Gross Profit")}
            >
              <div className="text-muted">Gross Profit</div>
              <strong>+970 (40.15%)</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                value={40}
              />
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol sm="5">
              <h4 id="traffic" className="card-title mb-0">
                {salesFilter}
              </h4>
            </CCol>
            <CCol sm="7" className="d-none d-md-block">
              <CButton color="primary" className="float-right">
                <CIcon name="cil-cloud-download" />
              </CButton>
              <CButtonGroup className="float-right mr-3">
                {["Hours", "Days", "Weeks", "Months", "Quaters", "Years"].map(
                  (value) => (
                    <CButton
                      color="outline-secondary"
                      key={value}
                      className="mx-0"
                      onClick={() => changeFilter(value)}
                      active={value === filter}
                    >
                      {value}
                    </CButton>
                  )
                )}
              </CButtonGroup>
            </CCol>
          </CRow>
          {loading ? (
            <MainChartExample
              sales={sales}
              style={{ height: "300px", marginTop: "40px" }}
            />
          ) : (
            "Loading..."
          )}
        </CCardBody>
      </CCard>

      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Traffic {" & "} Sales</CCardHeader>
            <CCardBody>
              <br />

              <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                <thead className="thead-light">
                  <tr>
                    <th className="text-center">
                      <CIcon name="cil-people" />
                    </th>
                    <th>User</th>
                    <th className="text-center">Country</th>
                    <th>Usage</th>
                    <th className="text-center">Payment Method</th>
                    <th>Activity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center">
                      <div className="c-avatar">
                        <img
                          src={"avatars/1.jpg"}
                          className="c-avatar-img"
                          alt="admin@bootstrapmaster.com"
                        />
                        <span className="c-avatar-status bg-success"></span>
                      </div>
                    </td>
                    <td>
                      <div>Yiorgos Avraamu</div>
                      <div className="small text-muted">
                        <span>New</span> | Registered: Jan 1, 2015
                      </div>
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cif-us" title="us" id="us" />
                    </td>
                    <td>
                      <div className="clearfix">
                        <div className="float-left">
                          <strong>50%</strong>
                        </div>
                        <div className="float-right">
                          <small className="text-muted">
                            Jun 11, 2015 - Jul 10, 2015
                          </small>
                        </div>
                      </div>
                      <CProgress
                        className="progress-xs"
                        color="success"
                        value="50"
                      />
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cib-cc-mastercard" />
                    </td>
                    <td>
                      <div className="small text-muted">Last login</div>
                      <strong>10 sec ago</strong>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">
                      <div className="c-avatar">
                        <img
                          src={"avatars/2.jpg"}
                          className="c-avatar-img"
                          alt="admin@bootstrapmaster.com"
                        />
                        <span className="c-avatar-status bg-danger"></span>
                      </div>
                    </td>
                    <td>
                      <div>Avram Tarasios</div>
                      <div className="small text-muted">
                        <span>Recurring</span> | Registered: Jan 1, 2015
                      </div>
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cif-br" title="br" id="br" />
                    </td>
                    <td>
                      <div className="clearfix">
                        <div className="float-left">
                          <strong>10%</strong>
                        </div>
                        <div className="float-right">
                          <small className="text-muted">
                            Jun 11, 2015 - Jul 10, 2015
                          </small>
                        </div>
                      </div>
                      <CProgress
                        className="progress-xs"
                        color="info"
                        value="10"
                      />
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cib-cc-visa" />
                    </td>
                    <td>
                      <div className="small text-muted">Last login</div>
                      <strong>5 minutes ago</strong>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">
                      <div className="c-avatar">
                        <img
                          src={"avatars/3.jpg"}
                          className="c-avatar-img"
                          alt="admin@bootstrapmaster.com"
                        />
                        <span className="c-avatar-status bg-warning"></span>
                      </div>
                    </td>
                    <td>
                      <div>Quintin Ed</div>
                      <div className="small text-muted">
                        <span>New</span> | Registered: Jan 1, 2015
                      </div>
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cif-in" title="in" id="in" />
                    </td>
                    <td>
                      <div className="clearfix">
                        <div className="float-left">
                          <strong>74%</strong>
                        </div>
                        <div className="float-right">
                          <small className="text-muted">
                            Jun 11, 2015 - Jul 10, 2015
                          </small>
                        </div>
                      </div>
                      <CProgress
                        className="progress-xs"
                        color="warning"
                        value="74"
                      />
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cib-stripe" />
                    </td>
                    <td>
                      <div className="small text-muted">Last login</div>
                      <strong>1 hour ago</strong>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">
                      <div className="c-avatar">
                        <img
                          src={"avatars/4.jpg"}
                          className="c-avatar-img"
                          alt="admin@bootstrapmaster.com"
                        />
                        <span className="c-avatar-status bg-secondary"></span>
                      </div>
                    </td>
                    <td>
                      <div>Enéas Kwadwo</div>
                      <div className="small text-muted">
                        <span>New</span> | Registered: Jan 1, 2015
                      </div>
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cif-fr" title="fr" id="fr" />
                    </td>
                    <td>
                      <div className="clearfix">
                        <div className="float-left">
                          <strong>98%</strong>
                        </div>
                        <div className="float-right">
                          <small className="text-muted">
                            Jun 11, 2015 - Jul 10, 2015
                          </small>
                        </div>
                      </div>
                      <CProgress
                        className="progress-xs"
                        color="danger"
                        value="98"
                      />
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cib-paypal" />
                    </td>
                    <td>
                      <div className="small text-muted">Last login</div>
                      <strong>Last month</strong>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">
                      <div className="c-avatar">
                        <img
                          src={"avatars/5.jpg"}
                          className="c-avatar-img"
                          alt="admin@bootstrapmaster.com"
                        />
                        <span className="c-avatar-status bg-success"></span>
                      </div>
                    </td>
                    <td>
                      <div>Agapetus Tadeáš</div>
                      <div className="small text-muted">
                        <span>New</span> | Registered: Jan 1, 2015
                      </div>
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cif-es" title="es" id="es" />
                    </td>
                    <td>
                      <div className="clearfix">
                        <div className="float-left">
                          <strong>22%</strong>
                        </div>
                        <div className="float-right">
                          <small className="text-muted">
                            Jun 11, 2015 - Jul 10, 2015
                          </small>
                        </div>
                      </div>
                      <CProgress
                        className="progress-xs"
                        color="info"
                        value="22"
                      />
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cib-google-pay" />
                    </td>
                    <td>
                      <div className="small text-muted">Last login</div>
                      <strong>Last week</strong>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">
                      <div className="c-avatar">
                        <img
                          src={"avatars/6.jpg"}
                          className="c-avatar-img"
                          alt="admin@bootstrapmaster.com"
                        />
                        <span className="c-avatar-status bg-danger"></span>
                      </div>
                    </td>
                    <td>
                      <div>Friderik Dávid</div>
                      <div className="small text-muted">
                        <span>New</span> | Registered: Jan 1, 2015
                      </div>
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cif-pl" title="pl" id="pl" />
                    </td>
                    <td>
                      <div className="clearfix">
                        <div className="float-left">
                          <strong>43%</strong>
                        </div>
                        <div className="float-right">
                          <small className="text-muted">
                            Jun 11, 2015 - Jul 10, 2015
                          </small>
                        </div>
                      </div>
                      <CProgress
                        className="progress-xs"
                        color="success"
                        value="43"
                      />
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cib-cc-amex" />
                    </td>
                    <td>
                      <div className="small text-muted">Last login</div>
                      <strong>Yesterday</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Dashboard;
