holiday = [];
    
Meteor.startup(function(){
    for (i=0; i<20; i++){
        
        // New year Eve
        holiday.push( new Date(2015+i, 0, 1) );    
        
        //1848 Revolution Memorial 
        holiday.push( new Date(2015+i, 2, 15) );

        //Labor Day
        holiday.push( new Date(2015+i, 4, 1) );
        
        //Hungarian National Day
        holiday.push( new Date(2015+i, 7, 20) );
        
        //Revolution Memorial Day
        holiday.push( new Date(2015+i, 9, 23) );
        
        //All Saints' Day
        holiday.push( new Date(2015+i, 10, 1) );
        
        //Christmass
        holiday.push( new Date(2015+i, 11, 24) );
        holiday.push( new Date(2015+i, 11, 25) );
        holiday.push( new Date(2015+i, 11, 26) );
        
        holiday.push(new Date(2015, 5, 30));
        
        // Easter Monday
        var easter_date = easter(2015+i);
        holiday.push(new Date(2015+i, easter_date.month - 1, easter_date.day+1));
    }
});

isWeekend = function(day){
    if (day.getDay() == 6 || day.getDay() == 0) {
        return true;
    } else {
        return false;
    }
};

isHoliday = function(day){
  //  You can not compare 2 objects (day and date object in an array). 2 objects are never identical
  // Therefore you need to serialize them first.
  if (holiday.map(Number).indexOf(+day) === -1) {
      return false;
  }  else {
      return true;
  }
};

isLastDayOfMonth = function(day) {
    var next_day = new Date();
    next_day.setDate(day.getDate() + 1);
    
    if (next_day.getMonth() === day.getMonth()) {
        return false;
    } else {
        return true;
    }
}

today = function (){
    return new Date();
}

spot = function(){
    return tPlusDate(today(), 2);
}

tPlusDate = function (date, offset) {
    var i = 1;
    var futureDate = new Date(date); 
    while ( i <= offset){
        futureDate.setDate( futureDate.getDate() + 1);
        if (! isWeekend(futureDate) && ! isHoliday(futureDate)) {
            i = i + 1;
        }
    }
    
    return futureDate;
}

mFDate = function(date) {
    weekend = [6,0]
    futureDate = new Date(date);
    
    // if date is on working day 
    if (!isWeekend(date) && !isHoliday(date)) {
        return date;
    } else {
        /// roll forward
        while (isWeekend(futureDate) || isHoliday(futureDate)) {
            futureDate.setDate( futureDate.getDate() + 1 );
        }    
        
        // if we moved to next month let's go back 
        if (futureDate.getMonth() !== date.getMonth()) {
            futureDate.setDate( futureDate.getDate() - 1);
            do {
                futureDate.setDate( futureDate.getDate() - 1);
            } while(isWeekend(futureDate) || isHoliday(futureDate));
        }
    }
    return futureDate;
}

function easter(Y) {
    var C = Math.floor(Y/100);
    var N = Y - 19*Math.floor(Y/19);
    var K = Math.floor((C - 17)/25);
    var I = C - Math.floor(C/4) - Math.floor((C - K)/3) + 19*N + 15;
    I = I - 30*Math.floor((I/30));
    I = I - Math.floor(I/28)*(1 - Math.floor(I/28)*Math.floor(29/(I + 1))*Math.floor((21 - N)/11));
    var J = Y + Math.floor(Y/4) + I + 2 - C + Math.floor(C/4);
    J = J - 7*Math.floor(J/7);
    var L = I - J;
    var M = 3 + Math.floor((L + 40)/44);
    var D = L + 28 - 31*Math.floor(M/4);

    return {
        month:  padout(M),
        day:    padout(D)
    }
}

function padout(number) { return (number < 10) ? '0' + number : number; }