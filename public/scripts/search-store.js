const jclarkeView = (jclarke_db) =>`
<div class="col-12">
    <div class="card">
        <h5 class="card-header"> ${jclarke_db.store_number} <strong>(search match: ${jclarke_db.score})</strong></h5>
        <div class="card-body">
         <p class="card-text">${jclarke_db.province}</p>
          <ul class="list-group">
               <li class="list-group-item">Store Number: ${jclarke_db.store_number}</li>
               <li class="list-group-item">type: ${jclarke_db.type}</li>
                <li class="list-group-item">size: ${jclarke_db.size}</li>
          </ul>
        </div>
       
      </div>
 </div>
`;
const handleClick = async() =>{
   
    const  searchValue = document.querySelector('#searchInput').value;
    const  jclarkeDomRef = document.querySelector('#storeItems');
    try {
        const ref = await fetch(`/api/search-store/?search=${searchValue}`);
        const searchResults = await ref.json();

        let jclarkeHtml = [];
        searchResults.forEach(jclarke_db =>{
        jclarkeHtml.push(jclarkeView(jclarke_db));
        } );
        jclarkeDomRef.innerHTML = jclarkeHtml.join("");
    } catch (e) {
        console.log(e);
        console.log('could not search api')
        
    }
}