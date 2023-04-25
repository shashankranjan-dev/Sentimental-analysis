const tf = require("@tensorflow/tfjs");
const MODEL_PATH =
  "https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/model.json";

class Model {
  async load() {
    this.model = await tf.loadLayersModel(MODEL_PATH);
  }

  predict(input) {
    const predictOut = tf.tidy(() => {
      const input = [1, 2, 3, 4, 5];
      const inputTensor = tf.tensor2d([input], [1, input.length]);
      const output = this.model.predict(inputTensor);

      return output.dataSync()[0];
    });

    return {
      score: predictOut,
      sentiment: predictOut > 0.5 ? "Positive" : "Negative",
    };
  }
}

module.exports = new Model();
