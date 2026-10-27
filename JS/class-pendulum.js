class Pendulum {
    constructor(angle1, angle2, length1, length2, color) {
        this.x0 = width / 4;
        this.y0 = 225;
        this.angle1 = angle1;
        this.angle2 = angle2;
        this.angleV1 = 0;
        this.angleV2 = 0;
        this.angleA1 = 0;
        this.angleA2 = 0;
        this.length1 = length1;
        this.length2 = length2;
        this.m1 = 1;
        this.m2 = 1;
        this.c = color;
        this.damping = 0.9996;
    }

    update() {
        const { angle1: a1, angle2: a2, angleV1: v1, angleV2: v2, length1: l1, length2: l2, m1, m2 } = this;
        const denominator = 2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2);
        const timeStep = 0.5;

        this.angleA1 = (-g * (2 * m1 + m2) * sin(a1)
            - m2 * g * sin(a1 - 2 * a2)
            - 2 * sin(a1 - a2) * m2 * (v2 * v2 * l2 + v1 * v1 * l1 * cos(a1 - a2)))
            / (l1 * denominator);

        this.angleA2 = (2 * sin(a1 - a2) * (v1 * v1 * l1 * (m1 + m2)
            + g * (m1 + m2) * cos(a1)
            + v2 * v2 * l2 * m2 * cos(a1 - a2)))
            / (l2 * denominator);

        this.angleV1 += this.angleA1 * timeStep;
        this.angleV2 += this.angleA2 * timeStep;
        this.angleV1 *= this.damping;
        this.angleV2 *= this.damping;
        this.angle1 += this.angleV1 * timeStep;
        this.angle2 += this.angleV2 * timeStep;

        this.x1 = this.x0 + l1 * sin(this.angle1);
        this.y1 = this.y0 + l1 * cos(this.angle1);
        this.x2 = this.x1 + l2 * sin(this.angle2);
        this.y2 = this.y1 + l2 * cos(this.angle2);
    }

    display() {
        stroke(this.c);
        strokeWeight(2);
        line(this.x0, this.y0, this.x1, this.y1);
        line(this.x1, this.y1, this.x2, this.y2);
        noStroke();
        fill(this.c);
        circle(this.x1, this.y1, 12);
        circle(this.x2, this.y2, 14);
    }

    displayBalls(offsetX) {
        noStroke();
        fill(this.c);
        circle(this.x1 + offsetX, this.y1, 12);
        circle(this.x2 + offsetX, this.y2, 14);
    }
}
