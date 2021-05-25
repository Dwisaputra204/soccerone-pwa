document.addEventListener("DOMContentLoaded", function() {
  
    let urlParams = new URLSearchParams(window.location.search);
    let isFromSaved = urlParams.get("saved");
    let id = urlParams.get("id");
    let item;
    const btnSave = document.getElementById("save");
    const btnDelete = document.getElementById("delete");
    btnDelete.style.display = "none";

    
    getById(id).then((cek)=>{
      if(cek !== undefined){
        if(isFromSaved === null){
          btnSave.style.display = 'none';
          M.toast({html: 'Halaman ini sudah tersimpan di daftar favorite.'})     
        }
      }
    });


    if (isFromSaved) {
      btnSave.style.display = 'none';
      btnDelete.style.display = "block";        
      getSavedArticleById();  
    } else {
      item = showTeamsById();
    }

    btnSave.onclick = function() {
      console.log("Tombol FAB di klik.");
      item.then(function(teams) {
        saveForLater(teams);
      });
    };

    btnDelete.onclick = () =>{
        deleteById(id);
    }
  });