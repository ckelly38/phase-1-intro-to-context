// Your code here
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

    if (datea.getDay() == dateb.getDay())
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
                if (datea.getDay() < dateb.getDay()) return true;
                else if (datea.getDay() == dateb.getDay())
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
    datea.getMonth() == dateb.getMonth() && datea.getDay() == dateb.getDay())
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
function includeStartLeapYear(datea)
{
    if (datea == undefined || datea == null)
    {
        throw "the date must not be null!";
    }
    //else;//do nothing

    if (isLeapYear(datea.getFullYear()))
    {
        if (datea.getMonth() == 1 || datea.getMonth() == 0) return true;
        else return false;
    }
    else return true;
}

function getNumLeapYearsBetweenTwoDates(datea, dateb)
{
    //let us say 2019 and 2023
    //will be 1
    let useayr = (datea.getFullYear() < dateb.getFullYear());
    let syr = -1;
    if (useayr) syr = datea.getFullYear();
    else syr = dateb.getFullYear();
    let includesyr = false;
    if (useayr) includesyr = includeStartLeapYear(datea);
    else includesyr = includeStartLeapYear(dateb);
    let cntr = 0;
    for (let yr = syr; yr < dateb.getFullYear(); yr++)
    {
        if (isLeapYear(yr)) cntr++;
        //else;//do nothing
    }
    if (includesyr);
    else cntr--;
    return cntr;
}

function getNumDaysBetweenTwoDates(datea, dateb)
{
    let sa = (isDateABeforeDateB(datea, dateb));
    //30 days has september april june and november
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
        let yrdiff = dateb.getFullYear() - datea.getFullYear();
        if (yrdiff > 1)
        {
            numdays = yrdiff * 365;
            //
        }
        else if (yrdiff == 1)
        {
            //
        }
        //else;//do nothing
    }

    throw "NOT DONE YET 6-29-2023 5 AM!";
}

function getNumHoursBetweenTwoDates(datea, dateb)
{
    let useafirst = (isDateABeforeDateB(datea, dateb));
    let isonsameday = (areTwoDatesOnTheSameDay(datea, dateb));
    let hrdiff = 0;
    let mindiff = 0;
    let secdiff = 0;
    let yrdiff = 0;
    let monthdiff = 0;
    let daydiff = 0;
    if (useafirst)
    {
        yrdiff = dateb.getFullYear() - datea.getFullYear();
        hrdiff = dateb.getHours() - datea.getHours();
        mindiff = dateb.getMinutes() - datea.getMinutes();
        secdiff = dateb.getSeconds() - datea.getSeconds();
        monthdiff = dateb.getMonth() - datea.getMonth();
        daydiff = dateb.getDay() - datea.getDay();
    }
    else
    {
        yrdiff = datea.getFullYear() - dateb.getFullYear();
        hrdiff = datea.getHours() - dateb.getHours();
        mindiff = datea.getMinutes() - dateb.getMinutes();
        secdiff = datea.getSeconds() - dateb.getSeconds();
        monthdiff = datea.getMonth() - dateb.getMonth();
        daydiff = datea.getDay() - dateb.getDay();
    }

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

        while(secdiff < 0)
        {
            mindiff--;
            secdiff += 60;
        }

        //if minute difference is negative convert an hour to minutes and subtract
        //then subtract 1 from the hour.

        while (mindiff < 0)
        {
            hrdiff--;
            mindiff += 60;
        }

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

        while(secdiff < 0)
        {
            mindiff--;
            secdiff += 60;
        }

        while (mindiff < 0)
        {
            hrdiff--;
            mindiff += 60;
        }

        while(hrdiff < 0)
        {
            daydiff--;
            hrdiff += 24;
        }

        //let numleapdays = getNumLeapYearsBetweenTwoDates(datea, dateb);
        //assume all years have 365 days
        //add the num leapdays when needed
        //console.log("numleapdays = " + numleapdays);

        //if we cross over or end on leap day we add an extra day
        //let us say 1/1/2020 - 1/1/2016 = include 2016 do not include 2020
        
        //if (daydiff < 0) daydiff += numleapdays;
        //else;//do nothing

        //while(daydiff < 0)
        //{
            //monthdiff--;
            //not sure how many days to add 31, 30, 29, 28?
            throw "NOT DONE YET NEED TO DO SOMETHING HERE 6-29-2023 3 AM!";
        //}

        //return hrdiff + (mindiff/60) + (secdiff/(60*60));
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
    console.log("mdate.getDay() = " + mdate.getDay());
    console.log("mdate.getFullYear() = " + mdate.getFullYear());
    console.log("mdate.getHours() = " + mdate.getHours());
    console.log("mdate.getMinutes() = " + mdate.getMinutes());
    console.log("mdate.getSeconds() = " + mdate.getSeconds());
        
    
    let indates = emprecobj.timeInEvents.map((item) => getDateForItem(item));
    let outdates = emprecobj.timeOutEvents.map((item) => getDateForItem(item));
    for (let p = 0; p < indates.length; p++)
    {
        console.log("indates[" + p + "] = " + indates[p]);
    }
    for (let p = 0; p < outdates.length; p++)
    {
        console.log("outdates[" + p + "] = " + outdates[p]);
    }

    let empstartedandendedonsameday = 
        didEMPStartWorkOnAndEndOnTheDate(indates, outdates, mdate);
    console.log("empstartedandendedonsameday = " + empstartedandendedonsameday);
    
    if (empstartedandendedonsameday)
    {
        //now get the start and end date that was the same as the mdate
        //what happens if there are multiple ins and outs on the same day?
        //in for morning, out for lunch, in for afternoon, out for evening
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
        if (myinsonday.length < 1 || myoutsonday.length < 1)
        {
            throw "there must be at least one in and one out on the date!";
        }
        else if (myinsonday.length == 1)
        {
            if (myoutsonday.length == 1)
            {
                //just compute the time
            }
            else throw "the number of ins and outs must be the same!";
        }
        else
        {
            //first figure out which in goes with which out
            //then compute the time between them and add them up
        }

        throw "NOT DONE YET NEED TO DO SOMETHING HERE 6-29-2023 3 AM!";
    }
    //else;//do nothing

    let empworkedthruday = didEMPWorkThroughTheDate(indates, outdates, mdate);
    console.log("empworkedthruday = " + empworkedthruday);

    if (empworkedthruday) return 24;
    //else;//do nothing

    throw "NOT DONE YET 6-27-2023 2:40 AM!";
}

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
        myvdatesarr.push(emprecobj.timeInEvents[n].date);
    }
    for (let n = 0; n < emprecobj.timeOutEvents.length; n++)
    {
        myvdatesarr.push(emprecobj.timeOutEvents[n].date);
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
