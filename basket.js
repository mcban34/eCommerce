let sepetUrunler = JSON.parse(localStorage.getItem("sepet"))
console.log(sepetUrunler)
let sepetUrunHTML = sepetUrunler.map(value => {
    return `
        <div class="sepetBox">
            <div class="sepetImg">
                <img width="150px" src="${value.img}">
            </div>
            <div class="sepetContent">
                <h5>${value.title}</h5>
                <h6 class="fiyat">${value.price.toFixed(2)}</h6>
                <button class="azalt">-</button>
                <span class="miktar">1</span>
                <button class="artir">+</button>
            </div>
        </div>
    `
})

document.querySelector(".basket").innerHTML = sepetUrunHTML.join("")

const azaltDugmeleri = document.querySelectorAll('.azalt');
const artirDugmeleri = document.querySelectorAll('.artir');
const miktarAlanlari = document.querySelectorAll('.miktar');
const fiyat = document.querySelectorAll(".fiyat")
const toplamFiyat = document.querySelector(".toplamFiyat")


function miktarAzalt(index) {
    if (miktarAlanlari[index].textContent > 1) {
        miktarAlanlari[index].textContent--;
        if(Number(fiyat[index].innerHTML)>1){
            let eksiltilmisFiyat = Number(fiyat[index].innerHTML) - sepetUrunler[index].price;
            fiyat[index].innerHTML=eksiltilmisFiyat.toFixed(2)
        }
    }
}

function miktarArtir(index) {
    miktarAlanlari[index].textContent++;
  
    let arttirilmisFiyat = sepetUrunler[index].price*Number(miktarAlanlari[index].textContent);
    fiyat[index].innerHTML=arttirilmisFiyat.toFixed(2)
}

azaltDugmeleri.forEach((dugme, index) => {
    dugme.addEventListener('click', () => {
        miktarAzalt(index);
        toplamFiyatHesapla()
    });
});


artirDugmeleri.forEach((dugme, index) => {
    dugme.addEventListener('click', () => {
        miktarArtir(index);
        toplamFiyatHesapla()
    });
});

const toplamFiyatHesapla = () => {
    let toplamFiyatHTML=0 
    fiyat.forEach(element => {
        toplamFiyatHTML+=Number(element.innerHTML)
    });
    toplamFiyat.innerHTML=`Sepet Toplamı : ${toplamFiyatHTML.toFixed(2)}`
    return toplamFiyatHTML
}

document.addEventListener("DOMContentLoaded",() => {
   toplamFiyatHesapla()
})