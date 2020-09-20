async function init(){
  import * as tf from '@tensorflow/tfjs';
  import {loadGraphModel} from '@tensorflow/tfjs-converter';

  const MODEL_URL = 'https://github.com/preyash2047/preyash2047.github.io/blob/master/selective_data_model/model.json';
  const model = await loadGraphModel(MODEL_URL);
  console.log('model loaded from storage');
}


const cat = document.getElementById('cat');
model.execute(tf.browser.fromPixels(cat));
