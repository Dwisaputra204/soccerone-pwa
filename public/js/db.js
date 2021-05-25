let dbPromised = idb.open("soccer-one", 1, function(upgradeDb) {
  let articlesObjectStore = upgradeDb.createObjectStore("teams", {
    keyPath: "id"
  });
  articlesObjectStore.createIndex("name", "name", { unique: false });
});


const saveForLater = (teams) => {
  dbPromised
      .then((db) => {
          let tx = db.transaction("teams", "readwrite");
          let store = tx.objectStore("teams");
          console.log(teams);
          store.put(teams);
          return tx.complete;
      })
      .then(() => {
          // alert("Artikel berhasil di simpan.");
          M.toast({html: 'Artikel berhasil di simpan.'})
          console.log("Artikel berhasil di simpan.");
          location.reload();
  });
}

const getAll = () => {
  return new Promise((resolve, reject) => {
    dbPromised
      .then((db) => {
        let tx = db.transaction("teams", "readonly");
        let store = tx.objectStore("teams");
        return store.getAll();
      })
      .then((teams) => {
        resolve(teams);
        console.log(teams);
      });
  });
}


const getById = (id) => {
  
  return new Promise((resolve, reject) => {
    dbPromised
      .then((db) => {
        let tx = db.transaction("teams", "readonly");
        let store = tx.objectStore("teams");
        
        return store.get(parseInt(id));

      })
      .then((teams) =>{
        
        resolve(teams);
      });
  });
}

const deleteById = (id) => {
    dbPromised
      .then((db) => {
        let tx = db.transaction("teams", "readwrite");
        let store = tx.objectStore("teams");
        store.delete(parseInt(id));
        return tx.complete;
      })
      .then(() => {
        M.toast({html: 'Artikel dihapus.'});
        setTimeout(function(){ window.location = "./index.html#saved"; }, 1000);
      });
}