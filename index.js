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

    let mdate = new Date(myyearnum, mymonthnum - 1, mydaynum, myhrnum, myminnum, 0);
    //console.log("mdate = " + mdate);

    return mdate;
}

function getDateForItem(item){
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

//const birthday4 = new Date(1995, 11, 17, 3, 24, 0);
//year, month, day, hour, minute, second
//the month starts at 0 for January and 11 for December
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
    
    let indates = emprecobj.timeInEvents.map((item) => getDateForItem(item));
    let outdates = emprecobj.timeOutEvents.map((item) => getDateForItem(item));
    for (let n = 0; n < indates.length; n++)
    {
        console.log("indates[" + n + "] = " + indates[n]);
    }
    for (let n = 0; n < outdates.length; n++)
    {
        console.log("outdates[" + n + "] = " + outdates[n]);
    }

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
