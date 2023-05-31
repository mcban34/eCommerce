fetch("public/product.json")
.then(res => res.json())
.then(value => {

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    let dataObject = [] 
    let gelenVeri = value.find(item => item.id == productId);
    console.log(gelenVeri);
    dataObject.push(gelenVeri)

    const slides = gelenVeri.detailImg.map((slide) => `<div><img class='zoomable-image' src="${slide.detailImg}" alt=""></div>`).join("");
    const navSlides = gelenVeri.detailImg.map((slide, index) => `<div><a href="#" data-slide="${index + 1}"><img src='${slide.detailImg}'></a></div>`).join("");

    const productHTML = `
    <div class="slider slider-for">
        ${slides}
    </div>
    <div class="action">
        <div class="slider slider-nav">
            ${navSlides}
        </div>
    </div>`

    document.querySelector(".productImg").innerHTML = productHTML;


    let detailContentHTML = dataObject.map(element => {
        
            //!yıldızlar
            let ratingStars = [];
            for (let j = 0; j < parseInt(element.rating); j++) {
                ratingStars.push('<i class="bi bi-star-fill"></i>');
            }
            for (let j = 0; j < 5 - parseInt(element.rating); j++) {
                ratingStars.push('<i class="bi bi-star"></i>');
            }
            ratingHtml = ratingStars.join('');
        return `

            <div class="detailContent">
                <h1 class="detailTitle">${element.title}</h1>
                <p class="detailDes">${element.description}</p>
                <h2>${element.price.newPrice.toFixed(2)}₺ <span class="oldPrice">${element.price.oldprice.toFixed(2)}₺</span> </h2>
                <div class="rating-stars">${ratingHtml} <span class="ratingHtml">(${element.rating.toFixed(1)})</span>  <span class="ticked">${element.ticket}</span></div>
                <button class="addToCard">Sepete Ekle <i class="bi bi-basket"></i></button>
            </div>

        `
    })
    document.querySelector(".productDetailContent").innerHTML=detailContentHTML.join("")


    $(document).ready(function(){
        $('.slider-for').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            infinite:true
         });
         $('.slider-nav').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            asNavFor: '.slider-for',
            dots: false,
            centerMode: false,
            focusOnSelect: false
         });
         
         $('.slider-nav .slick-slide').on('click', function (event) {
            $('.slider-for').slick('slickGoTo', $(this).data('slickIndex'));
         });
    });
});
