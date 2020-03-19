let description;
let location;
let full_time = true;

// Función que realiza una petición a la api de tres parámetros.
const consultar = async () => {
  let cors = "https://corsanywhere.herokuapp.com/";
  location = $('#location').val();

  await axios.get(`${cors}https://jobs.github.com/positions.json?description=${description}&full_time=${full_time}&location=${location}`)
  .then(response => {
 
      if (response.data.length > 0) {
        appendResult(response.data);
      } else {
        // sweet alert
        Swal.fire({
          icon: 'error',
          title: 'Oops! algo anda mal...',
          text: 'No hubo coincidencias para los criterios ingresados.',
        });

        $("#result").empty();
      }
    })

  .catch (e =>{
    // Podemos mostrar los errores en la consola
    console.log(e);
    // sweet alert
    Swal.fire({
      icon: 'error',
      title: 'Error de red',
      text: 'Por favor, vuelva a intentarlo.',
    });    $("#result").empty();
      });
    };

// Función para agregar el contenido de la búsqueda al div con id 'result'
const appendResult = (result) => {
  let data = '';

  result.map(item => {
    data +=
      `
      <tr>
        <td><h2 class="font-weight-bold pt-5">${item.title}</h2>
        </td>
      </tr>

      <tr class="table-info">
        <td class="text-justify">${item.description}</td>
      </tr>
      `;
  });
  
  $('#result').empty();

  $('#result').append(
    `
    <tr class="bg-info mb-3">
      <td><h3 class="text-white text-center font-weight-bold">Resultado</h3></td>
    </tr>
    `
  );

  $('#result').append(data);
};

$('#btnConsultar').click(function() {
  consultar();
});

$('#description').keyup(function() {
  description = $(this).val();
});

//Verifico si el tipo de trabajo es full time o de medio tiempo
$('.timeJob').change(function() {
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
$('#checkLocation').click(function() {
  if ($(this).prop('checked')) {
    // Si el checkbox está chequeado, se remueve el atributo de sólo lectura del input
    $('#location').removeAttr('readonly');
  } else {
    $('#location').attr('readonly', 'readonly');
    $('#location').val('');
  }
});

// Volver a la página anterior
$('#volver').click(()=>{
  window.history.back();
});

