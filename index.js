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
        throw "could not create time in event because the date string was not in the " +
            "correct format, but it was not!";
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

//const birthday4 = new Date(1995, 11, 17, 3, 24, 0);
//year, month, day, hour, minute, second
//the month starts at 0 for January and 11 for December
function hoursWorkedOnDate(emprecobj, datestr)
{
    if (isDateStrInCorrectFmt(datestr));
    else
    {
        throw "could not create time in event because the date string was not in the " +
            "correct format, but it was not!";
    }
    if (noMissingPunchesFor(emprecobj));
    else throw "you missed some punches!";

    //search for the time in event on the date
    //if there is no time in event on given date: return from previous timein found
    //if there is no time in event found before given date at all: return 0 or error?
    //if there is no time out event on given date: return from next timeout found
    //if no time out event after date: error

    throw "NOT DONE YET 6-27-2023 2:40 AM!";
}

function wagesEarnedOnDate(emprecobj, datestr)
{
    return hoursWorkedOnDate(emprecobj, datestr) * emprecobj.payPerHour;
}

function allWagesFor(emprecobj)
{
    //get all of the dates and then call
    //wagesEarnedOnDate(emprecobj, datestr)
    //for each valid date
    //accumulate or reduce the value

    if (noMissingPunchesFor(emprecobj));
    else throw "you missed some punches!";

    throw "NOT DONE YET 6-27-2023 2:40 AM!";
}

function calculatePayroll(emps)
{
    if (emps == undefined || emps == null)
    {
        throw "employees array must be defined!";
    }
    else if (emps.length < 1) return 0;
    else
    {
        //for each employee call allWagesFor(emprecobj)
        //and accumulate or reduce the value
        
        throw "NOT DONE YET 6-27-2023 2:40 AM!";
    }
}
