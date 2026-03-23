(function () {

  var names = ["Bill", "John", "Jen", "Jason", "Paul", "Frank", "Steven", "Larry", "Paula", "Laura", "Jim"];

  // 🔹 1.2.2 — за першою літерою
  console.log("=== Спосіб 1: за першою літерою ===");

  for (var i = 0; i < names.length; i++) {

    var firstLetter = names[i].charAt(0).toLowerCase();

    if (firstLetter === 'j') {
      byeSpeaker.speak(names[i]);
    } else {
      helloSpeaker.speak(names[i]);
    }
  }

  // 🔹 1.2.3 — додатковий спосіб
  console.log("=== Спосіб 2: за довжиною імені ===");
  console.log("Якщо довжина парна — Hello, якщо непарна — Good Bye");

  for (var i = 0; i < names.length; i++) {

    if (names[i].length % 2 === 0) {
      helloSpeaker.speak(names[i]);
    } else {
      byeSpeaker.speak(names[i]);
    }
  }

})();
