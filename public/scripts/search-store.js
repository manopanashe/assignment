const jclarkeView = (jclarke_db) =>`
<div class="col-12">
    <div class="card">
        <h5 class="card-header"> ${jclarke_db.store_number} <strong>(search match: ${store.score})</strong></h5>
        <div class="card-body">
         <p class="card-text">${jclarke_db.province}</p>
          <ul class="list-group">
               <li class="list-group-item">type: ${jclarke_db.type}</li>
                <li class="list-group-item">size: ${jclarke_db.size}</li>
          </ul>
        </div>
        <a href="#" class="btn btn-primary">Save</a>
      </div>
 </div>
`;
const handleClick = async() =>{
    const  searchValue = document.querySelector('#searchInput').nodeValue;
    const  jclarke_dbDomRef = document.querySelector('#storeItems');
    try {
        const ref = await fetch(`/api/search-store/?search=${searchValue}`);
        const searchResults = await ref.json();

        let jclarke_dbHtml = [];
        searchResults.forEach(jclarke_db =>{
        jclarke_dbHtml.push(jclarkeView(jclarke_db));
        } );
        jclarke_dbDomRef.innerHTML = jclarke_dbHtml.join("");
    } catch (e) {
        console.log(e);
        console.log('could not search api')
        
    }
}