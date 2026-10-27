let g = 0.5;
const pendulums = [];
const palette = ["#f6bf0a", "#ccfd0a", "#0f37e6", "#eb3915", "#1ddb4d"];
const num = 10;
const panelWidth = 450;
const startingAngle = document.querySelector("#starting-angle");
const startingAngleValue = document.querySelector("#starting-angle-value");
const gravity = document.querySelector("#gravity");
const gravityValue = document.querySelector("#gravity-value");
const applyAngleButton = document.querySelector("#apply-pendulum-angle");

function resetPendulums(angleInDegrees) {
    pendulums.length = 0;
    const angle1 = angleInDegrees * PI / 180;

    for (let i = 0; i < num; i += 1) {
        const angleDifference = i * 0.0005;
        const pendulum = new Pendulum(angle1 + angleDifference, PI - 0.45, 100, 100, palette[i % palette.length]);
        pendulums.push(pendulum);
    }
}

function setup() {
    const canvas = createCanvas(panelWidth * 2, 450);
    const display = document.querySelector("#pendulum-simulations");

    if (display) {
        canvas.parent(display);
    }

    resetPendulums(Number(startingAngle.value));

    startingAngle.addEventListener("input", () => {
        startingAngleValue.textContent = `${startingAngle.value}°`;
    });

    gravity.addEventListener("input", () => {
        g = Number(gravity.value);
        gravityValue.textContent = g.toFixed(2);
    });

    applyAngleButton.addEventListener("click", () => {
        resetPendulums(Number(startingAngle.value));
    });
}

function draw() {
    background("#182321");
    noStroke();
    fill("#101817");
    rect(0, 0, panelWidth - 2, height);
    rect(panelWidth + 2, 0, panelWidth - 2, height);

    for (const pendulum of pendulums) {
        pendulum.update();
        pendulum.display();
        pendulum.displayBalls(panelWidth);
    }
}
