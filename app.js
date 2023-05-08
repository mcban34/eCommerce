let sepet = []
fetch("urunler.json")
    .then(res => res.json())
    .then(value => {
        console.log(value);

        //!ürün filtrele
        let urunler = document.querySelector(".urunler")
        let gelenUrunler = value.map(val => {
            return `
            <div class="card">
                <img class="cardImg" src="${val.image}">
                <h2 class="cardTitle">${val.title}</h2>
                <h4 class="cardPrice">Fiyat : <span class="price">${val.price}</span>₺</h4>
                <button class="sepeteEkle">Sepete Ekle</button>
            </div>
        
        `
        })
        urunler.innerHTML = gelenUrunler.join("")

        //!sepeteEkle
        let sepeteEkle = document.querySelectorAll(".sepeteEkle")
        for (const i of sepeteEkle) {
            i.addEventListener("click", function (evet) {

                let element = evet.target
                let card = element.parentNode

                let img = card.querySelector(".cardImg").src
                let title = card.querySelector(".cardTitle").innerHTML
                let price = Number(card.querySelector(".price").innerHTML)

                let eklenenSepet = {
                    img: img,
                    title: title,
                    price: price,
                }
                sepet.push(eklenenSepet)
                console.log(sepet)
                sepetGuncelle()
            })
        }
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