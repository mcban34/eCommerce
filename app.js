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
        let sepet = []
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
            })
        }


        //!sepetiListele
        for (const i of sepet) {
            console.log
        }

    })
