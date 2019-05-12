<template>
  <div>
    <h1>Words Trainer APP</h1>

    <div>
      <form @submit.prevent="translateMe" action="get">
        <input
          v-model="textToTranslate"
          type="text"
          name="input"
          id="input"
          placeholder="Type a word to translate..."
        >
        <button type="submit" name="input" id="translate">Translate!</button>
      </form>
    </div>

    <div>
      <div id="word"></div>
      <div id="translation">
        <p>{{ translation }}</p>
      </div>
    </div>
  </div>
</template>

<script>
// import io from "socket.io-client";
import translate, { setCORS } from "google-translate-api-browser";
setCORS("http://cors-anywhere.herokuapp.com/");
// import { setCORS } from "google-translate-api-browser";
// setting up cors-anywhere server address
// const translate = setCORS("http://cors-anywhere.herokuapp.com/");

export default {
  name: "Translator",
  data() {
    return {
      textToTranslate: "",
      translation: ""
      // socket: io("localhost:8000")
    };
  },
  methods: {
    translateMe(data) {
      data = this.textToTranslate;
      translate(data, { to: "es" })
        .then(res => {
          // I do not eat six days
          console.log(res.text);
          this.translation = res.text;
        })
        .catch(err => {
          console.error(err);
        });
      // this.socket.emit("textToTranslate", this.textToTranslate);
      // this.textToTranslate = "";
    }
  },
  mounted() {
    // this.socket.on("translated", data => (this.translation = data));
  }
};
</script>

<style>
</style>
