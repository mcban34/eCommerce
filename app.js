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
            for (let i = 0; i < val['rating']; i++) {
                ratingStars.push('<i class="bi bi-star-fill"></i>');
            }
            for (let i = 0; i < 5 - val['rating']; i++) {
                ratingStars.push('<i class="bi bi-star"></i>');
            }
            const ratingHtml = ratingStars.join('');
        
            urunId++
            return `
                <div class="col-md-3">
                    <div class="shopCard mt-5">
                        <div class="cardImgParent">
                            <img class="cardImg" src="${val.image}">
                        </div>
                        <a class="urunIncele" data-id="${urunId}">
                            <h4 class="cardTitle">${val.title}</h4>
                            <h5 class="cardPrice">Fiyat : <span class="price">${val.price}</span>₺</h5>
                        </a>
                        <button class="sepeteEkle"><i class="bi bi-plus"></i></button>
                        <div class="rating-stars">${ratingHtml}</div>
                    </div>
                </div>
            `
        })
        urunler.innerHTML = gelenUrunler.join("");
        
        //!sepeteEkle
        let sepeteEkle = document.querySelectorAll(".sepeteEkle")
        for (const i of sepeteEkle) {
            i.addEventListener("click", function (evet) {

                let element = evet.target
                let card = element.parentNode
                let cardParentNode = card.parentNode

                // console.log(cardParentNode);

                let img = cardParentNode.querySelector(".cardImg").src
                let title = cardParentNode.querySelector(".cardTitle").innerHTML
                let price = Number(cardParentNode.querySelector(".price").innerHTML)

                let eklenenSepet = {
                    img: img,
                    title: title,
                    price: price,
                }
                sepet.push(eklenenSepet)
                // console.log(sepet)
                sepetGuncelle()
            })
        }
        urunDetay()
    })


let toplamFiyatText = document.createElement("h2")


const sepetGuncelle = () => {
    let sepetYazdir = sepet.map((value, index) => {
        return `
            <div class="sepetCard">
                <h6 class="sepetTitle">${value.title}</h6>
                <p class="sepetPrice">${value.price}</p>
                <button class="delete" data-index="${index}">delete</button>
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
