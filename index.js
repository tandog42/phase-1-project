document.addEventListener("DOMContentLoaded", () => {
  renderHome();
});

const mainInfoDiv = document.getElementById("main-info");

function renderHome() {
  updateHeader("Coronavirus");
  
  mainInfoDiv.innerHTML = `
  
    <div id="div1" class="col s6">    
  <h2 class="symp">Symptoms</h2>
  
    <h6>People with COVID-19 have had a wide range of symptoms reported – 
      ranging from<br> mild symptoms to severe illness.
      People with these symptoms may have COVID-19: </h6>
    <ol class="container1">
    <li>Fever or chills</li>
    <li>Cough</li>
    <li>Shortness of breath or difficulty breathing</li>
    <li>Fatigue</li>
    <li>Muscle or body aches</li>
    <li>Headache</li>
    <li>New loss of taste or smell</li>
    <li>Sore throat</li>
    <li>Congestion or runny nose</li>
    <li>Nausea or vomiting</li>
    <li>Diarrhea</li>
    
  </ol>
  </div>

  <div  id="div2" class="col s6">
    <h2 class="prev">Preventions</h2>
 
    <h6>To help prevent the spread of COVID-19:</h6>
    
        <ol class="container" id="prevList">
            <li>Wear a mask to protect yourself and others and stop the spread of COVID-19.</li>       
            <li>Stay at least 6 feet (about 2 arm lengths) from others who don’t live with you.</li>         
            <li>Avoid crowds and poorly ventilated spaces. The more people you are in contact with, the more likely you are to be exposed to COVID-19.</li>          
            <li> Get a COVID-19 vaccine when it’s available to you.</li>           
            <li>Clean your hands often, either with soap and water for 20 seconds or a hand sanitizer that contains at least 60% alcohol.</li>          
            <li> Avoid close contact with people who are sick.</li>          
            <li>Cover your cough or sneeze with a tissue, then throw the tissue in the trash.</li>
            <li>Clean frequently touched objects and surfaces daily. <br>If someone is sick or has tested positive for COVID-19, disinfect frequently touched surfaces.</li>
            <li>Monitor your health daily.</li>
      </ol>
      
        </div> 
        `;
        input()
}

function input() {
  const form = document.querySelector("#searchForm");
  form.addEventListener("submit", renderSearch);
}
function clearMain() {
  mainInfoDiv.innerHTML = "";
}
function updateHeader(newHeader) {
  const head = document.getElementById("covid-title");
  head.innerHTML = newHeader;
}
returnCountry();
function renderSearch(e) {
  e.preventDefault();
  console.log(e);
  clearMain();

  mainInfoDiv.innerHTML = `
  <div class="row">
     <div class="container" id="countryTitle" class="col s8"> 
      </div>
    <ul id="infoLi"> </ul>
    
  <button id="back-btn" type="click">Back</button>`;

  document.getElementById("back-btn").addEventListener("click", renderHome);
}

function returnCountry() {
  createStats();
  let searchForm = document.getElementById("searchForm");
  searchForm.addEventListener("submit", e => {
    e.preventDefault();
    let inputValue = e.target.searchText.value;
    fetch(`https://covid-api.mmediagroup.fr/v1/cases?country=${inputValue}`)
      .then(r => r.json())
      .then(countries => {
        for (let info in countries.All) {
          if (info == "recovered") {
            continue;
          }

          updateHeader(`Statistic on Coronavirus in ${inputValue}`);
          let li = document.createElement("li");
          let ul = document.getElementById("infoLi");
          let countryTitle = document.getElementById("countryTitle");
          countryTitle.innerHTML = "";
          li.innerText = `${info}: ` + countries.All[info];
          ul.appendChild(li);

          mainInfoDiv.appendChild(ul, countryTitle);

          e.target.reset();
        }
      });
  });
}
