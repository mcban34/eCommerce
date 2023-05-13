fetch("public/product.json")
.then(res => res.json())
.then(value => {

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    
    let gelenDetayUrunu = value.find(value => value.id==productId)
    
    let detailımg = document.querySelector(".detailImg")
    detailımg.src=gelenDetayUrunu.image

    let detailTitle = document.querySelector(".detailTitle")
    detailTitle.innerHTML=gelenDetayUrunu.title
})