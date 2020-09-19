// components: { VueSelectImage }


let net;

async function app() {
  // // Initialize the object
  // $("select").imagepicker();

  console.log('Loading mobilenet..');
  // Load the model.
  net = await mobilenet.load();
  console.log('Sucessfully loaded model');

  // Make a prediction through the model on our image.

  const imgEl = document.getElementById('img');
  const result = await net.classify(imgEl);

  plot(result);
}

app();

function plot(prediction) {
  let x_arr = [];
  let y_arr = [];
  for (let idx in prediction){
    x_arr.push(prediction[idx]["className"]);
    y_arr.push(prediction[idx]["probability"]);
  }
  // console.log(x_arr);
  // console.log(y_arr);

  let trace1 = {
    type: 'bar',
    x: x_arr,
    y: y_arr,
    marker: {
        color: '#C8A2C8',
        line: {
            width: 2.5
        }
    }
  };

  let data = [ trace1 ];

  let layout = {
    title: 'MobileNet Prediction',
    font: {size: 18}
  };

  Plotly.newPlot('prediction', data, layout, {responsive: true});
}
