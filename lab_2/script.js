// ==========================
// 1.2.3 – car1 через new Object()
// ==========================

let car1 = new Object();

car1.color = "black";
car1.maxSpeed = 220;

car1.driver = {
    name: "Denus Chychul",
    category: "C",
    personalLimitations: "No driving at night"
};

car1.tuning = true;
car1["number of accidents"] = 0;

// 1.2.5
car1.drive = function () {
    console.log("I am not driving at night");
};

car1.drive();


// ==========================
// 1.2.4 – car2 через літерал
// ==========================

let car2 = {
    color: "red",
    maxSpeed: 180,

    driver: {
        name: "Denus Chychul",
        category: "B",
        personalLimitations: null
    },

    tuning: false,
    "number of accidents": 2
};

// 1.2.6
car2.drive = function () {
    console.log("I can drive anytime");
};

car2.drive();


// ==========================
// 1.2.7 – Конструктор Truck
// ==========================

function Truck(color, weight, avgSpeed, brand, model) {

    this.color = color;
    this.weight = weight;
    this.avgSpeed = avgSpeed;
    this.brand = brand;
    this.model = model;

    // 1.2.9
    this.trip = function () {

        if (!this.driver) {

            console.log("No driver assigned");

        } else {

            let message = "Driver " + this.driver.name + " ";

            if (this.driver.nightDriving) {
                message += "drives at night ";
            } else {
                message += "does not drive at night ";
            }

            message += "and has " + this.driver.experience + " years of experience";

            console.log(message);
        }
    };
}


// ==========================
// 1.2.8 – AssignDriver
// ==========================

Truck.prototype.AssignDriver = function (name, nightDriving, experience) {

    this.driver = {
        name: name,
        nightDriving: nightDriving,
        experience: experience
    };
};


// ==========================
// 1.2.10 – Створення Truck
// ==========================

let truck1 = new Truck("white", 5000, 90.5, "Volvo", "FH16");

let truck2 = new Truck("blue", 4500, 85.3, "MAN", "TGX");

truck1.AssignDriver("Denus Chychul", true, 10);

truck2.AssignDriver("Ivan Petrenko", false, 5);

truck1.trip();

truck2.trip();


// ===================================================
// 1.2.12 – 1.2.24 (ES6 класи)
// ===================================================


// ==========================
// Square
// ==========================

class Square {

    constructor(a) {
        this.a = a;
    }

    static help() {

        console.log(
            "Square: all sides are equal, all angles are 90 degrees."
        );
    }

    length() {
        console.log("Perimeter:", this.a * 4);
    }

    square() {
        console.log("Area:", this.a * this.a);
    }

    info() {

        console.log("=== Square ===");

        console.log(
            "Sides:",
            this.a,
            this.a,
            this.a,
            this.a
        );

        console.log("Angles: 90, 90, 90, 90");

        this.length();

        this.square();
    }
}


// ==========================
// Rectangle
// ==========================

class Rectangle extends Square {

    constructor(a, b) {

        super(a);

        this.b = b;
    }

    static help() {

        console.log(
            "Rectangle: opposite sides are equal, all angles are 90 degrees."
        );
    }

    length() {

        console.log(
            "Perimeter:",
            2 * (this.a + this.b)
        );
    }

    square() {

        console.log(
            "Area:",
            this.a * this.b
        );
    }

    info() {

        console.log("=== Rectangle ===");

        console.log(
            "Sides:",
            this.a,
            this.b,
            this.a,
            this.b
        );

        console.log("Angles: 90, 90, 90, 90");

        this.length();

        this.square();
    }

    // getters/setters

    get sideA() {
        return this.a;
    }

    set sideA(value) {
        this.a = value;
    }

    get sideB() {
        return this.b;
    }

    set sideB(value) {
        this.b = value;
    }
}


// ==========================
// Rhombus
// ==========================

class Rhombus extends Square {

    constructor(a, alpha, beta) {

        super(a);

        this.alpha = alpha;
        this.beta = beta;
    }

    static help() {

        console.log(
            "Rhombus: all sides are equal."
        );
    }

    length() {

        console.log(
            "Perimeter:",
            this.a * 4
        );
    }

    square() {

        let area =
            this.a *
            this.a *
            Math.sin(this.alpha * Math.PI / 180);

        console.log("Area:", area);
    }

    info() {

        console.log("=== Rhombus ===");

        console.log(
            "Sides:",
            this.a,
            this.a,
            this.a,
            this.a
        );

        console.log(
            "Angles:",
            this.alpha,
            this.beta,
            this.alpha,
            this.beta
        );

        this.length();

        this.square();
    }
}


// ==========================
// Parallelogram
// ==========================

class Parallelogram extends Rectangle {

    constructor(a, b, alpha, beta) {

        super(a, b);

        this.alpha = alpha;
        this.beta = beta;
    }

    static help() {

        console.log(
            "Parallelogram: opposite sides are parallel and equal."
        );
    }

    length() {

        console.log(
            "Perimeter:",
            2 * (this.a + this.b)
        );
    }

    square() {

        let area =
            this.a *
            this.b *
            Math.sin(this.alpha * Math.PI / 180);

        console.log("Area:", area);
    }

    info() {

        console.log("=== Parallelogram ===");

        console.log(
            "Sides:",
            this.a,
            this.b,
            this.a,
            this.b
        );

        console.log(
            "Angles:",
            this.alpha,
            this.beta,
            this.alpha,
            this.beta
        );

        this.length();

        this.square();
    }
}


// ==========================
// 1.2.23 – help()
// ==========================

Square.help();

Rectangle.help();

Rhombus.help();

Parallelogram.help();


// ==========================
// 1.2.24 – info()
// ==========================

let square1 = new Square(5);

let rectangle1 = new Rectangle(6, 4);

let rhombus1 = new Rhombus(5, 120, 60);

let parallelogram1 =
    new Parallelogram(8, 4, 120, 60);

square1.info();

rectangle1.info();

rhombus1.info();

parallelogram1.info();


// ==========================
// 1.2.25 – Triangular
// ==========================

function Triangular(a = 3, b = 4, c = 5) {

    return { a, b, c };
}


// ==========================
// 1.2.26
// ==========================

let triangle1 = Triangular();

let triangle2 = Triangular(6, 8, 10);

let triangle3 = Triangular(7, 7, 7);

console.log(triangle1);

console.log(triangle2);

console.log(triangle3);


// ==========================
// 1.2.27 – PiMultiplier
// ==========================

function PiMultiplier(number) {

    return function () {

        return Math.PI * number;
    };
}


// ==========================
// 1.2.28
// ==========================

let multiplyBy2 = PiMultiplier(2);

let multiplyByThreeOverTwo =
    PiMultiplier(3 / 2);

let divideBy2 =
    PiMultiplier(1 / 2);

console.log(multiplyBy2());

console.log(multiplyByThreeOverTwo());

console.log(divideBy2());


// ==========================
// 1.2.29 – Painter
// ==========================

function Painter(color) {

    return function (obj) {

        if ("type" in obj) {

            console.log(
                color + " " + obj.type
            );

        } else {

            console.log(
                "No 'type' property occurred!"
            );
        }
    };
}


// ==========================
// 1.2.30
// ==========================

let PaintBlue = Painter("Blue");

let PaintRed = Painter("Red");

let PaintYellow = Painter("Yellow");


// ==========================
// 1.2.31
// ==========================

let object1 = {
    maxSpeed: 280,
    type: "Sportcar",
    color: "magenta"
};

let object2 = {
    type: "Truck",
    avgSpeed: 90,
    loadCapacity: 2400
};

let object3 = {
    maxSpeed: 180,
    color: "purple",
    isCar: true
};

PaintBlue(object1);
PaintBlue(object2);
PaintBlue(object3);

PaintRed(object1);
PaintRed(object2);
PaintRed(object3);

PaintYellow(object1);
PaintYellow(object2);
PaintYellow(object3);


// ==========================
// 1.2.33 – Висновок
// ==========================

console.log(
    "Під час виконання лабораторної роботи було вивчено об’єктно-орієнтоване програмування у JavaScript."
);

