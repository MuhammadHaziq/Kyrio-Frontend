import moment from "moment";
import dateformat from "dateformat";

const getNatural = (num) => {
    return parseFloat(num.toString().split(".")[0]);
};

export const filterDaysAction = (from, to) => {
    console.log("Days")
    var d = from,
      a = [],
      i = 0;
    var daysDates = [];
    const daysDiff = moment.duration(moment(to).diff(moment(from))).asDays();
    var time = moment(to).toDate(); // This will return a copy of the Date that the moment uses
    time.setHours(0);
    time.setMinutes(0);
    time.setSeconds(0);
    time.setMilliseconds(0);
    const monthDiff = moment.duration(moment(to).diff(moment(from))).asMonths();
    const diff = getNatural(monthDiff) === 0 ? 1 : getNatural(monthDiff);
    let filter = ""
    if (getNatural(daysDiff) > 0) {
      const dateGape =
        daysDiff >= 60 ? daysDiff / getNatural(monthDiff) : daysDiff;
      while (i < getNatural(dateGape)) {
        daysDates.push(dateformat(d, "mmm dd yyyy"));
        a.push(dateformat(d, "mmm dd"));
        d = moment(d, "DD-MM-YYYY").add(diff, "days");
        i++;
      }
      if (i === getNatural(daysDiff)) {
        // include last day
        daysDates.push(dateformat(d, "mmm dd yyyy"));
        a.push(dateformat(d, "mmm dd"));
      }
    //   setFilter("Days");
        filter = "Days"
    } else if (getNatural(daysDiff) === 0) {
      const totalHours = 24;
      var i = 1;
      while (i <= totalHours) {
        daysDates.push(moment(time).format("LT"));
        a.push(moment(time).format("LT"));
        time = moment(time).add(1, "hours").format("YYYY-MM-DD HH:mm:ss");
        i++;
      }
    //   setFilter("Hours");
      filter = "Hours"
    }
    // setDays(a);
    // setDates(daysDates);
    return { filter: filter, days: a, dates: daysDates }
};
  
export const filterDatesAction = (from, to, filterName, callback) => {
    
    var d = from,
      a = [],
      i = 0;
    var daysDates = [];
    const daysDiff = Math.round(
      moment.duration(moment(to).diff(moment(from))).asDays()
    );
    var time = moment(to).toDate(); // This will return a copy of the Date that the moment uses
    time.setHours(0);
    time.setMinutes(0);
    time.setSeconds(0);
    time.setMilliseconds(0);
    const monthDiff = moment.duration(moment(to).diff(moment(from))).asMonths();
    const diff = getNatural(monthDiff) === 0 ? 1 : getNatural(monthDiff);
    if (
      (getNatural(daysDiff) === 0 || getNatural(daysDiff) === 1) &&
      filterName === "Hours"
    ) {
      const totalHours = 24;
      var i = 1;
      while (i <= totalHours) {
        daysDates.push(moment(time).format("MMM DD, YYYY, hh:mm A"));
        a.push(moment(time).format("LT"));
        time = moment(time).add(1, "hours").format("YYYY-MM-DD HH:mm:ss");
        i++;
      }
    //   props.setFilter("Hours");
    //   setDays(a);
    //   setDates(daysDates);
    //   dispatch(change_days(a));
      callback({ filter: filterName, days: a, dates: daysDates })
    } else if (getNatural(daysDiff) > 1 && filterName === "Days") {
      const dateGape =
        daysDiff >= 60 ? daysDiff / getNatural(monthDiff) : daysDiff;
      while (i < getNatural(dateGape)) {
        daysDates.push(dateformat(d, "mmm dd yyyy"));
        a.push(dateformat(d, "mmm dd"));
        d = moment(d, "DD-MM-YYYY").add(diff, "days");
        i++;
      }
      if (i === getNatural(daysDiff)) {
        // include last day
        daysDates.push(dateformat(d, "mmm dd yyyy"));
        a.push(dateformat(d, "mmm dd"));
      }
    //   setDays(a);
    //   props.setFilter("Days");
    //   setDates(daysDates);
    //   dispatch(change_days(a));
      callback({ filter: filterName, days: a, dates: daysDates })
    } else if (getNatural(daysDiff) >= 7 && filterName === "Weeks") {
      let j = 0;
      let weeks = [];
      let weekDays = [];
      while (j <= daysDiff) {
        let currentDay = moment(d).day();
        if (j === 0) {
          currentDay = moment(d).day();
        }
        let weekRange = "";
        let weekRangeDays = "";
        weekRangeDays = dateformat(d, "mmm dd yyyy");
        weekRange = dateformat(d, "mmm dd");
        if (currentDay === 7) {
          weekRangeDays =
            dateformat(d, "mmm dd yyyy") + " - " + dateformat(d, "mmm dd yyyy");
          weekRange = dateformat(d, "mmm dd") + " - " + dateformat(d, "mmm dd");
          weekDays.push(weekRangeDays);
          weeks.push(weekRange);
          ++j;
        } else {
          for (; currentDay <= 7; currentDay++) {
            const startDate = dateformat(d, "dd-mm-yyyy");
            const endDate = dateformat(to, "dd-mm-yyyy");
            if (
              moment(startDate, "DD-MM-YYYY").isSame(
                moment(endDate, "DD-MM-YYYY")
              )
            ) {
              weekRangeDays += " - " + dateformat(d, "mmm dd yyyy");
              weekRange += " - " + dateformat(d, "mmm dd");
              weekDays.push(weekRangeDays);
              weeks.push(weekRange);
              return;
            } else if (currentDay === 6) {
              weekRangeDays += " - " + dateformat(d, "mmm dd yyyy");
              weekRange += " - " + dateformat(d, "mmm dd");
              weekDays.push(weekRangeDays);
              weeks.push(weekRange);
            }
            d = moment(d, "DD-MM-YYYY").add(1, "days");
            ++j;
          }
        }
        // setDays(weeks);
        // dispatch(change_days(weeks));
        // setDates(weekDays);
      }
      callback({ filter: filterName, days: weeks, dates: weekDays })
    } else if (getNatural(daysDiff) >= 28 && filterName === "Months") {
      let monthValues = [];
      let monthDates = [];
      // &&
      // moment(startDate).isSame(endDate, "year")
      while (moment(to).isAfter(d, "month")) {
        const startDate = dateformat(d, "yyyy-mm-dd");
        monthValues.push(dateformat(startDate, "mmm"));
        monthDates.push(dateformat(startDate, "mmm yyyy"));
        d = moment(d, "DD-MM-YYYY").add(1, "M");
      }
      if (moment(d).isSame(to, "month")) {
        const startDate = dateformat(d, "yyyy-mm-dd");
        monthValues.push(dateformat(startDate, "mmm"));
        monthDates.push(dateformat(startDate, "mmm yyyy"));
      }
    //   setDays(monthValues);
    //   setDates(monthDates);
    //   dispatch(change_days(monthValues));
      callback({ filter: filterName, days: monthValues, dates: monthDates })
    } else if (getNatural(daysDiff) >= 118 && filterName === "Quaters") {
      const totalQuater = Math.floor(to.diff(d, "months") / 3);
      let j = 0;
      let quaters = [];
      let quatersDates = [];
      while (j <= totalQuater) {
        let currentQuater = moment(d).month() + 1;
        if (j === 0) {
          currentQuater = moment(d).month() + 1;
        }
        let quaterRange = "";
        let quaterRangeDate = "";
        quaterRange = dateformat(d, "mmm dd");
        quaterRangeDate = dateformat(d, "mmm dd yyyy");
        if (
          (currentQuater === 3 ||
            currentQuater === 6 ||
            currentQuater === 9 ||
            currentQuater === 12) &&
          j === 0
        ) {
          quaterRange =
            moment(d).format("MMM-DD") +
            " - " +
            moment(d).endOf("month").format("MMM-DD");
          quaterRangeDate =
            moment(d).format("MMM DD YYYY") +
            " - " +
            moment(d).endOf("month").format("MMM DD YYYY");
          // dateformat(d, "mmm dd") + " - " + dateformat(d, "mmm dd");
          quaters.push(quaterRange);
          quatersDates.push(quaterRangeDate);
          d = moment(d, "DD-MM-YYYY").add(1, "M");
          ++j;
        } else {
          quaterRangeDate = moment(d).format("MMM DD YYYY");
          quaterRange = moment(d).format("MMM-DD");
          // dateformat(d, "mmm dd");
          if (
            moment(d).month() + 1 === 2 ||
            moment(d).month() + 1 === 5 ||
            moment(d).month() + 1 === 8 ||
            moment(d).month() + 1 === 11
          ) {
            d = moment(d, "DD-MM-YYYY").add(1, "M");
          } else {
            d = moment(d, "DD-MM-YYYY").add(2, "M");
          }
          //
          quaterRangeDate =
            quaterRangeDate +
            " - " +
            moment(d).endOf("month").format("MMM DD YYYY");
          quaterRange =
            quaterRange + " - " + moment(d).endOf("month").format("MMM-DD");
          // dateformat(d, "mmm dd");
          quatersDates.push(quaterRangeDate);
          quaters.push(quaterRange);
          d = moment(d, "DD-MM-YYYY").add(1, "M");
          ++j;
        }
      }
    //   setDays(quaters);
    //   dispatch(change_days(quaters));
    //   setDates(quatersDates);
      callback({ filter: filterName, days: quaters, dates: quatersDates })
    } else if (getNatural(daysDiff) >= 365 && filterName === "Years") {
      let endYear = moment(to).year();
      let startYear = moment(from).year();
      let years = [];
      let yearsDate = [];
      while (startYear <= endYear) {
        const yearRange = dateformat(d, "yyyy");
        years.push(yearRange);
        yearsDate.push(yearRange);
        d = moment(d, "DD-MM-YYYY").add(1, "Y");
        startYear = startYear + 1;
      }
    //   setDays(years);
    //   setDates(yearsDate);
    //   dispatch(change_days(years));
      callback({ filter: filterName, days: years, dates: yearsDate })
    }
  };