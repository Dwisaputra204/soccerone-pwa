let base_url = "https://api.football-data.org/v2/";


const status = (response) => {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

const json = (response) => {
  return response.json();
}

const error = (error) => {
  console.log("Error : " + error);
}
const fetchApi = (kode) => {    
  return fetch(base_url + kode, {
    headers: {
      'X-Auth-Token': '7fab05761adc4d6ea5b9b32f1134a0c5'
    }
  });
};

const checkCaches = (keyword, type) => {
  if ('caches' in window) {
    caches.match(`${base_url}${keyword}`).then(function(response) {
      if (response) {
        response.json().then( (data) => {
          if (type === "matches") {
            return getMatch(data);
          } else if (type === "classment"){
            return getClassment(data);
          } else if (type === "teams"){
            return getTeams(data);
          }
        })
      }
    })
  }
}

const showMatches = () =>{
  let keyword = "matches";
  let type = "matches";
  checkCaches(keyword,type); 
  fetchApi(keyword)
      .then(status)
      .then(json)
      .then((data) => {
        getMatch(data);
      })
      .catch(error);
}

const getMatch = (data) => {
    console.log(data);
    let articlesHTML = "";
    data.matches.forEach((article) => {
    articlesHTML += `<div class="col s12 m6 xl4">
    <div class="card-panel match">
      <h5>${article.competition.name}</h5>
      <p>Match Day : ${article.matchday}</p>
      <p>${article.homeTeam.name} VS ${article.awayTeam.name}</p>
    </div>
    </div>
    `
    });
    document.getElementById("loading").style.display = "none";
    document.getElementById("articles").innerHTML = articlesHTML;
}

const showClassment = (league) =>{
  let keyword = `competitions/${league}/standings`;
  let type = "classment";
  checkCaches(keyword,type);
  fetchApi(keyword)
      .then(status)
      .then(json)
      .then((data) => {
        getClassment(data);    
      })
      .catch(error);
}


const getClassment = (data) =>{
    console.log(data);
    let articlesHTML = "";
    data.standings[0].table.forEach((article) => {
    let image = article.team.crestUrl;
    image.replace(/^http:\/\//i, 'https://');
    articlesHTML += `
        <tr>
          <td>${article.position}</td>
          <td>${article.team.name}</td>
          <td><img src="${image}" alt="logo" width="72px" height="72px" onerror="this.src='../img/icon/icon-72.png'"><td>                    
        </tr>
    `
    });
    document.getElementById("loading").style.display = "none";
    document.getElementById("table").innerHTML = articlesHTML;
}

const showTeams = (league) => {
  let keyword = `competitions/${league}/teams`;
  let type = "teams";
  checkCaches(keyword,type);
  fetchApi(keyword)
      .then(status)
      .then(json)
      .then(function(data) {
        getTeams(data);      
      })
      .catch(error);
}

const getTeams = (data) => {
  console.log(data);
  let articlesHTML = "";
  data.teams.forEach((article) => {
  articlesHTML += `
    <div class="col s12 m6 xl4">
    <a href="./article.html?id=${article.id}">
      <div class="card">
        <div class="card-image">
          <img src="${article.crestUrl}" alt="logo" onerror="this.src='../img/icon/icon-192.png'" >
        </div>
        <div class="card-content">
          <h6>${article.name}</h6>
          <p>${article.venue}</p>
        </div>
      </div>
    </a>
    </div>
  `
  });
  document.getElementById("loading").style.display = "none";
  document.getElementById("teams").innerHTML = articlesHTML;
}

const showTeamsById = () => {
  return new Promise(function(resolve,reject){
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = urlParams.get("id");
  let keyword = `teams/${idParam}`;
  if ('caches' in window) {
    caches.match(`${base_url}${keyword}`).then((response) => {
      if (response) {
        response.json().then((data) =>{    
          getTeamById(data);
          resolve(data);
        })
      }
    })
  }

  fetchApi(keyword)
      .then(status)
      .then(json)
      .then((data) => {
        getTeamById(data);
        resolve(data);
      })
      .catch(error);
  })
}

const getTeamById = (data) =>{
  let articlesHTML = "";          
  let squadTable = "";
  console.log(data);       
  let image = data.crestUrl;
  image.replace(/^http:\/\//i, 'https://'); 
  articlesHTML += `
    <div class="row">
    <div class="col s12 m12 teams">
    <h5>${data.name}</h5>
    <p>Venue : ${data.venue}</p>
    <p>Founded : ${data.founded}</p>
    <p>Website :${data.website}</p>
        <img src="${image}" alt="logo" >

        <table>
          <thead>
              <tr>
                  <th>Name</th>
                  <th>Position</th>                      
                  <th>Shirt Number</th>                      
              </tr>
          </thead>
          <tbody id="table">
          
          </tbody>
        </table>
    </div>
    </div>
  `;
  data.squad.forEach((squad) =>{
    squadTable += `
      <tr>
        <td>${squad.name}</td>
        <td>${squad.position}</td>
        <td>${squad.shirtNumber}</td>
      </tr>
    `
  });
  document.getElementById("body-content").innerHTML = articlesHTML;
  document.getElementById("table").innerHTML = squadTable;
}

const getSavedArticles = () => {
  getAll().then((teams) => {
    console.log(teams);
    let articlesHTML = "";
    if(teams.length === 0){
      M.toast({html: 'Ups. Anda belum memiliki halaman tersimpan :)'})      
    }
    teams.forEach((team) => {
      articlesHTML += `
                <div class="row">
                <div class="col s12 m12">
                  <a href="./article.html?id=${team.id}&saved=true">
                    <div class="card">
                      <div class="card-image">
                        <img src="${team.crestUrl}" alt="logo" width="300">
                      </div>
                      <div class="card-content">
                        <h5>${team.name}</h5>
                        <p>${team.venue}</p>
                        <p>${team.area.name}</p>                        
                      </div>
                    </div>
                  </a>
                </div>
                </div>
                `;
    document.getElementById("body-content").innerHTML = articlesHTML;
    })
  });
}


const getSavedArticleById = () => {
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = urlParams.get("id");
  let articlesHTML = "";          
  let squadTable = "";
  
  getById(idParam).then((teams) => {
    articlesHTML += `
          <div class="row">
          <div class="col s12 m12 teams">
          <h5>${teams.name}</h5>
          <p>Venue : ${teams.venue}</p>
          <p>Founded : ${teams.founded}</p>
          <p>Website :${teams.website}</p>
              <img src="${teams.crestUrl}" alt="logo" >

              <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Club</th>                      
                        <th>Logo</th>                      
                    </tr>
                </thead>
                <tbody id="table">
                
                </tbody>  
              </table>
          </div>
          </div>
        `;
        teams.squad.forEach((squad) =>{
          squadTable += `
            <tr>
              <td>${squad.name}</td>
              <td>${squad.position}</td>
              <td>${squad.shirtNumber}</td>
            </tr>
          `
        });
        document.getElementById("body-content").innerHTML = articlesHTML;
        document.getElementById("table").innerHTML = squadTable;
  });
}



