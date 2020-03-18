let description;
let location;
let full_time = true;

async function consultar() {
  let cors = "https://corsanywhere.herokuapp.com/";
  location = $('#location').val();

  await axios.get(cors + 'https://jobs.github.com/positions.json?description=' + description + '&full_time=' + full_time + '&location=' + location + '')
  .then(response => {
 
      if (response.data.length > 0) {
        appendResult(response.data);
      } else {
        alert("No existen empleos para esa zona");
        $("#result").empty();
      }
    })
  .catch (e =>{
    // Podemos mostrar los errores en la consola
    console.log(e);
    alert("Error de red, Vuelva a intentarlo");
    $("#result").empty();

  });
}

function appendResult(result) {
  var data = "";

  result.map(item => {
    data +=
      "<tr>" +
      "<td>" +
      "<h3>" +
      item.title +
      "</h3>" +
      "</td>" +
      "<td>" +
      item.description +
      "</td>" +
      "</tr>";
  });
  $("#result").empty();

  $("#result").append(data);
}

$("#btnConsultar").click(function() {
  consultar();
});

$("#description").keyup(function() {
  description = $(this).val();
});

//Verifico si el tipo de trabajo es full time o de medio tiempo
$(".timeJob").change(function() {
  switch ($(this).val()) {
    case "1":
      full_time = true;
      break;
    case "2":
      full_time = false;
      break;
    default:
      break;
  }
});

//Obtengo la ubicación
$("#checkLocation").click(function() {
  if ($(this).prop("checked")) {
    // Si el checkbox está chequeado, se remueve el atributo de sólo lectura del input
    $("#location").removeAttr("readonly");
  } else {
    $("#location").attr("readonly", "readonly");
    $("#location").val("");
  }
});


