import React from "react";
import { useDispatch, useSelector } from "react-redux";

const ItemListServerSideDatatable = (props) => {
  const darkMode = useSelector((state) => state.settings.darkMode);
  {
    /*style={{
    backgroundColor: darkMode === true ? "#181924" : "#fff",
  }}*/
  }
  return (
    <React.Fragment>
      <table
        id="itemListServerDatatable"
        className="table table-bordered"
        style={{ width: "100%" }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: darkMode === true ? "" : "#fff",
            }}
          >
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Cost</th>
            <th>Margin %</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody
          style={{
            backgroundColor:
              darkMode === true ? "rgb(36 37 47 / 0.96)" : "#fff",
          }}
        ></tbody>
      </table>
    </React.Fragment>
  );
};
export default ItemListServerSideDatatable;
// {props.itemList.length > 0 ? (
//   <React.Fragment>
//     <tr
//       style={{
//         backgroundColor: darkMode === true ? "#181924" : "#fff",
//       }}
//     >
//       <td>Tiger Nixon</td>
//       <td>System Architect</td>
//       <td>Edinburgh</td>
//       <td>61</td>
//       <td>2011/04/25</td>
//       <td>$320,800</td>
//     </tr>
//     <tr
//       style={{
//         backgroundColor: darkMode === true ? "#181924" : "#fff",
//       }}
//     >
//       <td>Garrett Winters</td>
//       <td>Accountant</td>
//       <td>Tokyo</td>
//       <td>63</td>
//       <td>2011/07/25</td>
//       <td>$170,750</td>
//     </tr>
//     <tr
//       style={{
//         backgroundColor: darkMode === true ? "#181924" : "#fff",
//       }}
//     >
//       <td>Ashton Cox</td>
//       <td>Junior Technical Author</td>
//       <td>San Francisco</td>
//       <td>66</td>
//       <td>2009/01/12</td>
//       <td>$86,000</td>
//     </tr>
//     <tr
//       style={{
//         backgroundColor: darkMode === true ? "#181924" : "#fff",
//       }}
//     >
//       <td>Cedric Kelly</td>
//       <td>Senior Javascript Developer</td>
//       <td>Edinburgh</td>
//       <td>22</td>
//       <td>2012/03/29</td>
//       <td>$433,060</td>
//     </tr>
//     <tr
//       style={{
//         backgroundColor: darkMode === true ? "#181924" : "#fff",
//       }}
//     >
//       <td>Airi Satou</td>
//       <td>Accountant</td>
//       <td>Tokyo</td>
//       <td>33</td>
//       <td>2008/11/28</td>
//       <td>$162,700</td>
//     </tr>
//     <tr
//       style={{
//         backgroundColor: darkMode === true ? "#181924" : "#fff",
//       }}
//     >
//       <td>Brielle Williamson</td>
//       <td>Integration Specialist</td>
//       <td>New York</td>
//       <td>61</td>
//       <td>2012/12/02</td>
//       <td>$372,000</td>
//     </tr>
//     <tr
//       style={{
//         backgroundColor: darkMode === true ? "#181924" : "#fff",
//       }}
//     >
//       <td>Herrod Chandler</td>
//       <td>Sales Assistant</td>
//       <td>San Francisco</td>
//       <td>59</td>
//       <td>2012/08/06</td>
//       <td>$137,500</td>
//     </tr>
//     <tr
//       style={{
//         backgroundColor: darkMode === true ? "#181924" : "#fff",
//       }}
//     >
//       <td>Rhona Davidson</td>
//       <td>Integration Specialist</td>
//       <td>Tokyo</td>
//       <td>55</td>
//       <td>2010/10/14</td>
//       <td>$327,900</td>
//     </tr>
//     <tr
//       style={{
//         backgroundColor: darkMode === true ? "#181924" : "#fff",
//       }}
//     >
//       <td>Colleen Hurst</td>
//       <td>Javascript Developer</td>
//       <td>San Francisco</td>
//       <td>39</td>
//       <td>2009/09/15</td>
//       <td>$205,500</td>
//     </tr>
//     <tr
//       style={{
//         backgroundColor: darkMode === true ? "#181924" : "#fff",
//       }}
//     >
//       <td>Sonya Frost</td>
//       <td>Software Engineer</td>
//       <td>Edinburgh</td>
//       <td>23</td>
//       <td>2008/12/13</td>
//       <td>$103,600</td>
//     </tr>
//     <tr
//       style={{
//         backgroundColor: darkMode === true ? "#181924" : "#fff",
//       }}
//     >
//       <td>Jena Gaines</td>
//       <td>Office Manager</td>
//       <td>London</td>
//       <td>30</td>
//       <td>2008/12/19</td>
//       <td>$90,560</td>
//     </tr>
//     <tr
//       style={{
//         backgroundColor: darkMode === true ? "#181924" : "#fff",
//       }}
//     >
//       <td>Quinn Flynn</td>
//       <td>Support Lead</td>
//       <td>Edinburgh</td>
//       <td>22</td>
//       <td>2013/03/03</td>
//       <td>$342,000</td>
//     </tr>
//     <tr
//       style={{
//         backgroundColor: darkMode === true ? "#181924" : "#fff",
//       }}
//     >
//       <td>Charde Marshall</td>
//       <td>Regional Director</td>
//       <td>San Francisco</td>
//       <td>36</td>
//       <td>2008/10/16</td>
//       <td>$470,600</td>
//     </tr>
//     <tr
//       style={{
//         backgroundColor: darkMode === true ? "#181924" : "#fff",
//       }}
//     >
//       <td>Haley Kennedy</td>
//       <td>Senior Marketing Designer</td>
//       <td>London</td>
//       <td>43</td>
//       <td>2012/12/18</td>
//       <td>$313,500</td>
//     </tr>
//     <tr
//       style={{
//         backgroundColor: darkMode === true ? "#181924" : "#fff",
//       }}
//     >
//       <td>Tatyana Fitzpatrick</td>
//       <td>Regional Director</td>
//       <td>London</td>
//       <td>19</td>
//       <td>2010/03/17</td>
//       <td>$385,750</td>
//     </tr>
//     <tr
//       style={{
//         backgroundColor: darkMode === true ? "#181924" : "#fff",
//       }}
//     >
//       <td>Michael Silva</td>
//       <td>Marketing Designer</td>
//       <td>London</td>
//       <td>66</td>
//       <td>2012/11/27</td>
//       <td>$198,500</td>
//     </tr>
//     <tr
//       style={{
//         backgroundColor: darkMode === true ? "#181924" : "#fff",
//       }}
//     >
//       <td>Paul Byrd</td>
//       <td>Chief Financial Officer (CFO)</td>
//       <td>New York</td>
//       <td>64</td>
//       <td>2010/06/09</td>
//       <td>$725,000</td>
//     </tr>
//     <tr
//       style={{
//         backgroundColor: darkMode === true ? "#181924" : "#fff",
//       }}
//     >
//       <td>Gloria Little</td>
//       <td>Systems Administrator</td>
//       <td>New York</td>
//       <td>59</td>
//       <td>2009/04/10</td>
//       <td>$237,500</td>
//     </tr>
//     <tr
//       style={{
//         backgroundColor: darkMode === true ? "#181924" : "#fff",
//       }}
//     >
//       <td>Bradley Greer</td>
//       <td>Software Engineer</td>
//       <td>London</td>
//       <td>41</td>
//       <td>2012/10/13</td>
//       <td>$132,000</td>
//     </tr>
//     <tr
//       style={{
//         backgroundColor: darkMode === true ? "#181924" : "#fff",
//       }}
//     >
//       <td>Dai Rios</td>
//       <td>Personnel Lead</td>
//       <td>Edinburgh</td>
//       <td>35</td>
//       <td>2012/09/26</td>
//       <td>$217,500</td>
//     </tr>
//     <tr
//       style={{
//         backgroundColor: darkMode === true ? "#181924" : "#fff",
//       }}
//     >
//       <td>Jenette Caldwell</td>
//       <td>Development Lead</td>
//       <td>New York</td>
//       <td>30</td>
//       <td>2011/09/03</td>
//       <td>$345,000</td>
//     </tr>
//     <tr
//       style={{
//         backgroundColor: darkMode === true ? "#181924" : "#fff",
//       }}
//     >
//       <td>Yuri Berry</td>
//       <td>Chief Marketing Officer (CMO)</td>
//       <td>New York</td>
//       <td>40</td>
//       <td>2009/06/25</td>
//       <td>$675,000</td>
//     </tr>
//     <tr
//       style={{
//         backgroundColor: darkMode === true ? "#181924" : "#fff",
//       }}
//     >
//       <td>Caesar Vance</td>
//       <td>Pre-Sales Support</td>
//       <td>New York</td>
//       <td>21</td>
//       <td>2011/12/12</td>
//       <td>$106,450</td>
//     </tr>
//     <tr
//       style={{
//         backgroundColor: darkMode === true ? "#181924" : "#fff",
//       }}
//     >
//       <td>Doris Wilder</td>
//       <td>Sales Assistant</td>
//       <td>Sydney</td>
//       <td>23</td>
//       <td>2010/09/20</td>
//       <td>$85,600</td>
//     </tr>
//     <tr
//       style={{
//         backgroundColor: darkMode === true ? "#181924" : "#fff",
//       }}
//     >
//       <td>Angelica Ramos</td>
//       <td>Chief Executive Officer (CEO)</td>
//       <td>London</td>
//       <td>47</td>
//       <td>2009/10/09</td>
//       <td>$1,200,000</td>
//     </tr>
//     <tr
//       style={{
//         backgroundColor: darkMode === true ? "#181924" : "#fff",
//       }}
//     >
//       <td>Gavin Joyce</td>
//       <td>Developer</td>
//       <td>Edinburgh</td>
//       <td>42</td>
//       <td>2010/12/22</td>
//       <td>$92,575</td>
//     </tr>
//     <tr
//       style={{
//         backgroundColor: darkMode === true ? "#181924" : "#fff",
//       }}
//     >
//       <td>Jennifer Chang</td>
//       <td>Regional Director</td>
//       <td>Singapore</td>
//       <td>28</td>
//       <td>2010/11/14</td>
//       <td>$357,650</td>
//     </tr>
//     <tr
//       style={{
//         backgroundColor: darkMode === true ? "#181924" : "#fff",
//       }}
//     >
//       <td>Brenden Wagner</td>
//       <td>Software Engineer</td>
//       <td>San Francisco</td>
//       <td>28</td>
//       <td>2011/06/07</td>
//       <td>$206,850</td>
//     </tr>
//     <tr
//       style={{
//         backgroundColor: darkMode === true ? "#181924" : "#fff",
//       }}
//     >
//       <td>Fiona Green</td>
//       <td>Chief Operating Officer (COO)</td>
//       <td>San Francisco</td>
//       <td>48</td>
//       <td>2010/03/11</td>
//       <td>$850,000</td>
//     </tr>
//     <tr
//       style={{
//         backgroundColor: darkMode === true ? "#181924" : "#fff",
//       }}
//     >
//       <td>Shou Itou</td>
//       <td>Regional Marketing</td>
//       <td>Tokyo</td>
//       <td>20</td>
//       <td>2011/08/14</td>
//       <td>$163,000</td>
//     </tr>
//     <tr
//       style={{
//         backgroundColor: darkMode === true ? "#181924" : "#fff",
//       }}
//     >
//       <td>Michelle House</td>
//       <td>Integration Specialist</td>
//       <td>Sydney</td>
//       <td>37</td>
//       <td>2011/06/02</td>
//       <td>$95,400</td>
//     </tr>
//     <tr
//       style={{
//         backgroundColor: darkMode === true ? "#181924" : "#fff",
//       }}
//     >
//       <td>Suki Burks</td>
//       <td>Developer</td>
//       <td>London</td>
//       <td>53</td>
//       <td>2009/10/22</td>
//       <td>$114,500</td>
//     </tr>
//     <tr
//       style={{
//         backgroundColor: darkMode === true ? "#181924" : "#fff",
//       }}
//     >
//       <td>Prescott Bartlett</td>
//       <td>Technical Author</td>
//       <td>London</td>
//       <td>27</td>
//       <td>2011/05/07</td>
//       <td>$145,000</td>
//     </tr>
//     <tr
//       style={{
//         backgroundColor: darkMode === true ? "#181924" : "#fff",
//       }}
//     >
//       <td>Gavin Cortez</td>
//       <td>Team Leader</td>
//       <td>San Francisco</td>
//       <td>22</td>
//       <td>2008/10/26</td>
//       <td>$235,500</td>
//     </tr>
//     <tr
//       style={{
//         backgroundColor: darkMode === true ? "#181924" : "#fff",
//       }}
//     >
//       <td>Martena Mccray</td>
//       <td>Post-Sales support</td>
//       <td>Edinburgh</td>
//       <td>46</td>
//       <td>2011/03/09</td>
//       <td>$324,050</td>
//     </tr>
//     <tr
//       style={{
//         backgroundColor: darkMode === true ? "#181924" : "#fff",
//       }}
//     >
//       <td>Unity Butler</td>
//       <td>Marketing Designer</td>
//       <td>San Francisco</td>
//       <td>47</td>
//       <td>2009/12/09</td>
//       <td>$85,675</td>
//     </tr>
//     <tr
//       style={{
//         backgroundColor: darkMode === true ? "#181924" : "#fff",
//       }}
//     >
//       <td>Howard Hatfield</td>
//       <td>Office Manager</td>
//       <td>San Francisco</td>
//       <td>51</td>
//       <td>2008/12/16</td>
//       <td>$164,500</td>
//     </tr>
//     <tr
//       style={{
//         backgroundColor: darkMode === true ? "#181924" : "#fff",
//       }}
//     >
//       <td>Hope Fuentes</td>
//       <td>Secretary</td>
//       <td>San Francisco</td>
//       <td>41</td>
//       <td>2010/02/12</td>
//       <td>$109,850</td>
//     </tr>
//     <tr
//       style={{
//         backgroundColor: darkMode === true ? "#181924" : "#fff",
//       }}
//     >
//       <td>Vivian Harrell</td>
//       <td>Financial Controller</td>
//       <td>San Francisco</td>
//       <td>62</td>
//       <td>2009/02/14</td>
//       <td>$452,500</td>
//     </tr>
//     <tr
//       style={{
//         backgroundColor: darkMode === true ? "#181924" : "#fff",
//       }}
//     >
//       <td>Timothy Mooney</td>
//       <td>Office Manager</td>
//       <td>London</td>
//       <td>37</td>
//       <td>2008/12/11</td>
//       <td>$136,200</td>
//     </tr>
//     <tr
//       style={{
//         backgroundColor: darkMode === true ? "#181924" : "#fff",
//       }}
//     >
//       <td>Jackson Bradshaw</td>
//       <td>Director</td>
//       <td>New York</td>
//       <td>65</td>
//       <td>2008/09/26</td>
//       <td>$645,750</td>
//     </tr>
//     <tr
//       style={{
//         backgroundColor: darkMode === true ? "#181924" : "#fff",
//       }}
//     >
//       <td>Olivia Liang</td>
//       <td>Support Engineer</td>
//       <td>Singapore</td>
//       <td>64</td>
//       <td>2011/02/03</td>
//       <td>$234,500</td>
//     </tr>
//     <tr
//       style={{
//         backgroundColor: darkMode === true ? "#181924" : "#fff",
//       }}
//     >
//       <td>Bruno Nash</td>
//       <td>Software Engineer</td>
//       <td>London</td>
//       <td>38</td>
//       <td>2011/05/03</td>
//       <td>$163,500</td>
//     </tr>
//     <tr
//       style={{
//         backgroundColor: darkMode === true ? "#181924" : "#fff",
//       }}
//     >
//       <td>Sakura Yamamoto</td>
//       <td>Support Engineer</td>
//       <td>Tokyo</td>
//       <td>37</td>
//       <td>2009/08/19</td>
//       <td>$139,575</td>
//     </tr>
//     <tr
//       style={{
//         backgroundColor: darkMode === true ? "#181924" : "#fff",
//       }}
//     >
//       <td>Thor Walton</td>
//       <td>Developer</td>
//       <td>New York</td>
//       <td>61</td>
//       <td>2013/08/11</td>
//       <td>$98,540</td>
//     </tr>
//     <tr
//       style={{
//         backgroundColor: darkMode === true ? "#181924" : "#fff",
//       }}
//     >
//       <td>Finn Camacho</td>
//       <td>Support Engineer</td>
//       <td>San Francisco</td>
//       <td>47</td>
//       <td>2009/07/07</td>
//       <td>$87,500</td>
//     </tr>
//     <tr
//       style={{
//         backgroundColor: darkMode === true ? "#181924" : "#fff",
//       }}
//     >
//       <td>Serge Baldwin</td>
//       <td>Data Coordinator</td>
//       <td>Singapore</td>
//       <td>64</td>
//       <td>2012/04/09</td>
//       <td>$138,575</td>
//     </tr>
//     <tr
//       style={{
//         backgroundColor: darkMode === true ? "#181924" : "#fff",
//       }}
//     >
//       <td>Zenaida Frank</td>
//       <td>Software Engineer</td>
//       <td>New York</td>
//       <td>63</td>
//       <td>2010/01/04</td>
//       <td>$125,250</td>
//     </tr>
//     <tr
//       style={{
//         backgroundColor: darkMode === true ? "#181924" : "#fff",
//       }}
//     >
//       <td>Zorita Serrano</td>
//       <td>Software Engineer</td>
//       <td>San Francisco</td>
//       <td>56</td>
//       <td>2012/06/01</td>
//       <td>$115,000</td>
//     </tr>
//     <tr
//       style={{
//         backgroundColor: darkMode === true ? "#181924" : "#fff",
//       }}
//     >
//       <td>Jennifer Acosta</td>
//       <td>Junior Javascript Developer</td>
//       <td>Edinburgh</td>
//       <td>43</td>
//       <td>2013/02/01</td>
//       <td>$75,650</td>
//     </tr>
//     <tr
//       style={{
//         backgroundColor: darkMode === true ? "#181924" : "#fff",
//       }}
//     >
//       <td>Cara Stevens</td>
//       <td>Sales Assistant</td>
//       <td>New York</td>
//       <td>46</td>
//       <td>2011/12/06</td>
//       <td>$145,600</td>
//     </tr>
//     <tr
//       style={{
//         backgroundColor: darkMode === true ? "#181924" : "#fff",
//       }}
//     >
//       <td>Hermione Butler</td>
//       <td>Regional Director</td>
//       <td>London</td>
//       <td>47</td>
//       <td>2011/03/21</td>
//       <td>$356,250</td>
//     </tr>
//     <tr
//       style={{
//         backgroundColor: darkMode === true ? "#181924" : "#fff",
//       }}
//     >
//       <td>Lael Greer</td>
//       <td>Systems Administrator</td>
//       <td>London</td>
//       <td>21</td>
//       <td>2009/02/27</td>
//       <td>$103,500</td>
//     </tr>
//     <tr
//       style={{
//         backgroundColor: darkMode === true ? "#181924" : "#fff",
//       }}
//     >
//       <td>Jonas Alexander</td>
//       <td>Developer</td>
//       <td>San Francisco</td>
//       <td>30</td>
//       <td>2010/07/14</td>
//       <td>$86,500</td>
//     </tr>
//     <tr
//       style={{
//         backgroundColor: darkMode === true ? "#181924" : "#fff",
//       }}
//     >
//       <td>Shad Decker</td>
//       <td>Regional Director</td>
//       <td>Edinburgh</td>
//       <td>51</td>
//       <td>2008/11/13</td>
//       <td>$183,000</td>
//     </tr>
//     <tr
//       style={{
//         backgroundColor: darkMode === true ? "#181924" : "#fff",
//       }}
//     >
//       <td>Michael Bruce</td>
//       <td>Javascript Developer</td>
//       <td>Singapore</td>
//       <td>29</td>
//       <td>2011/06/27</td>
//       <td>$183,000</td>
//     </tr>
//     <tr
//       style={{
//         backgroundColor: darkMode === true ? "#181924" : "#fff",
//       }}
//     >
//       <td>Donna Snider</td>
//       <td>Customer Support</td>
//       <td>New York</td>
//       <td>27</td>
//       <td>2011/01/25</td>
//       <td>$112,000</td>
//     </tr>
//   </React.Fragment>
// ) : (
//   ""
// )}
