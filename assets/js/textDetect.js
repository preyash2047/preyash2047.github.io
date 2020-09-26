var x = document.getElementById("Imgfile");
var txt = "";
if ('files' in x) {
  if (x.files.length == 0) {
    txt = "Select one or more files.";
  } else {
    for (var i = 0; i < x.files.length; i++) {
      txt += "<br><strong>" + (i+1) + ". file</strong><br>";
      var file = x.files[i];
      if ('name' in file) {
        txt += "name: " + file.name + "<br>";
      }
      if ('size' in file) {
        txt += "size: " + file.size + " bytes <br>";
      }
    }
  }
}
document.getElementById ("status").innerHTML = txt;

let net;
async function app() {
    console.log('Loading mobilenet..');
    // Load the model.
    net = await tf.loadLayersModel('selective_data_model/model.json');
    console.log('Successfully loaded model');

    const img = document.getElementById('img');
    const tfImg = tf.browser.fromPixels(img);
    const smalImg = tf.image.resizeBilinear(tfImg, [64, 64]);
    const resized = tf.cast(smalImg, 'float32');
    const t4d = tf.tensor4d(Array.from(resized.dataSync()),[1,64,64,3]);

    var abcd = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    const result = await net.predict(t4d).data();
    console.log(abcd[result.indexOf(1)]);

    console.log(result);
    }
app();
