import { LightningElement, track,wire, api } from 'lwc';
import id from '@salesforce/user/Id';
import NAME_FIELD from '@salesforce/schema/User.Name';
import EMAIL_FIELD from '@salesforce/schema/User.Email';
const fields = [NAME_FIELD, EMAIL_FIELD];
import {getRecord, createRecord} from 'lightning/uiRecordApi';
import timesheetinsert from '@salesforce/apex/Timesheet.timesheetinsert';
import PROJECTVALUES from "@salesforce/apex/TimesheetLWC.projectList";
import PROJECTID from "@salesforce/apex/TimesheetLWC.projectID";
import { loadStyle } from 'lightning/platformResourceLoader';
import SAMPLE_CSS from '@salesforce/resourceUrl/Timesheet_CSS';

export default class Intellibee_Timesheet extends LightningElement {

  @wire(PROJECTVALUES)
  projectValuesList


  isSaved =false
  showModal = false
  selectedproject= new Array()
  projectData=Array()
  projectlist=  new Array()  //['ECIC','PAF','TIMESHEET']
  @api projectname='' // this.projectlist[0]
  userid =id
  userName
  total=0
  @wire(getRecord,{recordId:'$userid',fields})
  userdetail(response)
  {
    if(response.data)
    {
     this.userName= response.data.fields.Name.value
    }
  
  }
  

  apexprojectinsertion()
  {
    this.isSaved= true;
    timesheetinsert({project:JSON.stringify(this.projectData)});

    createTimesheetRecord();
  }
  



  WeekDayinput = ['Task', {id:'in0', value:''}, {id:'in1', value:''}, {id:'in2', value:''}, {id:'in3', value:''}, {id:'in4', value:''}, {id:'in5', value:''}, {id:'in6', value:''}, {id:'in7', value:''}, 'Remarks']
  //WeekDayinput = ['Task','Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Total', 'Remarks']
  weekvalue = {'Sun':0,'Mon':0, 'Tue':0, 'Wed':0, 'Thu':0, 'Fri':0, 'Sat':0}
  project={}
  
  Projectvalue(event)
  {
    this.projectTitle = event.target.name
    console.log(this.projectTitle)
    console.log(event.target.title)
    this.project[event.target.name][event.target.title]= event.target.value
    console.log(this.project)
    this.calculatetotal()
  }
  calculatetotal()
  {
    this.total=0
    for(let i =0 ; i< this.projectData.length ; i++)
     {
       console.log(this.projectData[i])
       for(let j= 1; j< 8; j++){
         this.total+=  parseInt(this.projectData[i][this.selectedproject[i]][this.WeekDayinput[j]])
       }
     }
  }
  projectvalueoption(event)
  {
    this.projectname= event.target.value
    if(!this.projectname)
    {
      this.projectname = this.projectlist[0]

    }
   
    console.log(this.projectname)
    //this.project[this.projectname]= {...this.weekvalue}
    //this.projectData.push(this.project)
  }
  leavevalue(event) {
    if (event.target.title === 'Sun' || event.target.title === 'Sat') {
      event.target.disabled = true
      event.target.value = 0
     
    }
    this.project['Leave'][event.target.title]= event.target.value
   
    this.calculatetotal()
  }
  Trainingvalue(event) {
    console.log(event.target.value)
    this.project['Training'][event.target.title]= event.target.value
    this.calculatetotal()
    
  }
  Holidayvalue(event) {
    if (event.target.title === 'Sun' || event.target.title === 'Sat') {
      event.target.disabled = true
      event.target.value = 0

    }
    this.project['Holiday'][event.target.title]= event.target.value
   
    this.calculatetotal()
   
  }
  get sSunday() {
    return this.Days[0]
  }

  get sMonDay() {
    return this.Days[1]
  }
  get sTuesday() {
    return this.Days[2]
  }

  get sWednesday() {
    return this.Days[3]
  }

  get sThurday() {
    return this.Days[4]
  }

  get sFriday() {
    return this.Days[5]
  }

  get sSaturday() {
    return this.Days[6]
  }
  get sWeekNumber() {

    return `Week start : ${this.startweek}`
  }
  startweek
  @track
 numberofprojects = new Array() ;  //this.projectlist[0]

  Days = new Array();
  d = new Date().getDate()
  m = new Date().getMonth();
  y = new Date().getFullYear();
  day = new Date().getDay()
  isPreviousPage = false
  isNextPage = false
  isPreviousNexttoggle = false
  page = 0
  projects = 0
  submitWeekStart

  previousTimesheet() {

    this.page -= 1
    
    if (this.page > 0) {

      this.d -= 7
      this.day = 0
    }
    else if (this.page === 0) {
      this.d = new Date().getDate()
      this.day = new Date().getDay()
    }
    else {
      if (this.isPreviousPage === true && this.isNextPage === false) {
        if (this.isPreviousNexttoggle === true) {
          this.d -= 1
          this.isPreviousNexttoggle = false
        }
        else {
          this.d -= 7
        }
      }
      else {
        this.d -= new Date().getDay() + 1
        this.isNextPage = false
      }
      this.day = 6
    }
    this.datedisplay()
    this.isPreviousPage = true
    this.template.querySelector('form').reset();
    this.total=0
  }

  nextTimesheet() {
    this.page += 1
    this.nWeekNumber += 1
    if (this.page < 0 && this.isNextPage === false) {
      this.day = 0
      if (this.isPreviousNexttoggle == false) {
        this.d += 1
      }
      else {
        this.d += 7
      }
      this.isPreviousNexttoggle = true

    }
    else if (this.page === 0) {
      this.isPreviousPage = false
      this.isPreviousNexttoggle = false
      this.d = new Date().getDate()
      this.day = new Date().getDay()
    }
    else {
      if (this.page === 1) {
        this.d += 7 - this.day
        this.day = 0
      }
      else {
        this.day = 0
        this.d += 7
      }
      this.isNextPage = true
    }
    this.datedisplay()
    this.template.querySelector('form').reset();
    this.total=0
  }
  datedisplay() {
    this.Days = new Array();
    this.startweek = new Date(this.y, this.m, this.d - (this.day)).toDateString();
    this.startweek2 = new Date(this.y,this.m,this.d-(this.day));
    var convertMonthNumber = this.startweek2.getMonth()+1;
    this.submitWeekStart = this.startweek2.getFullYear()+"-"+convertMonthNumber+"-"+this.startweek2.getDate();
    for (var i = -(this.day); i <= (6 - this.day); i++) {
      var val = new Date(this.y, this.m, this.d + i).toDateString();
      this.Days.push(val.slice(0, 10))
    }
    console.log(this.submitWeekStart);
  }
  connectedCallback() {

    this.datedisplay()
    this.selectedproject.push('Holiday')
    this.project['Holiday']= {...this.weekvalue}
    this.projectData.push(this.project)   
    this.selectedproject.push('Leave')
    this.project['Leave']= {...this.weekvalue}
    this.projectData.push(this.project)
    this.selectedproject.push('Training')
    this.project['Training']= {...this.weekvalue}
    this.projectData.push(this.project)
    
  }

  renderedCallback() {

    Promise.all([loadStyle(this, SAMPLE_CSS)]);
  }

  addfunction() {
    this.projectlist =[...this.projectValuesList.data]
   
    this.showModal= true
  }

  modalcancel(event)
  {
    console.log(this.projectValuesList.data[0]);
    this.showModal= false
  }

  modalSave(event)
  {
    this.projects += 1
    if(!this.projectname)
    {
      this.projectname = this.projectlist[0]
      

    }
    this.selectedproject.push(this.projectname)
    this.project[this.projectname]= {...this.weekvalue}
    this.projectData.push(this.project)
    this.numberofprojects.push(this.projectname)
    this.showModal= false
  }

  resetAllinputvalues(event)
  {
    this.template.querySelector('form').reset();
    for(let i =0 ; i< this.projectData.length ; i++)
    {
      console.log(this.projectData[i])
      for(let j= 1; j< 8; j++){
        this.projectData[i][this.selectedproject[i]][this.WeekDayinput[j]]=0
      }
    }
    this.total=0

  }
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
            //this.template.querySelector(".addAll lightning-input[data-id=in8]").value = parseInt(x[3].value);
        var totalProjectsList = x.length;
        console.log(totalProjectsList);
        var totalProjectHours = 0;
        for(var i = 0; i < x.length; i++){
          totalProjectHours += (isNaN(x[i].value) || x[i].value == "" ? 0 : parseInt(x[i].value));
        }
        this.template.querySelector(".addAll lightning-input[data-id=total]").value = parseInt(totalProjectHours);
        console.log("line 337"+this.projectname);

        this.dayValue = new Array();
        this.dayValue.push(this.projectname);
        for(var x = 0; x <= 6; x++){
          var i = event.target.closest("tr").querySelector("td lightning-input[data-id=in"+x+"]").value;
          this.dayValue.push(i);
        }        
        console.log(this.dayValue);

        console.log("line 332 "+JSON.stringify(this.projectname));
        return this.dayValue;

    }

    //@api apexProjectName = JSON.stringify('create - Costo')

    //@wire(PROJECTID, {projectNameLookup : 'create - Costo'})
  //@wire(PROJECTID, {projectNameLookup : this.projectname})
    //projectID2;
    test=''

    createTimesheetRecord(){
      var projectID2 = PROJECTID({projectNameLookup : this.projectname})
      .then(result => {
        this.test = result;
        console.log("recordID: "+result);
        return this.test;
      });
      console.log("line 350 "+ this.test);
      console.log(projectID2);
      var fields = {'Week_Start_Date__c' : this.submitWeekStart,
      'Sunday__c' : this.dayValue[1], 'Monday__c' : this.dayValue[2], 'Tuesday__c' : this.dayValue[3], 
      'Wednesday__c' : this.dayValue[4], 'Thursday__c' : this.dayValue[5], 'Friday__c' : this.dayValue[6], 
      'Saturday__c' : this.dayValue[7]};
      var objRecordInput = {'apiName' : 'Weekly_Timesheet__c', fields};
      createRecord(objRecordInput).then(response => {
        alert('Record created with Id: ' +response.id);
    }).catch(error => {
        alert('Error: ' +JSON.stringify(error));
    });
    }

}