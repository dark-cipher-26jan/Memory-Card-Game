const cards = document.querySelectorAll(".card");
let matched = 0, cardOne, cardTwo, disableDeck = false;

const flipCard = ({target: c}) => {
    if(cardOne !== c && !disableDeck) {
        c.classList.add("flip");
        if(!cardOne) return cardOne = c;
        
        cardTwo = c;
        disableDeck = true;
        matchCards([cardOne, cardTwo].map(x => x.querySelector(".back-view img").src));
    }
}

const matchCards = ([img1, img2]) => {
    if(img1 === img2) {
        matched++;
        if(matched === 8) setTimeout(() => shuffleCard(), 1000);
        
        [cardOne, cardTwo].forEach(x => x.removeEventListener("click", flipCard));
        [cardOne, cardTwo, disableDeck] = ["", "", false];
        return;
    }
    
    [cardOne, cardTwo].forEach(x => x.classList.add("shake"));
    setTimeout(() => {
        [cardOne, cardTwo].forEach(x => x.classList.remove("shake", "flip"));
        [cardOne, cardTwo, disableDeck] = ["", "", false];
    }, 1200);
}

const shuffleCard = () => {
    [matched, disableDeck, cardOne, cardTwo] = [0, false, "", ""];
    let arr = Array.from({length: 16}, (_, i) => i < 8 ? i + 1 : i - 7).sort(() => Math.random() > 0.5 ? 1 : -1);
    
    cards.forEach((c, i) => {
        c.classList.remove("flip");
        c.querySelector(".back-view img").src = `images/img-${arr[i]}.png`;
        c.addEventListener("click", flipCard);
    });
}

shuffleCard();
cards.forEach(c => c.addEventListener("click", flipCard));
