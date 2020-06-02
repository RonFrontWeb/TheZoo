let zoo = document.getElementById("zoo");
let form = document.querySelector("#form");
let inputOne = document.getElementById("inputOne");
let optionOne = document.getElementById("optionOne");
let xy;
let y;
let counter = 1;
let zooName = document.getElementById("zooName");
let inputZooName = document.getElementById("inputZooName");
let animation = document.getElementById("animation");
let soundToggles = document.querySelectorAll(".soundToggle");
let zooContainer = document.querySelector("#zooContainer");
let soundOn = true;


inputZooName.addEventListener("keyup", function() {
    zooName.innerHTML = inputZooName.value;
})

zooContainer.addEventListener("click", function(evt) {
    evt.stopPropagation();
    soundOn = !soundOn;
    for (let i = 0; i < soundToggles.length; i++) {
        soundToggles[i].classList.toggle("hidden");
    }
    let audioElements = document.querySelectorAll("audio");
    for (let i = 0; i < audioElements.length; i++) {
        console.log(soundOn);
        if (soundOn) {
            audioElements[i].volume = 0.2;
        } else {
            audioElements[i].volume = 0.0;
        }
    }
})




zoo.addEventListener("click", function(evt) {
    form.classList.toggle("hidden");
    console.log(evt.pageX + "-" + evt.pageY);
    xy = `top: ${evt.pageY}px; left: ${evt.pageX}px;`
    y = evt.pageY;
    form.style = xy;
})
form.addEventListener("click", function(evt) {
    evt.stopPropagation();

})
form.addEventListener("submit", function(evt) {
    evt.preventDefault();
    tempOb = createAnimal(inputOne.value, optionOne.value);
    tempOb.createHTML();
    form.classList.add("hidden");

});

let getSpeech = function(gender) {
    let audioFile;


    let male = [
        "Cool",
        "Cough",
        "Hello_Long",
        "Hello_Question",
        "Hey",
        "OK",
        "Oups",
        "Really",
        "Sigh",
        "Sure_Thing",
        "Uhh",
        "Welcome",
        "Wow",
    ]
    let female = [
        "Ahh",
        "Cool",
        "Cough",
        "Haha",
        "Hello",
        "Sigh",
        "Uhh",
        "Welcome",
        "Whats_Up",
        "Yahoo",
        "Yes_Sir",

    ]
    let randomNumber = Math.random();
    if (gender == "male") {

        randomNumber *= male.length;
        randomNumber = Math.floor(randomNumber);
        let i = randomNumber;
        audioFile = male[i];

        return "VOICE_MALE_" + audioFile;
    }

    if (gender == "female") {

        randomNumber *= female.length;
        randomNumber = Math.floor(randomNumber);
        let i = randomNumber;
        audioFile = female[i];

        return "VOICE_FEMALE_" + audioFile;
    }

    // console.log(randomNumber);

}

getSpeech();



function createAnimal(name, image) {
    let speech = image;
    // if (speech == "zookeeper-male") {
    //     speech = getSpeech("male");
    // }
    // if (speech == "zookeeper-female") {
    //     speech = getSpeech("female");
    // }
    let animal = {
        animalName: name,
        animalImage: "./img/" + image + ".png",
        animalSound: "./sounds/" + speech + ".mp3",
        zookeeperSound: speech,
        zookeeperFunction: getSpeech,


        createHTML: function() {
            let zookeeper = this.zookeeperSound;
            let img = document.createElement("img");
            img.src = this.animalImage;
            let sound = document.createElement("audio");
            sound.volume = 0.2;
            if (zookeeper != "zookeeper-male" && zookeeper != "zookeeper-female") {
                sound.src = this.animalSound;

            }

            let animationValue = animation.value;

            if (animationValue == "Animation1") {
                img.classList.add("animationOne")

            }
            if (animationValue == "Animation2") {
                img.classList.add("animationTwo")

            }

            if (y >= 400) {
                img.classList.add("front");
            } else {
                img.classList.add("back");
            }



            let div = document.createElement("div");
            let h2 = document.createElement("h2");
            div.classList.add("animalStyle");
            h2.classList.add("figureName");
            div.style = xy;
            div.append(h2)
            h2.append(this.animalName);
            div.append(sound);
            div.append(img);

            zoo.append(div);
            let zookeeperFnc = this.zookeeperFunction;


            div.addEventListener("click", function(evt) {
                evt.stopPropagation();
                // let randomSpeech = "";
                if (zookeeper == "zookeeper-male") {
                    // randomSpeech = zookeeperFnc("male");
                    sound.src = "./sounds/" + zookeeperFnc("male") + ".mp3";
                }
                if (zookeeper == "zookeeper-female") {
                    // randomSpeech = zookeeperFnc("female");
                    sound.src = "./sounds/" + zookeeperFnc("female") + ".mp3";
                }
                console.log(zookeeper);
                sound.play();
            })

            let randomInterval = randomInteger(15000, 30000);

            setInterval(() => {


                if (zookeeper == "zookeeper-male") {
                    // randomSpeech = zookeeperFnc("male");
                    sound.src = "./sounds/" + zookeeperFnc("male") + ".mp3";
                }
                if (zookeeper == "zookeeper-female") {
                    // randomSpeech = zookeeperFnc("female");
                    sound.src = "./sounds/" + zookeeperFnc("female") + ".mp3";
                }
                console.log(zookeeper);
                sound.play();
                randomInterval = randomInteger(15000, 30000);
            }, randomInterval);
        }
    };
    return animal;

}

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}