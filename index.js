function createEmployeeRecord(arr)
{
    let emprecd = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: new Array(),
        timeOutEvents: new Array(),
    };
    return emprecd;
}

function createEmployeeRecords(arrofarr)
{
    let myempsarr = new Array();
    arrofarr.forEach((item) => myempsarr.push(createEmployeeRecord(item)));
    return myempsarr;
}

function isDigit(mchar)
{
  if (mchar == undefined)
  {
    throw "illegal argument exception: the strings must be defined (even if they are defined to be null)!";
  }
  //else;//do nothing

  if (mchar.length == 1)
  {
    if (mchar === '0' || mchar === '1' || mchar === '2' || mchar === '3' ||
    mchar === '4' || mchar === '5' || mchar === '6' || mchar === '7' || mchar === '8' ||
    mchar === '9')
    {
      return true;
    }
    else return false;
  }
  else throw "not a character!";
}

function isDateStrInCorrectFmt(datestr)
{
    //YYYY-MM-DD HHMM
    //yes the space is there
    if (datestr == undefined || datestr == null || datestr.length < 1)
    {
        throw "date string must be defined and not null!";
    }
    else
    {
        if (datestr.length == 10 || datestr.length == 15);//valid length
        else
        {
            throw "date string is defined, not null and it must be length 10 or 15, " +
                "but it was not!";
        }
    }

    for(let n = 0; n < datestr.length; n++)
    {
        if (isDigit(datestr.charAt(n)))
        {
            if (n == 4 || n == 7 || n == 10)
            {
                throw "date string is in the wrong format!";
            }
            //else;//do nothing
        }
        else
        {
            if (n == 4 || n == 7 || n == 10)
            {
                if (n == 4 || n == 7)
                {
                    if (datestr.charAt(n) == '-');
                    else throw "date string is in the wrong format!"; 
                }
                else if (n == 10)
                {
                    if (datestr.charAt(n) == ' ');
                    else throw "date string is in the wrong format!"; 
                }
                else throw "invalid value found and used for index n here!";
            }
            else throw "date string is in the wrong format!";
        }
    }//end of n for loop
    return true;
}

function createTimeInOrOutEvent(emprecobj, datestr, usetimein)
{
    if (isDateStrInCorrectFmt(datestr));
    else
    {
        throw "could not create time in or out event because the date string was not " +
            "in the correct format!";
    }

    let mytimeinobj = {
        type: "Time" + ((usetimein == true) ? "In" : "Out"),
        hour: Number(datestr.substring(11)),
        date: datestr.substring(0, 10),
    };
    if (usetimein)
    {
        emprecobj.timeInEvents.push(mytimeinobj);
        //console.log(emprecobj.timeInEvents[0].type);
        //console.log(emprecobj.timeInEvents[0].hour);
        //console.log(emprecobj.timeInEvents[0].date);
    }
    else
    {
        emprecobj.timeOutEvents.push(mytimeinobj);
        //console.log(emprecobj.timeOutEvents[0].type);
        //console.log(emprecobj.timeOutEvents[0].hour);
        //console.log(emprecobj.timeOutEvents[0].date);
    }
    return emprecobj;
}
function createTimeInEvent(emprecobj, datestr)
{
    return createTimeInOrOutEvent(emprecobj, datestr, true);
}
function createTimeOutEvent(emprecobj, datestr)
{
    return createTimeInOrOutEvent(emprecobj, datestr, false);
}

function noMissingPunchesFor(empobj)
{
    //console.log("empobj = " + empobj);
    //console.log("empobj.timeInEvents = " + empobj.timeInEvents);
    //console.log("empobj.timeOutEvents = " + empobj.timeOutEvents);
    //console.log("empobj.timeInEvents.length = " + empobj.timeInEvents.length);
    //console.log("empobj.timeOutEvents.length = " + empobj.timeOutEvents.length);
    if (empobj.timeInEvents.length == empobj.timeOutEvents.length);
    else
    {
        if (empobj.timeInEvents.length > empobj.timeOutEvents.length)
        {
            throw "you forgot to puch out!";
        }
        else throw "you forgot to puch in!";
    }
    return true;
}

function getDateObjFromDatestr(datestr)
{
    //console.log("datestr = " + datestr);

    if (isDateStrInCorrectFmt(datestr));
    else throw "date is not in the correct format cannot get the object!";

    //console.log("datestr.length = " + datestr.length);

    //my date string is in the format: YYYY-MM-DD HHMM
    
    let myyearstr = datestr.substring(0, 4);
    let mymonthstr = datestr.substring(4 + 1, 7);
    let mydaystr = "";
    let myhrstr = "";
    let myminstr = "";
    if (datestr.length == 10)
    {
        mydaystr = datestr.substring(7 + 1);
        myhrstr = "0";
        myminstr = "0";
    }
    else if (datestr.length == 15)
    {
        mydaystr = datestr.substring(7 + 1, 10);
        myhrstr = datestr.substring(10 + 1, 13);
        myminstr = datestr.substring(13);
    }
    else throw "illegal length found and used for the datestr";

    let myyearnum = Number(myyearstr);
    let mymonthnum = Number(mymonthstr);
    let mydaynum = Number(mydaystr);
    let myhrnum = Number(myhrstr);
    let myminnum = Number(myminstr);

    //const birthday4 = new Date(1995, 11, 17, 3, 24, 0);
    //year, month, day, hour, minute, second
    //the month starts at 0 for January and 11 for December


    let mdate = new Date(myyearnum, mymonthnum - 1, mydaynum, myhrnum, myminnum, 0);
    //console.log("mdate = " + mdate);

    return mdate;
}

function getDateForItem(item)
{
    //console.log("indx = " + indx);
    //console.log("item = " + item);
    //console.log("Object.keys(item) = " + Object.keys(item));
    //console.log("item.date = " + item.date);
    //console.log("item.hour = " + item.hour);
    let myhrstr = "" + item.hour;
    if (myhrstr.length < 4)
    {
        if (item.hour < 1000)
        {
            if (item.hour < 100)
            {
                if (item.hour < 10)
                {
                    if (item.hour < 0)
                    {
                        throw "illegal hour found and used here!";
                    }
                    else myhrstr = "000" + myhrstr;
                }
                else myhrstr = "00" + myhrstr;
            }
            else myhrstr = "0" + myhrstr;
            //console.log("NEW myhrstr = " + myhrstr);
        }
        else throw "the length should have been correct for the hour, but it was not!";
    }
    else if (myhrstr.length == 4);
    else throw "hour string is too long!";
    //console.log("FINAL myhrstr = " + myhrstr);
    return getDateObjFromDatestr(item.date + " " + myhrstr);
}

function areTwoDatesOnTheSameDay(datea, dateb)
{
    if (datea == undefined || datea == null)
    {
        if (dateb == undefined || dateb == null) return true;
        else return false;
    }
    else
    {
        if (dateb == undefined || dateb == null) return false;
        //else;//do nothing safe to proceed below
    }

    if (datea.getDate() == dateb.getDate())
    {
        if (datea.getMonth() == dateb.getMonth())
        {
            if (datea.getFullYear() == dateb.getFullYear())
            {
                return true;
            }
            else return false;
        }
        else return false;
    }
    else return false;
}

function isDateABeforeDateB(datea, dateb)
{
    if (areTwoDatesOnTheSameDay(datea, dateb)) return false;
    else
    {
        if (datea == undefined || datea == null || dateb == undefined || dateb == null)
        {
            throw "both of the dates must not be null!";
        }
        //else;//do nothing

        if (datea.getFullYear() < dateb.getFullYear()) return true;
        else if (datea.getFullYear() == dateb.getFullYear())
        {
            if (datea.getMonth() < dateb.getMonth()) return true;
            else if (datea.getMonth() == dateb.getMonth())
            {
                if (datea.getDate() < dateb.getDate()) return true;
                else if (datea.getDate() == dateb.getDate())
                {
                    throw "areTwoDatesOnTheSameDay() should have returned true, but " +
                        "it did not!";
                }
                else return false;
            }
            else return false;
        }
        else return false;
    }
}

function isDateATimeBeforeDateB(datea, dateb)
{
    if (datea == undefined || datea == null || dateb == undefined || dateb == null)
    {
        throw "both of the dates must not be null!";
    }
    //else;//do nothing

    if (datea.getFullYear() == dateb.getFullYear() &&
    datea.getMonth() == dateb.getMonth() && datea.getDate() == dateb.getDate())
    {
        if (datea.getHours() < dateb.getHours()) return true;
        else if (datea.getHours() == dateb.getHours())
        {
            if (datea.getMinutes() < dateb.getMinutes()) return true;
            else if (datea.getMinutes() == dateb.getMinutes())
            {
                if (datea.getSeconds() < dateb.getSeconds()) return true;
                else return false;
            }
            else return false;
        }
        else return false;
    }
    else throw "the dates must be on the same day, but they were not!";
}

function isDateOnListOfDates(empdates, mdate)
{
    if (empdates == undefined || empdates == null || empdates.length < 1 ||
        mdate == undefined || mdate == null)
    {
        return false;
    }
    //else;//do nothing safe to proceed

    for (let n = 0; n < empdates.length; n++)
    {
        if (areTwoDatesOnTheSameDay(empdates[n], mdate)) return true;
        //else;//do nothing
    }
    return false;
}

function didEMPWorkThroughTheDate(empindates, empoutdates, mdate)
{
    //is there an in date and out date that contains mdate
    //but no other dates between these two?
    //
    //is there an in date or an out date on mdate?
    //if yes, then return false.
    //
    //if no, then we need to determine if there is in < mdate < out?
    //if that does not exist, then return false.
    //if that does exist, then return true.

    let empstartondate = isDateOnListOfDates(empindates, mdate);
    if (empstartondate) return false;
    //else;//do nothing
    let empendondate = isDateOnListOfDates(empoutdates, mdate);
    if (empendondate) return false;
    //else;//do nothing
    
    //get all in dates that are less than mdate
    //get all out dates that are greater than mdate

    //if there is in date < mdate, and in date < an out date and out date < mdate,
    //then the in date is not used, the out date is automatically not used

    let myindatesbfrdate = new Array();
    let usemyindatesbfrdate = new Array();
    for (let n = 0; n < empindates.length; n++)
    {
        if (isDateABeforeDateB(empindates[n], mdate))
        {
            myindatesbfrdate.push(empindates[n]);
            usemyindatesbfrdate.push(true);
        }
        //else;//do nothing
    }
    let myoutdatesaftrdate = new Array();
    for (let n = 0; n < empoutdates.length; n++)
    {
        if (isDateABeforeDateB(mdate, empoutdates[n]))
        {
            myoutdatesaftrdate.push(empoutdates[n]);
        }
        //else;//do nothing
    }

    for (let n = 0; n < myindatesbfrdate.length; n++)
    {
        console.log("myindatesbfrdate[" + n + "] = " + myindatesbfrdate[n]);
        for(let k = 0; k < empoutdates.length; k++)
        {
            if (isDateABeforeDateB(myindatesbfrdate[n], empoutdates[k]))
            {
                if (isDateABeforeDateB(empoutdates[k], mdate))
                {
                    console.log("NOT USING THIS IN DATE!");
                    console.log("empoutdates[" + k + "] = " + empoutdates[k]);
                    console.log("mdate = " + mdate);
                    usemyindatesbfrdate[n] = false;
                    break;
                }
                //else;//do nothing
            }
            //else;//do nothing
        }
        console.log("usemyindatesbfrdate[" + n + "] = " + usemyindatesbfrdate[n]);
    }//end of n for loop

    throw "NOT DONE YET 6-27-2023 2:40 AM!";
}

function didEMPStartWorkOnAndEndOnTheDate(empindates, empoutdates, mdate)
{
    let empstartondate = isDateOnListOfDates(empindates, mdate);
    let empendondate = isDateOnListOfDates(empoutdates, mdate);
    if (empstartondate && empendondate)
    {
        //there is a start time and an end time on the date
        //we need start to be before the end time for this to return true
        let myinsonday = new Array();
        for (let n = 0; n < empindates.length; n++)
        {
            if (areTwoDatesOnTheSameDay(empindates[n], mdate))
            {
                myinsonday.push(empindates[n]);
            }
            //else;//do nothing
        }
        let myoutsonday = new Array();
        for (let n = 0; n < empoutdates.length; n++)
        {
            if (areTwoDatesOnTheSameDay(empoutdates[n], mdate))
            {
                myoutsonday.push(empoutdates[n]);
            }
            //else;//do nothing
        }
        if (myinsonday.length < 1 || myoutsonday.length < 1)
        {
            throw "there must be at least one in and one out on the day!";
        }
        //else;//do nothing

        for (let n = 0; n < myinsonday.length; n++)
        {
            for (let k = 0; k < myoutsonday.length; k++)
            {
                if (isDateATimeBeforeDateB(myinsonday[n], myoutsonday[k]))
                {
                    return true;
                }
                //else;//do nothing
            }
        }
        return false;
    }
    else return false;
}

function isLeapYear(yrnum)
{
    if (yrnum % 100 == 0)
    {
        if (yrnum % 400 == 0) return true;
        else return false;
    }
    else
    {
        if (yrnum % 4 == 0) return true;
        else return false;
    }
}

//if it starts on a leap year, if the month is january or february include it
//otherwise, do not include it
//but if it does not start on a leap year, include it
//NOTE: here we are checking to see if we should include it in subtraction
//NOTE: including it does not necessarily mean it is a leap year
function includeStartOrEndLeapYear(datea, usestart)
{
    if (datea == undefined || datea == null)
    {
        throw "the date must not be null!";
    }
    //else;//do nothing

    if (usestart == undefined || usestart == null)
    {
        throw "usestart must be a defined boolean variable!";
    }
    else
    {
        if (usestart == true || usestart == false);
        else throw "usestart must be a defined boolean variable!";
    }

    if (isLeapYear(datea.getFullYear()))
    {
        if (((datea.getMonth() == 1 || datea.getMonth() == 0) && usestart) ||
        ((datea.getMonth() > 1 && datea.getMonth() < 12) && !usestart))
        {
            return true;
        }
        else return false;
    }
    else return true;
}
function includeStartLeapYear(datea)
{
    return includeStartOrEndLeapYear(datea, true);
}
function includeEndLeapYear(datea)
{
    return includeStartOrEndLeapYear(datea, false);
}


function getNumLeapYearsBetweenTwoDates(datea, dateb)
{
    //let us say 2019 and 2023
    //will be 1
    let useayr = (datea.getFullYear() < dateb.getFullYear());
    let syr = -1;
    let eyr = -1;
    if (useayr)
    {
        syr = datea.getFullYear();
        eyr = dateb.getFullYear();
    }
    else
    {
        syr = dateb.getFullYear();
        eyr = datea.getFullYear();
    }
    let includesyr = false;
    let includeeyr = false;
    if (useayr)
    {
        includesyr = includeStartLeapYear(datea);
        includeeyr = includeEndLeapYear(dateb);
    }
    else
    {
        includesyr = includeStartLeapYear(dateb);
        includeeyr = includeEndLeapYear(datea);
    }
    //console.log("includesyr = " + includesyr);
    let cntr = 0;
    for (let yr = syr; yr < eyr; yr++)
    {
        if (isLeapYear(yr)) cntr++;
        //else;//do nothing
    }
    if (includesyr);
    else cntr--;
    const eisleap = isLeapYear(eyr);
    //console.log("includeeyr = " + includeeyr);
    //console.log("eisleap = " + eisleap);
    if (includeeyr && eisleap) cntr++;
    //else;//do nothing
    return cntr;
}

function getNumDaysInMonth(monthi)
{
    if (monthi == undefined || monthi == null)
    {
        throw "illegal value found and used here for the monthindex!";
    }
    //else;//do nothing

    if (isNaN(parseInt(monthi)))
    {
        throw "illegal value found and used here for the monthindex!";
    }
    //else;//do nothing

    if (monthi < 0 || monthi > 11)
    {
        throw "illegal value found and used here for the monthindex!";
    }
    else
    {
        if (monthi == 9 - 1 || monthi == 4 - 1 || monthi == 6 - 1 || monthi == 11 - 1)
        {
            return 30;
        }
        else if (monthi == 2 - 1) return 28;
        else return 31;
    }
}

function getNumDaysBetweenTwoDates(datea, dateb)
{
    //console.log("INSIDE GET NUM DAYS BETWEEN TWO DATES ()!");
    //console.log("datea = " + datea);
    //console.log("dateb = " + dateb);
    //console.log("datea.getMonth() = " + datea.getMonth());
    //console.log("datea.getDate() = " + datea.getDate());
    //console.log("datea.getFullYear() = " + datea.getFullYear());
    //console.log("dateb.getMonth() = " + dateb.getMonth());
    //console.log("dateb.getDate() = " + dateb.getDate());
    //console.log("dateb.getFullYear() = " + dateb.getFullYear());
    
    let sa = isDateABeforeDateB(datea, dateb);
    let smday = areTwoDatesOnTheSameDay(datea, dateb);
    
    //console.log("sa = " + sa);
    //console.log("smday = " + smday);
    
    if (smday) return 0;
    //else;//do nothing safe to proceed
    
    //30 days has september (9) april (4) june (6) and november (11)
    //all the rest have 31
    //except for februrary 28 or 29
    //use 365 for all years
    //add the number of leap days
    //figure out the months
    //just assume februrary has 28 days for calculations
    let numdays = 0;
    if (sa)
    {
        //2021 4 3 - 2019 5 6 = 1 year and ? 
        //console.log("datea = " + datea);
        //console.log("dateb = " + dateb);
        //console.log("datea.getMonth() = " + datea.getMonth());
        //console.log("datea.getDate() = " + datea.getDate());
        //console.log("datea.getFullYear() = " + datea.getFullYear());
        //console.log("dateb.getMonth() = " + dateb.getMonth());
        //console.log("dateb.getDate() = " + dateb.getDate());
        //console.log("dateb.getFullYear() = " + dateb.getFullYear());
        
        let yrdiff = dateb.getFullYear() - datea.getFullYear();
        //console.log("init yrdiff = " + yrdiff);
        if (datea.getMonth() < dateb.getMonth());
        else if (dateb.getMonth() == datea.getMonth())
        {
            if (datea.getDate() < dateb.getDate());
            else if (datea.getDate() == dateb.getDate());
            else yrdiff--;
        }
        else yrdiff--;
        //console.log("FINAL yrdiff = " + yrdiff);

        if (yrdiff > 1) numdays = yrdiff * 365;
        //else;//do nothing
        //console.log("init numdays = " + numdays);
        
        let numleapdays = getNumLeapYearsBetweenTwoDates(datea, dateb);
        //console.log("numleapdays = " + numleapdays);

        numdays += numleapdays;
        //console.log("NEW numdays = " + numdays);
        
        //compute the remainder which will be less than a year
        //first take start date and add yrdiff to it
        let mynwyr = datea.getFullYear() + yrdiff;
        //console.log("datea = " + datea);
        //console.log("dateb = " + dateb);
        //console.log("datea.getFullYear() + yrdiff = " +  mynwyr);

        if (mynwyr < dateb.getFullYear())
        {
            //figure out how many days are left in the year
            //first figure out how many days are left in the month
            const numdaysleftinmonth =
                (getNumDaysInMonth(datea.getMonth()) - datea.getDate());
            //console.log("datea.getMonth() = " + datea.getMonth());
            //console.log("datea.getDate() = " + datea.getDate());
            //console.log("datea.getFullYear() = " + datea.getFullYear());
            //console.log("numdaysleftinmonth = " + numdaysleftinmonth);

            let numdaysleftinyr = 0;
            for (let m = datea.getMonth() + 1; m < 12; m++)
            {
                numdaysleftinyr += getNumDaysInMonth(m);
            }
            //console.log("numdaysleftinyr = " + numdaysleftinyr);

            numdays += numdaysleftinmonth + numdaysleftinyr;
            //console.log("NEW numdays = " + numdays);

            //now go from jan 1st of the year to the day and the month of dateb
            let numdaysbeforemnth = 0;
            for (let m = 0; m < dateb.getMonth(); m++)
            {
                numdaysbeforemnth += getNumDaysInMonth(m);
            }
            //console.log("numdaysbeforemnth = " + numdaysbeforemnth);

            numdays += numdaysbeforemnth;
            //console.log("NEW numdays = " + numdays);
            
            //console.log("datea.getDate() = " + datea.getDate());
            //console.log("dateb.getDate() = " + dateb.getDate());
            //console.log("4 * 365 = " + (4*365));

            numdays += dateb.getDate();
            //console.log("FINAL numdays = " + numdays);

            return numdays;
        }
        else if (mynwyr == dateb.getFullYear())
        {
            //we need to go from datea to date b some how the years are the same
            //are the months the same? if not, go to the end of the month and then
            //get all of the days in all of the months before dateb's month
            //if yes, then just go to b's date.
            //console.log("the years are the same now!");
            if (datea.getMonth() == dateb.getMonth())
            {
                //console.log("the months are the same now!");
                //console.log("datea.getDate() = " + datea.getDate());
                //console.log("dateb.getDate() = " + dateb.getDate());
                
                numdays += dateb.getDate() - datea.getDate();
                //console.log("FINAL numdays = " + numdays);

                return numdays;
            }
            else if (datea.getMonth() < dateb.getMonth())
            {
                //console.log("the months are different now!");

                //first figure out how many days are left in the month
                //then get the number of days in the months
                //leading up to the one we want
                const numdaysleftinmonth =
                    (getNumDaysInMonth(datea.getMonth()) - datea.getDate());
                //console.log("datea.getMonth() = " + datea.getMonth());
                //console.log("datea.getDate() = " + datea.getDate());
                //console.log("datea.getFullYear() = " + datea.getFullYear());
                //console.log("numdaysleftinmonth = " + numdaysleftinmonth);
                
                let numdaysbeforemnth = 0;
                for (let m = datea.getMonth() + 1; m < dateb.getMonth() && m < 12; m++)
                {
                    numdaysbeforemnth += getNumDaysInMonth(m);
                }
                //console.log("numdaysbeforemnth = " + numdaysbeforemnth);

                numdays += numdaysleftinmonth + numdaysbeforemnth;
                //console.log("NEW numdays = " + numdays);

                //console.log("datea.getDate() = " + datea.getDate());
                //console.log("dateb.getDate() = " + dateb.getDate());
                //console.log("4 * 365 = " + (4*365));

                numdays += dateb.getDate();
                //console.log("FINAL numdays = " + numdays);

                return numdays;
            }
            else
            {
                throw "dateb's month must be greater than or equal to a's month for " +
                    "dateb to be after datea and for their years to be the same, but " +
                    "this was not the case!";
            }
        }
        else throw "since we began with datea, then we cannot be greater than b's year!";
    }
    else return getNumDaysBetweenTwoDates(dateb, datea);
}

function getNumHoursBetweenTwoDates(datea, dateb)
{
    //console.log("INSIDE GET NUM HOURS BETWEEN TWO DATES ()!");
    
    let isonsameday = areTwoDatesOnTheSameDay(datea, dateb);
    
    //console.log("isonsameday = " + isonsameday);

    let useafirst = false;
    if (isonsameday) useafirst = isDateATimeBeforeDateB(datea, dateb);
    else useafirst = isDateABeforeDateB(datea, dateb);
    
    //console.log("useafirst = " + useafirst);
    //console.log("datea = " + datea);
    //console.log("dateb = " + dateb);
    
    let hrdiff = 0;
    let mindiff = 0;
    let secdiff = 0;
    //let yrdiff = 0;
    //let monthdiff = 0;
    let daydiff = 0;
    if (useafirst)
    {
        //yrdiff = dateb.getFullYear() - datea.getFullYear();
        hrdiff = dateb.getHours() - datea.getHours();
        mindiff = dateb.getMinutes() - datea.getMinutes();
        secdiff = dateb.getSeconds() - datea.getSeconds();
        //monthdiff = dateb.getMonth() - datea.getMonth();
        //daydiff = dateb.getDate() - datea.getDate();
        daydiff = getNumDaysBetweenTwoDates(datea, dateb);
    }
    else
    {
        //yrdiff = datea.getFullYear() - dateb.getFullYear();
        hrdiff = datea.getHours() - dateb.getHours();
        mindiff = datea.getMinutes() - dateb.getMinutes();
        secdiff = datea.getSeconds() - dateb.getSeconds();
        //monthdiff = datea.getMonth() - dateb.getMonth();
        //daydiff = datea.getDate() - dateb.getDate();
        daydiff = getNumDaysBetweenTwoDates(dateb, datea);
    }
    //console.log("init daydiff = " + daydiff);
    //console.log("init hrdiff = " + hrdiff);
    //console.log("init mindiff = " + mindiff);
    //console.log("init secdiff = " + secdiff);

    //remember: there are 24 hours in 1 day
    //there are 60 minutes in 1 hour
    //there are 60 seconds in 1 minute
    //there are 7 days in 1 week
    //there are 12 months in a year
    //there are 365 or 366 days in a year

    //we want hours only
    //we also need to work with decimals
    //assume 24 hour clock

    if (isonsameday)
    {
        //daydiff = 0, monthdiff = 0, yeardiff = 0
        //hrdiff will be at least 0 and at most 24
        //6:45 PM - 3:54 PM: 2 hours and 51 minutes
        //3:54 + 2 hours = 5:54 PM
        //6:45 - 5:54 = 51 minutes
        //5:54 + 6 minutes = 6 PM
        //6:45 - 6 PM = 45 minutes
        //actual = 2 hours and 51 minutes
        //hrdiff = 3
        //mindiff = -9
        //secdiff = 0

        //3:09:45 - 1:20:54 = ?
        //hrdiff = 2    -> 2   -> 1
        //mindiff = -11 -> -12 -> 48
        //secdiff = -9 -> 51

        //hrdiff = 2 -> 1
        //mindiff = -11 -> 49 -> 48
        //secdiff = -9 -> -9 -> 51

        //console.log("datea = " + datea);
        //console.log("dateb = " + dateb);
        //console.log("OLD secdiff = " + secdiff);
        //console.log("OLD mindiff = " + mindiff);
        while(secdiff < 0)
        {
            mindiff--;
            secdiff += 60;
        }
        //console.log("FINAL secdiff = " + secdiff);
        //console.log("NEW mindiff = " + mindiff);
        //console.log("OLD hrdiff = " + hrdiff);

        //if minute difference is negative convert an hour to minutes and subtract
        //then subtract 1 from the hour.

        while (mindiff < 0)
        {
            hrdiff--;
            mindiff += 60;
        }
        //console.log("FINAL mindiff = " + mindiff);
        //console.log("FINAL hrdiff = " + hrdiff);
        
        if (hrdiff < 0 || mindiff < 0 || secdiff < 0)
        {
            throw "the final differences must not be less than zero!";
        }
        //else;//do nothing

        return hrdiff + (mindiff/60) + (secdiff/(60*60));
    }
    else
    {
        //(1/1/2020 6:47:47 AM) - (12-31-2019 20:54:54) PM
        //months start at 0 and end at 11
        //yrdiff = 1 -> 0
        //monthdiff = -11 -> 1 -> 0
        //daydiff = -30 -> -30 -> 1 -> 0
        //hrdiff = -14 -> -14 -> -14 -> 10 -> 9
        //mindiff = -7 -> -7 -> -7 -> -7 -> 53 -> 52
        //secdiff = -7 -> -7 -> -7 -> -7 -> -7 -> 53

        //sept, april, june, november 30 days
        //jan, feb, mar, may, jul, aug, oct, dec 31 days
        //februrary 28 or 29 days
        
        //are we crossing over a leap year...
        //then add the extra day...

        //(3/1/2020 6:47:47 AM) - (2/28/2020 6:47:47) = 2 days
        //yrdiff = 0
        //monthdiff = 1 -> 0
        //daydiff = -27 -> 2
        //times are the same below this point

        //console.log("datea = " + datea);
        //console.log("dateb = " + dateb);
        //console.log("OLD secdiff = " + secdiff);
        //console.log("OLD mindiff = " + mindiff);
        //console.log("init daydiff = " + daydiff);
        while(secdiff < 0)
        {
            mindiff--;
            secdiff += 60;
        }
        //console.log("FINAL secdiff = " + secdiff);
        //console.log("NEW mindiff = " + mindiff);
        //console.log("OLD hrdiff = " + hrdiff);

        while (mindiff < 0)
        {
            hrdiff--;
            mindiff += 60;
        }
        //console.log("FINAL mindiff = " + mindiff);
        //console.log("NEW hrdiff = " + hrdiff);
        //console.log("OLD daydiff = " + daydiff);

        while(hrdiff < 0)
        {
            daydiff--;
            hrdiff += 24;
        }
        //console.log("FINAL hrdiff = " + hrdiff);
        //console.log("FINAL daydiff = " + daydiff);

        if (daydiff < 0 || hrdiff < 0 || mindiff < 0 || secdiff < 0)
        {
            throw "the final differences must not be less than zero!";
        }
        //else;//do nothing

        return (daydiff*24)+ hrdiff + (mindiff/60) + (secdiff/(60*60));
    }
}

function getMinDateOf(mdates)
{
    if (mdates == undefined || mdates == null || mdates.length < 1)
    {
        return null;
    }
    else if (mdates.length == 1) return mdates[0];
    else
    {
        let mindatei = -1;
        for (let n = 0; n < mdates.length; n++)
        {
            if (mindatei < 0 || n == 0 ||
                isDateABeforeDateB(mdates[n], mdates[mindatei]))
            {
                mindatei = n;
            }
            //else;//do nothing
        }
        return mdates[mindatei];
    }
}

function hoursWorkedOnDate(emprecobj, datestr)
{
    if (isDateStrInCorrectFmt(datestr));
    else
    {
        throw "could not calculate the hours worked on the date because the date " +
            "string was not in the correct format!";
    }
    if (noMissingPunchesFor(emprecobj));
    else throw "you missed some punches!";

    //search for the time in event on the date
    //if there is no time in event on given date: return from previous timein found
    //if there is no time in event found before given date at all: return 0 or error?
    //if there is no time out event on given date: return from next timeout found
    //if no time out event after date: error

    console.log("datestr = " + datestr);
    console.log("datestr.length = " + datestr.length);

    let mdate = getDateObjFromDatestr(datestr);
    console.log("mdate = " + mdate);
    console.log("mdate.getMonth() = " + mdate.getMonth());
    console.log("mdate.getDate() = " + mdate.getDate());
    console.log("mdate.getFullYear() = " + mdate.getFullYear());
    console.log("mdate.getHours() = " + mdate.getHours());
    console.log("mdate.getMinutes() = " + mdate.getMinutes());
    console.log("mdate.getSeconds() = " + mdate.getSeconds());
        
    
    let indates = emprecobj.timeInEvents.map((item) => getDateForItem(item));
    let outdates = emprecobj.timeOutEvents.map((item) => getDateForItem(item));
    console.log("indates has " + indates.length + " item(s) on it:");
    for (let p = 0; p < indates.length; p++)
    {
        console.log("indates[" + p + "] = " + indates[p]);
    }
    console.log("outdates has " + outdates.length + " item(s) on it:");
    for (let p = 0; p < outdates.length; p++)
    {
        console.log("outdates[" + p + "] = " + outdates[p]);
    }

    if (indates.length < 1 && outdates.length < 1)
    {
        console.log("THE EMPLOYEE HAS NOT WORKED AT ALL!");
        return 0;
    }
    //else;//do nothing
    console.log();

    let empstartedandendedonsameday = 
        didEMPStartWorkOnAndEndOnTheDate(indates, outdates, mdate);
    console.log("empstartedandendedonsameday = " + empstartedandendedonsameday);
    console.log();

    if (empstartedandendedonsameday)
    {
        //now get the start and end date that was the same as the mdate
        //what happens if there are multiple ins and outs on the same day?
        //
        //in for morning, out for lunch, in for afternoon, out for evening
        //
        //in the night before, out in morning, in for afternoon, out for evening,
        //in for night
        let myinsonday = new Array();
        for (let n = 0; n < indates.length; n++)
        {
            if (areTwoDatesOnTheSameDay(indates[n], mdate))
            {
                myinsonday.push(indates[n]);
            }
            //else;//do nothing
        }
        let myoutsonday = new Array();
        for (let n = 0; n < outdates.length; n++)
        {
            if (areTwoDatesOnTheSameDay(outdates[n], mdate))
            {
                myoutsonday.push(outdates[n]);
            }
            //else;//do nothing
        }
        if (myinsonday.length == myoutsonday.length);
        else throw "the number of ins and outs must be the same!";
        
        //let mytestdatea = new Date(2019, 11, 31, 20, 54, 54);
        //let mytestdateb = new Date(2020, 0, 1, 6, 47, 47);
        //let mytestnumdays = getNumDaysBetweenTwoDates(mytestdatea, mytestdateb);
        //let mytestnumhours = getNumHoursBetweenTwoDates(mytestdatea, mytestdateb);
        //console.log("mytestnumdays = " + mytestnumdays);
        //console.log("mytestnumhours = " + mytestnumhours);

        if (myinsonday.length < 1 || myoutsonday.length < 1)
        {
            throw "there must be at least one in and one out on the date!";
        }
        else if (myinsonday.length == 1)
        {
            console.log("there is only one in found for the day!");
            if (myoutsonday.length == 1)
            {
                //just compute the time
                console.log("there is only one out found for the day!");
                
                let mhrs = getNumHoursBetweenTwoDates(myinsonday[0], myoutsonday[0]);
                
                console.log("mhrs = " + mhrs);
                console.log("myinsonday[0] = " + myinsonday[0]);
                console.log("myoutsonday[0] = " + myoutsonday[0]);
                return mhrs;
            }
            else throw "the number of ins and outs must be the same!";
        }
        else
        {
            //first figure out which in goes with which out
            //then compute the time between them and add them up
            //there will be an in before an out on the day

            console.log("myinsonday has " + myinsonday.length + " item(s) on it:");
            for (let p = 0; p < myinsonday.length; p++)
            {
                console.log("myinsonday[" + p + "] = " + myinsonday[p]);
            }
            console.log("myoutsonday has " + myoutsonday.length + " item(s) on it:");
            for (let p = 0; p < myoutsonday.length; p++)
            {
                console.log("myoutsonday[" + p + "] = " + myoutsonday[p]);
            }
            console.log();

            let myoutisformyinis = new Array();
            for (let n = 0; n < myinsonday.length; n++) myoutisformyinis.push(-1);
            for (let n = 0; n < myinsonday.length; n++)
            {
                let possibleoutsforin = new Array();
                for (let k = 0; k < myoutsonday.length; k++)
                {
                    console.log("myoutsonday[" + k + "] = " + myoutsonday[k]);
                    console.log("myinsonday[" + n + "] = " + myinsonday[n]);
                    //console.log("myinsonday[" + n + "].getMonth() = " +
                    //    myinsonday[n].getMonth());
                    //console.log("myinsonday[" + n + "].getDate() = " +
                    //    myinsonday[n].getDate());
                    //console.log("myinsonday[" + n + "].getFullYear() = " +
                    //    myinsonday[n].getFullYear());
                    
                    let useafirst = false;
                    if (areTwoDatesOnTheSameDay(myinsonday[n], myoutsonday[k]))
                    {
                        useafirst =
                            isDateATimeBeforeDateB(myinsonday[n], myoutsonday[k]);
                    }
                    else useafirst = isDateABeforeDateB(myinsonday[n], myoutsonday[k]);
                    console.log("useafirst = " + useafirst);
                    
                    if (useafirst)
                    {
                        //this is a possible out for the in
                        console.log("for the in at index n = " +
                            n + " found a possible out at index k = " + k + "!");
                        console.log("myoutsonday[k] = " + myoutsonday[k]);
                        console.log("myinsonday[n] = " + myinsonday[n]);
                        console.log();
                        possibleoutsforin.push(k);
                    }
                    //else;//do nothing not possible
                }

                console.log("possibleoutsforin.length = " + possibleoutsforin.length);
                console.log("myinsonday[" + n + "] = " + myinsonday[n]);
                if (possibleoutsforin.length < 1);
                else if (possibleoutsforin.length == 1)
                {
                    myoutisformyinis[n] = possibleoutsforin[0];
                }
                else
                {
                    //there are multiple possibilities, we need to pick the closest one
                    let poutdates = new Array();
                    for (let k = 0; k < possibleoutsforin.length; k++)
                    {
                        console.log("possibleoutsforin[" + k + "] = " +
                            possibleoutsforin[k]);
                        console.log("myoutsonday[possibleoutsforin[" + k + "]] = " +
                            myoutsonday[possibleoutsforin[k]]);
                        poutdates.push(myoutsonday[possibleoutsforin[k]]);
                    }
                    console.log();

                    let mindate = getMinDateOf(poutdates);
                    console.log("mindate = " + mindate);
                    console.log();

                    let fndmindate = false;
                    for (let k = 0; k < possibleoutsforin.length; k++)
                    {
                        console.log("myoutsonday[possibleoutsforin[" + k + "]] = " +
                            myoutsonday[possibleoutsforin[k]]);
                        console.log("mindate = " + mindate);

                        if (mindate === myoutsonday[possibleoutsforin[k]])
                        {
                            console.log("found mindate!");
                            fndmindate = true;
                            myoutisformyinis[n] = possibleoutsforin[k];
                            break;
                        }
                        //else;//do nothing
                    }
                    console.log("fndmindate = " + fndmindate);

                    if (fndmindate);
                    else throw "mindate was found on the list, but now it was not!";
                }
                console.log("NEW myoutisformyinis[" + n + "] = " + myoutisformyinis[n]);
                console.log("moving on to the next item!");
                console.log();
            }//end of n for loop

            let mhrs = 0;
            for (let n = 0; n < myinsonday.length; n++)
            {
                console.log("myinsonday[" + n + "] = " + myinsonday[n]);
                console.log("myoutisformyinis[" + n + "] = " + myoutisformyinis[n]);
                if (myoutisformyinis[n] < 0 || myoutisformyinis[n] > myoutsonday.length - 1)
                {
                    //need to use midnight as the subtractor...
                    //this in time does not have an out time on the day
                    //use midnight the next day as other date
                    
                    let myodate = new Date(myinsonday[n].getFullYear(),
                        myinsonday[n].getMonth(), myinsonday[n].getDate() + 1);
                    console.log("myodate = " + myodate);
                    
                    if (isDateABeforeDateB(myinsonday[n], myodate));
                    else throw "the out date must be after the in date, but it was not!";

                    mhrs += getNumHoursBetweenTwoDates(myinsonday[n], myodate);
                }
                else
                {
                    console.log("myoutsonday[myoutisformyinis[" + n + "]] = " +
                        myoutsonday[myoutisformyinis[n]]);
                    mhrs += getNumHoursBetweenTwoDates(myinsonday[n],
                        myoutsonday[myoutisformyinis[n]]);
                }
                console.log("NEW mhrs = " + mhrs);
            }//end of n for loop
            console.log("hours after all of the in and out combos = mhrs = " + mhrs);
            console.log();

            //need to make sure there were no outs missed
            let usedoutdate = new Array();
            for (n = 0; n < myoutsonday.length; n++) usedoutdate[n] = false;
            for (let n = 0; n < myoutisformyinis.length; n++)
            {
                if ((myoutisformyinis[n] > 0 || myoutisformyinis[n] == 0) &&
                (myoutisformyinis[n] < myoutsonday.length))
                {
                    usedoutdate[myoutisformyinis[n]] = true;
                }
                //else;//do nothing
            }
            
            let numoutsmissed = 0;
            let firstmissedouti = -1;
            for (n = 0; n < myoutsonday.length; n++)
            {
                console.log("usedoutdate[" + n + "] = " + usedoutdate[n]);

                if (usedoutdate[n]);
                else
                {
                    numoutsmissed++;
                    if (firstmissedouti < 0) firstmissedouti = n;
                    //else;//do nothing
                }
            }
            console.log("numoutsmissed = " + numoutsmissed);
            console.log("firstmissedouti = " + firstmissedouti);

            if (numoutsmissed < 0 || numoutsmissed > 1)
            {
                throw "illegal number of outs were missed were found and used here!";
            }
            //else;//do nothing

            if (numoutsmissed == 1)
            {
                //we missed an out here so we need from midnight to this time
                if (firstmissedouti < 0 || firstmissedouti > myoutsonday.length - 1)
                {
                    throw "illegal value found and used for the first missed out index!";
                }
                //else;//do nothing safe to proceed

                console.log("myoutsonday[" + firstmissedouti + "] = " +
                    myoutsonday[firstmissedouti]);

                let myodate = new Date(myoutsonday[firstmissedouti].getFullYear(),
                    myoutsonday[firstmissedouti].getMonth(),
                    myoutsonday[firstmissedouti].getDate());
                
                console.log("myodate = " + myodate);
                
                if (isDateATimeBeforeDateB(myodate, myoutsonday[firstmissedouti]));
                else
                {
                    throw "the generated in date must be before the out date, but it " +
                        "was not!";
                }

                mhrs += getNumHoursBetweenTwoDates(myodate,
                    myoutsonday[firstmissedouti]);
                console.log("NEW mhrs = " + mhrs);
            }
            //else;//do nothing
            console.log("FINAL mhrs = " + mhrs);

            return mhrs;
        }
    }
    //else;//do nothing

    let empworkedthruday = didEMPWorkThroughTheDate(indates, outdates, mdate);
    console.log("empworkedthruday = " + empworkedthruday);

    if (empworkedthruday) return 24;
    //else;//do nothing

    throw "NOT DONE YET 6-27-2023 2:40 AM!";
}

//driver function to test methods
function testHoursWorkedOnDay()
{
    let myempprops = ["firstname", "familyname", "title", 30];
    let myemp = createEmployeeRecord(myempprops);
    
    //in for morning, out for lunch, in for afternoon, out for evening
    //
    //in the night before, out in morning, in for afternoon, out for evening,
    //in for night

    //YYYY-MM-DD HHMM
    let testnohours = false;
    let testworkedoneshift = false;
    let testworkedcontinuously = true;
    if (testnohours)
    {
        testworkedoneshift = false;
        testworkedcontinuously = false;
    }
    else
    {
        if (testworkedcontinuously)
        {
            if (testworkedoneshift) testworkedoneshift = false;
            //else;//do nothing
        }
    }
    console.log("testnohours = " + testnohours);
    console.log("testworkedoneshift = " + testworkedoneshift);
    console.log("testworkedcontinuously = " + testworkedcontinuously);

    if (testnohours);
    else
    {
        if (testworkedoneshift);
        else
        {
            createTimeInEvent(myemp, "2020-03-30 2015");
            if (testworkedcontinuously);
            else createTimeOutEvent(myemp, "2020-03-31 0100");
        }
        if (testworkedoneshift && !testworkedcontinuously)
        {
            createTimeInEvent(myemp, "2020-03-31 0815");
            createTimeOutEvent(myemp, "2020-03-31 1200");
        }
        //else;//do nothing
        if (testworkedoneshift);
        else
        {
            if (testworkedcontinuously);
            else
            {
                createTimeInEvent(myemp, "2020-03-31 1230");
                createTimeOutEvent(myemp, "2020-03-31 1700");
                createTimeInEvent(myemp, "2020-03-31 2015");
            }
            createTimeOutEvent(myemp, "2020-04-01 0200");
        }
    }

    let myhrsemp = hoursWorkedOnDate(myemp, "2020-03-31");
    console.log("testnohours = " + testnohours);
    console.log("testworkedoneshift = " + testworkedoneshift);
    console.log("testworkedcontinuously = " + testworkedcontinuously);
    console.log("myhrsemp = " + myhrsemp);

    if (testnohours)
    {
        if (myhrsemp == 0);
        else
        {
            throw "TEST FAILED: testing no hours, means the employee never worked, " +
                "should have returned 0 hours, but it did not!";
        }
    }
    else
    {
        if (testworkedoneshift)
        {
            if (myhrsemp == 3.75);
            else throw "TEST FAILED: the amount of hours for the shift was wrong!";
        }
        else
        {
            if (testworkedcontinuously)
            {
                if (myhrsemp == 24);
                else throw "TEST FAILED: the amount of hours for the shift was wrong!";
            }
            //else;//do nothing
        }
    }
    console.log("ALL TESTS PAST!");
}
testHoursWorkedOnDay();

function wagesEarnedOnDate(emprecobj, datestr)
{
    return hoursWorkedOnDate(emprecobj, datestr) * emprecobj.payPerHour;
}

function getAllValidDatesForEmp(emprecobj)
{
    if (emprecobj == undefined || emprecobj == null)
    {
        throw "the employee object must be defined!";
    }
    //else;//do nothing

    if (noMissingPunchesFor(emprecobj));
    else throw "you missed some punches!";

    //add all of the dates in the date objects to a string array
    //then return it
    let myvdatesarr = new Array();
    for (let n = 0; n < emprecobj.timeInEvents.length; n++)
    {
        let addit = true;
        if (myvdatesarr.length < 1);
        else
        {
            for (let k = 0; k < myvdatesarr.length; k++)
            {
                if (myvdatesarr[k] === emprecobj.timeInEvents[n].date)
                {
                    addit = false;
                    break;
                }
                //else;//do nothing
            }
        }
        //console.log("addit = " + addit);

        if (addit) myvdatesarr.push(emprecobj.timeInEvents[n].date);
        //else;//do nothing
    }
    for (let n = 0; n < emprecobj.timeOutEvents.length; n++)
    {
        let addit = true;
        if (myvdatesarr.length < 1);
        else
        {
            for (let k = 0; k < myvdatesarr.length; k++)
            {
                if (myvdatesarr[k] === emprecobj.timeOutEvents[n].date)
                {
                    addit = false;
                    break;
                }
                //else;//do nothing
            }
        }
        //console.log("addit = " + addit);

        if (addit) myvdatesarr.push(emprecobj.timeOutEvents[n].date);
        //else;//do nothing
    }

    return myvdatesarr;
}

function allWagesFor(emprecobj)
{
    //get all of the dates and then call
    //wagesEarnedOnDate(emprecobj, datestr)
    //for each valid date
    //accumulate or reduce the value

    if (noMissingPunchesFor(emprecobj));
    else throw "you missed some punches!";

    let mvdates = getAllValidDatesForEmp(emprecobj);
    return mvdates.reduce(
        (acc, datestr) => acc + wagesEarnedOnDate(emprecobj, datestr), 0);
}

function calculatePayroll(emps)
{
    //console.log("emps = " + emps);
    //console.log("emps.length = " + emps.length);
    if (emps == undefined || emps == null)
    {
        throw "employees array must be defined!";
    }
    else if (emps.length < 1) return 0;
    else
    {
        //for each employee call allWagesFor(emprecobj)
        //and accumulate or reduce the value
        
        return emps.reduce((acc, emp) => acc + allWagesFor(emp), 0);
    }
}
