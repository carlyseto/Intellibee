import { LightningElement } from "lwc";

var Days = new Array();
var d = new Date().getDate()
var m= new Date().getMonth();
var y= new Date().getFullYear();
var day= new Date().getDay();
var isPreviousPage= false;
var isNextPage= false;
var page =0;

function nextTimesheet()
{
   this.page+=1
   
   if(this.page < 0 && this.isNextPage ===false)
   {
    this.day=0
    this.d +=1
    console.log(`5${this.page}` )
   }
   else if(this.page === 0)
   {
    this.isPreviousPage = false
    this.d =  new Date().getDate()
    this.day= new Date().getDay()
    console.log(`6${this.page}` )
   }
   else 
   {
         //alert(this.page)
         if(this.page === 1)
         {
                this.d += 7- this.day
                this.day=0
                console.log(`sampath.${this.d}`)
                console.log(`7${this.page}` )
          }
          else
          {
              // alert('sam'+this.d)
               this.day=0
               this.d +=7
               console.log(`8${this.page}` )
          }
          this.isNextPage = true
    }
    
   this.datedisplay()

};

function datedisplay()
{
    Days = [];
    //var Days = new Array();
    for(var i=-(day);i<=(6-day);i++)
    {
        Days.push(new Date(y,m,d+i).toDateString())
    }
    return Days;
   
};

function connectedCallback()
{
    for(var i=-(this.day);i<=(6-this.day);i++)
    {
        this.Days.push(new Date(this.y,this.m,this.d+i).toDateString())
    }
};
datedisplay();
console.log(Days);

    const columns = [
    { label: 'Project', fieldName: 'Project__c', type: 'text', editable: true },
    { label: Days[0], fieldName: 'Sunday__c', type: 'number', editable: true },
    { label: Days[1], fieldName: 'Monday__c', type: 'number', editable: true },
    { label: Days[2], fieldName: 'Tuesday__c', type: 'number', editable: true },
    { label: Days[3], fieldName: 'Wednesday__c', type: 'number', editable: true },
    { label: Days[4], fieldName: 'Thursday__c', type: 'number', editable: true },
    { label: Days[5], fieldName: 'Friday__c', type: 'number', editable: true },
    { label: Days[6], fieldName: 'Saturday__c', type: 'number', editable: true },
    { label: 'Remarks', fieldName: 'Remarks__c', type: 'text', editable: true }
];

const data = [
    {id: 'a', 
    Project__c: '',
    Sunday__c: '', 
    Monday__c: '',
    Tuesday__c: '', 
    Wednesday__c: '',
    Thursday__c: '',
    Friday__c: '', 
    Saturday__c: '', 
    Remarks__c: ''}
];

export default class App extends LightningElement {
    //data = []; 
    data = data;
    columns = columns;

        handleCellChange(event) {
            /*
        var draftValues = event.getParam('draftValues');
        console.log(JSON.stringify(component.get('v.draftValues')));
        var test = component.find('myTable').get("v.draftValues");
        console.log(test);
        */
    }
    
    previousTimesheet()
{
  page-=1
  if(page > 0)
  {
   
    d -=7
    day=0
    console.log(`sampath kumar.${this.d}`)
    console.log(`1${this.page}` )
  }
  else if(page === 0)
  {
    d =  new Date().getDate()
    day= new Date().getDay()
    console.log(`2${this.page}` )
  }
  else{
   if(isPreviousPage === true && isNextPage === false)
   {
    d -=7
    console.log(`sampath.${this.d}`)
    console.log(`3${this.page}` )
   }
   else
   {
   console.log('previous 1')
   d -= new Date().getDay()+1
   isNextPage = false
   console.log(`4${this.page}` )
   }
   day= 6
  }
   datedisplay()
   isPreviousPage = true
  
 //  alert(this.page)
};


}



