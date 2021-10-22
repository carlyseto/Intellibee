import { LightningElement, track, wire} from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import SAMPLE_CSS from '@salesforce/resourceUrl/Timesheet_CSS';
import id from '@salesforce/user/Id'
import NAME_FIELD from '@salesforce/schema/User.Name'
import EMAIL_FIELD from '@salesforce/schema/User.Email'
const fields = [NAME_FIELD, EMAIL_FIELD]
import {getRecord} from 'lightning/uiRecordApi'
//import timesheetRecord from "@salesforce/apex/TimesheetLWC.createRecord";
//import weekStart from '@salesforce/schema/Weekly_Timesheet__c.Week_Start_Date__c';
import { createRecord } from 'lightning/uiRecordApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import TIMESHEET_OBJ from '@salesforce/schema/Weekly_Timesheet__c';
import PROJECT from '@salesforce/schema/Weekly_Timesheet__c.Test_Project__c';

var curr = new Date; // get current date
var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
var last = first + 6; // last day is the first day + 6

//var firstDay = first.getDay();

console.log(curr);
console.log(first);
console.log(last);
//console.log(firstDay);
//submitWeek;

export default class Intellibee_Timesheet extends LightningElement {
showModal = false
projectData=[]
projectlist=['ECIC','PAF','TIMESHEET']
projectname= this.projectlist[0]

userid =id
userName
submitWeekStart
total=0
@wire(getRecord,{recordId:'$userid',fields})
userdetail(response)
{
  if(response.data)
  {
   this.userName= response.data.fields.Name.value
  }

}
value ='';
@wire(getObjectInfo, { objectApiName: TIMESHEET_OBJ})

timesheetMetadata;

@wire(getPicklistValues,
  {
      recordTypeId: '$timesheetMetadata.data.defaultRecordTypeId', 
      fieldApiName: PROJECT
  }
)
projectPicklist;
//projectPicklist2 = this.projectPicklist[0];

projectChange(event) {

  this.value = event.detail.value;

}

example = "Welcome "+ this.userName + "\n" + this.sWeekNumber

Projectvalue(event)
{
  
  var project={}
  this.projectTitle = event.target.name
  project[event.target.name]=this.weekvalue
  project[event.target.name][event.target.title]= event.target.value
  this.projectData.push(project)
  
  this.calculatetotal()
}
calculatetotal()
{
  console.log('sam')
  console.log(this.projectData[0])
  for(let i in projectData)
    {
    console.log(i)
    }
}
projectvalueoption(event)
{
  this.projectname= event.target.value
}
leavevalue(event) {
  if (event.target.title === 'Sun' || event.target.title === 'Sat') {
    event.target.disabled = true
    event.target.value = ''
    
  }
}


WeekDayinput=['LeaveSun','LeaveMon','LeaveTue','LeaveWed','LeaveThu','LeaveFri','LeaveSat','Total','Remarks']


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
@track
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
      this.startweek2 = new Date(this.y,this.m,this.d-(this.day));
      //console.log(this.startweek2);
      //console.log(this.startweek2.getFullYear(), this.startweek2.getMonth()+1, this.startweek2.getDate());
      var today = new Date().getFullYear()+'-'+("0"+(new Date().getMonth()+1)).slice(-2)+'-'+("0"+new Date().getDate()).slice(-2);
      //console.log(today);
      var convertMonthNumber = this.startweek2.getMonth()+1;
      console.log(convertMonthNumber);
      this.submitWeekStart = this.startweek2.getFullYear()+"-"+convertMonthNumber+"-"+this.startweek2.getDate();
      console.log("submitWeekStart "+this.submitWeekStart);
      
      for(var i=-(this.day);i<=(6-this.day);i++)
      {
      var val=new Date(this.y,this.m,this.d+i).toDateString();

        this.Days.push(val.slice(0,10));
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
    var in0 = 'in0';
    var in1 = 'in1';
    var in2 = 'in2';
    var in3 = 'in3';
    var in4 = 'in4';
    var in5 = 'in5';
    var in6 = 'in6';
    var in7 = 'in7'
    var in8 = 'in8';
    this.rows = [{id:in0,value:''},{id:in1,value:''},{id:in2,value:''},{id:in3,value:''},{id:in4,value:''},{id:in5,value:''},{id:in6,value:''},{id:in7,value:''},{id:in8,value:''}];
  }
  renderedCallback() {

    Promise.all([loadStyle(this, SAMPLE_CSS)]);
}
    addfunction() {
  
  //console.log(this.projectData[0])
  // console.log(numberofprojects[this.projects])
  this.showModal= true;
  console.log(this.projectPicklist);
  // this doesnt work console.log(projectPicklist);
}

  modalcancel(event)
{
  this.showModal= false
}

modalSave(event)
{
  this.projects += 1
  this.numberofprojects.push(this.projectname)
  //this.numberofprojects.push(this.projectPicklist2)
  this.showModal= false
}

      test(event){
        //var a = this.template.querySelector(".Total .total1").value;
        //var x = event.target.getAttribute('data-label');
        //console.log(event.target.getAttribute('data-label'));
        //var className2 = event.target.className;
        
        var findClassName = new RegExp("addTotal[0-9]");
        console.log(findClassName);
        //var findMatch = findClassName.exec(className2);
        var className2 = event.target.closest("tr").querySelector("td lightning-input[data-id=in1]").value;
        //var selectClass = className2.querySelector("."+findClassName);
        //var findMatch = findClassName.exec(className2);
        //console.log(findMatch[0]);
        console.log(className2);
        //console.log(selectClass);
        
        //var a = parseInt(this.template.querySelector(".addTotal2 lightning-input[data-id=in1]").value);
        //console.log(a);
        //var b = this.template.querySelector("lightning-input[data-id=in1]").value;
        //console.log(b);

      }
/*
      hourTotal(event){
          var listHours = 0;
          var totalListHours = 0;
          for(var x = 0; x <= 6; x++){
            var inputValue = parseInt(event.target.closest("tr").querySelector("td lightning-input[data-id=in"+x+"]").value);
            listHours += inputValue;
          }
          event.target.closest("tr").querySelector("td lightning-input[data-id=in7]").value = listHours;
          var x = this.template.querySelectorAll("lightning-input[data-id=in7]");
          this.template.querySelector(".addAll lightning-input[data-id=in7]").value = parseInt(x[3].value);
      }
      */
      /*
      hourTotal(event){
          var listHours = 0;
          for(var x = 0; x <= 6; x++){
            var inputValue = parseInt(event.target.closest("tr").querySelector("td input[data-id=in"+x+"]").value);
            listHours += inputValue;
          }
          event.target.closest("tr").querySelector("td input[data-id=in7]").value = listHours;
      }
*/
      hourTotal(event){
          var listHours = 0;
          var totalListHours = 0;
          for(var x = 0; x <= 6; x++){
            listHours += (isNaN(event.target.closest("tr").querySelector("td lightning-input[data-id=in"+x+"]").value) || event.target.closest("tr").querySelector("td lightning-input[data-id=in"+x+"]").value == "") ? 0 : parseInt(event.target.closest("tr").querySelector("td lightning-input[data-id=in"+x+"]").value);
            //var inputValue = parseInt(event.target.closest("tr").querySelector("td lightning-input[data-id=in"+x+"]").value);
            //listHours += inputValue;
          }
          event.target.closest("tr").querySelector("td lightning-input[data-id=in7]").value = listHours;
          var x = this.template.querySelectorAll("lightning-input[data-id=in7]");
              //this.template.querySelector(".addAll lightning-input[data-id=in7]").value = parseInt(x[3].value);
          var totalProjectsList = x.length;
          console.log(totalProjectsList);
          var totalProjectHours = 0;
          for(var i = 0; i < x.length - 1; i++){
            totalProjectHours += (isNaN(x[i].value) || x[i].value == "" ? 0 : parseInt(x[i].value));
          }
          this.template.querySelector(".addAll lightning-input[data-id=in7]").value = parseInt(totalProjectHours);
      }


      modalcancel(event)
      {
        this.showModal= false
      }
    
      modalSave(event)
      {
        this.projects += 1
        this.numberofprojects.push(this.projectname)
        this.showModal= false
      }
/*
      newRecord = {
        submitWeek : 2021-11-21
      }
  
      createTimesheetRecord(event){
        timesheetRecord({rec: newRecord});
      }
  */    
 
      createTimesheetRecord(){
        var fields = {'Week_Start_Date__c' : this.submitWeekStart};
        var objRecordInput = {'apiName' : 'Weekly_Timesheet__c', fields};
        createRecord(objRecordInput).then(response => {
          alert('Record created with Id: ' +response.id);
      }).catch(error => {
          alert('Error: ' +JSON.stringify(error));
      });
      }
      
} 