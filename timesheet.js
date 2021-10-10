import ReminderDateTime from '@salesforce/schema/Task.ReminderDateTime';
import { LightningElement,track } from 'lwc';
//import intellibeeTimesheet from './intellibee_Timesheet.html'


var curr = new Date; // get current date
var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
var last = first + 6; // last day is the first day + 6

//var firstDay = first.getDay();

console.log(curr);
console.log(first);
console.log(last);
//console.log(firstDay);

       function reSum()
        {
            var num1 = parseInt(document.getElementById("one").value);
            var num2 = parseInt(document.getElementById("two").value);
            document.getElementById(".avvy2").value = num1 + num2;

        }


export default class Intellibee_Timesheet extends LightningElement {

WeekDayinput=['LeaveSun','LeaveMon','LeaveTue','LeaveWed','LeaveThu','LeaveFri','LeaveSat','Total','Remarks']

leavevalue(event)
{

  console.log(event.target.title)
  console.log(event.target.value)
}
Trainingvalue(event)
{
  console.log('sam')
  console.log(event.target.title)
  console.log(event.target.value)
}
Holidayvalue(event)
{

}
get sSunday()
{
  return this.Days[0]
}

get sMonDay()
{
    return this.Days[1]
}
get sTuesday()
{
  return this.Days[2]
}

get sWednesday()
{
  return this.Days[3]
}

get sThurday()
{
  return this.Days[4]
}

get sFriday()
{
  return this.Days[5]
}

get sSaturday()
{
  return this.Days[6]
}
get sWeekNumber()
{

  return `Week Start : ${this.startweek}`
}
startweek
//@track
numberofprojects=['project0']


Days = new Array();
d = new Date().getDate()
m= new Date().getMonth();
y= new Date().getFullYear();
day= new Date().getDay()
isPreviousPage= false
isNextPage= false
isPreviousNexttoggle =false
page =0
projects=0
nWeekNumber= this.weekNumber()
previousTimesheet()
{

  this.page-=1
  this.nWeekNumber-=1
  if(this.page > 0)
  {

    this.d -=7
    this.day=0
  }
  else if(this.page === 0)
  {
    this.d =  new Date().getDate()
    this.day= new Date().getDay()
  }
  else{
   if(this.isPreviousPage === true && this.isNextPage === false)
   {
     if(this.isPreviousNexttoggle=== true)
     {
      this.d -=1
      this.isPreviousNexttoggle = false
     }
     else
     {
      this.d -=7
     }
   }
   else
   {   
   this.d -= new Date().getDay()+1
   this.isNextPage = false
   }
   this.day= 6
  }
   this.datedisplay()
   this.isPreviousPage = true
}

nextTimesheet()
{
   this.page+=1
   this.nWeekNumber+=1
   if(this.page < 0 && this.isNextPage ===false)
   {
    this.day=0
    if(this.isPreviousNexttoggle == false)
    {
    this.d +=1
    }
    else{
         this.d +=7
        }
        this.isPreviousNexttoggle = true

        }
        else if(this.page === 0)
        { 
          this.isPreviousPage = false
          this.isPreviousNexttoggle = false
          this.d =  new Date().getDate()
          this.day= new Date().getDay()
        }
        else 
        {
         if(this.page === 1)
          {
                this.d += 7- this.day
                this.day=0
          }
          else
          {
               this.day=0
               this.d +=7
          }
          this.isNextPage = true
        }
        this.datedisplay()
    }
    datedisplay()
    {
       this.Days = new Array();
       this.startweek = new Date(this.y,this.m,this.d-(this.day)).toDateString();
       for(var i=-(this.day);i<=(6-this.day);i++)
       {
       var val=new Date(this.y,this.m,this.d+i).toDateString();

         this.Days.push(val.slice(0,10))
       }
    }
    weekNumber()
    {
      var onejan = new Date(this.y,0,1);
      var today = new Date(this.y,this.m,this.d);
      var dayOfYear = ((today - onejan + 86400000)/86400000);

      return Math.ceil(dayOfYear/7)
    }

    connectedCallback()   
    {
      this.datedisplay()
    }

    addfunction()
    {
      this.projects+=1
      this.numberofprojects.push(`project${this.projects}`)
      console.log(numberofprojects[1])
    }

       reSum(event)
        {
var x = parseInt(this.template.querySelector("lightning-input[data-id=in1]").value);
var y = parseInt(this.template.querySelector("lightning-input[data-id=in2]").value);
this.template.querySelector("lightning-input[data-id=in3]").value = x+y;
        }
} 