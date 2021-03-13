import { CONDITIONS } from "../conditions.js";

export class ClsEmploye {
  VerifyHour(time, shift, type) {
    /***
     * Input:
     *        - time: (hour of work shift condition)
     *        - shift: (condition)
     *        - type: (lowLimit: true, topLimit: false)
     * Output: boolean (cumplies of not with conditions)
     */
    let shiftHour = Number(shift[0]);
    let hour = Number(time[0]);
    let minute = Number(time[1]);
    // console.log(shiftHour, hour, minute);
    if (type) {
      if (hour == shiftHour) {
        if (minute == 0) return false;
        return true;
      } else if (hour > shiftHour) {
        return true;
      } else {
        return false;
      }
    } else {
      if (hour == shiftHour) {
        if (minute != 0) return false;
        return true;
      } else if (shiftHour == 0) {
        if (hour < 24) {
          return true;
        }
      } else if (hour < shiftHour) {
        return true;
      } else {
        return false;
      }
    }
  }

  CalculateTime(startHour, startMinute, endHour, endMinute) {
    /** 
         * Calculate the number of hour between two times of day
         * Input: 
         	    - number: startHour (start hour of the day)
				- number: startMinute (start minute of the day)
				- number: endoHour (end hour of the day)
				- number: endMinute (end minute of the day)
         *  Output: Number of hours between two hours a day 
        */
    startHour = Number(startHour);
    startMinute = Number(startMinute);
    endHour = Number(endHour);
    endMinute = Number(endMinute);
    // console.log(startHour, startMinute, endHour, endMinute );
    if (
      startHour >= 24 ||
      endHour >= 24 ||
      startMinute >= 60 ||
      endMinute >= 60 ||
      endHour < startHour
    ) {
      return 0;
    }
    if (startMinute > endMinute) {
      endHour--;
      endMinute += 60;
    }
    return (endHour - startHour + (endMinute - startMinute) / 60).toFixed(2);
  }

  PaymentPerDay(startHour, startMinute, endHour, endMinute, value) {
    /***
         * Input: 
         	    - startHour (start hour of the day)
				- startMinute (start minute of the day)
				- endoHour (end hour of the day)
				- endMinute (end minute of the day)
                - value (array of objects of conditions)
         *  Output: number (amount to pay)
         */
    let isFound = false;
    let amountPay = 0;
    // console.log(value);
    for (let i = 0; i < value.length; i++) {
      let setStartHour = value[i].start;
      let setEndHour = value[i].end;
      // console.log(setStartHour, setEndHour);
      let lowLimit = this.VerifyHour(
        [startHour, startMinute],
        setStartHour,
        true
      );
      let topLimit = this.VerifyHour([endHour, endMinute], setEndHour, false);
      // console.log(lowLimit, topLimit);
      if (lowLimit && topLimit) {
        let time = this.CalculateTime(
          startHour,
          startMinute,
          endHour,
          endMinute
        );
        amountPay = value[i].USD * time;
        // console.log(amountPay);
        isFound = true;
      }
    }
    if (isFound) return amountPay;
  }

  CalculateAmountToPay(infoEmploye) {
    /**
     * Determine the values to be paid using the array Employe and Conditions.JS
     * Input: Employe info (information array)
     * Output: Total amount to paid
     */
    let valueDate = {};
    let total = 0;
    for (let i = 0; i < infoEmploye.length; i += 5) {
      if (CONDITIONS.WEEKDAY.includes(infoEmploye[i])) {
        valueDate = CONDITIONS.TIME_WEEKDAY;
      } else {
        valueDate = CONDITIONS.TIME_WEEKEND;
      }
      total += this.PaymentPerDay(
        infoEmploye[i + 1],
        infoEmploye[i + 2],
        infoEmploye[i + 3],
        infoEmploye[i + 4],
        valueDate
      );
    }
    return total.toFixed(2);
  }
}
