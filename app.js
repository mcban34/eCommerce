let sepet = []
let urunId = 0
fetch("public/product.json")
    .then(res => res.json())
    .then(value => {

        console.log(value);
        
        let urunler = document.querySelector(".urunlerRow")
        let gelenUrunler = value.map(val => {

            //!stars
            let ratingStars = [];
            for (let j = 0; j < parseInt(val.rating); j++) {
                ratingStars.push('<i class="bi bi-star-fill"></i>');
            }
            for (let j = 0; j < 5 - parseInt(val.rating); j++) {
                ratingStars.push('<i class="bi bi-star"></i>');
            }
            let ratingHtml = ratingStars.join('');
              

            urunId++
            return `
                <div class="col-md-4">
                    <div class="shopCard mt-5">
                        <div class="cardImgParent">
                            <img class="cardImg" src="${val.image}">
                        </div>
                        <a class="urunIncele" data-id="${urunId}">
                            <h5 class="cardTitle">${val.title}</h5>
                            <h5 class="cardPrice">Fiyat : <span class="price">${val.price.newPrice.toFixed(2)}</span>₺ <span class="oldPrice">${val.price.oldprice.toFixed(2)}₺</span></h5>
                        </a>
                        <button class="sepeteEkle"><i class="bi bi-plus"></i></button>
                        <div class="rating-stars">${ratingHtml} <span class="ratingHtml">(${val.rating.toFixed(1)})</span></div>
                        <div class="ticket">${val.ticket || ""}</div>
                    </div>
                </div>
            `
        })
        urunler.innerHTML = gelenUrunler.join("");

        //!etiket kontrol
        let ticket = document.querySelectorAll(".ticket")
        for (const i of ticket) {
            if(i.innerHTML==""){
                i.style.display="none"
            }
            if(i.innerHTML=="Yeni Ürün"){
                i.style.background="#0fb942"
            }
        }

        
        //!sepeteEkle
        let sepeteEkle = document.querySelectorAll(".sepeteEkle")
        for (const i of sepeteEkle) {
            i.addEventListener("click", function (evet) {
                let element = evet.target
                let card = element.parentNode
                let cardParentNode = card.parentNode


                let img = cardParentNode.querySelector(".cardImg").src
                let title = cardParentNode.querySelector(".cardTitle").innerHTML
                let price = Number(cardParentNode.querySelector(".price").innerHTML)

                let eklenenSepet = {
                    img: img,
                    title: title,
                    price: price,
                }
                sepet.push(eklenenSepet)
                sepetGuncelle()
            })
        }
        urunDetay()
    })


let toplamFiyatText = document.createElement("h2")


const sepetGuncelle = () => {
    // console.log(sepet);
    let sepetYazdir = sepet.map((value, index) => {
        return `
            <div class="sepetCard">
                <div class="sepetCardImg">
                    <img width="100" src="${value.img}">
                </div>
                <div class="sepetCardContent">
                    <h6 class="sepetTitle">${value.title}</h6>
                    <p class="sepetPrice">${value.price}₺</p>
                    <i data-index="${index}" class="bi bi-trash delete"></i>
                </div>
            </div>
        `
    })
    document.querySelector(".sepet").innerHTML = sepetYazdir.join("")

    //!sepet toplamı
    let sepetToplam = 0
    for (const i of sepet) {
        sepetToplam += i.price
    }
    toplamFiyatText.innerHTML = `Toplam Fiyat: ${sepetToplam.toFixed(2)}₺`;
    document.querySelector(".sepet").appendChild(toplamFiyatText);


    //!sepet delete
    let deleteButtons = document.querySelectorAll(".delete");
    for (const button of deleteButtons) {
        button.addEventListener("click", function (event) {
            let index = event.target.dataset.index;
            console.log(index)
            sepet.splice(index, 1);
            sepetGuncelle();
        });
    }
}

const urunDetay = () => {
    let urunIncele = document.querySelectorAll(".urunIncele")
    // console.log(urunIncele);
    for (const i of urunIncele) {
        i.addEventListener("click", function () {
            const urunId = i.getAttribute('data-id');
            window.location.href = `product-detail.html?id=${urunId}`
        })
    }
}
