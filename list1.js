import { LightningElement, track,wire,api } from 'lwc';
import Show from '@salesforce/apex/Show.Show';
import { NavigationMixin } from 'lightning/navigation';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import { updateRecord } from 'lightning/uiRecordApi';
import { encodeDefaultFieldValues } from 'lightning/pageReferenceUtils';



export default class list1 extends NavigationMixin(LightningElement) 
 {
     @track error;
     @api Opportunities;
     @track resultofwiredOpportunities;
     refreshData;
     
     @wire(Show) Ol(result) 
     {
         this.refreshData = result;
         if(result.data)
         {
                this.Opportunities = result.data;
                this.error = undefined;
         }
         else if (result.error)
          {
          this.error = result.error
          this.contacts = undefined;
          }
    }
    
     DeleteRecord(event)
     {
         
            const recordId= event.target.dataset.recordid;
            //return refreshApex(this.refreshData);
        
            deleteRecord(recordId)
            .then( ()=>{
                this.dispatchEvent(
                    new ShowToastEvent({
                        title : 'Success',
                        message : 'Successfully Deleted',
                        variant : 'success'                        
                         })                         
                     );
                
                    
                     return refreshApex(this.refreshData);

                })  
                .catch(error => {
                    this.error = error;
                    console.log(">>> valueList... "+error);
                }); 
                       
    }   
    refresComponentl()
     { 
    

                 return refreshApex(this.refreshData);
 
    }
    
      CreateNewRecordNev()
      {
        const defaultValues=encodeDefaultFieldValues({});
        console.log(defaultValues);
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Opportunity',
                actionName: 'new'
            },
            state: {
                defaultFieldValues: defaultValues
            }
        });
      }
      EditRecord1( event)
       
        {            
            console.log( 'hello');
            this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: {
                    recordId: event.currentTarget.dataset.id,    
                    objectApiName: 'Opportunity',
                    actionName: 'edit'
                },                
            });     
      }
   
}
 