let button = document.querySelector('button');

let doors = Array.from(document.getElementsByTagName('img'));

let doorsContent = ['goat.webp', 'goat.webp', 'car.jpeg'];

let doorsObject = {
    door1: {
        img: null
    },
    door2: {
        img: null
    },
    door3: {
        img: null
    }
};

let h2 = document.querySelector('h2');

function fillStores() {
    let counter = 0;
    let randomNum;
    doors.forEach(element => {
        element.src = 'img/door.png'
        randomNum = Math.floor(Math.random() * doorsContent.length);
        if (counter == 0) {
            doorsObject.door1.img = `img/${doorsContent[randomNum]}`;
        }
        else if (counter == 1) {
            doorsObject.door2.img = `img/${doorsContent[randomNum]}`
        }
        else {
            doorsObject.door3.img = `img/${doorsContent[randomNum]}`
        }
        doorsContent.splice(randomNum, 1);
        counter++;
    });
}

const chooseDoor = () => new Promise(resolve => {
    doors.forEach(element => {
        element.addEventListener('click', event => resolve(event.target))
    })
});

async function openDoor() {

    let chosenDoor = await chooseDoor();
    chosenDoor.style.border = '5px solid blue';
    chosenDoor.style.borderRadius = '5px';

    let flag = false;
    do {
        randomNum = Math.floor(Math.random() * 3);
        switch (randomNum) {
            case 0:
                if (doorsObject.door1.img == 'img/goat.webp' && doors[randomNum] != chosenDoor) {
                    doors[randomNum].src = doorsObject.door1.img;
                    doors[randomNum] = null;
                    flag = true;
                }
                break;
            case 1:
                if (doorsObject.door2.img == 'img/goat.webp' && doors[randomNum] != chosenDoor) {
                    doors[randomNum].src = doorsObject.door2.img;
                    doors[randomNum] = null;
                    flag = true;
                }
                break;
            case 2:
                if (doorsObject.door3.img == 'img/goat.webp' && doors[randomNum] != chosenDoor) {
                    doors[randomNum].src = doorsObject.door3.img;
                    doors[randomNum] = null;
                    flag = true;
                }
                break;
        }
    } while (!flag)

    h2.innerText = 'Meggondoltad magad? Válthatsz ajtót vagy kitarthatsz a döntésed mellett.'

    let visibleDoorIndex = doors.findIndex(element => element == null);

    button.style.visibility = 'hidden';

    console.log(chosenDoor);

    let drumRoll = document.getElementById('drumRoll');
    let applause = document.getElementById('applause');
    let trombone = document.getElementById('trombone');
    let winCounter = Number(localStorage.getItem('Nyert'));
    let loseCounter = Number(localStorage.getItem('Vesztett'));
    let changedWinCounter = Number(localStorage.getItem('Változtatással Nyert'));
    let changedLoseCounter = Number(localStorage.getItem('Változtatással Vesztett'));

    let isFired = false;
    doors.forEach(element => {
        if (element != null) {
            element.style.cursor = 'pointer';
            element.addEventListener('click', () => {
                if (!isFired) {
                    drumRoll.play();
                    h2.innerText = 'Dobpergés 🥁';
                    chosenDoor.style.border = 'unset';
                    chosenDoor.style.borderRadius = 'unset'
                    element.style.border = '5px solid blue';
                    element.style.borderRadius = '5px';
                    setTimeout(() => {
                        switch (visibleDoorIndex) {
                            case 0:
                                doors[1].src = doorsObject.door2.img;
                                doors[2].src = doorsObject.door3.img;
                                break;
                            case 1:
                                doors[0].src = doorsObject.door1.img;
                                doors[2].src = doorsObject.door3.img;
                                break;
                            case 2:
                                doors[0].src = doorsObject.door1.img;
                                doors[1].src = doorsObject.door2.img;
                                break;
                        }
                        if (element.src.includes('img/car.jpeg')) {
                            h2.innerText = 'Gratulálok, nyertél! 😎';
                            applause.play();
                            if (element == chosenDoor) {
                                localStorage.setItem('Nyert', `${winCounter+1}`);
                            }
                            else {
                                localStorage.setItem('Változtatással Nyert', `${changedWinCounter+1}`)
                            }
                        }
                        else if (!element.src.includes('img/car.jpeg')) {
                            h2.innerText = 'Vesztettél. 😢';
                            trombone.play();
                            if (element == chosenDoor) {
                                localStorage.setItem('Vesztett', `${loseCounter+1}`)
                            }
                            else {
                                localStorage.setItem('Változtatással Vesztett', `${changedLoseCounter+1}`)
                            }
                        }
                        localStorage.setItem('Total', `${winCounter + loseCounter + changedWinCounter + changedLoseCounter + 1}`)
                        isFired = true;
                        button.style.visibility = 'unset';
                        button.addEventListener('click', () => {
                            location.reload();
                        })
                    }, 4200)
                }
            })
        }
    });
}

fillStores();

openDoor();