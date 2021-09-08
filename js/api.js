// load data function
const loadBook=()=>{

    const search=document.getElementById("searchInput");
    const searchText=search.value;
    search.value='';
    const url =`https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
    .then(res =>res.json()) 
    .then(data =>displayBook(data.numFound,data.docs))
}
// function for display books
const displayBook=(searchResult,docs)=>{
    // show maximum 20 books
   const books =docs.slice(0,20);
    if(searchResult===0){
        const Result= document.getElementById("searchResult");
        Result.innerText= "No Result Founded";
        const cardsDiv = document.getElementById("cards");
        cardsDiv.textContent='';
    }
    else
    {
        const Result= document.getElementById("searchResult");
        Result.innerText= searchResult;
        const cardsDiv = document.getElementById("cards");
        cardsDiv.textContent='';
    
        books.forEach(book => 
     {
        //console.log(book.cover_i);
        const imgSrc = `src="images/noImg.png"`;
        const serverImg = `src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg"`
        const div = document.createElement('div');
        div.classList.add('col');
        // create a card div for a book
        div.innerHTML =`
        <div class="card h-100">
            <div class="card-body">
                <img  class="img-fluid w-100" ${book.cover_i===undefined?imgSrc:serverImg}>
                <h4 class="card-title">${book.title}</h4>
                <p class="card-text">Author Name:<b>${book.author_name===undefined?"No Author Found" : book.author_name[0]}</b></p>
                <p class="card-text">
                First publish year: <b> ${book.first_publish_year===undefined?"<b>Year Not Found</b>":book.first_publish_year}</b></p>
                <p class="card-text">
                Publisher Name:  <b>${book.publisher===undefined? "<b>unknown publisher</b>":book.publisher[0]}</b></p>
            </div>
        </div>`;   
        // adding books one by one
            cardsDiv.appendChild(div);

     });

    }

        
    
    
}
