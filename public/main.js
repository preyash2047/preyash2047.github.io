async function main() {
    // Creazione del dataset di training
    const inputs = [];
    const outputs = [];
    for(let i = 0; i < 100; i++) {
        for(let j = 0; j < 100; j++) {
            inputs.push(tf.tensor1d([i, j]));
            outputs.push(tf.scalar(i + j));
        }
    }

    const inputTensor = tf.stack(inputs);
    const outputTensor = tf.stack(outputs);

    console.log('Input:');
    inputTensor.print();

    console.log('Output:');
    outputTensor.print();

    // Creazione di un modello sequenziale
    const model = tf.sequential();
    const hidden = tf.layers.dense({
        units: 1,
        // Ogni input ha 1 dimensione
        inputShape: [2],
        useBias: true
    });
    model.add(hidden);

    model.summary();

    model.compile({
        loss: 'meanSquaredError', 
        optimizer: tf.train.sgd(0.0001),
    });

    console.log('Training...')

    // Train della rete
    await model.fit(inputTensor, outputTensor, {
        batchSize: 1000,
        epochs: 10,
        shuffle: true,
        callbacks: tfvis.show.fitCallbacks(
          { name: 'Training Performance' },
          ['loss', 'mse'], 
          { height: 200, callbacks: ['onEpochEnd'] }
        )
    });

    console.log('Training finished');

    console.log('Testing...');

    // Test della rete
    let good = 0;
    let bad = 0;
    for(let i = 0; i < 1000; i++) {
        let a = Math.floor(Math.random() * 1000);
        let b = Math.floor(Math.random() * 1000);
        let result = model.predict(tf.tensor([[a, b]])).dataSync()[0];
        result = Math.round(result);

        const realValue = a + b;

        if(realValue == result) {
            good++;
        } else {
            bad++;
        }
    }

    console.log('Good: ' + good);
    console.log('Bad: ' + bad);

    console.log('Testing finished');
}

function redirectLog() {
    if (typeof console  != "undefined") 
    if (typeof console.log != 'undefined')
        console.olog = console.log;
    else
        console.olog = function() {};

    console.log = function(message) {
        console.olog(message);
        const paragraph = document.createElement('p');
        paragraph.textContent = message;
        
        document.getElementById('debugDiv').append(paragraph);
    };

    console.error = console.debug = console.info = console.log
}

window.addEventListener('DOMContentLoaded', () => {
    redirectLog();
    main();
});