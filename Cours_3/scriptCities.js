
$(document).ready(function(){
    $("#modifVille").submit(function(event){
        submitForm();
        return false;
    });
});

function modifName(id,name){
    $("#id_ville").val(id);
    $("#name").val("");
    $("#name").attr("placeholder", name);
    $("#modifVille-modal").modal();
}

function submitForm(){

    var name = $("#name").val();
    
    if(name != '')
    {

      xmlhttp = new XMLHttpRequest();

      xmlhttp.onreadystatechange = function() {
          
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
          if(xmlhttp.responseText!="")
          {

            $("#modifVille-modal").modal('hide');
            swal({
                title:"Modifié!",
                text:"Le nom de la ville a bien été modifié",
                type:"success",
                closeOnConfirm: false},
                function(isConfirm){
                  if(isConfirm){
                    window.location.reload();
                  }
                });
          }
        }else{
            if(xmlhttp.status == 500){
                if(xmlhttp.responseText=="Name of city already exist")
                {
                    swal("Modification impossible!", "Ce nom est déjà prit!", "error");
                }else{
                    swal("Modification impossible!", "Une erreur est survenue, rechargez la page", "error");
                }
            }else{
                console.log(xmlhttp.responseText)
            }
           
        }
      }
      xmlhttp.open("PUT", "/city/"+$("#id_ville").val(), true);
      xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
      xmlhttp.send("name="+name);
    }

}

function removeCity(id){

    xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
      {
        if(xmlhttp.responseText!="")
        {

          $("#modifVille-modal").modal('hide');
          swal({
              title:"Supprimé!",
              text:"La ville a bien été supprimé",
              type:"success",
              closeOnConfirm: false},
              function(isConfirm){
                if(isConfirm){
                  window.location.reload();
                }
              });
        }
      }else{
          if(xmlhttp.status == 400){
              
                  swal("Suppression impossible!", "Id not correct : Argument passed in must be a single String of 12 bytes or a string of 24 hex characters", "error");
             
          }else{
            swal("Suppression impossible!", "Une erreur est survenue, veuillez-réessayer", "error");

              console.log(xmlhttp.responseText)
          }
         
      }
    }
    xmlhttp.open("DELETE", "/city/"+id, true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send();
  
}
