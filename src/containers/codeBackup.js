

                // Check Bacoffice Module Is Enabled Or Not For Reports also check if shift Feature is enabled or not
                // Shifts Feature Done
                // if(nav[0].name === "Reports"){
                  
                //   let mod = module.filter(itm => itm.backoffice.name === "View sales report")
                //   if(!mod[0].enable){
                    
                //     nav.splice(nav.findIndex(e => e.name === "Reports"),1);
                //   } else if(nav.filter(itm => itm.name == "Reports").length <= 0) {
                //     nav.push(_nav.filter(itm => itm.name == "Reports")[0])
                //   }
                //   let shift = user.features.filter(ftr => ftr.feature.name === "Shifts")
                  
                //   if(!shift[0].enable && mod[0].enable){
                //     nav[0]._children.splice(9, 1);
                //   } else if(nav[0]._children.filter(ch => ch.name === "Shifts").length <= 0 && mod[0].enable){
                //     nav[0]._children.push({
                //       _tag: "CSidebarNavItem",
                //       name: "Shifts",
                //       to: "/reports/shift",
                //     })
                //   }
                // }
                // // #END#
                // // Check Bacoffice Module Is Enabled Or Not For Items & Inventory
                // if(nav[0].name === "Items"){ 
                //   let mod = module.filter(itm => itm.backoffice.name === "Items")
                //   if(!mod[0].enable){
                //     nav.splice(nav.findIndex(e => e.name === "Items"),1);
                //   } else if(nav.filter(itm => itm.name == "Items").length <= 0) {
                //     nav.push(_nav.filter(itm => itm.name == "Items")[0])
                //   }
                // }
                // if(nav[0].name === "Inventory"){ 
                //   let mod = module.filter(itm => itm.backoffice.name === "Items")
                //   if(!mod[0].enable){
                //     nav.splice(nav.findIndex(e => e.name === "Inventory"),1);
                //   } else if(nav.filter(itm => itm.name == "Inventory").length <= 0) {
                //     nav.push(_nav.filter(itm => itm.name == "Inventory")[0])
                //   }
                // }
                // // #END#

                // // Check Bacoffice Module Is Enabled Or Not For Employees also check Features is enabled or not
                // if(nav[0].name === "Employees"){
                  
                //   let mod = module.filter(itm => itm.backoffice.name === "Manage employees")
                //   if(!mod[0].enable){
                //     nav.splice(nav.findIndex(e => e.name === "Employees"),1);
                //   } else if(nav.filter(itm => itm.name == "Employees").length <= 0) {
                //     nav.push(_nav.filter(itm => itm.name == "Employees")[0])
                //   }

                //   let timeClok = user.features.filter(ftr => ftr.feature.name === "Time clock")
                //   if(!timeClok[0].enable){
                //     nav[0]._children.splice(nav[0]._children.findIndex(e => e.name === "Timecards"), 1);
                //     nav[0]._children.splice(nav[0]._children.findIndex(e => e.name === "Total hours worked"), 1);
                //   } else if(nav[0]._children.filter(ch => ch.name === "Timecards").length <= 0){
                //     nav[0]._children.push({
                //       _tag: "CSidebarNavItem",
                //       name: "Timecards",
                //       to: "/employees/timecard",
                //     },
                //     {
                //       _tag: "CSidebarNavItem",
                //       name: "Total hours worked",
                //       to: "/employees/total-hour-worked",
                //     })
                //   }
                // }
                // // #END#

                // // Check Bacoffice Module Is Enabled Or Not For Customers
                // if(nav[0].name === "Customers"){ 
                //   let mod = module.filter(itm => itm.backoffice.name === "Manage customers")
                //   if(!mod[0].enable){
                //     nav.splice(nav.findIndex(e => e.name === "Customers"),1);
                //   } else if(nav.filter(itm => itm.name == "Customers").length <= 0) {
                //     nav.push(_nav.filter(itm => itm.name == "Customers")[0])
                //   }
                // }
                // #END#