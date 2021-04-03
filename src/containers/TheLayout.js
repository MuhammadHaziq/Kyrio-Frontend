import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";
import {
  TheContent,
  TheSidebar,
  TheAside,
  TheFooter,
  TheHeader,
} from "./index";

const TheLayout = () => {
  const darkMode = useSelector((state) => state.settings.darkMode);

  const classes = classNames(
    "c-app c-default-layout",
    darkMode && "c-dark-theme"
  );
  // const removefile = (filename, filetype) => {
  //   var targetelement =
  //     filetype == "js" ? "script" : filetype == "css" ? "link" : "none"; //determine element type to create nodelist from
  //   var targetattr =
  //     filetype == "js" ? "src" : filetype == "css" ? "href" : "none"; //determine corresponding attribute to test for
  //   var allsuspects = document.getElementsByTagName(targetelement);
  //   for (var i = allsuspects.length; i >= 0; i--) {
  //     //search backwards within nodelist for matching elements to remove
  //     if (
  //       allsuspects[i] &&
  //       allsuspects[i].getAttribute(targetattr) != null &&
  //       allsuspects[i].getAttribute(targetattr).indexOf(filename) != -1
  //     )
  //       allsuspects[i].parentNode.removeChild(allsuspects[i]); //remove element by calling parentNode.removeChild()
  //   }
  // };

  // const loadjscssfile = (filename, filetype) => {
  //   if (filetype == "js") {
  //     //if filename is a external JavaScript file
  //     var fileref = document.createElement("script");
  //     fileref.setAttribute("type", "text/javascript");
  //     fileref.setAttribute("src", filename);
  //   } else if (filetype == "css") {
  //     //if filename is an external CSS file
  //     var fileref = document.createElement("link");
  //     fileref.setAttribute("rel", "stylesheet");
  //     fileref.setAttribute("type", "text/css");
  //     fileref.setAttribute("href", filename);
  //   }
  //   if (typeof fileref != "undefined")
  //     document.getElementsByTagName("head")[0].appendChild(fileref);
  // };
  // useEffect(() => {
  //   if (darkMode === true) {
  //     removefile("css/all_datatables_light.css", "css");
  //     loadjscssfile("css/all_datatables_dark.css", "css");
  //   } else {
  //     removefile("css/all_datatables_dark.css", "css");
  //     loadjscssfile("css/all_datatables_light.css", "css");
  //   }
  // }, [darkMode]);
  return (
    <div className={classes}>
      <TheSidebar />
      <TheAside />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <TheContent />
        </div>
        <TheFooter />
      </div>
    </div>
  );
};

export default TheLayout;
