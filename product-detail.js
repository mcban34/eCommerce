const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
const productLink = `https://fakestoreapi.com/products/${productId}`


fetch(productLink)
.then(res => res.json())
.then(value => {
    console.log(value);
    let detailımg = document.querySelector(".detailImg")
    detailımg.src=value.image

    let detailTitle = document.querySelector(".detailTitle")
    detailTitle.innerHTML=value.title
})