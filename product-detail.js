fetch("public/product.json")
.then(res => res.json())
.then(value => {

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    let gelenVeri = value.find(item => item.id == productId);


    const slides = gelenVeri.detailImg.map((slide) => `<div><img class='zoomable-image' src="${slide.detailImg}" alt=""></div>`).join("");
    const navSlides = gelenVeri.detailImg.map((slide, index) => `<div><a href="#" data-slide="${index + 1}"><img src='${slide.detailImg}'></a></div>`).join("");

    console.log(slides);
    console.log(navSlides)



    const productHTML = `
    <div class="slider slider-for">
        ${slides}
    </div>
    <div class="action">
        <div class="slider slider-nav">
            ${navSlides}
        </div>
    </div>`;

    document.querySelector(".productImg").innerHTML = productHTML;

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
