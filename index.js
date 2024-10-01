const list=document.querySelector('ul');
function handleFormSubmit(event){
   event.preventDefault();
   const taskdetails={
    taskname:event.target.taskname.value,
    status:event.target.taskstatus.value,
    remarks:event.target.remarks.value,
   };
   if(editingtaskid)
   {
      axios.put(`https://crudcrud.com/api/c153bc2bda9240fca8f4f57bfcbae756/tasklist/${editingtaskid}`,taskdetails)
      .then(response=> {
         displaytasklist(response.data);
      })
      .catch(error=>console.log(error));
   }else{
   axios.post("https://crudcrud.com/api/c153bc2bda9240fca8f4f57bfcbae756/tasklist",taskdetails)
   .then((response)=> {
            displaytasklist(response.data);
      }
      )
   .catch((error)=>console.log(error));
   }
   document.getElementById("taskname").value="";
   document.getElementById("taskstatus").value="";
   document.getElementById("remarks").value="";
}
function displaytasklist(taskdetail){
   const newli=document.createElement('li');
   newli.className="class-list-item";
   newli.textContent=`Taskname:${taskdetail.taskname}, Status:${taskdetail.status}, Remarks:${taskdetail.remarks}`
   const deleteBtn = document.createElement("button");
   deleteBtn.textContent="Delete";
   deleteBtn.onclick= ()=>handleDelete(taskdetail._id);
   newli.appendChild(deleteBtn);
   const editbtn=document.createElement('button');
   editbtn.textContent="Edit";
   editbtn.onclick = ()=> {
      document.getElementById("taskname").value=taskdetail.taskname;
      document.getElementById("taskstatus").value=taskdetail.status;
      document.getElementById("remarks").value=taskdetail.remarks;
      editingtaskid=taskdetail._id;
   }
   newli.appendChild(editbtn);
   list.appendChild(newli);
   location.reload();
}
function handleDelete(taskid){
   axios.delete(`https://crudcrud.com/api/c153bc2bda9240fca8f4f57bfcbae756/tasklist/${taskid}`)
   .then((response)=>{
      const task=Array.from(list.children).find(item=>item.textContent.includes(taskid));
      if(task)
      {
         list.removeChild(task);
      }
   })
   .catch(error=>console.log(error));
   location.reload();
}

window.addEventListener("DOMContentLoaded", function refreshscreen(){
  axios.get("https://crudcrud.com/api/c153bc2bda9240fca8f4f57bfcbae756/tasklist")
  .then(response=>{
      for(var i=0; i<response.data.length; i++)
      {
         displaytasklist(response.data[i]);
      }
  })
  .catch(error => console.log(error));
  location.reload();
})
