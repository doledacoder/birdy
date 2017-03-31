 var introBox = document.querySelector('#beginning');
        var lgtxt = introBox.querySelector('#lg-txt');
        var birdy = document.querySelector('#birdy');
        var piu = document.querySelector('#piu');
        var fireSound = document.querySelector('#fire');
        var paused = true;
        var countFire = 0;
        var move;
        var speed = 1000;
        var size = 100;

        birdy.addEventListener('click', fire);
        introBox.addEventListener('click', fire);

        console.log(introBox.lastElementChild.previousElementSibling);

        if (screen.width < 400) {
            introBox.removeChild(lgtxt);
            speed = 800;
            size = 80;
        }

        birdy.style.width = birdy.style.height = size + "px";

        window.onkeyup = function (e) {
            if (e.keyCode == 32) {
                if (paused) {
                    piu.play();
                    birdy.style.backgroundImage = "url('images/bird.png')";
                    move = setInterval(moveBirdy, speed);
                    introBox.classList.remove('show');
                    paused = false;
                } else {
                    piu.pause();
                    clearInterval(move);
                    paused = true;
                    introBox.classList.add('show');
                }
            }
        }

        function beginning() {
            showIntroTxt();
            piu.pause();
        }

        function showIntroTxt() {
            introBox.classList.add('show');
        }

        function moveBirdy() {
            birdy.style.left = (Math.random() * 90) + "vw";
            birdy.style.top = (Math.random() * 90) + "vh";
            birdy.style.transform = "rotate(" + (Math.random() * 360) + "deg)";
        }

        function fire() {
            if (paused) {
                countFire++;
                moveBirdy();
                piu.play();
                birdy.style.backgroundImage = "url('images/bird.png')";
                move = setInterval(moveBirdy, speed);
                paused = false;
                if (10 > countFire > 0 && countFire % 3 == 0) {
                    speed -= 130;
                    size -= 10;
                    birdy.style.width = birdy.style.height = size + "px";
                    console.log(countFire + " " + speed);
                }
                if (countFire == 30) {
                    alert("Smack it down");
                }
            } else {
                piu.pause();
                fireSound.play();
                clearInterval(move);
                birdy.style.transform = "rotate(0deg)";
                birdy.style.backgroundImage = "url('images/explosion.png')";
                paused = true;
            }
            introBox.classList.remove('show');
        }
