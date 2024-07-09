var simulateMouseEvent = function (element, eventName, coordX, coordY) {
  element.dispatchEvent(
    new MouseEvent(eventName, {
      view: window,
      bubbles: true,
      cancelable: true,
      clientX: coordX,
      clientY: coordY,
      button: 0,
    })
  );
};

var user = jQuery(".user")[0].innerText;

jQuery.ajax({
  url: "https://gspm.hr/temp/ajax.php?akcija=unos",
  type: "POST",
  data: {
    sto: "dnevnik rada",
    tko: user,
  },
  cache: false,
  success: function () {
    console.log("AJAX ok");
  },
});

var gdjesmo = 0;

function nasumicniBroj(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
var ljestvica1 = "";
var ljestvica2 = "";
var etida1 = "";
var etida2 = "";
var sonata = "";
var bach1 = "";
var bach2 = "";
var komad1 = "";
var komad2 = "";

if (
  ljestvica1 == "" ||
  ljestvica2 == "" ||
  etida1 == "" ||
  etida2 == "" ||
  sonata == "" ||
  bach1 == "" ||
  bach2 == "" ||
  komad1 == "" ||
  komad2 == ""
) {
  ljestvica1 = prompt("Unesi naziv prve ljestvice", "");
  ljestvica2 = prompt("Unesi naziv druge ljestvice", "");
  etida1 = prompt("Unesi naziv prve etide");
  etida2 = prompt("Unesi naziv druge etide");
  sonata = prompt("Unesi naziv sonate");
  bach1 = prompt("Unesi naziv prvog Bacha");
  bach2 = prompt("Unesi naziv drugog Bacha");
  komad1 = prompt("Unesi naziv prvog komada");
  komad2 = prompt("Unesi naziv drugog komada");
}

setInterval(() => {
  var el = jQuery("td:nth-child(3)")
    .filter(function () {
      return jQuery(this).text() == "";
    })
    .closest("tr")[0];

  if (el == undefined) {
    location.reload();
  }

  var jelPrazno = el.children[2].innerText;
  var dodatanTekst = "";

  var etida;
  var komad;
  var bach;
  var elementi1 = Array("vježbanje prstometa", "dogovor oko dinamičkih planova", "rad oko agogike", "ritmičke vježbe", "rad na fraziranju");
  var elementi2 = Array("artikulacija", "interpretacija", "vođenje glasova, cantabile", "rad na pedalizaciji", "vježbanje legato tehnike i stilističke autentičnosti");

  if (jelPrazno.length == 0 && gdjesmo < 150) {
    if (gdjesmo < 20) {
      dodatanTekst = " prosviravanje, " + elementi2[Math.floor(Math.random() * elementi2.length)];
    } else if (gdjesmo < 40) {
      dodatanTekst = " " + elementi1[Math.floor(Math.random() * elementi1.length)];
    } else {
      dodatanTekst = "Vježbanje, prosviravanje"
    }
    var theButton = el;

    var box = theButton.getBoundingClientRect(),
      coordX = box.left + (box.right - box.left) / 2,
      coordY = box.top + (box.bottom - box.top) / 2;

    simulateMouseEvent(theButton, "click", coordX, coordY);
    jQuery("a.popup")[0].click();
    setTimeout(function () {
      el.children[2].innerText = "test";
      jQuery("form").attr("target", "_blank");
      if (gdjesmo > 30) {
        document.getElementById("charts").value = ljestvica1;
      } else {
        document.getElementById("charts").value = ljestvica2;
      }

      if (gdjesmo > 25) {
        etida = etida1;
        bach = bach1;
        komad = komad1;
      } else {
        etida = etida2;
        bach = bach2;
        komad = komad2;
      }
      if (etida != "") {
        if (
          gdjesmo > nasumicniBroj(48, 53) &&
          gdjesmo < nasumicniBroj(60, 63)
        ) {
          document.getElementById("etudes").value = etida + dodatanTekst;
        }
        if (gdjesmo < nasumicniBroj(18, 22)) {
          document.getElementById("etudes").value = etida + dodatanTekst;
        }
      }
      if (sonata != "") {
        document.getElementById("sonata").value = sonata + dodatanTekst;
      }
      if (bach != "") {
        if (
          gdjesmo > nasumicniBroj(16, 20) &&
          gdjesmo < nasumicniBroj(27, 32)
        ) {
          document.getElementById("polyphonic_compositions").value =
            bach + dodatanTekst;
        }
        if (gdjesmo < nasumicniBroj(8, 12)) {
          document.getElementById("polyphonic_compositions").value =
            bach + dodatanTekst;
        }
      }
      if (komad != "") {
        document.getElementById("other").value = komad + dodatanTekst;
      }
      jQuery("input[type=submit].button").click();
      jQuery("#modal-close").click();
      console.log(jQuery(el).children("td:nth-child(1)"));
    }, 500);
    gdjesmo = gdjesmo + 1;
  }
}, 1500);
