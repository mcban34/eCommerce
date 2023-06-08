let sepet = [];
let urunId = 0;

let loadingDivParent = document.createElement("div");
loadingDivParent.className = "loadingDivParent";

let loadingDiv = document.createElement("img");
loadingDiv.src = 'public/img/loading.gif';
loadingDivParent.appendChild(loadingDiv);

document.body.appendChild(loadingDivParent);

fetch("public/product.json")
    .then(res => res.json())
    .then(function (value) {
        loadingDivParent.style.display = "flex";
        let allProduct = value;

        urunler = document.querySelector(".urunlerRow");
        let gelenUrunler = value.map(val => {

            //!yıldızlar
            let ratingStars = [];
            for (let j = 0; j < parseInt(val.rating); j++) {
                ratingStars.push('<i class="bi bi-star-fill"></i>');
            }
            for (let j = 0; j < 5 - parseInt(val.rating); j++) {
                ratingStars.push('<i class="bi bi-star"></i>');
            }
            ratingHtml = ratingStars.join('');

            urunId++;
            return `
                <div class="col-sm-12 col-md-6 col-lg-4">
                    <div class="shopCard mt-5">
                        <div class="cardImgParent">
                            <img class="cardImg" width="100%" height="100%" alt="${val.title}" src="${val.image}">
                        </div>
                        <a class="urunIncele" data-id="${urunId}">
                            <h5 class="cardTitle">${val.title}</h5>
                            <h5 class="cardPrice">Fiyat : <span class="price">${val.price.newPrice.toFixed(2)}</span>₺ 
                            <span class="oldPrice">${val.price.oldprice.toFixed(2)}₺</span>
                            </h5>
                        </a>
                        <button class="sepeteEkle"><i class="bi bi-plus"></i></button>
                        <div class="rating-stars">${ratingHtml} <span class="ratingHtml">(${val.rating.toFixed(1)})</span></div>
                        <div class="ticket">${val.ticket || ""}</div>
                    </div>
                </div>
            `;
        });

        urunler.innerHTML = gelenUrunler.join("")

        let cardImg = document.querySelectorAll(".cardImg")
        for (const i of cardImg) {
            cardImg[cardImg.length - 1].addEventListener("load", function () {
                loadingDivParent.style.display = "none";
            })
        }

        //!etiket kontrol
        const ticketCheck = () => {
            let ticket = document.querySelectorAll(".ticket");
            for (const i of ticket) {
                if (i.innerHTML == "") {
                    i.style.display = "none";
                }
                if (i.innerHTML == "Yeni Ürün") {
                    i.style.background = "#0fb942";
                }
            }
        }
        ticketCheck();
        sepeteEkle()


        //!kategori
        let Allcategory = value.map(value => {
            return value.category;
        });

        let category = [...new Set(Allcategory)];
        let categoryHTML = category.map(value => {
            return `
                   <button class="categoryBtn">${value}</button>
                `;
        });

        let allProductBtn = document.createElement("button")
        allProductBtn.innerHTML = "Tüm Ürünler"
        allProductBtn.className = "allProducts activeCategory"


        document.querySelector(".categoryContent").innerHTML = categoryHTML.join("")
        document.querySelector(".categoryContent").prepend(allProductBtn);

        const buttons = document.querySelectorAll(".categoryBtn");
        const buttonClickHandler = (event) => {
            document.querySelector(".allProducts").classList.remove("activeCategory")
            buttons.forEach((button) => {
                button.classList.remove("activeCategory");
            });
            event.target.classList.add("activeCategory");
        };
        buttons.forEach((button) => {
            button.addEventListener("click", buttonClickHandler);
        });

        allProductBtn.addEventListener("click", (e) => {
            const buttons = document.querySelectorAll(".categoryBtn");
            buttons.forEach((button) => {
                button.classList.remove("activeCategory");
            });
            e.target.classList.add("activeCategory");

            let allProductHtml = allProduct.map(value => {
                let ratingStars = [];
                for (let j = 0; j < parseInt(value.rating); j++) {
                    ratingStars.push('<i class="bi bi-star-fill"></i>');
                }
                for (let j = 0; j < 5 - parseInt(value.rating); j++) {
                    ratingStars.push('<i class="bi bi-star"></i>');
                }
                ratingHtml = ratingStars.join('');
                return `
                    <div class="col-md-4">
                        <div class="shopCard mt-5">
                            <div class="cardImgParent">
                                <img class="cardImg" src="${value.image}">
                            </div>
                            <a class="urunIncele" href="product-detail.html?id=${value.id}">
                                <h5 class="cardTitle">${value.title}</h5>
                                <h5 class="cardPrice">Fiyat : <span class="price">${value.price.newPrice.toFixed(2)}</span>₺ <span class="oldPrice">${value.price.oldprice.toFixed(2)}₺</span></h5>
                            </a>
                            <button class="sepeteEkle"><i class="bi bi-plus"></i></button>
                            <div class="rating-stars">${ratingHtml} <span class="ratingHtml">(${value.rating.toFixed(1)})</span></div>
                            <div class="ticket">${value.ticket || ""}</div>
                        </div>
                    </div>
                    `
            })
            urunler.innerHTML = allProductHtml.join("");
            ticketCheck();
            sepeteEkle()
        })

        let categoryBtn = document.querySelectorAll(".categoryBtn");
        for (const i of categoryBtn) {
            i.addEventListener("click", function () {
                let filterProduct = allProduct.filter(value => value.category == i.innerHTML);
                let x = filterProduct.map(value => {
                    let ratingStars = [];
                    for (let j = 0; j < parseInt(value.rating); j++) {
                        ratingStars.push('<i class="bi bi-star-fill"></i>');
                    }
                    for (let j = 0; j < 5 - parseInt(value.rating); j++) {
                        ratingStars.push('<i class="bi bi-star"></i>');
                    }
                    ratingHtml = ratingStars.join('');

                    return `
                            <div class="col-md-4">
                                <div class="shopCard mt-5">
                                    <div class="cardImgParent">
                                        <img class="cardImg" src="${value.image}">
                                    </div>
                                    <a class="urunIncele" href="product-detail.html?id=${value.id}">
                                        <h5 class="cardTitle">${value.title}</h5>
                                        <h5 class="cardPrice">Fiyat : <span class="price">${value.price.newPrice.toFixed(2)}</span>₺ <span class="oldPrice">${value.price.oldprice.toFixed(2)}₺</span></h5>
                                    </a>
                                    <button class="sepeteEkle"><i class="bi bi-plus"></i></button>
                                    <div class="rating-stars">${ratingHtml} <span class="ratingHtml">(${value.rating.toFixed(1)})</span></div>
                                    <div class="ticket">${value.ticket || ""}</div>
                                </div>
                            </div>
                        `;
                });
                urunler.innerHTML = x.join("");
                ticketCheck();
                sepeteEkle()
            });
        }
        urunDetay();
        if(sepet.length==0){
            document.querySelector(".modal-body").innerHTML="Sepetinizde Ürün Bulunmuyor!"
        }
    });


let toplamFiyatText = document.createElement("h4");
toplamFiyatText.className = "toplamFiyatText"
toplamFiyatText.style.marginTop = "1rem"
toplamFiyatText.style.color = "#FC6E1E"

const sepetGuncelle = () => {
    // document.querySelector(".sepet").style.height = "300px"

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
            `;
    });
    document.querySelector(".modal-body").innerHTML = sepetYazdir.join("");

    //!sepet toplamı
    let sepetToplam = 0;
    for (const i of sepet) {
        sepetToplam += i.price;
    }
    // toplamFiyatText.innerHTML = `Toplam Fiyat: ${sepetToplam.toFixed(2)}₺`;
    // document.querySelector(".sepetParent").appendChild(toplamFiyatText);
    // document.querySelector(".toplamFiyatText").style.marginTop = "1rem"


    //!sepet delete
    let deleteButtons = document.querySelectorAll(".delete");
    for (const button of deleteButtons) {
        button.addEventListener("click", function (event) {
            let index = event.target.dataset.index;
            // console.log(index);
            sepet.splice(index, 1);
            sepetGuncelle();
            console.log(sepet.length)
            if(sepet.length==0){
                document.querySelector(".modal-body").innerHTML="Sepetinizde Ürün Bulunmuyor!"
            }
        });
    }
    document.querySelector(".badge").innerHTML=`${sepet.length}`
    // if (sepetToplam == 0.00) {
    //     toplamFiyatText.innerHTML = "Sepetinizde Ürün Bulunmuyor!"
    //     document.querySelector(".sepet").style.height = "0px"
    //     document.querySelector(".toplamFiyatText").style.marginTop = "0px"
    // }
};

const urunDetay = () => {
    let urunIncele = document.querySelectorAll(".urunIncele");
    for (const i of urunIncele) {
        i.addEventListener("click", function () {
            const urunId = i.getAttribute('data-id');
            window.location.href = `product-detail.html?id=${urunId}`;
        });
    }
};

const sepeteEkle = () => {
    let sepeteEkle = document.querySelectorAll(".urunlerRow .sepeteEkle");
    for (const i of sepeteEkle) {
        i.addEventListener("click", function (evet) {
            let element = evet.target;
            let card = element.closest(".shopCard");
            let cardParentNode = card.parentNode;

            let img = cardParentNode.querySelector(".cardImg").src;
            let title = cardParentNode.querySelector(".cardTitle").innerHTML;
            let price = Number(cardParentNode.querySelector(".price").innerHTML);

            const eskiUrun = sepet.find((urun) => urun.title === title);
            if (eskiUrun) {
                // console.log(eskiUrun);
                return
            }

            let eklenenSepet = {
                img: img,
                title: title,
                price: price,
            };
            sepet.push(eklenenSepet);
            // console.log(sepet);
            document.querySelector(".badge").innerHTML=`${sepet.length}`
            sepetGuncelle();
        });
    }
}

$(document).ready(function(){
    $('.sliderParent').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2500,
      nav:false,
      dots:true
    });
});
